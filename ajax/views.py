from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect
import serial

conn = serial.Serial()

def get(request):
    global conn
    if not conn.is_open:
        return HttpResponse(-1)
    
    val = ""
    count = 0
    while not val.startswith("H"):
        conn.write("s")
        val = conn.read(3)
        count += 1
        if count > 10:
            return HttpResponse(-2)
    toInt= ord(val[1]) * 256 + ord(val[2])
    resp = (toInt / 1024.0) * 10
    return HttpResponse(resp)

def config(request):
    global conn
    port = request.POST.get("port-no")
    conn.port = "COM" + port
    conn.baudrate = 9600
    conn.open()
    return HttpResponseRedirect(reverse("widgets:home"))