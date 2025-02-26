from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": serializer.data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def login_user(request):
    from django.contrib.auth import authenticate
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": {"id": user.id, "username": user.username},
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
    return Response({"error": "Invalid credentials"}, status=400)