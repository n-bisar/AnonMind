import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):

    class Role(models.TextChoices):
        PATIENT = "PATIENT", "Patient"
        DOCTOR = "DOCTOR", "Doctor"
        ADMIN = "ADMIN", "Admin"

    class VerificationStatus(models.TextChoices):
        NOT_REQUIRED = "NOT_REQUIRED", "Not Required"
        PENDING = "PENDING", "Pending"
        VERIFIED = "VERIFIED", "Verified"
        REJECTED = "REJECTED", "Rejected"

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    email = models.EmailField(
        unique=True,
        max_length=255,
    )

    full_name = models.CharField(
        max_length=255,
        blank=True,
        default="",
    )

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.PATIENT,
    )

    verification_status = models.CharField(
        max_length=20,
        choices=VerificationStatus.choices,
        default=VerificationStatus.NOT_REQUIRED,
    )

    email_verified = models.BooleanField(
    default=False,
    )

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class DoctorProfile(models.Model):
    user = models.OneToOneField(
    User,
    on_delete=models.CASCADE,
    related_name="doctor_profile",
)

    phone_number = models.CharField(
    max_length=20,
    blank=True,
    null=True,
)

    registration_number = models.CharField(
    max_length=100,
    unique=True,
    blank=True,
    null=True,
)

    specialization = models.CharField(
    max_length=100,
    blank=True,
    null=True,
)

    years_of_experience = models.PositiveIntegerField(
    blank=True,
    null=True,
)

    hospital = models.CharField(
    max_length=255,
    blank=True,
    null=True,
)

    created_at = models.DateTimeField(
    auto_now_add=True,
    null=True,
)

    updated_at = models.DateTimeField(
    auto_now=True,
    null=True,
)

    def __str__(self):
        return self.user.full_name


class DoctorDocument(models.Model):
    doctor = models.OneToOneField(
        DoctorProfile,
        on_delete=models.CASCADE,
        related_name="documents",
    )

    medical_degree = models.FileField(
        upload_to="doctor_documents/degrees/"
    )

    medical_license = models.FileField(
        upload_to="doctor_documents/licenses/"
    )

    government_id = models.FileField(
        upload_to="doctor_documents/government_ids/"
    )

    profile_photo = models.ImageField(
        upload_to="doctor_documents/profile_photos/"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Documents - {self.doctor.user.full_name}"