from rest_framework.decorators import api_view, permission_classes  # For function-based views
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView  # Use APIView for class-based views
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password  # Required for password hashing
from django.views.decorators.csrf import csrf_exempt  # CSRF exemption
from .models import Profile
from .serializers import UserSerializer, ProfileSerializer

### CLASS-BASED PROFILE VIEW ###
class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """Retrieve logged-in user's profile details"""
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        """Update logged-in user's profile details"""
        user = request.user
        data = request.data

        if "password" in data:
            data["password"] = make_password(data["password"])  # Hash password if updating

        serializer = UserSerializer(user, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

### FUNCTION-BASED PROFILE VIEW ###
@api_view(['GET', 'PUT'])  # Fixed to allow GET requests
@permission_classes([permissions.IsAuthenticated])
def profile_view(request):
    profile, created = Profile.objects.get_or_create(user=request.user)

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

### USER REGISTRATION ###
@api_view(['POST'])
@csrf_exempt  # Optional if CSRF issues occur
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

### USER LOGIN ###
@api_view(['POST'])
def login_user(request):
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

### USER LOGOUT ###
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