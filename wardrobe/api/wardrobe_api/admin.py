from django.contrib import admin
from .models import Bin

# Register your models here.
@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
    list_display = [
        "closet_name",
        "bin_number",
        "bin_size",
    ]
