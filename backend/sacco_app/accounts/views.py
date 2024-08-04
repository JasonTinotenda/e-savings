from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, viewsets, status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Group
from .models import UserAccount
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from .serializers import UserSerializer, CustomTokenObtainPairSerializer, UserCreateSerializer, GroupSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list']:
            self.permission_classes = [permissions.IsAdminUser]
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserRegistrationView(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
    # Check if the username exists before creating
    #            username = request.data.get('username')
    #            if UserAccount.objects.filter(username=username).exists():
    #                return Response({'username_exists': True}, status=status.HTTP_400_BAD_REQUEST) """

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def check_username_exists(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Bad_request'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            UserAccount.objects.get(email=email)
            return Response({'email_exists': True}, status=status.HTTP_200_OK)
        except UserAccount.DoesNotExist:
            return Response({'email_exists': False}, status=status.HTTP_404_NOT_FOUND)
        
class CustomTokenObtainPairView(TokenObtainPairView):
    UserSerializer = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            user = UserAccount.objects.get(username=request.data.get('username'))
            if not user.is_active:
                return Response({'detail': 'Account not activated'}, status=status.HTTP_401_UNAUTHORIZED)
            if user.is_deactivated:
                return Response({'detail': 'Account deactivated'}, status=status.HTTP_401_UNAUTHORIZED)
        except UserAccount.DoesNotExist:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().post(request, *args, **kwargs)
    