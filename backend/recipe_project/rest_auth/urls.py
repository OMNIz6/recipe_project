from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_auth.views import Register

urlpatterns = [
    path(r'register/', Register.as_view()),
    path(r'login/', obtain_auth_token, name='api_token_auth')
]