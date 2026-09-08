# Day 20 — Get Started / Registration Page

## Objective

Begin transforming the static AnonMind landing page into a functional React application by starting the public registration flow.

The focus of Day 20 was the **Get Started / Registration page**.

The backend architecture and authentication system remain completely frozen.

---

## Backend Constraint

No changes were made to:

- Django
- Django REST Framework
- PostgreSQL
- SimpleJWT
- Authentication architecture
- Existing backend APIs
- Existing backend behavior

The frontend is being built around the existing backend architecture.

---

## Frontend Work Completed

### 1. Added `/register` Route

The React Router configuration was updated to include:

```text
/       → Home
/register → Register

A new:

src/pages/Register.jsx

page was created.

2. Registration Page Foundation

Created a centered registration card using the existing AnonMind theme.

The page contains:

Create Your Account heading
Supporting text
Theme-compatible background
Responsive centered card
Rounded borders
AnonMind typography and theme colors

The design follows the approved AnonMind visual language:

Calm
Clean
Minimal
Professional
Trustworthy
Responsive
Light/dark mode compatible
3. Public Role Selection

The registration page exposes only two public roles:

Patient
Doctor

There is intentionally no Admin option.

Admin access is intended to remain a separate protected/private flow.

The frontend must never treat hidden admin UI as a security mechanism; authorization remains a backend responsibility.

4. React State — Role

Introduced React useState:

const [role, setRole] = useState("patient");

The role selector changes the state using:

setRole("patient");
setRole("doctor");

This was used to teach:

React state
useState
JavaScript array destructuring
State setters
React re-rendering
Event handlers
Arrow functions
5. Conditional Rendering

The Patient registration UI is conditionally displayed using:

{role === "patient" && (
  ...
)}

This introduced:

JSX expressions
Curly braces in JSX
JavaScript comparison with ===
Logical &&
Conditional rendering

The patient registration section appears only when Patient is selected.

6. Patient Registration Fields

The Patient flow currently contains:

Full Name
Email Address
Password
Confirm Password

Password fields use:

type="password"
7. Password Visibility Toggle

Added password visibility controls using lucide-react:

Eye
EyeOff

Separate state variables are used:

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

This allows the two password fields to operate independently.

The password type dynamically changes using a ternary expression:

type={showPassword ? "text" : "password"}

The same concept is used for Confirm Password.

8. Controlled Inputs

The following form values are now controlled by React state:

const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

Inputs use the controlled-input pattern:

value={...}
onChange={(event) => set...(event.target.value)}

This introduced:

Controlled components
value
onChange
Event objects
event.target
event.target.value
React as the source of truth for form values
9. Password Matching

Added derived state:

const passwordsMatch = password === confirmPassword;

The UI displays an error when:

confirmPassword && !passwordsMatch

This introduced the concept of derived values.

A separate useState variable was not created for passwordsMatch because it can be calculated directly from existing state.

10. Form Submission

The Patient registration fields were placed inside a semantic:

<form>

The form uses:

onSubmit={handleSubmit}

The submission handler currently prevents the browser's default form submission:

event.preventDefault();

For learning/testing, the current handler temporarily logs the form values to the browser console.

The password logging is temporary and must NOT remain in the final application.

Important Architecture Decision

The frontend will eventually select the correct existing backend endpoint based on the selected role.

Conceptually:

Patient
   ↓
POST /api/auth/patient/register/

Doctor
   ↓
POST /api/doctor/register/

The backend determines the registration behavior from the endpoint being called.

Axios/API integration has NOT been implemented yet.

Registration Success UX

We decided that successful registration should eventually display an AnonMind-styled modal rather than a browser alert().

The intended message is approximately:

Check your email

We've sent a verification link to your email address.

Please verify your email before signing in.

However, this modal should only appear after the backend confirms successful registration.

We have NOT implemented the modal yet.

Design / UX Decision

The registration page should avoid unnecessary scrolling on normal laptop/desktop screens.

A signup form that unnecessarily requires desktop users to scroll feels cumbersome.

The final design should:

Be compact
Have comfortable spacing
Fit naturally within common desktop/laptop viewports where practical
Remain scrollable on smaller screens
Remain responsive
Avoid excessive vertical padding
Avoid oversized form controls

Mobile scrolling is acceptable and expected when the viewport is too small.

Day 20 Learning Topics
React
Functional components
useState
State updates
Re-rendering
Conditional rendering
Controlled inputs
Form submission
Event handling
JavaScript
const
Array destructuring
Arrow functions
===
!
Ternary operator
Logical &&
Template literals
Derived values
JSX
JSX expressions
Curly braces
Nested elements
Conditional JSX
Event handlers
className
HTML
Semantic <form>
<label>
<input>
<button>
Input types
type="submit"
type="button"
aria-label
Tailwind CSS

Worked with concepts including:

Flexbox
Grid
Responsive utilities
Spacing
Width constraints
Borders
Rounded corners
Theme colors
Focus states
Hover states
Absolute positioning
Relative positioning
Opacity
Transitions
Current Status

The landing page remains:

Navbar
↓
Hero
↓
Trust Indicators
↓
Audience Cards
↓
CTA

The new registration flow is:

Landing Page
     ↓
Get Started
     ↓
/register
     ↓
Create Your Account
     ↓
Patient / Doctor
     ↓
Patient registration UI

The registration UI is currently frontend-only.

No API request is being made yet.