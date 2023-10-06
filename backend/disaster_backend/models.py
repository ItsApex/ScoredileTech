from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Create your models here.
class CustomUser(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)  # You may want to hash the password before saving it
    mobile_no = models.CharField(max_length=15, blank=True, null=True)
    email = models.EmailField(max_length=254, unique=True, blank=True, null=True)
    
    # Add other fields as needed

    def __str__(self):
        return self.username