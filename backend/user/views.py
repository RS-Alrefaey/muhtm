# views.py
from rest_framework import generics
from .models import User
from .serializers import UserSerializer, LoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save() # This creates the user
        # Create a token for the new user
        token, created = Token.objects.get_or_create(user=user)
        # Save the token in the serializer's data. You will return this later.
        self.token = token.key

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        # Add the token to the response data
        response.data['token'] = self.token
        return response

class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class LoginAPI(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)


class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Override the method to always return the logged-in user
        return self.request.user

