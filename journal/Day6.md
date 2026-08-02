# AnonMind — Day 6
**Date:** 02 August 2026

---

# Objective

Today's goal was to stabilize the Authentication Module before moving further into the project.

Instead of rushing into JWT implementation, we first audited the entire authentication system, fixed the remaining issues, strengthened security, and then began understanding modern authentication using JWT.

This day was focused on building a production-ready authentication foundation.

---

# Topics Covered

## Phase 1 — Authentication Audit

Before adding any new feature, we reviewed every authentication-related file.

Files reviewed:

```
accounts/
│
├── models.py
├── managers.py
├── serializers.py
├── views.py
├── urls.py
└── admin.py
```

For every file we checked:

- Django best practices
- Project consistency
- Security
- Scalability
- Production readiness

---

# models.py Review

Verified:

- Custom User Model
- UUID Primary Key
- Email as USERNAME_FIELD
- Role Enum
- Verification Status Enum
- Custom User Manager
- Password handled by AbstractBaseUser

Current User Model:

```
UUID
Email
Full Name
Password
Role
Verification Status
is_staff
is_active
date_joined
```

Observation:

The model is clean and scalable.

Doctor-specific fields will be added later.

---

# managers.py Review

Verified:

- create_user()
- create_superuser()
- Email normalization
- Password hashing

Important concept learned:

Never store plain text passwords.

Always use:

```
user.set_password(password)
```

instead of

```
user.password = password
```

---

# serializers.py Improvements

The Registration Serializer was upgraded.

Previously:

```
Full Name
Email
Password
```

Now:

```
Full Name
Email
Password
Confirm Password
```

Added:

- confirm_password field
- Password match validation
- Removal of confirm_password before saving
- Django Password Validation

Important concepts learned:

Serializer acts as the security guard between the client and the database.

Responsibilities:

- Validate data
- Reject invalid requests
- Convert JSON to Python objects
- Save only validated data

---

# Password Confirmation

Added:

```
confirm_password
```

Purpose:

Only verify that the user entered the same password twice.

It is NEVER stored in the database.

---

# Custom Serializer Validation

Implemented:

```
validate()
```

Used for:

- Comparing password
- Comparing confirm_password

Learned the difference between:

Field Validation

vs

Serializer Validation

---

# create() Method Improvement

Before creating the user:

```
validated_data.pop("confirm_password")
```

Reason:

confirm_password is not a database field.

Only password should be stored.

---

# Django Password Validation

Integrated:

```
validate_password()
```

Learned that password rules should never be hardcoded inside serializers.

Instead, Django provides:

AUTH_PASSWORD_VALIDATORS

Configured validators:

- UserAttributeSimilarityValidator
- MinimumLengthValidator
- CommonPasswordValidator
- NumericPasswordValidator

---

# views.py Review

Verified:

Registration flow

```
Request

↓

Serializer

↓

Save User

↓

Response
```

Small cleanup noted:

Unused variable:

```
user = serializer.save()
```

---

# admin.py Review

Verified:

- Search
- Filters
- Ordering
- Useful columns

Future improvements:

- readonly_fields
- fieldsets

---

# Authentication Testing

Successfully tested:

Registration API

Verified:

- Full Name saved correctly
- Password hashing working
- Role assigned automatically
- Verification status assigned automatically

---

# Security Testing

Attempted malicious request:

```
role = ADMIN

verification_status = VERIFIED
```

Result:

Ignored by backend.

User created as:

```
PATIENT

NOT_REQUIRED
```

This confirmed protection against privilege escalation.

---

# Authentication Foundation Completed

Completed:

- Custom User Model
- Registration API
- Password Validation
- Password Hashing
- Secure Serializer
- Admin Integration

Authentication foundation declared production-ready.

---

# Phase 2 — Authentication Theory

Before implementing JWT, studied authentication from first principles.

---

# Session Authentication

Learned how Django Sessions work.

Flow:

```
Login

↓

Server creates Session

↓

Stores Session

↓

Returns Cookie

↓

Browser stores Cookie

↓

Future requests send Cookie
```

Advantages:

- Simple
- Secure
- Great for traditional websites

Disadvantages:

- Server stores every session
- Harder to scale

---

# Token Authentication

Flow:

```
Login

↓

Server creates Token

↓

Stores Token

↓

Returns Token

↓

Client stores Token

↓

Future requests send Token
```

Advantages:

- Better for APIs

Disadvantages:

- Server still stores every token

---

# JWT Authentication

Studied JWT architecture.

Flow:

```
Login

↓

Verify credentials

↓

Generate JWT

↓

Digitally Sign Token

↓

Return JWT

↓

Client stores JWT

↓

Future requests

Authorization:

Bearer <Access Token>
```

Advantages:

- Stateless
- No server-side token storage
- Scalable
- Perfect for REST APIs

---

# Why JWT was chosen

AnonMind architecture includes:

- React Frontend
- Django REST API
- Future Mobile App
- AI Services
- Doctor Dashboard
- Patient Dashboard

JWT is ideal because it is:

- Stateless
- Secure
- Fast
- Easy to integrate
- Industry standard

---

# Installed JWT

Installed:

```
djangorestframework-simplejwt
```

Verified installation successfully.

---

# Django REST Framework Configuration

Configured:

```
REST_FRAMEWORK
```

Authentication Class:

```
JWTAuthentication
```

Purpose:

Every protected endpoint now expects a JWT.

---

# SimpleJWT Configuration

Configured:

```
ACCESS_TOKEN_LIFETIME

REFRESH_TOKEN_LIFETIME

ROTATE_REFRESH_TOKENS

BLACKLIST_AFTER_ROTATION

ALGORITHM

SIGNING_KEY

AUTH_HEADER_TYPES
```

Current configuration:

Access Token:

15 minutes

Refresh Token:

7 days

Authorization Header:

```
Bearer
```

---

# Login Architecture

Studied complete login flow.

```
Client

↓

Email

↓

Password

↓

authenticate()

↓

Authenticated User

↓

Generate JWT

↓

Return

Access Token

Refresh Token
```

---

# Serializer Concepts

Learned difference between:

ModelSerializer

Used for:

- Registration
- CRUD

Serializer

Used for:

- Login
- OTP
- Password Reset
- Email Verification

---

# Login Serializer

Created:

```
LoginSerializer
```

Fields:

```
email

password
```

Implemented:

```
authenticate()
```

Purpose:

Never compare passwords manually.

Let Django securely authenticate users.

---

# Login API

Created:

```
LoginAPIView
```

Flow:

```
POST

↓

LoginSerializer

↓

authenticate()

↓

RefreshToken.for_user()

↓

Access Token

↓

Refresh Token

↓

Return Response
```

---

# JWT Token Generation

Used:

```
RefreshToken.for_user(user)
```

Generated:

- Access Token
- Refresh Token

---

# Major Architectural Discussion

During implementation, we realized that a single login/register flow would become difficult to maintain.

The authentication architecture was redesigned before moving further.

---

# Final Frozen Authentication Architecture

Landing Page

```
Patient

Doctor
```

---

# Patient Flow

```
Landing

↓

Patient

↓

Patient Register

↓

Email Verification

↓

Patient Login

↓

JWT

↓

Patient Dashboard
```

Patient requires only email verification.

No admin approval.

---

# Doctor Flow

```
Landing

↓

Doctor

↓

Doctor Register

↓

Upload Documents

↓

Pending

↓

Admin Verification

↓

Approval Email

↓

Doctor Login

↓

JWT

↓

Doctor Dashboard
```

Doctor requires:

- Document Verification
- Admin Approval

before login.

---

# Backend Endpoints (Frozen)

Patient

```
POST /api/patient/register/

POST /api/patient/login/
```

Doctor

```
POST /api/doctor/register/

POST /api/doctor/login/
```

No generic login/register endpoints.

---

# Future Architecture

Single User Model

```
User

│

├── Patient

└── Doctor
```

Separate:

- Serializers
- Views
- Routes

Shared:

- User Model
- JWT
- User Manager

---

# Key Concepts Learned

✔ Custom User Model

✔ User Manager

✔ Password Hashing

✔ Serializer Validation

✔ Password Validation

✔ Privilege Escalation Prevention

✔ Authentication Theory

✔ Session Authentication

✔ Token Authentication

✔ JWT Authentication

✔ SimpleJWT

✔ DRF Authentication Classes

✔ Login Architecture

✔ Stateless Authentication

✔ Secure API Design

✔ Separation of Responsibilities

---

# Current Project Status

Completed

✅ Authentication Foundation

✅ Registration

✅ Password Security

✅ JWT Configuration

✅ Login Architecture

Pending

- Patient Email Verification
- Doctor Registration
- Doctor Verification
- Admin Approval Workflow
- Protected Endpoints
- /me Endpoint

---

# Git Commit Message

```
feat(auth): complete authentication foundation and configure JWT
```

---

# Day 6 Summary

Day 6 was not about writing a lot of code.

It was about understanding authentication deeply and building a secure foundation.

We learned how authentication works internally, why JWT is the preferred solution for REST APIs, how Django securely authenticates users, and how to organize authentication for a production-grade healthcare platform.

The biggest architectural decision made today was separating the Patient and Doctor authentication journeys while keeping a single User model underneath. This decision will keep AnonMind clean, scalable, and easier to maintain as the project grows.

Authentication is now the strongest and most stable module of the project, providing a solid base for implementing email verification, doctor verification, protected APIs, AI chat, appointments, and every future feature.