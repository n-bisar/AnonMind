# AnonMind — Day 21

## Phase 3 — Frontend & Dashboards

### Day 21: Patient Registration API Integration & Register Page Redesign

---

## Today's Objective

The main goals for Day 21 were:

1. Connect the React Register page to the Django backend.
2. Understand and implement Axios.
3. Solve frontend/backend communication during development.
4. Handle successful patient registration.
5. Build a registration-success modal.
6. Begin redesigning the Register page into a desktop-first two-column layout.
7. Start matching the Register page to the selected AnonMind visual reference.

---

# 1. Axios Setup

Axios was introduced to handle HTTP requests from React to the Django REST API.

Created:

`src/api/axios.js`

```js
import axios from "axios";

const api = axios.create({
  baseURL: "/",
});

export default api;

Axios was installed in the frontend project.

2. Vite Development Proxy

The frontend runs on:

http://localhost:5173

The Django backend runs on:

http://127.0.0.1:8000

Direct browser requests initially caused CORS problems.

Instead of modifying the frozen Django backend, a Vite development proxy was configured.

Current configuration:

server: {
  proxy: {
    "/api": {
      target: "http://127.0.0.1:8000",
      changeOrigin: true,
    },
  },
},

This allows React to make requests such as:

api.post("/api/patient/register/", data);

while Vite forwards the /api request to Django during development.

3. Patient Registration API

The actual backend endpoint was confirmed as:

POST /api/patient/register/

The registration payload is:

const data = {
  full_name: fullName,
  email: email,
  password: password,
  confirm_password: confirmPassword,
};

The backend successfully accepted the request and returned HTTP 201 Created.

The backend also sends the patient verification email after successful registration.

No backend behavior was modified.

4. React Registration State

The Register component now maintains:

const [role, setRole] = useState("patient");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [registrationSuccess, setRegistrationSuccess] = useState(false);

Password matching is derived using:

const passwordsMatch = password === confirmPassword;
5. Registration Submit Logic

The form prevents the browser's default submission:

event.preventDefault();

The registration data is then sent through Axios:

await api.post("/api/patient/register/", data);

After a successful request:

setRegistrationSuccess(true);

This changes the React state and causes the success modal to render.

6. Registration Success Modal

A success modal was implemented using conditional rendering:

{registrationSuccess && (
  ...
)}

The modal contains:

Success icon
"Registration Successful" heading
Email verification message
Continue button

The modal overlay uses:

fixed
inset-0
z-50
bg-black/40
flex
items-center
justify-center

Important concept learned:

z-50 controls stacking order and ensures that the modal appears above the registration form.

The modal card uses:

w-full
max-w-md
bg-background
rounded-2xl
p-8
shadow-xl
text-center

The Continue button resets the state:

setRegistrationSuccess(false)

which causes React to remove the modal from the UI.

7. Password Visibility

Password and confirm-password visibility toggles remain implemented using:

<Eye />
<EyeOff />

from lucide-react.

The input type changes between:

"text"

and:

"password"

depending on state.

8. Register Page Redesign

The original centered registration-form layout felt too much like a mobile registration page when displayed on desktop.

The selected design direction is now a:

Desktop-first two-column layout
---------------------------------------------------
|                                                 |
| Left Branding             Registration Card    |
|                                                 |
| A Safer Space                                  |
| for a Healthier You                            |
|                                                 |
| Privacy                                         |
| Support                                         |
| Kinder Tomorrow                                 |
|                                                 |
---------------------------------------------------

The main layout uses CSS Grid:

<div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">

The registration section is positioned in the second column:

<div className="lg:col-start-2">

The left section is currently:

<div className="hidden lg:flex lg:flex-col lg:justify-center">

This keeps the large branding section desktop-focused.

9. Left-Side Branding

The left side now contains:

Main heading
A Safer Space for a Healthier You
Supporting message
A private and supportive space where you can talk freely,
find understanding, and take the next step toward better
mental well-being.
Feature points
Your Privacy Matters

Talk freely, without judgment.

Icon:

LockKeyhole

Support When You Need It

AI-powered guidance and verified professionals.

Icon:

Heart

A Kinder Tomorrow

Because your mental health matters.

Icon:

Users

10. Registration Card Improvements

The registration card width was increased from max-w-md to max-w-lg.

Current structure:

<div className="mx-auto flex w-full max-w-lg items-center justify-center">

and:

<div className="w-full max-w-lg rounded-2xl border border-border bg-surface px-5 py-5 shadow-sm">

The unnecessary:

Patient Registration

heading was removed from inside the form.

The goal is to keep the registration card compact enough to fit naturally within the desktop viewport.

11. Scroll Behavior

An important design issue was identified.

Initially, the page was artificially made too tall using:

min-h-[80vh]

This created unnecessary vertical space.

That was removed.

The page currently uses:

<div className="min-h-screen bg-background px-6 py-6 lg:h-screen">

We deliberately did NOT keep:

lg:overflow-hidden

because that caused the bottom of the registration card to be clipped.

The goal is:

Make the complete desktop composition naturally fit within the viewport instead of hiding overflow.

12. Final Visual Direction

The selected visual reference for the Register page is a calm, modern, desktop-first AnonMind design featuring:

AnonMind branding
Large left-side messaging
Three supporting feature points
Registration card on the right
Soft background decoration
Teal/green accent color
Navy typography
Rounded cards
Subtle borders and shadows
Responsive layout
Dark-mode compatibility

The reference is being used as a visual direction rather than inserted as an image.

13. Important Architecture Rule

The backend architecture and behavior remain FROZEN.

Do not modify:

Django authentication behavior
Registration endpoint behavior
Email verification logic
Doctor approval logic
JWT behavior
Backend serializers
Backend models
Backend access control

Day 21 changes are frontend-side.

Day 21 Result

By the end of Day 21:

Axios installed and configured
Axios instance created
Vite API proxy configured
Patient registration successfully connected to Django
Registration returns successful response
Verification email flow confirmed
Success state implemented
Success modal implemented
Modal dismissal implemented
Password visibility controls working
Register page converted toward a two-column desktop layout
Left-side branding introduced
Three feature points added
Registration card width and spacing improved
Unnecessary "Patient Registration" heading removed
Desktop no-scroll composition is being refined
Next Day

Day 22 will focus on completing the Register page visual composition.

Planned work:

Finish the top-right utility area.
Add the existing dark-mode toggle.
Add the Login action.
Properly position these elements without creating a separate Navbar.
Refine the vertical spacing between the top area and main content.
Continue matching the selected reference design.
Add subtle background/decorative elements.
Check responsive behavior.
Re-test the registration-success modal after the layout changes.

Backend behavior will remain untouched.