from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import Loan, LoanType, LoanApplication
from .serializers import LoanSerializer, LoanTypeSerializer, LoanApplicationSerializer, LoanApplicationApproveSerializer, LoanApplicationDenySerializer

class LoanTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LoanType.objects.all()
    serializer_class = LoanTypeSerializer

class LoanViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

    def get_queryset(self):
        # Filter loans for the authenticated user
        user = self.request.user
        return Loan.objects.filter(user=user)

class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return LoanApplicationSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        # Create loan application for the authenticated user
        serializer.save(user=self.request.user)

class LoanApplicationApproveView(APIView):
    def post(self, request, pk, format=None):
        try:
            application = LoanApplication.objects.get(pk=pk)
        except LoanApplication.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = LoanApplicationApproveSerializer(application, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoanApplicationDenyView(APIView):
    def post(self, request, pk, format=None):
        try:
            application = LoanApplication.objects.get(pk=pk)
        except LoanApplication.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = LoanApplicationDenySerializer(application, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
