from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import LoanApplication, LoanApproval, LoanRepayment, LoanTracking
from .serializers import LoanApplicationSerializer, LoanApprovalSerializer, LoanRepaymentSerializer, LoanTrackingSerializer

class LoanApplicationListCreateView(generics.ListCreateAPIView):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)

class LoanApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer
    permission_classes = [IsAuthenticated]

class LoanApprovalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LoanApproval.objects.all()
    serializer_class = LoanApprovalSerializer
    permission_classes = [IsAuthenticated]

class LoanRepaymentListCreateView(generics.ListCreateAPIView):
    queryset = LoanRepayment.objects.all()
    serializer_class = LoanRepaymentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        loan_application = LoanApplication.objects.get(id=self.kwargs['loan_id'])
        remaining_balance = loan_application.approval.approved_amount - LoanRepayment.objects.filter(loan_application=loan_application).aggregate(models.Sum('amount_paid'))['amount_paid__sum']
        serializer.save(loan_application=loan_application, remaining_balance=remaining_balance - serializer.validated_data['amount_paid'])

class LoanTrackingListCreateView(generics.ListCreateAPIView):
    queryset = LoanTracking.objects.all()
    serializer_class = LoanTrackingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        loan_application = LoanApplication.objects.get(id=self.kwargs['loan_id'])
        serializer.save(loan_application=loan_application)

