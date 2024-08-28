from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from accounts.models import Transaction
from .models import LoanType, Loan, LoanRepayment, AuditLog
from .serializers import LoanTypeSerializer, LoanSerializer, LoanRepaymentSerializer, AuditLogSerializer
from django.contrib.auth.models import User
from .permissions import IsOwnerOrReadOnly

class LoanTypeViewSet(viewsets.ModelViewSet):
    queryset = LoanType.objects.all()
    serializer_class = LoanTypeSerializer
    permission_classes = [permissions.IsAuthenticated]


class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all().order_by('-created_at')
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        print("we are here")
        
        loan = serializer.save(account=self.request.user.account)  # Assuming account is linked to the user
        if loan.status == 'approved':
            self.create_transaction(loan)
        self.create_audit_log(self.request.user, 'create', loan)

    def perform_update(self, serializer):
        loan = serializer.save()
        self.create_audit_log(self.request.user, 'update', loan)

    def perform_destroy(self, instance):
        self.create_audit_log(self.request.user, 'delete', instance)
        instance.delete()

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        loan = self.get_object()
        if loan.status in ['approved', 'denied']:
            return Response({'status': 'loan already processed'}, status=status.HTTP_400_BAD_REQUEST)

        loan.status = 'approved'
        loan.save()
        self.create_audit_log(request.user, 'approve', loan)
        self.create_transaction(loan)
        return Response({'status': 'loan approved'})

    @action(detail=True, methods=['post'])
    def deny(self, request, pk=None):
        loan = self.get_object()
        if loan.status in ['approved', 'denied']:
            return Response({'status': 'loan already processed'}, status=status.HTTP_400_BAD_REQUEST)

        loan.status = 'denied'
        loan.save()
        self.create_audit_log(request.user, 'deny', loan)
        return Response({'status': 'loan denied'})

    def create_transaction(self, loan):
        Transaction.objects.create(
            account=loan.account,
            amount=loan.amount,
            transaction_type='deposit'
        )

    def create_audit_log(self, user, action, instance):
        AuditLog.objects.create(
            user=user,
            action=action,
            model_name=instance.__class__.__name__,
            model_id=instance.id
        )
class LoanRepaymentViewSet(viewsets.ModelViewSet):
    queryset = LoanRepayment.objects.all()
    serializer_class = LoanRepaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        repayment = serializer.save()
        self.create_audit_log(self.request.user, 'create', repayment)

    def create_audit_log(self, user, action, instance):
        AuditLog.objects.create(
            user=user,
            action=action,
            model_name=instance.__class__.__name__,
            model_id=instance.id
        )

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAdminUser]
