from rest_framework import generics
from .models import LoanType, Loan, LoanRepayment
from .serializers import LoanTypeSerializer, LoanSerializer, LoanRepaymentSerializer

class LoanTypeListCreateView(generics.ListCreateAPIView):
    queryset = LoanType.objects.all()
    serializer_class = LoanTypeSerializer

class LoanListCreateView(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

class LoanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

class LoanRepaymentListCreateView(generics.ListCreateAPIView):
    queryset = LoanRepayment.objects.all()
    serializer_class = LoanRepaymentSerializer

class LoanRepaymentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LoanRepayment.objects.all()
    serializer_class = LoanRepaymentSerializer
