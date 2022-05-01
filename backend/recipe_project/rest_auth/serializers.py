from dataclasses import fields
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class UserSerialzer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='user.username')
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
        )
    class Meta:
        model = get_user_model()
        fields =['id','username','email','password','owner']
        extra_kwargs = {'password': {'write_only': True}}

    # overriding the create method for the api user registration
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user