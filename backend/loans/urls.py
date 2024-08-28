from rest_framework.routers import DefaultRouter
from .views import LoanTypeViewSet, LoanViewSet, LoanRepaymentViewSet, AuditLogViewSet

router = DefaultRouter()
router.register(r'loan-types', LoanTypeViewSet, basename='loan-type')
router.register(r'loans', LoanViewSet, basename='loan')
router.register(r'loan-repayments', LoanRepaymentViewSet, basename='loan-repayment')
router.register(r'audit-logs', AuditLogViewSet, basename='audit-log')

urlpatterns = [
    # Other URL patterns
] + router.urls
