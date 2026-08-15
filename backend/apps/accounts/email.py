from django.conf import settings

from django.core.mail import send_mail

from django.urls import reverse

from django.utils.encoding import force_bytes

from django.utils.http import urlsafe_base64_encode 

from .tokens import email_verification_token

def send_patient_verification_email(user):

    uidb64 = urlsafe_base64_encode(
    force_bytes(user.pk)
)
    token = email_verification_token.make_token(user)

    
    verification_path = reverse(
        "patient-verify-email",
        kwargs={
            "uidb64": uidb64,
            "token": token,
        },
    )

    verification_url = (
        f"{settings.BACKEND_URL}{verification_path}"
    )   

    subject = "Verify Your Email - AnonMind"
    message = f"""
        Hi {user.full_name},

        Thank you for registering with AnonMind.

        Please verify your email by clicking the link below:

        {verification_url}

        If you did not create this account, please ignore this email.

        Regards,
        AnonMind Team
        """

    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
)
def send_doctor_verification_email(user):

    uidb64 = urlsafe_base64_encode(
    force_bytes(user.pk)
)
    token = email_verification_token.make_token(user)

    
    verification_path = reverse(
        "doctor-verify-email",
        kwargs={
            "uidb64": uidb64,
            "token": token,
        },
    )

    verification_url = (
        f"{settings.BACKEND_URL}{verification_path}"
    )   

    subject = "Verify Your Email - AnonMind"
    message = f"""
        Hi {user.full_name},

        Thank you for registering with AnonMind.

        Please verify your email by clicking the link below:

        {verification_url}

        If you did not create this account, please ignore this email.

        Regards,
        AnonMind Team
        """

    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
)

def send_doctor_approval_email(user):

        subject = "Doctor Application Approved - AnonMind"

        message = f"""
        Hi {user.full_name},

        Your doctor application has been approved.

        Your AnonMind doctor account has been verified successfully.
        You can now log in to your account.

        Regards,
        AnonMind Team
        """

        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )

def send_doctor_rejection_email(user):

    subject = "Doctor Application Rejected - AnonMind"

    message = f"""
        Hi {user.full_name},

        Your doctor application has been rejected.

        Your AnonMind doctor account cannot be used to log in
        as a verified doctor.

        If you believe this decision was made in error,
        please contact the AnonMind administration team.

        Regards,
        AnonMind Team
        """

    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )