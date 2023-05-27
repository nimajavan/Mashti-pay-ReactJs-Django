from rest_framework import serializers
from .models import *


class BuyOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyOrder
        fields = '__all__'


class DollarPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DollarPrice
        fields = ['price']


class SellOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellOrder
        fields = '__all__'
