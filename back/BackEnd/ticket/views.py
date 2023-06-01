from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import GetTicketSerializer
from rest_framework import status


@permission_classes([IsAuthenticated])
@api_view(http_method_names=['GET'])
def get_ticket(request):
    tickets = Ticket.objects.filter(user_id=request.user.id)
    serializer = GetTicketSerializer(tickets, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
