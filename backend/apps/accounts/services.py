from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.shortcuts import get_object_or_404

from .models import User
from .tokens import email_verification_token


def verify_user_email(uidb64, token):
    pass