from rest_framework import generics, permissions
from .models import Report
from .serializers import ReportSerializer

class ReportListCreateView(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        report_type = self.kwargs['report_type']
        return Report.objects.filter(report_type=report_type)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Separate view classes for each report type for ease of use
class MonthlyReportListCreateView(ReportListCreateView):
    def get_queryset(self):
        return super().get_queryset().filter(report_type='Monthly')

class QuarterlyReportListCreateView(ReportListCreateView):
    def get_queryset(self):
        return super().get_queryset().filter(report_type='Quarterly')

class AnnualReportListCreateView(ReportListCreateView):
    def get_queryset(self):
        return super().get_queryset().filter(report_type='Annual')
