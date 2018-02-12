from django.conf.urls import url
from views import *

urlpatterns = [
    url(r'^get$', get, name='get'),
    url(r'^config$', config, name='config')
]