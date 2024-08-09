from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoanApplicationViewSet

router = DefaultRouter()
router.register(r'loans', LoanApplicationViewSet, basename='loans')

urlpatterns = [
    path('applications/', include(router.urls)),
]
