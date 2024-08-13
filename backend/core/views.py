from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Core
from .serializers import CoreSerializer


class CoreApiView(APIView):

    # permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        cores = Core.objects.all()
        serializer = CoreSerializer(cores, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        serializer = CoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
