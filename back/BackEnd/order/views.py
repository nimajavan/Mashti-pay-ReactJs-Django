import json
import time
from .cart import Cart
from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import APIView, api_view, permission_classes
from rest_framework import status
from .serializers import *
from .models import *
import requests as req


@permission_classes([IsAuthenticated])
@api_view(http_method_names=['GET'])
def show_cart(request):
    cart_obj = request.session.get('cart')
    return Response(cart_obj)


@permission_classes([IsAuthenticated])
@api_view(http_method_names=['POST'])
def remove_cart(request):
    data = request.data
    cart = Cart(request)
    cart.remove(data['id'])
    cart_obj = request.session.get("cart")
    return Response(cart_obj)


@permission_classes([IsAuthenticated])
@api_view(http_method_names=['GET'])
def remove_all_cart(request):
    cart = Cart(request)
    cart.remove_all()
    cart_obj = request.session.get("cart")
    return Response(cart_obj)


class BuyOrderView(APIView):
    allowed_methods = ['POST', 'GET']
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        dollar = DollarPrice.objects.get(id=1).price
        order = BuyOrder.objects.create(user_id=request.user.id, quantity=data['quantity'], dollar_price=dollar)
        order.save()
        cart = Cart(request)
        cart.add(order=order, quantity=data['quantity'])
        return Response(BuyOrderSerializer(order, many=False).data, status=status.HTTP_200_OK)

    def get(self, request):
        try:
            data = request.data
            if data['id']:
                order = BuyOrder.objects.get(id=id)
                return Response(BuyOrderSerializer(order, many=False).data, status=status.HTTP_200_OK)
        except:
            order = BuyOrder.objects.filter(user_id=request.user.id)
            return Response(BuyOrderSerializer(order, many=True).data, status=status.HTTP_200_OK)


class SellOrderView(APIView):
    allowed_methods = ['POST', 'GET']
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        order = SellOrder.objects.create(user_id=request.user.id, voucher_code=data['voucher_code'],
                                         activate_code=data['activate_code'])
        order.save()
        return Response(SellOrderSerializer(order, many=False).data, status=status.HTTP_200_OK)

    def get(self, reqeust):
        try:
            data = reqeust.data
            if data['id']:
                order = SellOrder.objects.get(id=data['id'])
                return Response(SellOrderSerializer(order, many=False).data, status=status.HTTP_200_OK)
        except:
            order = SellOrder.objects.filter(user_id=reqeust.user.id)
            return Response(SellOrderSerializer(order, many=True).data, status=status.HTTP_200_OK)


@api_view(http_method_names=['GET'])
def get_dollar_price(request):
    price = DollarPrice.objects.get(id=1)
    return Response(DollarPriceSerializer(price).data, status=status.HTTP_200_OK)


@api_view(http_method_names=['POST'])
def create_payment_url(request):
    try:

        data = request.data
        order = BuyOrder.objects.get(id=data['order_id'])
        user = User.objects.get(id=request.user.id)

        headers = {
            'Content-Type': settings.CONTEXNT_TYPE,
            'X-API-KEY': settings.X_API_KEY,
            'X-SANDBOX': settings.X_SANDBOX,
        }
        payload = {
            'order_id': order.id,
            'amount': order.total_price,
            'name': 'test',
            'phone': user.phone,
            'mail': 'test@gmail.com',
            'desc': 'test_desc',
            'callback': f'{settings.HOST_ADDRESS}/api/v1/callback_payment/'
        }

        record = PaymentHistory.objects.create(
            order_id=data['order_id'], amount=int(order.total_price)
        )
        r = req.post(
            'https://api.idpay.ir/v1.1/payment/inquiry',
            headers=headers, data=json.dumps(payload)
        )
        result = r.json()
        if 'id' in result:
            record.status = 1
            record.payment_id = result['id']
            record.save()
        return Response(r.json())
    except:
        return Response('متاسفانه مشکلی به وجود اومده', status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(http_method_names=['POST'])
def payment_return(request, result=None):
    pid = request.POST.get('id')
    status = request.POST.get('status')
    pidtrack = request.POST.get('track_id')
    order_id = request.POST.get('order_id')
    amount = request.POST.get('amount')
    card = request.POST.get('card_no')
    date = request.POST.get('date')

    if PaymentHistory.objects.filter(order_id=order_id, payment_id=pid, amount=amount, status=1).count() == 1:

        payment = PaymentHistory.objects.get(payment_id=pid, amount=amount)
        payment.status = status
        payment.date = str(date)
        payment.card_number = card
        payment.idpay_track_id = pidtrack
        payment.save()

        if str(status) == '10':
            headers = {
                'Content-Type': settings.CONTEXNT_TYPE,
                'X-API-KEY': settings.X_API_KEY,
                'X-SANDBOX': settings.X_SANDBOX,
            }
            payload = {
                'id': pid,
                'order_id': payment.order_id
            }

            r = req.post('https://api.idpay.ir/v1.1/payment/verify',
                         headers=headers, data=json.dumps(payload))
            result = r.json()

            if 'status' in result:

                payment.status = result['status']
                payment.bank_track_id = result['payment']['track_id']
                payment.save()
                order = BuyOrder.objects.get(id=order_id)
                if result['status'] == 100:
                    order.paid = True
                    order.save()
                return render(request, 'order/return_payment.html',
                              {'status': result['status'], 'bank_track_id': payment.bank_track_id})

            else:
                txt = result['status']

        else:
            txt = "Error Code : " + \
                  str(status) + "   |   " + "Description : " + \
                  result.get_status(status)

    else:
        txt = "Order Not Found"

    return render(request, 'order/return_payment.html', {'status': txt})
