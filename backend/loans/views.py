from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import LoanType, Loan, LoanRepayment, AuditLog
from .serializers import LoanTypeSerializer, LoanSerializer, LoanRepaymentSerializer, AuditLogSerializer
from django.contrib.auth.models import User
from .permissions import IsOwnerOrReadOnly

class LoanTypeViewSet(viewsets.ModelViewSet):
    queryset = LoanType.objects.all()
    serializer_class = LoanTypeSerializer
    permission_classes = [permissions.IsAuthenticated]

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        loan = serializer.save(person=self.request.user.person)
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
        loan.status = 'approved'
        loan.save()
        return Response({'status': 'loan approved'})

    @action(detail=True, methods=['post'])
    def deny(self, request, pk=None):
        loan = self.get_object()
        loan.status = 'denied'
        loan.save()
        return Response({'status': 'loan denied'})

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
