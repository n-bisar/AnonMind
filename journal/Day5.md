# Day 5 – Django REST Framework & User Registration API

**Project:** AnonMind  
**Tech Stack:** Django, Django REST Framework (DRF), PostgreSQL, python-decouple

---

# Objective

The goal of Day 5 was to transform our Django backend into a REST API that can communicate with any frontend (React, Flutter, Android, iOS, etc.).

Instead of returning HTML pages, our backend now accepts JSON requests and returns JSON responses.

By the end of the day, we successfully built and tested our first production-ready Registration API.

---

# Topics Covered

## 1. Understanding REST APIs

Learned:

- What an API is
- Why Frontend and Backend communicate using APIs
- Client → Server Architecture
- HTTP Request & HTTP Response
- JSON
- REST Principles
- HTTP Methods
  - GET
  - POST
  - PUT
  - PATCH
  - DELETE
- HTTP Status Codes
  - 200 OK
  - 201 Created
  - 400 Bad Request
  - 401 Unauthorized
  - 403 Forbidden
  - 404 Not Found
  - 500 Internal Server Error

---

# 2. Installed Django REST Framework

Installed:

```bash
pip install djangorestframework
```

Added to `INSTALLED_APPS`

```python
'rest_framework',
```

Verified DRF installation.

---

# 3. Understanding Serializers

Learned:

- What a Serializer is
- Why serializers are needed
- Difference between Django Forms and DRF Serializers
- ModelSerializer
- Validation
- `validated_data`
- `serializer.errors`
- `serializer.is_valid()`
- `serializer.save()`

Understood that:

```
Frontend JSON

↓

Serializer

↓

Python Objects

↓

Database
```

---

# 4. Built User Registration Serializer

Created:

```
apps/accounts/serializers.py
```

Created:

- UserRegistrationSerializer

Learned:

- Meta class
- model
- fields
- extra_kwargs
- create()

Implemented password hashing using:

```python
User.objects.create_user(...)
```

instead of

```python
User.objects.create(...)
```

---

# 5. Built Registration API View

Created:

```
RegisterAPIView(APIView)
```

Implemented:

```python
POST
```

workflow.

Flow:

```
request.data

↓

Serializer

↓

Validation

↓

Save User

↓

Return Response
```

Learned:

- request
- request.data
- Response
- status module
- APIView

---

# 6. URL Routing

Created:

```
apps/accounts/urls.py
```

Connected:

```
config/urls.py
```

Endpoint:

```
POST /api/auth/register/
```

Learned:

- urlpatterns
- path()
- include()
- as_view()

---

# 7. Tested API using Thunder Client

Successfully tested:

```
POST

/api/auth/register/
```

Body:

```json
{
    "email": "alice@example.com",
    "password": "Secret123!"
}
```

Received:

```
201 Created
```

Successfully created first user through REST API.

---

# 8. Fixed Development Errors

Encountered and solved:

### Missing python-decouple

```
ModuleNotFoundError:
decouple
```

Fixed by installing:

```bash
pip install python-decouple
```

---

### Missing PostgreSQL Driver

```
ImproperlyConfigured:
Error loading psycopg2 or psycopg module
```

Fixed by installing:

```bash
pip install psycopg
```

---

### Serializer Field Error

```
Field name 'first_name' is not valid
```

Reason:

Our custom User model does not use Django's default fields.

Solution:

Updated serializer according to our own User model.

---

### Django Admin Registration

Initially User model was not visible.

Created custom:

```
UserAdmin
```

Configured:

- list_display
- list_filter
- search_fields
- ordering

---

### Database Migration Issues

Learned:

Whenever models change:

```bash
python manage.py makemigrations

python manage.py migrate
```

---

# 9. Improved User Model

Initially:

```
is_verified
```

Later redesigned to:

```
verification_status
```

because it better represents the doctor verification workflow.

Current User Model contains:

- UUID
- Email
- Full Name
- Role
- Verification Status
- is_active
- is_staff
- date_joined

---

# 10. Authentication Architecture Freeze

The Authentication Module was fully designed before implementation.

Final architecture is now frozen.

---

## Patient Flow

Landing Page

↓

Patient

↓

Registration

↓

Email Verification

↓

JWT Login

↓

Platform

---

## Doctor Flow

Landing Page

↓

Doctor

↓

Registration required

↓

Upload Documents

↓

Pending Verification

↓

Admin Review

↓

Approved / Rejected

↓

Email Notification

↓

JWT Login (only if approved)

---

# Verification Status

Instead of

```
is_verified
```

we now use

```
verification_status
```

Possible values:

- NOT_REQUIRED
- PENDING
- VERIFIED
- REJECTED

This makes the system much more scalable.

---

# Database Architecture (Authentication)

User

- id
- email
- password
- full_name
- role
- verification_status
- is_active
- is_staff
- date_joined

Future Tables

PatientProfile

DoctorProfile

DoctorProfile will store:

- Phone Number
- Registration Number
- Specialization
- Hospital
- Experience
- Medical Degree
- Medical License
- Government ID
- Profile Photo
- Approval Information
- Rejection Reason

---

# Folder Structure

```
backend/

│
├── config/
│   ├── settings.py
│   ├── urls.py
│
├── apps/
│   └── accounts/
│       ├── admin.py
│       ├── managers.py
│       ├── models.py
│       ├── serializers.py
│       ├── urls.py
│       ├── views.py
│
├── manage.py
```

---

# Current API

Registration

```
POST

/api/auth/register/
```

Status:

Working

---

# What We Learned

Django

- Custom User Model
- APIView
- URL Routing
- Admin Customization
- Migrations

DRF

- REST APIs
- Serializers
- Validation
- ModelSerializer
- Response
- Status Codes

Backend Concepts

- HTTP
- JSON
- Request
- Response
- Client Server Communication

---

# Authentication Module (Frozen)

Patient

- Select Patient
- Register
- Email Verification
- JWT Login

Doctor

- Select Doctor
- Register
- Upload Documents
- Pending Review
- Admin Approval
- Email Notification
- JWT Login

No redesigns unless there is a security issue or critical bug.

---

# Pending Work (Day 6)

- Finalize authentication code based on frozen architecture
- Review all authentication files
- Fix remaining inconsistencies
- Re-test Registration API
- Git Commit Authentication Module
- Understand Django Authentication
- Learn Session vs Token vs JWT
- Configure JWT
- Build Login API
- Generate Access & Refresh Tokens
- Build `/me` endpoint
- Test protected APIs

---

# Day 5 Outcome

✅ Django REST Framework installed

✅ Learned REST APIs

✅ Learned Serializers

✅ Built Registration Serializer

✅ Built Registration API

✅ Connected URLs

✅ Tested using Thunder Client

✅ Integrated PostgreSQL

✅ Customized Django Admin

✅ Finalized Authentication Architecture

✅ Built first production-ready API for AnonMind

---

# Progress Summary

Days Completed:

- ✅ Day 1 — Project Foundation
- ✅ Day 2 — Database Design
- ✅ Day 3 — Authentication Foundation
- ✅ Day 4 — Custom User Model & PostgreSQL
- ✅ Day 5 — REST APIs & Registration

The backend can now successfully receive requests from any frontend and create users through REST APIs. Authentication architecture has been finalized and frozen, providing a stable foundation for Login, JWT Authentication, and future modules.