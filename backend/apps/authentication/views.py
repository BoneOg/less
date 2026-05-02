from rest_framework import status, generics, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
    IngredientSerializer,
    MenuItemSerializer,
)
from .models import Ingredient, MenuItem

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class IngredientViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for Ingredient.
    GET/retrieve  → open (no token needed)
    POST/PUT/PATCH/DELETE → requires Authorization: Bearer <token>
    """
    queryset = Ingredient.objects.all().order_by('-created_at')
    serializer_class = IngredientSerializer

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsAuthenticated()]


class MenuItemViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for MenuItem.
    GET/retrieve  → open (no token needed)
    POST/PUT/PATCH/DELETE → requires Authorization: Bearer <token>
    """
    queryset = MenuItem.objects.all().order_by('-created_at')
    serializer_class = MenuItemSerializer

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsAuthenticated()]
