from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .email import send_verification_email

class PatientRegistrationSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(
        write_only=True,
)


    class Meta:
        model = User
        fields = [
            "full_name",
            "email",
            "password",
            "confirm_password",
]
        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def validate(self, attrs):
        password = attrs.get("password")
        confirm_password = attrs.get("confirm_password")

        if password != confirm_password:
            raise serializers.ValidationError(
            {
                "confirm_password": "Passwords do not match."
            }
        )

        validate_password(password)

        return attrs


    def create(self, validated_data):
        validated_data.pop("confirm_password")

        user = User.objects.create_user(**validated_data)

        send_verification_email(user)

        return user

class PatientLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(
            email=email,
            password=password,
        )

        if not user:
            raise serializers.ValidationError(
            {
                "detail": "Invalid email or password."
            }
        )

        if not user.email_verified:
            raise serializers.ValidationError(
        {
            "detail": "Please verify your email before logging in."
        }
    )

        attrs["user"] = user

        return attrs