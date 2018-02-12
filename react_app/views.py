import os

from django.shortcuts import render
from django.views.generic import TemplateView

class Home(TemplateView):
    template_name = os.path.join("react_app", "home.html")
