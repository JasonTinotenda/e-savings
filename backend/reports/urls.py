from django.urls import path
from .views import ReportView, AccountReportView, LoanReportView, TransactionReportView, DetailedAccountReportView, DetailedLoanReportView

urlpatterns = [
    path('', ReportView.as_view(), name='report-home'),
    path('accounts-reports/', AccountReportView.as_view(), name='account-report'),
    path('loans-reports/', LoanReportView.as_view(), name='loan-report'),
    path('transactions=reports/', TransactionReportView.as_view(), name='transaction-report'),
    path('accounts-reports/<int:pk>/', DetailedAccountReportView.as_view(), name='detailed-account-report'),
    path('loans-reports/<int:pk>/', DetailedLoanReportView.as_view(), name='detailed-loan-report'),
]
