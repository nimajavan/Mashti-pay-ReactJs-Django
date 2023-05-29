from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from random import randint
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from .tasks import send_sms_task
from rest_framework import status
from .serializers import *
from django.utils import timezone
from datetime import timedelta, datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated


@api_view(http_method_names=['POST'])
def send_sms(request):
    data = request.data
    phone = f'0{data["phone"]}'
    code = 1000
    request.session['phone'] = phone
    request.session['code'] = urlsafe_base64_encode(force_bytes(code))
    time_counter = time_checker(request=request, time_stamp=timezone.now())
    try:
        if time_counter:
            # send_sms_task.delay(phone, code)
            return Response('کد تایید با موفقیت ارسال شد', status=status.HTTP_200_OK)
        else:
            return Response('لطفا تا پایان 120 ثانیه صبر کنید', status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response('مشکلی پیش آمده لطفا دوباره تلاش کنید', status=status.HTTP_400_BAD_REQUEST)


@api_view(http_method_names=['POST'])
def register_user(request):
    data = request.data
    phone = data['phone']
    print(request.session.get('code'), phone)
    code = force_str(urlsafe_base64_decode(request.session.get('code')))
    serializer = RegisterUserSerializer(data={'phone': phone}, many=False)
    if serializer.is_valid() and code == data['code']:
        user = User.objects.create(phone=phone, password=make_password(data['password']))
        user.is_active = True
        user.save()
        # del request.session['old_time']
        return Response('ثبت نام با موفقیت انجام شد', status=status.HTTP_200_OK)
    elif serializer.is_valid() and code != data['code']:
        return Response('کد تایید نادرست است', status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors)


def time_checker(request, time_stamp):
    return True
    # if request.session.get('old_time') is None:
    #     request.session['old_time'] = str(time_stamp)
    #     return True
    # else:
    #     now_time = datetime.strptime(str(time_stamp).split(".")[0], '%Y-%m-%d %H:%M:%S')
    #     old_time = datetime.strptime(str(request.session.get('old_time')).split(".")[0], '%Y-%m-%d %H:%M:%S')
    #     code_time = now_time - old_time
    #     if code_time >= timedelta(minutes=2):
    #         request.session['old_time'] = str(time_stamp)
    #         return True
    #     else:
    #         return False


class MyCreatorTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyCreatorTokenView(TokenObtainPairView):
    serializer_class = MyCreatorTokenSerializer


class ProfileSetup(APIView):
    allowed_methods = ['POST', 'PUT', 'GET']
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProfileUpdateSerializer(
            data=request.data, instance=request.user.profile, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        profile = Profile.objects.get(user_id=request.user.id)
        serializer = ProfileGetSerializer(profile, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
