from django.urls import path
from .views import shoe_list, shoe_details

urlpatterns = [
    path("shoes/", shoe_list, name="shoe_list"),
    path("shoes/<int:id>/", shoe_details, name="shoe_details"),
]
