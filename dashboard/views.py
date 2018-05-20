# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, reverse
from django.http import HttpResponseRedirect, JsonResponse
import os
from django.views.generic import TemplateView, ListView, DetailView
from rest_framework import viewsets
from models import Dashboard
from serializers import DashboardSerializer
import json
from django.shortcuts import get_object_or_404

class DashboardDesigner(TemplateView):
    template_name = os.path.join("dashboard", "designer.html")


class DashboardList(ListView):
    template_name = os.path.join("dashboard", "list.html")
    model = Dashboard
    paginate_by=5

class DashboardAPIView(viewsets.ModelViewSet):
    serializer_class = DashboardSerializer
    queryset = Dashboard.objects.all()

class DashboardView(DetailView):
    template_name = os.path.join("dashboard", "dashboard.html")
    model = Dashboard

def load_dashboard_data(request, pk):
    dash = Dashboard.objects.get(pk=pk)
    fp = open("media/" + dash.config_file,'r')
    resp = json.load(fp)
    return JsonResponse(resp)

def delete_dashboard_data(request, pk):
    dash = Dashboard.objects.get(pk=pk)
    os.remove(os.path.join("media", dash.config_file))
    dash.delete()
    return HttpResponseRedirect(reverse("dashboard:list"))
    
def get_dashboard_data(request):
    dash_data = json.loads(request.POST["data"])
    print dash_data
    filename =  dash_data["name"] + "_config.json"
    with open("media/" + filename, 'w') as conf:
        json.dump(dash_data, conf)

    Dashboard(name=dash_data["name"],
                config_file=filename).save()

    return HttpResponseRedirect(reverse("dashboard:list"))