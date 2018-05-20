# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import datetime
import django.utils.timezone
from  django.conf import settings

# Create your models here.
class Dashboard(models.Model):
    created = models.DateField(auto_now=True)
    config_file = models.FilePathField(path=settings.BASE_DIR)
    name = models.CharField(max_length=64)


