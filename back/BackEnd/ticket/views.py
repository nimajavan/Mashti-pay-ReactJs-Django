import time

from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import GetTicketSerializer
from rest_framework import status
from django.http import JsonResponse

@permission_classes([IsAuthenticated])
@api_view(http_method_names=['GET'])
def get_ticket(request):
    tickets = Ticket.objects.filter(user_id=request.user.id)
    serializer = GetTicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(http_method_names=['POST'])
def ticket_form_view(request):
    time.sleep(4)
    try:
        data = request.data
        ticket = Ticket.objects.create(user_id=request.user.id, title=data['title'], body=data['body'])
        ticket.save()
        return Response({'status': 'ok'}, status=status.HTTP_201_CREATED)
    except:
        return Response({'status': 'failed'}, status=status.HTTP_400_BAD_REQUEST)
