from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id', 'username')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ('id', 'user', 'avatar_url', 'date_of_birth', 'address',
                 'desired_role', 'preferred_location', 'salary_range',
                 'industry', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                if attr not in ('id', 'username'):
                    setattr(user, attr, value)
            user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance