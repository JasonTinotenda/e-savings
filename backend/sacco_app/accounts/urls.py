from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import UserProfileView, UserRegistrationView, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'register', UserRegistrationView, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('check-username/', UserRegistrationView.as_view({'post': 'check_username_exists'}), name='check-email-exists'),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
]
