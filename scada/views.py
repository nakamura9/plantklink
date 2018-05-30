# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.views.generic import TemplateView
import os

class ScadaCreator(TemplateView):
    template_name = os.path.join("scada", 'creator.html')

    
