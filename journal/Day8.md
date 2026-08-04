# AnonMind — Day 8

**Date:** 04 August 2026

---

# Objective

Today we began implementing the **Doctor Authentication System**.

Unlike the patient flow, a doctor registration consists of three interconnected models:

- User
- DoctorProfile
- DoctorDocument

The doctor registration also introduces:

- File uploads
- Multipart form data
- Media storage
- Multi-model serializer
- Database transactions

---

# Topics Covered

## 1. Django File Upload System

Before implementing doctor registration, we understood how Django stores uploaded files.

Covered:

- Static Files vs Media Files
- MEDIA_ROOT
- MEDIA_URL
- FileField
- ImageField
- upload_to
- Pillow

---

## 2. Configuring Media Files

Configured in:

```
anonmind/settings.py
```

Added:

```python
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
```

---

Configured project urls:

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
```

Created:

```
media/
```

folder in the project root.

---

# 3. DoctorDocument Model

Created a new model:

```text
DoctorDocument
```

Fields:

- doctor (OneToOne → DoctorProfile)
- medical_degree
- medical_license
- government_id
- profile_photo
- created_at
- updated_at

Learned:

- FileField
- ImageField
- upload_to
- auto_now
- auto_now_add

---

# 4. Updated DoctorProfile

Extended DoctorProfile with:

- phone_number
- registration_number
- specialization
- years_of_experience
- hospital
- created_at
- updated_at

Resolved migration issues by making the new fields temporarily nullable.

Generated:

```
0007_doctorprofile_...
```

migration.

---

# Current Database Architecture

```
User
│
├── Authentication
├── Email Verification
├── Role
└── Verification Status
│
▼
DoctorProfile
│
├── phone_number
├── registration_number
├── specialization
├── years_of_experience
├── hospital
└── timestamps
│
▼
DoctorDocument
│
├── medical_degree
├── medical_license
├── government_id
├── profile_photo
└── timestamps
```

---

# 5. DoctorRegistrationSerializer

Created a custom DRF Serializer instead of ModelSerializer.

Reason:

One request creates three different models.

Serializer now receives:

### User Fields

- full_name
- email
- password
- confirm_password

### DoctorProfile Fields

- phone_number
- registration_number
- specialization
- years_of_experience
- hospital

### DoctorDocument Fields

- medical_degree
- medical_license
- government_id
- profile_photo

---

# 6. Validation

Implemented:

Password confirmation

```python
password == confirm_password
```

Email uniqueness

```python
User.objects.filter(email=...)
```

Password validation

```python
validate_password(password)
```

---

# 7. Serializer create()

Implemented complete multi-model creation.

Flow:

```
validated_data
        │
        ▼
Create User
        │
        ▼
Create DoctorProfile
        │
        ▼
Create DoctorDocument
        │
        ▼
Send Verification Email
        │
        ▼
Return User
```

Implemented:

- User.objects.create_user()
- DoctorProfile.objects.create()
- DoctorDocument.objects.create()

---

# 8. Database Transactions

Wrapped the entire registration process inside:

```python
with transaction.atomic():
```

Purpose:

If any step fails:

- User
- DoctorProfile
- DoctorDocument

are all rolled back automatically.

No partial data remains in the database.

---

# 9. Doctor Registration API

Created:

```
DoctorRegistrationAPIView
```

Configured:

```python
parser_classes = [
    MultiPartParser,
    FormParser,
]
```

Learned:

- multipart/form-data
- parser_classes
- request.data
- serializer.save()

The view is intentionally thin.

Business logic remains inside the serializer.

---

# 10. Doctor Registration Endpoint

Added:

```
POST /api/doctor/register/
```

Current endpoint:

```
http://127.0.0.1:8000/api/doctor/register/
```

---

# Current Doctor Registration Flow

```
Doctor Registration Request
        │
        ▼
DoctorRegistrationAPIView
        │
        ▼
DoctorRegistrationSerializer
        │
        ▼
validate()
        │
        ▼
transaction.atomic()
        │
        ▼
Create User
        │
        ▼
Create DoctorProfile
        │
        ▼
Create DoctorDocument
        │
        ▼
Send Verification Email
        │
        ▼
Return Success Response
```

---

# Important Concepts Learned Today

- Static vs Media Files
- MEDIA_ROOT
- MEDIA_URL
- FileField
- ImageField
- upload_to
- multipart/form-data
- MultiPartParser
- FormParser
- Serializer vs ModelSerializer
- validate()
- create()
- validated_data
- pop()
- transaction.atomic()

---

# Challenges Faced

## Migration Conflict

Issue:

DoctorProfile already existed from a previous migration.

Solution:

- Preserved migration history.
- Created a new migration (0007).
- Updated DoctorProfile instead of recreating it.
- Made newly added fields temporarily nullable to complete the migration cleanly.

---

# Status at End of Day 8

## ✅ Completed

- Media configuration
- File upload infrastructure
- DoctorProfile model
- DoctorDocument model
- DoctorRegistrationSerializer
- Validation
- Multi-model create()
- Database transaction
- DoctorRegistrationAPIView
- Doctor registration endpoint

---

## ⏳ Remaining for Day 9

### Complete Postman Testing

- multipart/form-data request
- Verify uploaded files
- Verify media folder
- Verify database entries

---

### Doctor Email Verification

Implement and test:

```
email_verified = True
```

after clicking the verification link.

---

### Doctor Login API

```
POST /api/doctor/login/
```

Rules:

```
Authenticate

↓

email_verified?

↓

verification_status?

↓

Generate JWT
```

Return appropriate responses for:

- Email not verified
- Pending verification
- Rejected application
- Successful login

---

### Current User Endpoint

```
GET /api/accounts/me/
```

Learn:

- JWT Authentication
- Authentication Classes
- Permission Classes
- request.user
- IsAuthenticated

---

# Day 8 Summary

Today we transformed AnonMind from a simple patient authentication system into a platform capable of onboarding doctors with professional information and document uploads.

We introduced Django's media handling system, multipart file uploads, multi-model serializers, and database transactions. By the end of the session, the complete backend flow for doctor registration was implemented, laying the foundation for email verification, admin approval, and secure doctor login in the next session.