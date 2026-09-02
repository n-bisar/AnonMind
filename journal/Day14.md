# AnonMind — Day 14

## Focus

**Patient Profile API**

Day 14 continued Phase 2 — Core Backend APIs.

The main goal was to allow an authenticated patient to:

* View their own profile
* Update permitted profile information
* Prevent modification of protected account and authentication fields
* Ensure only patients can access the patient profile API

---

# ==================================================

# DAY 14 — PATIENT PROFILE API

# ==================================================

## Goal

Build:

```text
GET   /api/auth/patient/profile/
PATCH /api/auth/patient/profile/
```

The patient profile API uses the existing `User` model rather than introducing a separate `PatientProfile` model.

---

# ==================================================

# USER MODEL ANALYSIS

# ==================================================

The existing `User` model already stores the information required for the current patient profile.

Relevant fields include:

* `id`
* `email`
* `full_name`
* `role`
* `verification_status`
* `email_verified`
* `is_active`
* `is_staff`
* `date_joined`

Because patient-specific profile information is currently stored directly on `User`, creating a separate `PatientProfile` model would introduce unnecessary architecture.

The decision was therefore:

```text
Patient
   ↓
Existing User model
```

instead of:

```text
Patient
   ↓
PatientProfile
   ↓
User
```

---

# ==================================================

# PATIENT PROFILE SERIALIZER

# ==================================================

Created:

```text
PatientProfileSerializer
```

The serializer is based on the existing `User` model.

Exposed fields:

```text
full_name
email
verification_status
```

The serializer uses:

```python
read_only_fields = [
    "email",
    "verification_status",
]
```

Therefore:

```text
full_name
    → readable
    → writable

email
    → readable
    → read-only

verification_status
    → readable
    → read-only
```

Sensitive/internal fields such as:

* password
* password hash
* role
* email_verified
* is_staff
* is_active
* id
* date_joined

are not exposed through this serializer.

---

# ==================================================

# PATIENT-SPECIFIC PERMISSION

# ==================================================

Created:

```text
IsPatientUser
```

The permission follows the existing permission architecture.

It verifies:

```text
User exists
+
User is authenticated
+
User role == PATIENT
```

Conceptually:

```text
JWT Authentication
        ↓
    request.user
        ↓
 IsPatientUser
        ↓
   PATIENT?
    /     \
  YES      NO
   ↓        ↓
Allowed    403
```

---

# ==================================================

# PATIENT PROFILE API

# ==================================================

Created:

```text
PatientProfileAPIView
```

Authentication:

```text
JWTAuthentication
```

Permission:

```text
IsPatientUser
```

---

## GET

Endpoint:

```http
GET /api/auth/patient/profile/
```

The authenticated user is obtained through:

```python
request.user
```

No patient UUID is accepted from the client.

The serializer returns:

```json
{
    "full_name": "Bisar Nawaz",
    "email": "bisar.nawaz12@example.com",
    "verification_status": "NOT_REQUIRED"
}
```

---

# ==================================================

# REQUEST.USER SECURITY PRINCIPLE

# ==================================================

The API uses:

```python
request.user
```

to determine whose profile is being accessed.

The client does not provide a patient ID.

This prevents unnecessary trust in client-supplied identity information.

The flow is:

```text
JWT
 ↓
Authentication
 ↓
request.user
 ↓
PatientProfileSerializer
 ↓
Authenticated user's profile
```

---

# ==================================================

# PATCH

# ==================================================

Endpoint:

```http
PATCH /api/auth/patient/profile/
```

The API uses:

```python
request.data
```

to receive the update.

The serializer is initialized with:

```python
partial=True
```

This allows the patient to update only the fields they want to change.

Example:

```json
{
    "full_name": "Bisar Nawaz"
}
```

The update flow is:

```text
PATCH
 ↓
request.user
 ↓
request.data
 ↓
PatientProfileSerializer
 ↓
serializer.is_valid()
 ↓
serializer.save()
 ↓
PostgreSQL
```

---

# ==================================================

# VALIDATION

# ==================================================

Added validation for `full_name`.

Whitespace-only names are rejected.

Example:

```json
{
    "full_name": "   "
}
```

results in:

```text
400 Bad Request
```

Valid names with surrounding whitespace are normalized.

Example:

```text
"   Bisar Nawaz   "
```

becomes:

```text
"Bisar Nawaz"
```

No unnecessary changes were made to the existing `User` model.

---

# ==================================================

# EMAIL SECURITY

# ==================================================

Email modification was deliberately not included in the patient profile update workflow.

The email address is connected to:

* authentication
* login
* email verification

Allowing unrestricted email changes could create an account-security problem.

A future email-change feature should use a dedicated verification workflow.

---

# ==================================================

# SECURITY TESTING

# ==================================================

Tested:

### Patient

```text
GET patient profile
→ 200 OK
```

```text
PATCH patient profile
→ 200 OK
```

### Protected fields

Attempted modification of:

* `role`
* `email`
* `verification_status`
* `email_verified`

Protected fields remained unchanged.

The patient's role remained:

```text
PATIENT
```

---

## Authorization Testing

### Patient

```text
PATIENT → 200 OK
```

### Doctor

```text
DOCTOR → 403 Forbidden
```

### Admin

```text
ADMIN → 403 Forbidden
```

### Unauthenticated

```text
No JWT → 401 Unauthorized
```

The expected authorization boundary was therefore confirmed.

---

# ==================================================

# AUTHENTICATION VS AUTHORIZATION

# ==================================================

Authentication answers:

> Who are you?

JWT authentication establishes the identity of the user.

Authorization answers:

> Are you allowed to perform this action?

`IsPatientUser` performs the patient-specific authorization check.

Therefore:

```text
Authenticated ≠ Automatically Authorized
```

A doctor or admin can be authenticated while still receiving:

```text
403 Forbidden
```

from a patient-only endpoint.

---

# ==================================================

# HTTP METHODS AND STATUS CODES

# ==================================================

## GET

Used to retrieve the authenticated patient's profile.

Successful response:

```text
200 OK
```

## PATCH

Used to partially update permitted profile information.

Successful response:

```text
200 OK
```

Invalid request data:

```text
400 Bad Request
```

Authenticated but unauthorized user:

```text
403 Forbidden
```

Unauthenticated request:

```text
401 Unauthorized
```

---

# ==================================================

# DATABASE VERIFICATION

# ==================================================

After successful profile updates, the PostgreSQL database state was checked.

The patient's permitted profile information was updated correctly.

Protected account fields remained unchanged.

---

# ==================================================

# DAY 14 FINAL STATUS

# ==================================================

Completed:

* ✅ Existing User model inspected
* ✅ No unnecessary PatientProfile model created
* ✅ PatientProfileSerializer created
* ✅ Patient-specific permission created
* ✅ Patient Profile GET API created
* ✅ Patient Profile PATCH API created
* ✅ `request.user` used for profile ownership
* ✅ Protected fields secured
* ✅ `full_name` validation added
* ✅ PATCH partial updates implemented
* ✅ Patient access tested
* ✅ Doctor access tested
* ✅ Admin access tested
* ✅ Unauthenticated access tested
* ✅ PostgreSQL state verified

---

# ==================================================

# KEY LESSONS

# ==================================================

Day 14 reinforced:

* User model vs profile model
* Patient role
* `request.user`
* JWT authentication
* Authorization
* DRF permission classes
* Serializers
* Serializer fields
* `read_only_fields`
* GET requests
* PATCH requests
* `request.data`
* `serializer.is_valid()`
* `serializer.save()`
* `partial=True`
* Serializer validation
* HTTP status codes
* Protected account fields
* Client identity vs authenticated identity

---

# ==================================================

# DAY 14 RESULT

# ==================================================

The Patient Profile API is complete.

Patients can securely view and update their permitted profile information while protected account and authentication fields remain outside the patient's control.

The implementation continues the existing AnonMind architecture without introducing unnecessary abstractions or modifying the completed authentication and doctor workflows.
