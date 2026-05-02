from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)

    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
        ('staff', 'Staff'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Ingredient(models.Model):
    """Tracks restaurant ingredients for cost monitoring and inventory."""

    CATEGORY_CHOICES = (
        ('meat', 'Meat & Poultry'),
        ('produce', 'Produce'),
        ('seafood', 'Seafood'),
        ('dairy', 'Dairy'),
        ('dry_goods', 'Dry Goods'),
        ('other', 'Other'),
    )

    name           = models.CharField(max_length=255)
    category       = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='other')
    unit           = models.CharField(max_length=50, help_text='e.g. kg, liter, piece')
    cost_per_unit  = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    supplier       = models.CharField(max_length=255, blank=True)
    is_active      = models.BooleanField(default=True)
    created_at     = models.DateTimeField(auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name} ({self.unit})'


class MenuItem(models.Model):
    """A dish on the restaurant menu with its selling price and target margin."""

    name                  = models.CharField(max_length=255)
    description           = models.TextField(blank=True)
    selling_price         = models.DecimalField(max_digits=10, decimal_places=2)
    target_margin_percent = models.DecimalField(max_digits=5, decimal_places=2, default=30.00)
    is_active             = models.BooleanField(default=True)
    created_at            = models.DateTimeField(auto_now_add=True)
    updated_at            = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
