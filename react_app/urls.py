from django.conf.urls import url
from views import *

urlpatterns = [
    url(r'^$', Home.as_view(), name="home"),
]