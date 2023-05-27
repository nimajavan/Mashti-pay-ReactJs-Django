from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, phone, password=None):
        if not phone:
            raise ValueError('شماره همراه الزامی است')
        user = self.model(phone=phone)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, password=None):
        user = self.create_user(phone, password)
        user.is_active = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    phone = models.IntegerField(unique=True)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'phone'

    objects = UserManager()

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

    def __str__(self):
        return str(self.phone)


class UserSelfiStatus(models.TextChoices):
    To_Do = 'to do'
    In_Progress = 'in progress'
    Failed = 'failed'
    Done = 'done'


class Profile(models.Model):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.selfi_image and self.selfi_image_status == 'to do':
            self.selfi_image_status = UserSelfiStatus.In_Progress
        elif not self.selfi_image:
            self.selfi_image_status = UserSelfiStatus.To_Do

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    bank_card_num = models.IntegerField(null=True, blank=True)
    bank_shaba_num = models.IntegerField(null=True, blank=True)
    avatar = models.ImageField(upload_to='profile/avatar/', default='profile/avatar/avatar.png')
    selfi_image = models.ImageField(upload_to='profile/selfi_image/', null=True, blank=True)
    vip_user = models.BooleanField(default=False)
    selfi_image_status = models.CharField(max_length=50, choices=UserSelfiStatus.choices, default=UserSelfiStatus.To_Do)

    def __str__(self):
        return str(self.user.phone)
