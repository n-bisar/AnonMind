from django.urls import path

from .views import (
    PatientRegistrationAPIView,
    PatientLoginAPIView,
    VerifyEmailAPIView,
)

urlpatterns = [
    path(
        "patient/register/",
        PatientRegistrationAPIView.as_view(),
        name="register",
    ),

    path(
        "patient/login/",
        PatientLoginAPIView.as_view(),
        name="login",
    ),

    path(
    "patient/verify-email/<uidb64>/<token>/",
    VerifyEmailAPIView.as_view(),
    name="verify-email",
    ),
]