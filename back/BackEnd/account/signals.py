from django.db.models.signals import post_save
from .models import User, Profile
from django.dispatch import receiver


@receiver(post_save, sender=User)
def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = Profile(user=kwargs['instance'])
        user_profile.save()
