from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Ingredient, MenuItem

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['email', 'first_name', 'last_name', 'is_staff']
    ordering = ['email']

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password'),
        }),
    )
    search_fields = ['email', 'first_name', 'last_name']

admin.site.register(User, CustomUserAdmin)


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display  = ['name', 'category', 'unit', 'cost_per_unit', 'stock_quantity', 'supplier', 'is_active']
    list_filter   = ['category', 'is_active']
    search_fields = ['name', 'supplier']


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display  = ['name', 'selling_price', 'target_margin_percent', 'is_active']
    list_filter   = ['is_active']
    search_fields = ['name']
