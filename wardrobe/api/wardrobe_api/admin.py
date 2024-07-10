from django.contrib import admin
from .models import Location
# Register your models here.
@admin.register(Location)
class LocationsAdmin(admin.ModelAdmin):
    list_display = [
        "closet_name",
        "id",
    ]
