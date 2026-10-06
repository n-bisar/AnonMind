# AnonMind — Day 25

## Phase 3 — Frontend & Dashboards

### Focus
Login Authentication — Patient & Doctor

---

## Objectives

- Connect the completed Login UI with the existing Django authentication APIs.
- Keep Patient and Doctor login flows completely separate.
- Verify the existing backend login behavior using Postman.
- Store JWT access and refresh tokens after successful login.
- Display backend authentication errors on the Login UI.
- Keep the existing Login UI and global theme unchanged.
- Do not modify the registration flow.
- Fix the backend role separation issue discovered during testing.

---

## Backend Login Endpoints

### Patient Login

```text
POST /api/patient/login/

Doctor Login
POST /api/doctor/login/

The frontend selects the appropriate endpoint based on the selected role.
Login Flow
Patient
Patient selected
      ↓
/api/patient/login/
      ↓
Patient authentication
      ↓
JWT access + refresh tokens

Doctor
Doctor selected
      ↓
/api/doctor/login/
      ↓
Doctor authentication
      ↓
JWT access + refresh tokens

Backend Issue Identified
During Postman testing, the patient and doctor login serializers were found to be role-loose.
A doctor's credentials could reach the patient login flow because authentication was performed using:
authenticate(email=email, password=password)


before checking the user's role.
Similarly, the doctor login serializer did not explicitly restrict authentication to Doctor accounts.
Backend Fix
The login serializers were updated to validate the user's role.
Patient Login
The authenticated user must have:
user.role == User.Role.PATIENT


Otherwise:
Email does not exist.

Doctor Login
The authenticated user must have:
user.role == User.Role.DOCTOR


Otherwise:
Email does not exist.

The existing email-verification and doctor verification-status checks were preserved.
Expected Authentication Behavior
Patient Login
Account	Result
Valid patient	Login successful
Unverified patient	Please verify your email
Doctor email	Email does not exist
Unknown email	Invalid email or password


Doctor Login
Account	Result
Valid verified/approved doctor	Login successful
Pending doctor	Application under verification
Rejected doctor	Application rejected
Patient email	Email does not exist
Unknown email	Invalid email or password


Frontend Changes
Login.jsx
Patient and Doctor login functions were kept separate:
handlePatientLogin()
handleDoctorLogin()

Patient login calls:
/api/patient/login/

Doctor login calls:
/api/doctor/login/

The Login button selects the correct function based on:
role === "patient"

or:
role === "doctor"

JWT Storage
After successful authentication:
localStorage.setItem("accessToken", response.data.access);
localStorage.setItem("refreshToken", response.data.refresh);

The /api/accounts/me/ request was not kept inside the Login flow.
Authenticated API requests will be handled later when the dashboards are implemented.
Axios
The temporary Axios request interceptor was removed.
Current src/api/axios.js:
import axios from "axios";

const api = axios.create({
  baseURL: "/",
});

export default api;

The interceptor will be introduced later when protected dashboard/API requests are required.
Error & Success Messages
The Login UI now displays backend responses.
Errors are shown using:
{formError && (
  <p className="mt-4 text-sm text-red-500 text-center">
    {formError}
  </p>
)}

Successful login displays:
Login successful!

UI Work
The Login UI was preserved.
Completed UI features:
- Patient/Doctor role selector
- Email field
- Password field
- Password visibility toggle
- Forgot password UI
- Login button
- Get Started navigation
- Global light/dark theme
- Login background assets
- AnonMind branding
- Backend error/success messages
Header alignment was also adjusted so the AnonMind branding aligns with the main content.
Header controls were arranged as:
Don't have an account? → Get Started → Theme Toggle

Testing
Backend login was tested independently through Postman.
Confirmed:
- Patient login endpoint works.
- Doctor login endpoint works.
- Doctor credentials cannot be used through Patient login.
- Patient credentials cannot be used through Doctor login.
- Correct JWT responses are returned for valid authentication.
- Doctor verification restrictions remain functional.
Day 25 Status
Completed
- [x] Login UI
- [x] Patient login integration
- [x] Doctor login integration
- [x] Patient/Doctor role separation
- [x] JWT token storage
- [x] Login error handling
- [x] Login success handling
- [x] Backend role validation
- [x] Postman verification
- [x] Axios cleanup
- [x] Login header alignment
- [x] Theme toggle ordering
Not Yet Implemented
- [ ] Patient dashboard
- [ ] Doctor dashboard
- [ ] Protected frontend routes
- [ ] Authenticated API interceptor
- [ ] Logout flow
- [ ] Dashboard-specific API integration
- [ ] Forgot password functionality