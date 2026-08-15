# AnonMind — Day 12

## Doctor Verification Workflow

**Date:** August 15, 2026

---

## 1. Day 12 Objective

The main objective of Day 12 was to complete the **Doctor Verification Workflow**.

The Admin should be able to:

* Approve a pending doctor.
* Reject a pending doctor.
* Send an appropriate email after approval/rejection.
* Prevent invalid verification state transitions.
* Allow verified doctors to log in.
* Prevent rejected doctors from logging in.

---

# 2. Approve Doctor API

## Endpoint

```text
PATCH /admin/doctors/<doctor_id>/approve/
```

The endpoint is protected using:

```python
permission_classes = [IsAdminUser]
```

Therefore, only authenticated Admin users can approve doctors.

## Approval Flow

```text
PENDING
   ↓
VERIFIED
   ↓
Doctor can log in
   ↓
Approval email
```

## Implementation

The API:

1. Finds the doctor using `get_object_or_404()`.
2. Ensures the requested user is actually a doctor.
3. Checks that the current verification status is `PENDING`.
4. Changes the status to `VERIFIED`.
5. Saves only the `verification_status` field.
6. Sends the approval email.
7. Returns `HTTP 200 OK`.

### Important validation

Only this transition is allowed:

```text
PENDING → VERIFIED
```

These transitions are rejected:

```text
VERIFIED → VERIFIED
REJECTED → VERIFIED
```

The API returns:

```text
HTTP 400 Bad Request
```

when the doctor is not pending.

---

# 3. Rejection Doctor API

## Endpoint

```text
PATCH /admin/doctors/<doctor_id>/reject/
```

The endpoint is protected using:

```python
permission_classes = [IsAdminUser]
```

## Rejection Flow

```text
PENDING
   ↓
REJECTED
   ↓
Doctor cannot log in
   ↓
Rejection email
```

## Implementation

The API:

1. Finds the doctor using `get_object_or_404()`.
2. Ensures the requested user is a doctor.
3. Checks that the current verification status is `PENDING`.
4. Changes the status to `REJECTED`.
5. Saves only the `verification_status` field.
6. Sends the rejection email.
7. Returns `HTTP 200 OK`.

### Important validation

Only this transition is allowed:

```text
PENDING → REJECTED
```

These transitions are rejected:

```text
REJECTED → REJECTED
VERIFIED → REJECTED
```

The API returns:

```text
HTTP 400 Bad Request
```

when the doctor is not pending.

---

# 4. State Machine

The doctor verification state machine is now:

```text
              ┌───────────────┐
              │    PENDING    │
              └───────┬───────┘
                      │
             ┌────────┴────────┐
             │                 │
          Approve            Reject
             │                 │
             ↓                 ↓
       ┌──────────┐      ┌──────────┐
       │ VERIFIED │      │ REJECTED │
       └──────────┘      └──────────┘
```

Valid transitions:

```text
PENDING → VERIFIED
PENDING → REJECTED
```

Invalid transitions:

```text
VERIFIED → VERIFIED
VERIFIED → REJECTED
REJECTED → REJECTED
REJECTED → VERIFIED
```

The API validates the current state before performing a transition.

---

# 5. PATCH

`PATCH` is used because we are modifying an existing doctor rather than creating a new record.

For example:

```text
PATCH /admin/doctors/<doctor_id>/approve/
```

does not replace the entire doctor object.

It changes only the verification state:

```text
verification_status
```

This makes `PATCH` appropriate for the approval and rejection operations.

---

# 6. get_object_or_404()

The verification APIs use:

```python
doctor = get_object_or_404(
    User,
    id=doctor_id,
    role=User.Role.DOCTOR,
)
```

This means:

> Find the requested user who is a doctor. If no matching doctor exists, return HTTP 404.

The `role=User.Role.DOCTOR` condition prevents the verification workflow from accidentally processing a Patient or Admin account.

---

# 7. Model Update

The approval operation uses:

```python
doctor.verification_status = User.VerificationStatus.VERIFIED
```

The rejection operation uses:

```python
doctor.verification_status = User.VerificationStatus.REJECTED
```

These assignments initially change the model object in Python memory.

They do not immediately update PostgreSQL.

---

# 8. save()

The changes are persisted using:

```python
doctor.save(
    update_fields=["verification_status"]
)
```

`save()` writes the change to the database.

`update_fields` specifies that only:

```text
verification_status
```

should be updated.

This makes the intended database change explicit and avoids unnecessarily saving unrelated fields.

---

# 9. Email Workflow

The existing email infrastructure was reused.

Two helper functions were added:

```text
send_doctor_approval_email()
send_doctor_rejection_email()
```

The API sends the email only after the verification status has successfully been changed and saved.

## Approval

```text
PENDING
   ↓
VERIFIED
   ↓
save()
   ↓
Approval email
```

## Rejection

```text
PENDING
   ↓
REJECTED
   ↓
save()
   ↓
Rejection email
```

The project is currently using the development/console email backend, so emails are being displayed in the **VS Code terminal** rather than being delivered to the doctor's real inbox.

Real SMTP/email delivery can be configured later during production deployment.

---

# 10. Rejection Reason

A rejection reason was **not added yet**.

The current architecture does not require a separate rejection model or table for the basic verification workflow.

The current rejection endpoint therefore performs:

```text
PENDING → REJECTED
```

without storing a rejection reason.

A rejection reason can be considered later if the product requirements require admins to record and display one.

---

# 11. Authentication and Authorization

The verification endpoints use:

```python
permission_classes = [IsAdminUser]
```

The workflow therefore distinguishes between authentication and authorization.

```text
Authentication
→ Who is making the request?

Authorization
→ Is that user allowed to approve/reject doctors?
```

Only Admin users should be able to access these operations.

Expected behavior:

```text
Admin            → Allowed
Doctor           → 403 Forbidden
Patient          → 403 Forbidden
Unauthenticated  → 401 Unauthorized
```

---

# 12. HTTP Status Codes

The verification APIs use appropriate status codes.

| Situation                  |           Status |
| -------------------------- | ---------------: |
| Successful approval        |           200 OK |
| Successful rejection       |           200 OK |
| Invalid verification state |  400 Bad Request |
| Doctor does not exist      |    404 Not Found |
| Authenticated non-admin    |    403 Forbidden |
| Unauthenticated request    | 401 Unauthorized |

---

# 13. Testing Completed

## Approval

* Admin approved a pending doctor.
* Doctor status changed to `VERIFIED`.
* Database state was verified.
* Approval email appeared in the VS Code terminal.
* Verified doctor can log in.
* Attempting to approve an already verified doctor returns `400`.
* Duplicate approval email is not sent for the invalid second approval.

## Rejection

* Admin rejected a pending doctor.
* Doctor status changed to `REJECTED`.
* Rejection email appeared in the VS Code terminal.
* Rejected doctor disappeared from the pending-doctor list.
* Rejected doctor cannot log in.

---

# 14. Final Verification State

The completed business logic is:

```text
PENDING
│
├── Approve → VERIFIED
│                │
│                └── Login allowed
│
└── Reject  → REJECTED
                 │
                 └── Login denied
```

Email behavior:

```text
Approve → Approval email
Reject  → Rejection email
```

---

# 15. Production Considerations

The following improvements can be considered later:

1. Configure a real SMTP/email provider for production.
2. Consider asynchronous email sending so API responses are not delayed by email delivery.
3. Consider storing a rejection reason if the product requires an audit trail.
4. Add stronger audit logging for admin verification actions.
5. Consider database-level protections for verification state transitions if the system becomes highly concurrent.
6. Add automated API tests for all valid and invalid state transitions.

These improvements are not necessary for the current basic workflow and should not be introduced prematurely.

---

# 16. Day 12 Result

The core Doctor Verification Workflow has been implemented:

```text
Admin
  ↓
Pending Doctor
  ↓
┌───────────────┐
│               │
Approve       Reject
│               │
↓               ↓
VERIFIED      REJECTED
│               │
↓               ↓
Login ✅       Login ❌
```

The backend now has separate Admin endpoints for approving and rejecting doctors while enforcing the `PENDING` state requirement.

---

## Day 12 Status

**Core Doctor Verification Workflow: COMPLETED ✅**

**Remaining verification:** final permission-boundary tests for Patient, Doctor, and unauthenticated requests should be performed before formally closing Day 12.
