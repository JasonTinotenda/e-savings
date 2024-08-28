from rest_framework import viewsets, mixins
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import LoanType, Loan, LoanRepayment, AuditLog
from .serializers import LoanTypeSerializer, LoanSerializer, LoanRepaymentSerializer, AuditLogSerializer
from core.views import StandardizedResponseMixin

class LoanTypeViewSet(StandardizedResponseMixin, viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = LoanType.objects.all()
    serializer_class = LoanTypeSerializer

    @extend_schema(
        responses={200: LoanTypeSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @extend_schema(request=LoanTypeSerializer)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class LoanViewSet(StandardizedResponseMixin, viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

    @extend_schema(
        responses={200: LoanSerializer(many=True)},
        parameters=[
            # Add query parameters if needed
        ],
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @extend_schema(request=LoanSerializer)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class LoanRepaymentViewSet(StandardizedResponseMixin, viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = LoanRepayment.objects.all()
    serializer_class = LoanRepaymentSerializer

    @extend_schema(
        responses={200: LoanRepaymentSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @extend_schema(request=LoanRepaymentSerializer)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class AuditLogViewSet(StandardizedResponseMixin, viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer

    @extend_schema(
        responses={200: AuditLogSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
