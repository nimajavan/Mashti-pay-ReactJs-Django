from django.urls import path
from . import views

app_name = 'account'

urlpatterns = [
    path('send_sms/', views.send_sms),
    path('register_user/', views.register_user),
    path('login/', views.MyCreatorTokenView.as_view()),
    path('profile/', views.ProfileSetup.as_view())
]
