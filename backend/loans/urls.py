from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LoanTypeViewSet, 
    LoanViewSet, 
    LoanApplicationViewSet, 
    LoanApplicationApproveView, 
    LoanApplicationDenyView
)

router = DefaultRouter()
router.register(r'loan-types', LoanTypeViewSet, basename='loan-type')
router.register(r'loans', LoanViewSet, basename='loan')
router.register(r'loan-applications', LoanApplicationViewSet, basename='loan-application')

urlpatterns = [
    path('', include(router.urls)),
    path('loan-application/<int:pk>/approve/', LoanApplicationApproveView.as_view(), name='loan-application-approve'),
    path('loan-application/<int:pk>/deny/', LoanApplicationDenyView.as_view(), name='loan-application-deny'),
]
