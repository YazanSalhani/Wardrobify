from django.contrib import admin
from .models import Shoes

# Register your models here.
@admin.register(Shoes)
class ShoesAdmin(admin.ModelAdmin):
    list_display = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin",
    ]
