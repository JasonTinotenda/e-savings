from rest_framework.response import Response
from rest_framework import status


class StandardizedResponseMixin:
    def success_response(self, data, status_code=status.HTTP_200_OK):
        output = {
            "status": "success",
            "data": data
        }
        return Response(output, status=status_code)

    def error_response(self, errors, status_code=status.HTTP_400_BAD_REQUEST):
        output = {
            "status": "error",
            "data": errors
        }
        return Response(output, status=status_code)
