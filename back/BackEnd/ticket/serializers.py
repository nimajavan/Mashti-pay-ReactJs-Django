from .models import *
from rest_framework import serializers


class GetReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplyTicket
        fields = '__all__'


class GetTicketSerializer(serializers.ModelSerializer):
    reply_ticket = GetReplySerializer(many=True)

    class Meta:
        model = Ticket
        fields = '__all__'
        extra_field = ['reply_ticket']
