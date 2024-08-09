from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import LoanApplication
from .serializers import LoanApplicationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied

class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter to only show loan applications by the logged-in user
        return self.queryset.filter(applicant=self.request.user)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['applicant'] = request.user.id  # Automatically set the applicant to the current user
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        # Perform any additional logic if necessary before saving the object
        serializer.save()

    def update(self, request, *args, **kwargs):
        # Override update to ensure only the applicant can update their application
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        if instance.applicant != request.user:
            raise PermissionDenied("You do not have permission to update this loan application.")
        
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        # Override destroy to ensure only the applicant can delete their application
        instance = self.get_object()

        if instance.applicant != request.user:
            raise PermissionDenied("You do not have permission to delete this loan application.")
        
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'])
    def my_applications(self, request):
        # This custom action returns only the loan applications of the logged-in user
        my_applications = self.get_queryset()
        page = self.paginate_queryset(my_applications)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(my_applications, many=True)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        # List all loan applications for the logged-in user, with pagination if needed
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
