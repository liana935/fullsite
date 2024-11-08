from django.urls import path
from .views import ProductListAPIView, ProductDetailAPIView, CartListAPIView, CartDetailAPIView, OrderListAPIView, OrderDetailAPIView

urlpatterns = [
    # Продукты
    path('products', ProductListAPIView.as_view(), name='product-list-create'),
    path('products/<int:pk>', ProductDetailAPIView.as_view(), name='product-detail'),

    # Корзины
    path('carts', CartListAPIView.as_view(), name='cart-list-create'),
    path('carts/<int:pk>', CartDetailAPIView.as_view(), name='cart-detail'),

    # Заказы
    path('orders', OrderListAPIView.as_view(), name='order-list-create'),
    path('orders/<int:pk>', OrderDetailAPIView.as_view(), name='order-detail'),
]