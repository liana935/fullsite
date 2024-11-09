from django.db import models

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    photo_url = models.URLField()
    brand = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    group_name = models.CharField(max_length=255)
    notes = models.TextField()
    description = models.TextField()
    quantity = models.IntegerField()
    
class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

class Order(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    delivery_address = models.TextField()
    cart_items = models.JSONField(null=True)