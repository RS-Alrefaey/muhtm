from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


class User(AbstractUser):
    phone_number = PhoneNumberField(blank=True)

    def __str__(self):
        return self.username

class ContactTicket(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    msg_content = models.TextField()

    def __str__(self):
        return self.name