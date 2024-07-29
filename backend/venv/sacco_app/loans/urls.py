from django.urls import path
from loans.views import loan_application, loan_approval, loan_repayment, loan_tracking

app_name = 'loans'

urlpatterns = [
    path('application/', loan_application, name='loan_application'),
    path('approval/<int:loan_id>/', loan_approval, name='loan_approval'),
    path('repayment/<int:loan_id>/', loan_repayment, name='loan_repayment'),
       path('tracking/', loan_tracking, name='loan_tracking'),
   ]