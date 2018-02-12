import os

from django.shortcuts import render, reverse
from django.views.generic import TemplateView
from django.http import HttpResponse, HttpResponseRedirect
import json 
import serial
config = {
    "conn": None,
    "port": "COM1"
}


class Home(TemplateView):
    template_name = os.path.join("svg_widgets", "home.html")
    

class Dial(TemplateView):
    template_name = os.path.join("svg_widgets", "dial.html")

def get_val(request):
    global config

    if not config["conn"]:
        return HttpResponse(json.dumps({"reading": -1}), content_type="application/json")
    
    data = {}
    reading = ""
    count = 0
    while count < 10:
       reading =  config["conn"].read(6)
       count += 1
    

    data["reading"] = 10 * (reading[reading.find("h"):reading.find("f")] / 1024)
    
    return HttpResponse(json.dumps(data), content_type="application/json")

def make_conn(request, port=1):
    global config
    config["conn"] = serial.Serial()
    config["port"] = "COM" + str(port)

    config["conn"].port = config["port"]
    config["conn"].baudrate = 9600
    try:
        config["conn"].open()
    except:
        config["conn"] = None

    return HttpResponseRedirect(reverse("widgets:dial"))