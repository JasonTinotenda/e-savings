from django.urls import path
from .views import (
    ReportListCreateView,
    MonthlyReportListCreateView,
    QuarterlyReportListCreateView,
    AnnualReportListCreateView
)

urlpatterns = [
    path('reports/<str:report_type>/', ReportListCreateView.as_view(), name='report-list-create'),
    path('reports/monthly/', MonthlyReportListCreateView.as_view(), name='monthly-report-list-create'),
    path('reports/quarterly/', QuarterlyReportListCreateView.as_view(), name='quarterly-report-list-create'),
    path('reports/annual/', AnnualReportListCreateView.as_view(), name='annual-report-list-create'),
]
