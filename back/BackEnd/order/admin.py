from django.contrib import admin
from .models import *


class BuyOrderAdmin(admin.ModelAdmin):
    list_display = ['id']


admin.site.register(BuyOrder, BuyOrderAdmin)
admin.site.register(DollarPrice)
admin.site.register(SellOrder)
admin.site.register(PaymentHistory)
# Register your models here.
