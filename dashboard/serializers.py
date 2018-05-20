from rest_framework import serializers
from models import Dashboard

class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Dashboard
