from django.urls import path
from members.views import register_member, member_profile



app_name = 'members'

urlpatterns = [
    path('register/', register_member, name='register_member'),
    path('profile/<int:member_id>/', member_profile, name='member_profile'),
]
