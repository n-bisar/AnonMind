from django.urls import path

from .views import (
    PatientRegistrationAPIView,
    PatientLoginAPIView,
    VerifyEmailAPIView,
    DoctorRegistrationAPIView,
    DoctorLoginAPIView,
    CurrentUserAPIView,
    LogoutAPIView,
    TokenRefreshView
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
   

]