from dataclasses import fields
from django.contrib.auth import get_user_model
from rest_framework import serializers
class UserSerialzer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = fields=['id','username','password']
        extra_kwargs = {'password': {'write_only': True}}

    # overriding the create method for the api user registration
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = get_user_model(**validated_data)
        user.set_password(password)
        user.save()
        return user