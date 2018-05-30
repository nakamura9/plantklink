from django.conf.urls import url
import views

urlpatterns = [
    url(r'^creator/?$', views.ScadaCreator.as_view(), name="creator")
]
