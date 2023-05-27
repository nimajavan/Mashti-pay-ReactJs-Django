from django.urls import path
from . import views
app_name = 'order'

urlpatterns = [
    path('get_dollar_price/', views.get_dollar_price, name='get_dollar_price'),
    path('buy_order/', views.BuyOrderView.as_view()),
    path('sell_order/', views.SellOrderView.as_view()),
    path('create_payment/', views.create_payment_url),
    path('callback_payment/', views.payment_return),
    path('show_cart/', views.show_cart)
]