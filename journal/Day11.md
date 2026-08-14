# AnonMind — Day 11

## Focus

**Phase 2 — Core Backend APIs**

### Main Focus

Admin Authentication, Authorization, Pending Doctor Listing, and Doctor Detail APIs.

---

## Day 11 Goals

The objective of Day 11 was to begin the Admin Module and establish secure role-based access to administrative APIs.

Completed:

* Admin authentication
* Admin authorization
* Role-Based Access Control (RBAC)
* Custom DRF permission class
* Pending Doctors API
* Doctor Detail API
* Nested serializers
* Permission and endpoint testing

---

# 1. Authentication vs Authorization

### Authentication

Authentication answers:

> **Who are you?**

JWT authentication identifies the currently logged-in user through:

```python
request.user
```

### Authorization

Authorization answers:

> **What are you allowed to do?**

A valid JWT alone does not mean that the user can access every API.

For example:

```text
Patient → authenticated
Doctor  → authenticated
Admin   → authenticated
```

All three may have valid JWTs, but only the Admin should be allowed to access:

```text
/api/admin/...
```

---

# 2. Admin Login API

Created:

```text
POST /api/admin/login/
```

The Admin login uses the existing JWT mechanism.

The login flow is:

```text
Email + Password
       ↓
authenticate()
       ↓
Check role
       ↓
role == ADMIN
       ↓
Generate JWT
       ↓
Access + Refresh Token
```

The Admin account used for testing:

```text
admin@anonmind.com
role = ADMIN
```

Django's built-in `/admin/` interface and AnonMind's application-level Admin role are treated as separate concepts.

---

# 3. Role-Based Access Control

AnonMind uses the `role` field of the custom `User` model:

```text
PATIENT
DOCTOR
ADMIN
```

Admin APIs require:

```text
role == ADMIN
```

This is application-level authorization.

---

# 4. Custom DRF Permission

Created:

```python
IsAdminUser
```

The permission checks:

```text
User exists
    ↓
Authenticated
    ↓
role == ADMIN
    ↓
Allow
```

Otherwise access is denied.

This prevents us from having to repeat authorization logic inside every Admin API.

---

# 5. Why IsAuthenticated Is Not Enough

`IsAuthenticated` only checks:

> Is the user logged in?

It does not check:

> Is the user an Admin?

Therefore:

```python
permission_classes = [IsAuthenticated]
```

would allow both Patients and Doctors to reach an Admin endpoint if they possess valid JWTs.

The custom permission:

```python
permission_classes = [IsAdminUser]
```

provides the required role-based authorization.

---

# 6. Pending Doctors API

Created:

```text
GET /api/admin/doctors/pending/
```

Purpose:

Return doctors whose application is waiting for Admin verification.

The QuerySet:

```python
User.objects.filter(
    role=User.Role.DOCTOR,
    verification_status=User.VerificationStatus.PENDING,
)
```

uses the existing `TextChoices` values from the User model.

### Returned fields

```text
id
full_name
email
date_joined
verification_status
```

Created:

```python
PendingDoctorSerializer
```

The serializer explicitly exposes only the fields required by the Admin API.

---

# 7. QuerySets and filter()

A QuerySet represents a collection of database objects that Django can retrieve from the database.

Example:

```python
User.objects.all()
```

returns all users.

Using:

```python
User.objects.filter(...)
```

allows the database to return only records matching the specified conditions.

For pending doctors:

```text
role = DOCTOR
AND
verification_status = PENDING
```

This avoids retrieving unnecessary users and filtering them manually in Python.

---

# 8. Doctor Detail API

Created:

```text
GET /api/admin/doctors/<id>/
```

The endpoint returns:

```text
User Details
+
Doctor Profile
+
Uploaded Documents
```

The doctor is retrieved using:

```python
get_object_or_404(
    User,
    id=doctor_id,
    role=User.Role.DOCTOR,
)
```

This provides automatic `404 Not Found` handling when the doctor does not exist.

It also ensures that a Patient UUID cannot accidentally be used to retrieve patient information through the Doctor Detail endpoint.

---

# 9. One-to-One Relationships

The existing database architecture uses:

```text
User
 ↓
DoctorProfile
 ↓
DoctorDocument
```

Both relationships are `OneToOneField`.

### User → DoctorProfile

```python
related_name="doctor_profile"
```

Therefore:

```python
doctor.doctor_profile
```

can be used to access the DoctorProfile.

### DoctorProfile → DoctorDocument

```python
related_name="documents"
```

Therefore:

```python
doctor.doctor_profile.documents
```

can access the uploaded documents.

---

# 10. Nested Serializers

Created three serializers:

```text
DoctorDetailSerializer
        ↓
DoctorProfileSerializer
        ↓
DoctorDocumentSerializer
```

This produces a nested response structure:

```text
Doctor
│
├── User information
│
└── doctor_profile
       │
       ├── Profile information
       │
       └── documents
              ├── Medical Degree
              ├── Medical License
              ├── Government ID
              └── Profile Photo
```

Nested serializers allow related Django objects to be represented naturally inside the API response.

---

# 11. PATCH vs PUT

We began the Approve Doctor API and established why it should use:

```text
PATCH
```

rather than:

```text
PUT
```

Approval changes only part of the doctor's resource:

```text
PENDING
   ↓
VERIFIED
```

Therefore PATCH is appropriate because it represents a partial modification rather than replacement of the complete resource.

The actual approval implementation will continue on Day 12.

---

# 12. Testing Completed

### Admin Login

```text
Admin credentials → JWT
```

Successfully tested.

### Pending Doctors API

```text
Admin    → 200
Doctor   → 403
Patient  → 403
No token → 401
```

Successfully tested.

### Doctor Detail API

```text
Valid doctor UUID       → 200
Non-existent UUID       → 404
```

Successfully tested.

---

# 13. Day 11 Status

```text
Admin Authentication          ✅
Admin Authorization           ✅
Custom Permission             ✅
RBAC                          ✅
Admin Login API               ✅
Pending Doctors API           ✅
Pending Doctor Serializer     ✅
Doctor Detail API             ✅
get_object_or_404()           ✅
One-to-One Relationships      ✅
Nested Serializers            ✅
Permission Testing            ✅
```

### Remaining Admin Module Work

```text
Approve Doctor API             → Day 12
Approval Email                 → Day 12
Reject Doctor API              → Day 12
Rejection Email                → Day 12
Complete Admin Testing         → Day 12
```

---

# Day 11 Conclusion

Day 11 established the security foundation of the AnonMind Admin Module.

The backend can now authenticate an AnonMind Admin, authorize Admin-only APIs, list pending doctors, and retrieve a complete doctor's application including their profile and uploaded documents.

The next step is to implement the actual **doctor verification business logic**.
