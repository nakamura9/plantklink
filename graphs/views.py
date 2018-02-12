import os 

from django.shortcuts import render
from django.views.generic import TemplateView


class Home(TemplateView):
    template_name = os.path.join("graphs", "home.html")

class Bar(TemplateView):
    template_name = os.path.join("graphs", "bar.html")

class Line(TemplateView):
    template_name = os.path.join("graphs", "line.html")

class Scatter(TemplateView):
    template_name = os.path.join("graphs", "scatter.html")

class Compound(TemplateView):
    template_name = os.path.join("graphs", "compound.html")

class AnimatedLine(TemplateView):
    template_name = os.path.join("graphs", "animated.html")