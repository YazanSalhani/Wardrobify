# Wardrobify

Team:

* Yazan Salhani - Hats microservice
* Miranda Pedersen- Shoes Microservice

## Design
![An excalidraw gragh to show the architecture of the project](image.png)


## Shoes microservice

In the shoes microservice I have two models. The BinVO model as well as a Shoes model. The BinVO model is used to hold the specific ids of the bins that are there. Those bin ids are given in the Shoes model through my BinVO. The shoes model also presents the name of the manufacturer, the model name, color and a picture url. In my shoes microservice I have a poller that checks for new bins and hands that information to my BinVO model.


## Hats microservice

Explain your models and integration with the wardrobe
microservice, here.
