from django.contrib import admin
from .models import *


class ReplyTicketInLineAdmin(admin.TabularInline):
    model = ReplyTicket


class TicketAdmin(admin.ModelAdmin):
    inlines = [
        ReplyTicketInLineAdmin
    ]


admin.site.register(Ticket, TicketAdmin)
