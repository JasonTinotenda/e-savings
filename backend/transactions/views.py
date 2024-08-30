from rest_framework.views import APIView
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import Transaction
from .serializers import TransactionSerializer
from core.views import StandardizedResponseMixin



class TransactionApiView(StandardizedResponseMixin, APIView):

    @extend_schema(
        responses={200: TransactionSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        objects = Transaction.objects.all()
        serializer = TransactionSerializer(objects, many=True)
        return self.success_response(serializer.data)

    @extend_schema(request=TransactionSerializer, responses={201: TransactionSerializer})
    def post(self, request, *args, **kwargs):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return self.success_response(serializer.data, status_code=status.HTTP_201_CREATED)
        return self.error_response(serializer.errors)

class TransactionDetailApiView(StandardizedResponseMixin, APIView):
    
    def get_object(self, pk):
        try:
            return Transaction.objects.get(pk=pk)
        except Transaction.DoesNotExist:
            return None
    
    @extend_schema(
        responses={200: TransactionSerializer},
    )
    def get(self, request, pk, *args, **kwargs):
        transaction = self.get_object(pk)
        if transaction is None:
            return self.error_response("Transaction not found", status_code=status.HTTP_404_NOT_FOUND)
        serializer = TransactionSerializer(transaction)
        return self.success_response(serializer.data)

    @extend_schema(request=TransactionSerializer, responses={200: TransactionSerializer})
    def put(self, request, pk, *args, **kwargs):
        transaction = self.get_object(pk)
        if transaction is None:
            return self.error_response("Transaction not found", status_code=status.HTTP_404_NOT_FOUND)
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return self.success_response(serializer.data)
        return self.error_response(serializer.errors)

    @extend_schema(responses={204: None})
    def delete(self, request, pk, *args, **kwargs):
        transaction = self.get_object(pk)
        if transaction is None:
            return self.error_response("Transaction not found", status_code=status.HTTP_404_NOT_FOUND)
        transaction.delete()
        return self.success_response(None, status_code=status.HTTP_204_NO_CONTENT)

class TransactionDetailApiView(StandardizedResponseMixin, APIView):
    
    def get_object(self, pk):
        try:
            return Transaction.objects.get(pk=pk)
        except Transaction.DoesNotExist:
            return None
    
    @extend_schema(
        responses={200: TransactionSerializer},
    )
    def get(self, request, pk, *args, **kwargs):
        transaction = self.get_object(pk)
        if transaction is None:
            return self.error_response("Transaction not found", status_code=status.HTTP_404_NOT_FOUND)
        serializer = TransactionSerializer(transaction)
        return self.success_response(serializer.data)

    @extend_schema(request=TransactionSerializer, responses={200: TransactionSerializer})
    def put(self, request, pk, *args, **kwargs):
        transaction = self.get_object(pk)
        if transaction is None:
            return self.error_response("Transaction not found", status_code=status.HTTP_404_NOT_FOUND)
        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return self.success_response(serializer.data)
        return self.error_response(serializer.errors)

    @extend_schema(responses={204: None})
    def delete(self, request, pk, *args, **kwargs):
        transaction = self.get_object(pk)
        if transaction is None:
            return self.error_response("Transaction not found", status_code=status.HTTP_404_NOT_FOUND)
        transaction.delete()
        return self.success_response(None, status_code=status.HTTP_204_NO_CONTENT)
