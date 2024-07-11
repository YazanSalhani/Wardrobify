from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Shoes, BinVO
from django.http import JsonResponse
import json
from common.json import ModelEncoder

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["import_href"]


class ShoeListEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin",
        "id",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


class ShoeDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin",
    ]
    encoders = {
        "bin": BinVODetailEncoder(),
    }


# Create your views here.
@require_http_methods(["GET", "POST"])
def shoe_list(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoes.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Bin Id"},
                status=400
            )
        shoes = Shoes.objects.create(**content)
        return JsonResponse(
            shoes,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def shoe_details(request, id):
    if request.method == "GET":
        try:
            shoes = Shoes.objects.get(id=id)
            return JsonResponse(
                shoes,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoes.DoesNotExist:
            return JsonResponse (
                {"message": "Shoe does not exist"},
                status=400,
            )
    else:
        try:
            shoes = Shoes.objects.filter(id=id).delete()
            return JsonResponse(
                shoes,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoes.DoesNotExist:
            return JsonResponse(
                {"message": "Shoe does not exist"},
                status=400,
            )
        
