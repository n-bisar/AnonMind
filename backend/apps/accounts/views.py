from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from .serializers import PatientRegistrationSerializer
from .serializers import PatientLoginSerializer
from .models import User, DoctorDocument
from .tokens import email_verification_token
from .serializers import DoctorRegistrationSerializer
from .services import verify_user_email
from .serializers import DoctorLoginSerializer
from .serializers import CurrentUserSerializer
from .serializers import LogoutSerializer
from .permissions import IsAdminUser
from .serializers import PendingDoctorSerializer
from .serializers import AdminLoginSerializer
from .serializers import DoctorDetailSerializer
from .email import send_doctor_approval_email
from .email import send_doctor_rejection_email
from .serializers import DoctorProfileSerializer
from .serializers import DoctorOwnProfileSerializer
from .permissions import IsDoctorUser
from .serializers import PatientProfileSerializer
from .permissions import IsPatientUser
from .serializers import DoctorDocumentSerializer

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

class DoctorLoginAPIView(APIView):

    def post(self, request):
        serializer = DoctorLoginSerializer(data=request.data)
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

class AdminLoginAPIView(APIView):

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)

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

class CurrentUserAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CurrentUserSerializer(request.user)
        return Response(serializer.data)

class LogoutAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            refresh_token = serializer.validated_data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Logout successful."},
                status=status.HTTP_200_OK
            )

        except Exception:
            raise ValidationError(
                {"detail": "Invalid or expired refresh token."}
            )

class PendingDoctorsAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        pending_doctors = User.objects.filter(
            role=User.Role.DOCTOR,
            verification_status=User.VerificationStatus.PENDING,
        )

        serializer = PendingDoctorSerializer(
            pending_doctors,
            many=True,
        )

        return Response(serializer.data)

class DoctorDetailAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, doctor_id):
        doctor = get_object_or_404(
            User,
            id=doctor_id,
            role=User.Role.DOCTOR,
        )

        serializer = DoctorDetailSerializer(doctor)

        return Response(serializer.data)

class ApproveDoctorAPIView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, doctor_id):
        doctor = get_object_or_404(
            User,
            id=doctor_id,
            role=User.Role.DOCTOR,
        )
        if doctor.verification_status != User.VerificationStatus.PENDING:
            return Response(
        {
            "message": "Only pending doctors can be approved."
        },
            status=status.HTTP_400_BAD_REQUEST,
        )
        doctor.verification_status = User.VerificationStatus.VERIFIED


        doctor.save(
            update_fields=["verification_status"]
        )
        send_doctor_approval_email(doctor)
        return Response(
        {
            "message": "Doctor approved successfully."
        },
            status=status.HTTP_200_OK,
        )
class RejectDoctorAPIView(APIView):
    permission_classes = [IsAdminUser]

    def patch(self, request, doctor_id):
        doctor = get_object_or_404(
            User,
            id=doctor_id,
            role=User.Role.DOCTOR,
        )
        if doctor.verification_status != User.VerificationStatus.PENDING:
            return Response(
            {
                "message": "Only pending doctors can be rejected."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
        doctor.verification_status = User.VerificationStatus.REJECTED

        doctor.save(
            update_fields=["verification_status"]
        )   

        send_doctor_rejection_email(doctor)
        return Response(
        {
            "message": "Doctor rejected successfully."
        },
            status=status.HTTP_200_OK,
        )

class DoctorProfileAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsDoctorUser]

    def get(self, request):
        doctor_profile = request.user.doctor_profile

        serializer = DoctorOwnProfileSerializer(doctor_profile)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
    
    def patch(self, request):
        doctor_profile = request.user.doctor_profile

        serializer = DoctorOwnProfileSerializer(
            doctor_profile,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
    )

class PatientProfileAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsPatientUser]

    def get(self, request):
        serializer = PatientProfileSerializer(request.user)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )
    
    def patch(self, request):
        serializer = PatientProfileSerializer(
        request.user,
        data=request.data,
        partial=True,
    )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
    )

class AdminDoctorDocumentsAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, doctor_id):
        doctor = get_object_or_404(
            User,
            id=doctor_id,
            role=User.Role.DOCTOR,
    )

        doctor_documents = get_object_or_404(
            DoctorDocument,
            doctor=doctor.doctor_profile,
        )

        serializer = DoctorDocumentSerializer(doctor_documents)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )