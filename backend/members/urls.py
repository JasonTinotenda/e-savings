from django.urls import path
from members.views import RegisterMemberView, MemberProfileView



app_name = 'members'

urlpatterns = [
    path('register/', RegisterMemberView.as_view, name='RegisterMemberView'),
    path('profile/<int:member_id>/', MemberProfileView.as_view(), name='MemberProfileView')

]
