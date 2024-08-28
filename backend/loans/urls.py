from django.urls import path
from .views import (
    LoanViewSet,
    LoanTypeViewSet,
    LoanApprovalViewSet,
    LoanRepaymentViewSet
)

urlpatterns = [
    path('loans/', LoanViewSet.as_view({'get': 'list', 'post': 'create'}), name='loan-list'),
    path('loans/<int:pk>/', LoanViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='loan-detail'),

    path('loan-types/', LoanTypeViewSet.as_view({'get': 'list'}), name='loan-type-list'),
    
    path('loan-approvals/', LoanApprovalViewSet.as_view({'get': 'list', 'post': 'create'}), name='loan-approval-list'),
    path('loan-approvals/<int:pk>/', LoanApprovalViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='loan-approval-detail'),

    path('loan-repayments/', LoanRepaymentViewSet.as_view({'get': 'list', 'post': 'create'}), name='loan-repayment-list'),
    path('loan-repayments/<int:pk>/', LoanRepaymentViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='loan-repayment-detail'),
]
