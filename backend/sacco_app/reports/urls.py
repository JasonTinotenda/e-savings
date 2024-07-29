from django.urls import path
from reports.views import monthly_report, quarterly_report, annual_report

app_name = 'reports'

urlpatterns = [
    path('monthly/', monthly_report, name='monthly_report'),
    path('quarterly/', quarterly_report, name='quarterly_report'),
    path('annual/', annual_report, name='annual_report'),
]