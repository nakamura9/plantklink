"""plantlink_scada URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include, static
from django.contrib import admin
from django.conf import settings


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^graphs/', include("graphs.urls", namespace="graphs")),
    url(r'^ajax/', include("ajax.urls", namespace="ajax")),
    url(r'^widgets/', include('svg_widgets.urls', namespace='widgets')),
    url(r'^dashboard/', include('dashboard.urls', namespace='dashboard')),
] + static.static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
