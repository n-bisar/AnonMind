from django.urls import path

from .views import (
    PatientRegistrationAPIView,
    PatientLoginAPIView,
    VerifyEmailAPIView,
    DoctorRegistrationAPIView,
    DoctorLoginAPIView,
    CurrentUserAPIView,
    LogoutAPIView,
    TokenRefreshView,
    PendingDoctorsAPIView,
    AdminLoginAPIView,
    DoctorDetailAPIView,
    ApproveDoctorAPIView,
    RejectDoctorAPIView,
    DoctorProfileAPIView,
    PatientProfileAPIView,
    AdminDoctorDocumentsAPIView,
)

urlpatterns = [
    path(
        "patient/register/",
        PatientRegistrationAPIView.as_view(),
        name="register",
    ),

    path(
        "doctor/register/",
        DoctorRegistrationAPIView.as_view(),
        name="register",
    ),

    path(
        "patient/login/",
        PatientLoginAPIView.as_view(),
        name="patient-login",
    ),

    path(
    "doctor/login/",
    DoctorLoginAPIView.as_view(),
    name="doctor-login",
    ),  

    path(
    "admin/login/",
    AdminLoginAPIView.as_view(),
    name="admin-login",
),

    path(
    "patient/verify-email/<uidb64>/<token>/",
    VerifyEmailAPIView.as_view(),
    name="patient-verify-email",
    ),

    path(
    "doctor/verify-email/<uidb64>/<token>/",
    VerifyEmailAPIView.as_view(),
    name="doctor-verify-email",
    ),

    path("accounts/me/", 
         CurrentUserAPIView.as_view(), 
         name="current-user"
    ),

    path("logout/", 
         LogoutAPIView.as_view(), 
         name="logout"
    ),

    path(
    "token/refresh/",
    TokenRefreshView.as_view(),
    name="token_refresh",
),

    path(
    "admin/doctors/pending/",
    PendingDoctorsAPIView.as_view(),
    name="admin-pending-doctors",
),

    path(
    "admin/doctors/<uuid:doctor_id>/",
    DoctorDetailAPIView.as_view(),
    name="admin-doctor-detail",
),
    path(
    "admin/doctors/<uuid:doctor_id>/approve/",
    ApproveDoctorAPIView.as_view(),
    name="admin-doctor-approve",
),

    path(
    "admin/doctors/<uuid:doctor_id>/reject/",
    RejectDoctorAPIView.as_view(),
    name="admin-doctor-reject",
),

    path(
    "doctor/profile/",
    DoctorProfileAPIView.as_view(),
    name="doctor-profile",
),

    path(
    "patient/profile/",
    PatientProfileAPIView.as_view(),
    name="patient-profile",
),
   path(
    "admin/doctors/<uuid:doctor_id>/documents/",
    AdminDoctorDocumentsAPIView.as_view(),
    name="admin-doctor-documents",
),

]