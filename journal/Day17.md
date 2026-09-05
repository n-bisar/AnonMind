# AnonMind — Day 17

## Focus

**Backend Business Logic & Access Control Review**

Day 17 was the final security and business-logic review of **Phase 2 — Core Backend APIs**.

The goal was not to add unnecessary features or change the frozen authentication architecture, but to verify that the existing backend behaves correctly across roles, verification states, authentication, and protected APIs.

---

## 1. Role-Based Access Control Review

The backend currently has three roles:

* `PATIENT`
* `DOCTOR`
* `ADMIN`

Custom permission classes were reviewed:

* `IsPatientUser`
* `IsDoctorUser`
* `IsAdminUser`

The permission layer is responsible for **role-based authorization**.

### Result

Role separation was confirmed to be working correctly.

* Patients can access patient-only APIs.
* Doctors can access doctor-only APIs.
* Admins can access admin-only APIs.
* Patients cannot access doctor APIs.
* Doctors cannot access patient APIs.
* Patients and doctors cannot access admin APIs.

No changes were required to the existing permission classes.

---

## 2. Doctor Verification Logic Review

Doctor verification states remain:

* `PENDING`
* `VERIFIED`
* `REJECTED`

The doctor login business logic was reviewed.

A doctor must satisfy the appropriate verification requirements before receiving a JWT.

### Tested behavior

**PENDING doctor**

* Cannot log in.
* Does not receive a JWT.

**REJECTED doctor**

* Cannot log in.
* Does not receive a JWT.

**VERIFIED + email-verified doctor**

* Can log in.
* Receives a JWT.
* Can access protected doctor functionality.

This confirmed that the existing login-layer verification checks are functioning as intended.

---

## 3. Permission vs Verification Responsibility

A key architectural decision was made during the review.

The current system separates:

### Authentication / Login Layer

Responsible for determining whether a doctor is allowed to obtain an authenticated session.

### Permission Layer

Responsible for determining whether an authenticated user's **role** is allowed to access an API.

### Business Logic

Responsible for operation-specific rules and state transitions.

Therefore, the existing `IsDoctorUser` permission was **not modified** simply to duplicate verification-state checks.

No demonstrated security problem required such a change.

---

## 4. Admin Access Review

Admin-only endpoints were reviewed and tested.

These include:

* Pending doctor listing
* Doctor detail viewing
* Doctor approval
* Doctor rejection
* Doctor document viewing

All are protected using `IsAdminUser`.

### Result

* Patient → Admin API: blocked
* Doctor → Admin API: blocked
* Admin → Admin API: allowed

The admin boundary is functioning correctly.

---

## 5. Doctor State Transition Review

The doctor verification state machine was validated.

The intended transitions are:

```text
PENDING
   ├──→ VERIFIED
   └──→ REJECTED
```

Invalid transitions were tested.

Examples:

* `VERIFIED → VERIFIED` ❌
* `REJECTED → VERIFIED` ❌
* `VERIFIED → REJECTED` ❌
* `REJECTED → REJECTED` ❌

Only pending doctors can currently be approved or rejected.

The existing state-transition protection works correctly.

---

## 6. General Authenticated Endpoints

The following endpoints use `IsAuthenticated`:

* Current authenticated user (`/me/`)
* Logout

This was confirmed to be intentional.

These endpoints are not role-specific and therefore should be available to authenticated:

* Patients
* Doctors
* Admins

No change was required.

---

## 7. Object-Level Access Review

Doctor profile access was reviewed.

A doctor accesses their own profile through:

```python
request.user.doctor_profile
```

rather than supplying another doctor's ID.

Admin endpoints that accept a `doctor_id` are protected by `IsAdminUser`.

Therefore, no patient or doctor can use those endpoints to retrieve arbitrary doctor information.

---

## 8. Inactive User Review

The behavior of an inactive user was also tested.

The existing authentication and permission behavior was reviewed without introducing additional permission logic unnecessarily.

No architectural change was required based on the test.

---

# Final Day 17 Conclusion

The Phase 2 backend security and access-control review was completed successfully.

No actual access-control vulnerability was identified that required changing the current architecture.

The backend now has a clear separation between:

```text
Authentication
      ↓
Can this user obtain a JWT?
      ↓
Role Permissions
      ↓
Can this role access this API?
      ↓
Business Logic
      ↓
Is this particular operation/state transition allowed?
```

---

# Phase 2 Completion

With Day 17 complete, **Phase 2 — Core Backend APIs is officially COMPLETE.**

### Phase 1 — Authentication

**Status: COMPLETE ✅**

### Phase 2 — Core Backend APIs

**Status: COMPLETE ✅**

Completed areas include:

* Patient profile APIs
* Doctor profile APIs
* Admin doctor management
* Doctor approval/rejection
* Doctor verification workflow
* Email verification interaction
* JWT authentication
* Role-based access control
* Business-state validation
* Security/access-control testing

### Next Phase

**Phase 3 — Frontend & Dashboards**

The project can now move from backend-first development toward the frontend and user-facing dashboards.

---

## Day 17 Status

**Phase 2 — COMPLETE ✅**
**Security & Access-Control Review — COMPLETE ✅**
**No architectural changes required.**
