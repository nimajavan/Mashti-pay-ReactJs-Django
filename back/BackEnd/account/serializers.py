from rest_framework import serializers
from .models import User, Profile
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterUserSerializer(serializers.Serializer):
    phone = serializers.IntegerField(required=True)

    def validate(self, attrs):
        if User.objects.filter(phone=attrs['phone']):
            raise serializers.ValidationError({'error': 'این شماره همراه قبلا ثبت شده است!'})
        else:
            return attrs


class UserSerializerWithToken(serializers.ModelSerializer):
    id = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'phone', 'token']

    def get_id(self, obj):
        return obj.id

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ProfileGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'name',
            'last_name',
            'bank_card_num',
            'bank_shaba_num',
            'avatar',
            'selfi_image',
            'vip_user',
            'email',
            'selfi_image_status'
        ]


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'name',
            'last_name',
            'bank_card_num',
            'bank_shaba_num',
            'avatar',
            'email',
            'selfi_image',
        ]
