from django.conf.urls import url
from views import *

urlpatterns = [
    url(r'^$', Home.as_view(), name="home"),
    url(r'^dial$', Dial.as_view(), name="dial"),
    url(r'^slider$', Slider.as_view(), name="slider"),
    url(r'^graphs$', Graphs.as_view(), name="graphs"),
    url(r'^misc$', Misc.as_view(), name="misc"),
    url(r'^get-data$', get_val, name="get-data"),
    url(r'^make-conn$', make_conn, name="make-conn")

]