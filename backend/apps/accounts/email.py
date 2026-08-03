from django.conf import settings

from django.core.mail import send_mail

from django.urls import reverse

from django.utils.encoding import force_bytes

from django.utils.http import urlsafe_base64_encode

from .tokens import email_verification_token

def send_verification_email(user):

    uidb64 = urlsafe_base64_encode(
    force_bytes(user.pk)
)
    token = email_verification_token.make_token(user)

    verification_path = reverse(
        "verify-email",
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