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
    else:
        print(serializer.errors)
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

@api_view(['POST'])
def logout_user(request):
    try:
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"error": "Refresh token is required"}, status=400)

        token = RefreshToken(refresh_token)
        token.blacklist()  # Blacklist the refresh token

        return Response({"message": "Logged out successfully"}, status=200)
    except Exception as e:
        return Response({"error": f"Invalid token: {str(e)}"}, status=400)