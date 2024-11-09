from django.urls import path
from .views import ProductListAPIView, ProductDetailAPIView, CartListAPIView, CartDetailAPIView, OrderListAPIView, OrderDetailAPIView, cart_view, main_view, zakaz_view, yspex_view

urlpatterns = [
    path('api/products', ProductListAPIView.as_view(), name='product-list-create'),
    path('api/products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('api/carts', CartListAPIView.as_view(), name='cart-list-create'),
    path('api/cart/<int:pk>/', CartDetailAPIView.as_view(), name='cart-detail'),
    path('api/orders', OrderListAPIView.as_view(), name='order-list-create'),
    path('api/orders/<int:pk>/', OrderDetailAPIView.as_view(), name='order-detail'), 
    path('cart', cart_view, name='cart'),
    path('zakaz', zakaz_view, name='zakaz'),
    path('yspex', yspex_view, name='yspex'),
    path('', main_view, name='main'),
]
