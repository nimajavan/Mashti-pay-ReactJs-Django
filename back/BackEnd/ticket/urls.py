from django.urls import path
from . import views
app_name = "ticket"

urlpatterns = [
    path('get_ticket/', views.get_ticket)
]
