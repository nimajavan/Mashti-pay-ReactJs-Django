from django.urls import path
from . import views
app_name = 'order'

urlpatterns = [
    path('get_dollar_price/', views.get_dollar_price, name='get_dollar_price'),
    path('buy_order/', views.BuyOrderView.as_view()),
    path('sell_order/', views.SellOrderView.as_view()),
    path('create_payment/<int:id>/', views.create_test_payment),
    path('create_test_payment/<int:id>/', views.create_test_payment),
    path('callback_payment/', views.payment_return),
    path('show_cart/', views.show_cart),
    path('remove_cart/', views.remove_cart),
    path('remove_all_cart/', views.remove_all_cart)
]