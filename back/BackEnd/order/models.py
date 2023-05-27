from django.db import models
from account.models import User


class ConditionChoices(models.TextChoices):
    accept = 'accept'
    reject = 'reject'
    pending = 'pending'
    created = 'created'


class BuyOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dollar_price = models.IntegerField()
    quantity = models.IntegerField()
    paid = models.BooleanField(default=False)
    tracking_code = models.CharField(max_length=200, null=True, blank=True)
    condition = models.CharField(max_length=255, choices=ConditionChoices.choices, default=ConditionChoices.created)
    date_stamp = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return str(self.user.phone)

    @property
    def total_price(self):

        price = self.dollar_price * self.quantity
        return price


class SellOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    paid = models.BooleanField(default=False)
    voucher_code = models.CharField(max_length=60)
    activate_code = models.CharField(max_length=60)
    condition = models.CharField(max_length=255, choices=ConditionChoices.choices, default=ConditionChoices.created)
    date_stamp = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return str(self.user.phone)


class DollarPrice(models.Model):
    price = models.IntegerField()

    def __str__(self):
        return str(self.price)


class PaymentHistory(models.Model):
    order_id = models.TextField()
    payment_id = models.TextField()
    amount = models.BigIntegerField()
    date = models.TextField(default='-')
    card_number = models.TextField(default="****")
    idpay_track_id = models.BigIntegerField(default=0000)
    bank_track_id = models.TextField(default=0000)

    status = models.BigIntegerField(default=0)

    def __str__(self):
        return str(self.pk) + "  |  " + self.order_id + "  |  " + str(self.status)

    class Meta:
        verbose_name = 'تاریخچه پرداخت ها'
        verbose_name_plural = 'تاریخچه پرداخت ها'