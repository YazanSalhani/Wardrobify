from django.contrib import admin
from .models import Location
from .models import Bin
# Register your models here.
@admin.register(Location)
class LocationsAdmin(admin.ModelAdmin):
    list_display = [
        "closet_name",
        "id",
    ]

@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
    list_display = [
        "closet_name",
        "bin_number",
        "bin_size",
    ]
