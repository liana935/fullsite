from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Product, Cart, Order

class ProductAPITests(APITestCase):
    def setUp(self):
        self.product_url = reverse('product-list-create')  # Используем правильное имя URL
        self.product = Product.objects.create(
            name='Test Product',
            photo_url='http://example.com/photo.jpg',
            brand='Test Brand',
            gender='Unisex',
            group_name='Fragrance',
            notes='Test notes',
            description='Test description',
            quantity=100
        )

    def test_get_products(self):
        response = self.client.get(self.product_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_product(self):
        data = {
            'name': 'New Product',
            'photo_url': 'http://example.com/new_photo.jpg',
            'brand': 'New Brand',
            'gender': 'Female',
            'group_name': 'Perfume',
            'notes': 'New notes',
            'description': 'New description',
            'quantity': 50
        }
        response = self.client.post(self.product_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 2)

    def test_get_product_detail(self):
        response = self.client.get(reverse('product-detail', args=[self.product.pk]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.product.name)

    def test_update_product(self):
        data = {
            'name': 'Updated Product',
            'photo_url': 'http://example.com/updated_photo.jpg',
            'brand': 'Updated Brand',
            'gender': 'Male',
            'group_name': 'Cologne',
            'notes': 'Updated notes',
            'description': 'Updated description',
            'quantity': 150
        }
        response = self.client.put(reverse('product-detail', args=[self.product.pk]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.product.refresh_from_db()
        self.assertEqual(self.product.name, 'Updated Product')

    def test_delete_product(self):
        response = self.client.delete(reverse('product-detail', args=[self.product.pk]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)


class CartAPITests(APITestCase):
    def setUp(self):
        self.cart_url = reverse('cart-list-create')  # Используем правильное имя URL
        self.product = Product.objects.create(
            name='Test Product',
            photo_url='http://example.com/photo.jpg',
            brand='Test Brand',
            gender='Unisex',
            group_name='Fragrance',
            notes='Test notes',
            description='Test description',
            quantity=100
        )
        self.cart = Cart.objects.create(product=self.product, quantity=2)

    def test_get_carts(self):
        response = self.client.get(self.cart_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_cart(self):
        data = {'product': self.product.pk, 'quantity': 3}
        response = self.client.post(self.cart_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cart.objects.count(), 2)

    def test_get_cart_detail(self):
        response = self.client.get(reverse('cart-detail', args=[self.cart.pk]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['quantity'], self.cart.quantity)

    def test_update_cart(self):
        data = {'product': self.product.pk, 'quantity': 5}
        response = self.client.put(reverse('cart-detail', args=[self.cart.pk]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.cart.refresh_from_db()
        self.assertEqual(self.cart.quantity, 5)

    def test_delete_cart(self):
        response = self.client.delete(reverse('cart-detail', args=[self.cart.pk]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Cart.objects.count(), 0)


class OrderAPITests (APITestCase):
    def setUp(self):
        self.order_url = reverse('order-list-create')  # Используем правильное имя URL

    def test_get_orders(self):
        response = self.client.get(self.order_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # Предполагаем, что заказов еще нет

    def test_create_order(self):
        data = {
            'name': 'Test User',
            'phone_number': '1234567890',
            'email': 'test@example.com',
            'delivery_address': '123 Test St, Test City'
        }
        response = self.client.post(self.order_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 1)

    def test_get_order_detail(self):
        order = Order.objects.create(
            name='Test User',
            phone_number='1234567890',
            email='test@example.com',
            delivery_address='123 Test St, Test City'
        )
        response = self.client.get(reverse('order-detail', args=[order.pk]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], order.name)

    def test_update_order(self):
        order = Order.objects.create(
            name='Test User',
            phone_number='1234567890',
            email='test@example.com',
            delivery_address='123 Test St, Test City'
        )
        data = {
            'name': 'Updated User',
            'phone_number': '0987654321',
            'email': 'updated@example.com',
            'delivery_address': '456 Updated St, Updated City'
        }
        response = self.client.put(reverse('order-detail', args=[order.pk]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        order.refresh_from_db()
        self.assertEqual(order.name, 'Updated User')

    def test_delete_order(self):
        order = Order.objects.create(
            name='Test User',
            phone_number='1234567890',
            email='test@example.com',
            delivery_address='123 Test St, Test City'
        )
        response = self.client.delete(reverse('order-detail', args=[order.pk]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Order.objects.count(), 0)