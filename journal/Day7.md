# AnonMind — Day 7

**Date:** 03 August 2026

---

# Objective

Today we focused on building a production-ready authentication system for AnonMind.

Instead of continuing with generic authentication, we redesigned and froze the complete authentication architecture for both Patients and Doctors.

The primary objective was to complete the Patient Authentication Flow with secure email verification before moving to the Doctor module.

---

# Topics Covered

## Authentication Architecture

We finalized the complete authentication workflow.

### Patient Flow

- Patient Registration
- Email Verification
- JWT Login

### Doctor Flow

- Doctor Registration
- Email Verification
- Admin Verification
- JWT Login

---

# Authentication Architecture (Frozen)

## Patient

```
Landing Page

↓

Patient

↓

Register

↓

Create User

role = PATIENT

email_verified = False

verification_status = NOT_REQUIRED

↓

Verification Email

↓

Verify Email

↓

Patient Login

↓

JWT
```

---

## Doctor

```
Landing Page

↓

Doctor

↓

Register

↓

Create User

role = DOCTOR

email_verified = False

verification_status = PENDING

↓

Create DoctorProfile

↓

Create DoctorDocument

↓

Verification Email

↓

Doctor verifies Email

↓

Admin Review

↓

Approved

↓

Doctor Login

↓

JWT
```

---

# Database Architecture (Frozen)

We redesigned the database to follow proper normalization principles.

## User

Authentication-related information only.

Contains:

- full_name
- email
- password
- role
- email_verified
- verification_status
- is_active
- is_staff

---

## DoctorProfile

Professional information.

Contains:

- phone_number
- registration_number
- specialization
- years_of_experience
- hospital
- created_at
- updated_at

Relationship

User

↓

OneToOne

↓

DoctorProfile

---

## DoctorDocument

Stores required verification documents.

Contains:

- medical_degree
- medical_license
- government_id
- profile_photo
- created_at
- updated_at

Relationship

DoctorProfile

↓

OneToOne

↓

DoctorDocument

---

# Why this Architecture?

We separated responsibilities.

## User

Authentication

## DoctorProfile

Professional information

## DoctorDocument

Uploaded verification documents

This keeps the project scalable and maintainable.

---

# Patient Authentication Refactor

Removed the generic authentication flow.

Created:

- PatientRegistrationSerializer
- PatientLoginSerializer
- PatientRegistrationAPIView
- PatientLoginAPIView

Implemented routes:

POST /api/auth/patient/register/

POST /api/auth/patient/login/

---

# Email Verification System

Built from first principles.

Learned:

- Django Token Generator
- PasswordResetTokenGenerator
- urlsafe_base64_encode()
- urlsafe_base64_decode()
- force_bytes()
- force_str()
- reverse()

Created:

accounts/

- tokens.py
- email.py

Implemented:

VerifyEmailAPIView

Verification URL

Patient Verification Endpoint

```
GET

/api/auth/patient/verify-email/<uidb64>/<token>/
```

---

# Email Backend

Configured Django Console Email Backend.

Generated verification emails automatically after registration.

Verification emails include:

- Subject
- Verification Link
- Personalized Message

---

# Patient Login Security

Patient login now checks:

1.

Correct Email

2.

Correct Password

3.

email_verified == True

Only then:

↓

Generate JWT Access Token

↓

Generate Refresh Token

---

# Security Improvements

Added:

email_verified

to User model.

Separated:

Email Verification

from

Doctor Verification

This keeps authentication clean and scalable.

---

# APIs Completed

## Registration

POST

/api/auth/patient/register/

---

## Login

POST

/api/auth/patient/login/

---

## Verify Email

GET

/api/auth/patient/verify-email/<uidb64>/<token>/

---

# Files Created

accounts/

tokens.py

email.py

---

# Files Updated

models.py

serializers.py

views.py

urls.py

settings.py

---

# Django Concepts Learned

- APIView
- Serializer.create()
- JWT Authentication
- Password Validation
- PasswordResetTokenGenerator
- URL Reversing
- Base64 Encoding
- Base64 Decoding
- Console Email Backend
- Response Objects
- Email Verification Flow

---

# Testing Performed

Patient Registration

✅ Passed

Patient Login

✅ Passed

JWT Generation

✅ Passed

Verification Email Generation

✅ Passed

Verification Link

✅ Passed

Verify Email API

✅ Passed

Login Blocked Before Verification

✅ Passed

Login Allowed After Verification

✅ Passed

---

# Current Project Status

## Completed

Day 1

Project Setup

✅

Day 2

Custom User Model

✅

Day 3

Authentication Foundation

✅

Day 4

JWT Authentication

✅

Day 5

Patient Authentication Refactor

✅

Day 6

Authentication Architecture Freeze

✅

Day 7

Patient Email Verification System

✅

---

# Next Goal (Day 8)

Implement the Doctor Module.

- DoctorDocument Model
- File Uploads
- MEDIA_ROOT
- MEDIA_URL
- Doctor Registration API
- Multipart Requests
- Doctor Login
- Verification Status Logic
- Current User Endpoint

---

# Progress Summary

Today we completed the complete Patient Authentication System with production-oriented email verification.

The authentication architecture has now been frozen.

Future development will focus on building Doctor Registration and Admin Verification on top of this authentication foundation.