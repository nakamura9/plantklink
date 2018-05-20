from django.conf.urls import url
import views
from rest_framework.routers import DefaultRouter

dashboard_router = DefaultRouter()
dashboard_router.register(r'^dashboard-details', views.DashboardAPIView, base_name="dashboard-details")

urlpatterns = [
    url(r'^designer/?$', views.DashboardDesigner.as_view(), name='designer'),
    url(r'^list/?$', views.DashboardList.as_view(), name='list'),
    url(r'^create/?$', views.get_dashboard_data, name='create'),
    url(r'^delete/(?P<pk>[\w]+)/?$', views.delete_dashboard_data, name='delete'),
    url(r'^dashboard/(?P<pk>[\w]+)/?$', views.DashboardView.as_view(), name='dashboard'),
    url(r'^load/(?P<pk>[\w]+)/?$', views.load_dashboard_data, name='load'),
] + dashboard_router.urls