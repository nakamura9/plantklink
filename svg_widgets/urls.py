from django.conf.urls import url
from views import *

urlpatterns = [
    url(r'^$', Home.as_view(), name="home"),
    url(r'^dial$', Dial.as_view(), name="dial"),
    url(r'^get-data$', get_val, name="get-data"),
    url(r'^make-conn$', make_conn, name="make-conn")

]