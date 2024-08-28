from rest_framework.views import APIView
from rest_framework import status
from drf_spectacular.utils import extend_schema
from core.views import StandardizedResponseMixin
from .models import Person, Account, Transaction
from .serializers import PersonSerializer, AccountSerializer, TransactionSerializer

class PersonApiView(StandardizedResponseMixin, APIView):
    
    @extend_schema(
        responses={200: PersonSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        objects = Person.objects.all()
        serializer = PersonSerializer(objects, many=True)
        return self.success_response(serializer.data)

    @extend_schema(request=PersonSerializer, responses={201: PersonSerializer})
    def post(self, request, *args, **kwargs):
        serializer = PersonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return self.success_response(serializer.data, status_code=status.HTTP_201_CREATED)
        return self.error_response(serializer.errors)

class PersonDetailApiView(StandardizedResponseMixin, APIView):
    
    def get_object(self, pk):
        try:
            return Person.objects.get(pk=pk)
        except Person.DoesNotExist:
            return None
    
    @extend_schema(
        responses={200: PersonSerializer},
    )
    def get(self, request, pk, *args, **kwargs):
        person = self.get_object(pk)
        if person is None:
            return self.error_response("Person not found", status_code=status.HTTP_404_NOT_FOUND)
        serializer = PersonSerializer(person)
        return self.success_response(serializer.data)

    @extend_schema(request=PersonSerializer, responses={200: PersonSerializer})
    def put(self, request, pk, *args, **kwargs):
        person = self.get_object(pk)
        if person is None:
            return self.error_response("Person not found", status_code=status.HTTP_404_NOT_FOUND)
        serializer = PersonSerializer(person, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return self.success_response(serializer.data)
        return self.error_response(serializer.errors)

    @extend_schema(responses={204: None})
    def delete(self, request, pk, *args, **kwargs):
        person = self.get_object(pk)
        if person is None:
            return self.error_response("Person not found", status_code=status.HTTP_404_NOT_FOUND)
        person.delete()
        return self.success_response(None, status_code=status.HTTP_204_NO_CONTENT)

class AccountApiView(StandardizedResponseMixin, APIView):

    @extend_schema(
        responses={200: AccountSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        objects = Account.objects.all()
        serializer = AccountSerializer(objects, many=True)
        return self.success_response(serializer.data)

    @extend_schema(request=AccountSerializer, responses={201: AccountSerializer})
    def post(self, request, *args, **kwargs):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return self.success_response(serializer.data, status_code=status.HTTP_201_CREATED)
        return self.error_response(serializer.errors)

class AccountDetailApiView(StandardizedResponseMixin, APIView):
    
    def get_object(self, pk):
        try:
            return Account.objects.get(pk=pk)
        except Account.DoesNotExist:
            return None
    
    @extend_schema(
        responses={200: AccountSerializer},
    )
    def get(self, request, pk, *args, **kwargs):
        account = self.get_object(pk)
        if account is None:
            return self.error_response("Account not found", status_code=status.HTTP_404_NOT_FOUND)
        serializer = AccountSerializer(account)
        return self.success_response(serializer.data)

    @extend_schema(request=AccountSerializer, responses={200: AccountSerializer})
    def put(self, request, pk, *args, **kwargs):
        account = self.get_object(pk)
        if account is None:
            return self.error_response("Account not found", status_code=status.HTTP_404_NOT_FOUND)
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return self.success_response(serializer.data)
        return self.error_response(serializer.errors)

    @extend_schema(responses={204: None})
    def delete(self, request, pk, *args, **kwargs):
        account = self.get_object(pk)
        if account is None:
            return self.error_response("Account not found", status_code=status.HTTP_404_NOT_FOUND)
        account.delete()
        return self.success_response(None, status_code=status.HTTP_204_NO_CONTENT)

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
