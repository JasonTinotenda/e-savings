
from django.urls import path
from .views import CoreApiView

urlpatterns = [
    path('core', CoreApiView.as_view()),
]