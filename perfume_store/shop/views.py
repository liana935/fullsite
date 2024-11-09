from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from .models import Product, Cart, Order
from .serializers import ProductSerializer, CartSerializer, OrderSerializer

class ProductListAPIView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

class ProductDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product)
            return JsonResponse(serializer.data, safe=False)
        except Product.DoesNotExist:
            return JsonResponse({"error": "Product not found"}, status=404)

    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, safe=False)
            return JsonResponse(serializer.errors, status=400)
        except Product.DoesNotExist:
            return JsonResponse({"error": "Product not found"}, status=404)

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            product.delete()
            return JsonResponse({"message": "Product deleted"}, status=204)
        except Product.DoesNotExist:
            return JsonResponse({"error": "Product not found"}, status=404)

class CartListAPIView(APIView):
    def get(self, request):
        carts = Cart.objects.all()
        serializer = CartSerializer(carts, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

class CartDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            cart = Cart.objects.get(pk=pk)
            serializer = CartSerializer(cart)
            return JsonResponse(serializer.data, safe=False)
        except Cart.DoesNotExist:
            return JsonResponse({"error": "Cart not found"}, status=404)

    def put(self, request, pk):
        try:
            cart = Cart.objects.get(pk=pk)
            serializer = CartSerializer(cart, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, safe=False)
            return JsonResponse(serializer.errors, status=400)
        except Cart.DoesNotExist:
            return JsonResponse({"error": "Cart not found"}, status=404)

    def delete(self, request, pk):
        try:
            cart = Cart.objects.get(pk=pk)
            cart.delete()
            return JsonResponse({"message": "Cart deleted"}, status=204)
        except Cart.DoesNotExist:
            return JsonResponse({"error": "Cart not found"}, status=404)

class OrderListAPIView(APIView):
    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

class OrderDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
            serializer = OrderSerializer(order)
            return JsonResponse(serializer.data, safe=False)
        except Order.DoesNotExist:
            return JsonResponse({"error": "Order not found"}, status=404)

    def put(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
            serializer = OrderSerializer(order, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, safe=False)
            return JsonResponse(serializer.errors, status=400)
        except Order.DoesNotExist:
            return JsonResponse({"error": "Order not found"}, status=404)

    def delete(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
            order.delete()
            return JsonResponse({"message": "Order deleted"}, status=204)
        except Order.DoesNotExist:
            return JsonResponse({"error": "Order not found"}, status=404)
def cart_view(request):
    return render(request, 'korzina.html')

def main_view(request):
    products = [
       
    ]
    return render(request, 'main.html', {'products': products})