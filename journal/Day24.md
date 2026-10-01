# AnonMind — Day 24

## Phase 3 — Frontend & Dashboards

### Focus
Login Page UI — Design & Theme Integration

---

## Completed Today

### 1. Login Page UI

Completed the Login page design with:

- Welcome Back heading
- Login description
- Patient / Doctor role selector
- Email Address field
- Password field
- Password visibility toggle
- Forgot Password link
- Login button
- OR divider
- Get Started link

---

### 2. Global Theme Integration

The Login page now uses the existing global `ThemeContext`.

The theme is obtained using:

```jsx
const { theme, setTheme } = useContext(ThemeContext);

Dark mode is derived using:

const darkMode = theme === "dark";

The theme selected on another page, such as Register, is reflected on Login.

3. Existing Register Assets Reused

Login now uses the same actual assets as Register.

Imports:

import lightBackground from "../assets/register-light.png";
import darkBackground from "../assets/register-dark.png";
import logo from "../assets/logo.png";

The background switches according to the global theme:

backgroundImage: `url(${
  theme === "light" ? lightBackground : darkBackground
})`
4. Background Layering

The background was placed on a lower layer:

className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"

The Login header and main content were placed above it using:

relative z-10

This prevents the background from covering the Login UI.

5. Header

The Login header contains:

Actual AnonMind logo
AnonMind text
Theme toggle
"Don't have an account?"
Get Started button

The Get Started button navigates to:

navigate("/register")
6. Dark Mode Styling

Dark mode styling was added for:

Login card
Patient / Doctor selector
Email input
Password input
Labels
Headings
Descriptions
Feature section
Header controls
Divider

The Login UI follows the same general visual language as Register.

7. Backend

No Django backend code was changed.

The backend architecture and existing registration functionality remain frozen.

Current Status
Login UI

DONE

Login Functionality

NOT CONNECTED YET

The Login button is currently UI-only.

Next Step — Day 25

Day 25 will focus on connecting the Login page to the existing backend authentication APIs.

Planned work:

Inspect the existing login API endpoints.
Determine the exact Patient and Doctor login request format.
Connect the Login button to the appropriate endpoint.
Handle successful login.
Handle invalid email/password.
Handle unverified email.
Handle Patient vs Doctor login.
Implement the appropriate post-login navigation.
Test the complete login flow.
Important

Do NOT modify the Django backend unless explicitly required.

The existing backend architecture and behavior remain frozen.