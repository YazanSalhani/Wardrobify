from django.contrib import admin
from .models import Hat, LocationVO

# Register your models here.

@admin.register(LocationVO)
class locationVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Hat)
class HatAdmin(admin.ModelAdmin):
    list_display = [
        "fabric",
        "style",
        "color",
        "picture_url",
        "location",
    ]
