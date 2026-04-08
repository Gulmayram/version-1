from rest_framework import viewsets, permissions
from .models import Realization
from .serializers import RealizationSerializer

class RealizationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Realization.objects.all()
    serializer_class = RealizationSerializer

    def get_permissions(self):
        if self.request.method in ['PATCH', 'PUT', 'DELETE', 'POST']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]
