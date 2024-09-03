from django.urls import path
from .views import ReportView, AccountReportView, LoanReportView, TransactionReportView, DetailedAccountReportView, DetailedLoanReportView

app_name = 'reports'

urlpatterns = [
    path('', ReportView.as_view(), name='report_list'),
    path('account/', AccountReportView.as_view(), name='account_report'),
    path('loan/', LoanReportView.as_view(), name='loan_report'),
    path('transaction/', TransactionReportView.as_view(), name='transaction_report'),
    path('account/<int:pk>/', DetailedAccountReportView.as_view(), name='detailed_account_report'),
    path('loan/<int:pk>/', DetailedLoanReportView.as_view(), name='detailed_loan_report'),
]
