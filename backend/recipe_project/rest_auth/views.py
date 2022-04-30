from django.contrib.auth import get_user_model
from rest_framework import generics, permissions

from rest_auth.serializers import UserSerialzer

class Register (generics.CreateAPIView):
    model = get_user_model()
    queryset = get_user_model().objects.all()
    serializer_class = UserSerialzer

    permission_classes =[permissions.AllowAny]
