# Day 23 — AnonMind

## Phase 3 — Frontend & Dashboards

### Main Goal
Complete and polish the Patient and Doctor Registration flow.

---

## 1. Doctor Registration Wizard

Converted the Doctor registration form into a 3-step wizard:

1. Account
2. Professional
3. Verification

Added a visual step indicator showing the current progress.

---

## 2. Step 1 — Account

Doctor account fields:

- Full Name
- Email
- Password
- Confirm Password

Added validation for:

- Required fields
- Password minimum length of 8 characters
- Password confirmation

Added a visible password instruction:

"Password must be at least 8 characters."

Added error messages for invalid input.

---

## 3. Step 2 — Professional Information

Added fields for:

- Phone Number
- Medical Registration Number
- Specialization
- Years of Experience
- Hospital / Workplace

Added validation to ensure all required professional information is provided before moving to Step 3.

Added:

- Back button
- Continue button

---

## 4. Step 3 — Verification Documents

Added document uploads for:

- Medical Degree
- Medical License
- Government ID
- Profile Photo

Added validation requiring all four documents.

Accepted formats:

- Medical Degree → PDF, JPG, PNG
- Medical License → PDF, JPG, PNG
- Government ID → PDF, JPG, PNG
- Profile Photo → JPG, PNG

Added a note explaining accepted document formats.

Added selected filename display after uploading each document.

Example:

"Selected: MBBS_Certificate.pdf"

---

## 5. Doctor Registration API

Connected the completed Doctor form to:

POST /api/doctor/register/

The request uses FormData because the registration includes uploaded files.

Successfully tested the complete registration flow.

After successful submission, the frontend displays:

"Registration Successful"

and:

"Your registration has been submitted successfully. Your application is now pending admin verification."

---

## 6. Role Switching

Improved Patient/Doctor switching.

When switching roles:

- Existing form errors are cleared.
- Doctor wizard resets to Step 1.

This prevents the user from returning to an old Doctor step or seeing an unrelated validation error.

---

## 7. Password UX

Added a visible password requirement to both Patient and Doctor registration:

"Password must be at least 8 characters."

The frontend now enforces the 8-character minimum.

---

## 8. Duplicate Email Discovery

During testing, Doctor registration with an already-used email produced a PostgreSQL duplicate-key error.

The important error was:

"duplicate key value violates unique constraint accounts_user_email_key"

This confirms that email addresses are unique in the backend database.

The frontend registration flow itself was working correctly. The issue is that duplicate-email handling on the backend should eventually return a clean API validation message instead of exposing a Django error page.

This was identified but not changed on Day 23.

---

## 9. Email Notifications

Doctor registration currently does not send an email after submission.

The current flow is:

Doctor submits application
        ↓
Backend creates application
        ↓
Application remains pending
        ↓
Frontend shows success message

Future work can add:

Doctor submits application
        ↓
Confirmation email
        ↓
Admin reviews application
        ↓
Approval / rejection email

This was intentionally left for a future task.

---

# Day 23 Status

## Completed

- [x] Patient registration
- [x] Doctor registration
- [x] Three-step Doctor wizard
- [x] Step 1 validation
- [x] Password minimum length
- [x] Password instructions
- [x] Step 2 validation
- [x] Step 3 document validation
- [x] File-type validation
- [x] Selected filename display
- [x] Role-switch reset
- [x] Doctor API submission
- [x] Success modal
- [x] End-to-end registration testing

## Deferred

- [x] Duplicate-email backend error handling
- [x] Doctor application email
- [ ] Admin verification workflow
- [ ] Doctor approval/rejection email
- [ ] Login functionality