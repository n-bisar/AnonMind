from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .email import send_patient_verification_email
from .email import send_doctor_verification_email

from .models import User, DoctorProfile, DoctorDocument
from django.db import transaction

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
        with transaction.atomic():
            validated_data.pop("confirm_password")

            user = User.objects.create_user(**validated_data)

            send_patient_verification_email(user)

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

class DoctorRegistrationSerializer(serializers.Serializer):
    # User Fields
    full_name = serializers.CharField(max_length=255)

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    confirm_password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    # Doctor Profile Fields
    phone_number = serializers.CharField(max_length=20)

    registration_number = serializers.CharField(max_length=100)

    specialization = serializers.CharField(max_length=100)

    years_of_experience = serializers.IntegerField(
        min_value=0
    )

    hospital = serializers.CharField(max_length=255)

    # Doctor Document Fields

    medical_degree = serializers.FileField()

    medical_license = serializers.FileField()

    government_id = serializers.FileField()

    profile_photo = serializers.ImageField()

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

        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError(
            {
                "email": "A user with this email already exists."
            }
        )

        return attrs

    def create(self, validated_data):
        with transaction.atomic():
        #Remove the confirm_password list
            validated_data.pop("confirm_password")

            user = User.objects.create_user(
            email=validated_data["email"],
            full_name=validated_data["full_name"],
            password=validated_data["password"],
            role=User.Role.DOCTOR,
            verification_status=User.VerificationStatus.PENDING,
            email_verified=False,
            )

            phone_number = validated_data.pop("phone_number")
            registration_number = validated_data.pop("registration_number")
            specialization = validated_data.pop("specialization")
            years_of_experience = validated_data.pop("years_of_experience")
            hospital = validated_data.pop("hospital")

            doctor_profile = DoctorProfile.objects.create(
                user=user,
                phone_number=phone_number,
                registration_number=registration_number,
                specialization=specialization,
                years_of_experience=years_of_experience,
                hospital=hospital,
            )       

            medical_degree = validated_data.pop("medical_degree")
            medical_license = validated_data.pop("medical_license")
            government_id = validated_data.pop("government_id")
            profile_photo = validated_data.pop("profile_photo")

            DoctorDocument.objects.create(
                doctor=doctor_profile,
                medical_degree=medical_degree,
                medical_license=medical_license,
                government_id=government_id,
                profile_photo=profile_photo,
            )
        
            send_doctor_verification_email(user)
            return user

class DoctorLoginSerializer(serializers.Serializer):
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

            if user.verification_status == User.VerificationStatus.PENDING:
                raise serializers.ValidationError(
                {
                    "detail": "Your application is under verification."
                }
                )
            if user.verification_status == User.VerificationStatus.REJECTED:
                raise serializers.ValidationError(
                {
                    "detail": "Your application has been rejected."
                }
                )
            attrs["user"] = user
            return attrs

class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "role",
            "email_verified",
            "verification_status",
        ]

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
