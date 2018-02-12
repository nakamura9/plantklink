from django.conf.urls import url
from views import *

urlpatterns = [
    url('^$', Home.as_view(), name="home"),
    url(r'^scatter/?$', Scatter.as_view(), name='scatter'),
    url(r'^line/?$', Line.as_view(), name="line"),
    url(r'^bar/?$', Bar.as_view(), name='bar'),
    url(r'^compound/?$', Compound.as_view(), name='compound'),
    url(r'^animated/?$', AnimatedLine.as_view(), name="animated"),
]