from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    UserDetailView,
    IngredientViewSet,
    MenuItemViewSet,
)

router = DefaultRouter()
router.register(r'ingredients', IngredientViewSet, basename='ingredient')
router.register(r'menu-items',  MenuItemViewSet,  basename='menuitem')

urlpatterns = [
    # Auth
    path('login/',         CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(),          name='token_refresh'),
    path('register/',      RegisterView.as_view(),              name='user_register'),
    path('me/',            UserDetailView.as_view(),            name='user_detail'),

    # CRUD endpoints
    path('', include(router.urls)),
]
