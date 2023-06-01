from django.db import models
from account.models import User


class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.title)


class ReplyTicket(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='reply_ticket')
    reply_body = models.TextField()
    reply_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.ticket.title)
