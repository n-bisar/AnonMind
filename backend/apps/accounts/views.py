from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import PatientRegistrationSerializer
from .serializers import PatientLoginSerializer
from .models import User
from .tokens import email_verification_token
from .serializers import DoctorRegistrationSerializer


class PatientRegistrationAPIView(APIView):

    def post(self, request):
        serializer = PatientRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {
                    "message": "Registration successful. Please check your email to verify your account before logging in."
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class PatientLoginAPIView(APIView):

    def post(self, request):
        serializer = PatientLoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
        {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        },
            status=status.HTTP_200_OK,
    )

class VerifyEmailAPIView(APIView):

    def get(self, request, uidb64, token):

        user_id = force_str(
        urlsafe_base64_decode(uidb64)
        )

        user = get_object_or_404(
            User,
            pk=user_id,
        )

        if not email_verification_token.check_token(user, token):
            return Response(
            {
            "message": "Invalid or expired verification link."
            },
            status=status.HTTP_400_BAD_REQUEST,
    )

        user.email_verified = True
        user.save()

        return Response(
            {
                "message": "Email verified successfully. You can now log in."
            },
            status=status.HTTP_200_OK,
        )

class DoctorRegistrationAPIView(APIView):
    parser_classes = [
        MultiPartParser,
        FormParser,
    ]
    def post(self, request):
        serializer = DoctorRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
            {
                "message": (
                    "Doctor registered successfully. "
                    "Please verify your email. "
                    "Your account will be activated after admin verification."
                )
            },
            status=status.HTTP_201_CREATED,
        )

        return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
        )