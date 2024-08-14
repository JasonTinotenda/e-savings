from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Loan, LoanType, LoanApproval, LoanRepayment
from .serializers import LoanSerializer, LoanTypeSerializer, LoanApprovalSerializer, LoanRepaymentSerializer
from accounts.models import Account

class LoanTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing loan types.
    Provides a read-only interface for listing and retrieving loan types.
    """
    queryset = LoanType.objects.all()
    serializer_class = LoanTypeSerializer

class LoanViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing loans.
    Handles creation, retrieval, updating, and deletion of loans.
    Each loan is linked to an account, and CRUD operations are supported.
    """
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

    def create(self, request, *args, **kwargs):
        # Retrieve the account linked to the loan
        account = get_object_or_404(Account, id=request.data.get('account'))
        
        # Add account and loan type to the request data
        data = request.data.copy()
        data['account'] = account.id
        data['loan_type'] = data.get('loan_type')
        
        # Create and save the loan
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Return response with loan details and updated account balance
        headers = self.get_success_headers(serializer.data)
        return Response({
            'loan': serializer.data,
            'balance': account.balance
        }, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # Return response with updated loan details and account balance
        return Response({
            'loan': serializer.data,
            'balance': instance.account.balance
        })

    def perform_create(self, serializer):
        # Save the loan and recalculate balance
        loan = serializer.save()
        loan.account.recalculate_balance()

    def perform_update(self, serializer):
        # Save the loan and recalculate balance
        loan = serializer.save()
        loan.account.recalculate_balance()

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """
        Approve or update the status of a loan.
        Admins can update the loan status to 'approved', 'denied', etc.
        """
        loan = self.get_object()
        serializer = LoanApprovalSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(loan=loan)
        
        # Update loan status
        loan.status = serializer.validated_data.get('status')
        loan.save()

        return Response({
            'loan': LoanSerializer(loan).data,
            'status': loan.status
        }, status=status.HTTP_200_OK)

class LoanApprovalViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing loan approvals.
    Handles the creation of loan approvals and updating loan statuses.
    """
    queryset = LoanApproval.objects.all()
    serializer_class = LoanApprovalSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new loan approval.
        Associates the approval with a specific loan and sets its status.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Retrieve the loan and update its status
        loan = serializer.instance.loan
        loan.status = serializer.validated_data.get('status')
        loan.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoanRepaymentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing loan repayments.
    Handles creation, retrieval, updating, and deletion of repayments.
    Automatically updates the associated loan's balance.
    """
    queryset = LoanRepayment.objects.all()
    serializer_class = LoanRepaymentSerializer

    def create(self, request, *args, **kwargs):
        """
        Create a new loan repayment.
        Updates the loan balance and associated account balance.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Update loan balance and account balance
        repayment = serializer.instance
        repayment.loan.recalculate_balance()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        # Save repayment and update related loan
        repayment = serializer.save()
        repayment.loan.recalculate_balance()
