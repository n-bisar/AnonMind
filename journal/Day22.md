# AnonMind — Day 22
## Phase 3 — Frontend & Dashboards
### Focus: Registration Page Visual Design & Theme-Based Backgrounds

---

## Day 22 Objective

The main objective of Day 22 was to continue building and refining the AnonMind Patient Registration page.

The focus was primarily on the visual experience and page structure.

Backend architecture and backend behavior remained completely untouched.

---

# 1. Home → Register Navigation

Connected the existing "Get Started" buttons to the Register page.

### Hero Get Started

The main Hero section's Get Started button now navigates to:

```text
/register
Navbar Get Started

The Navbar's Get Started button also navigates to:

/register
React Router

Used:

useNavigate()

to perform client-side navigation.

The reusable Button component was updated to accept and forward an onClick prop.

2. Register Page Branding

Added the AnonMind branding to the top-left of the registration page.

The branding consists of:

AnonMind logo image
"AnonMind" text

The existing:

src/assets/logo.png

asset was reused.

3. Register Page Top Utility Area

Added the top-right utility section:

Already have an account?    Login    [Theme Toggle]

No separate Navbar was created for the Register page.

This keeps the registration page visually independent from the main landing-page Navbar.

4. Dark Mode Integration

Connected the Register page to the existing:

ThemeContext

using:

useContext()

The page now uses the existing global theme state rather than creating a separate theme system.

The theme toggle switches between:

light
dark

The displayed icon also changes:

Light mode → Moon icon
Dark mode  → Sun icon
5. Theme-Based Registration Backgrounds

Created separate background assets for the registration page:

register-light.png
register-dark.png

Stored inside:

src/assets/

The Register page dynamically selects the appropriate background:

theme === "light" ? lightBackground : darkBackground

Therefore:

Light mode
    ↓
register-light.png

Dark mode
    ↓
register-dark.png

The background automatically changes when the user switches themes.

6. Background Layering

The registration background was placed in an absolute background layer.

The UI content was placed above it using:

relative z-10

This ensures:

Background
    ↓
Registration UI

rather than allowing the background image to cover the interactive content.

Also used:

overflow-hidden

to prevent decorative background elements from creating unwanted overflow.

7. Registration Page Layout

Maintained the desktop-first two-column structure.

Left side

Contains:

Main heading
Supporting paragraph
Privacy feature
Support feature
Kinder Tomorrow feature
"You are not alone." reassurance line
Right side

Contains:

Registration card
Patient / Doctor selector
Patient registration form
Password visibility controls
Create Account button
Terms and Privacy text
8. Registration Card Refinement

Adjusted the vertical padding of the registration card:

py-5 → py-4

This slightly reduced unnecessary vertical space while keeping the card comfortable.

9. Form Spacing Refinement

Reduced the spacing between registration fields:

mt-5 → mt-4

This was done to make the registration form more compact without significantly changing the visual appearance.

10. Terms & Privacy Text

Added the following text below the Create Account button:

By creating an account, you agree to our
Terms of Service and Privacy Policy.

The links currently function as visual elements only.

Actual Terms and Privacy pages were not implemented yet.

11. Reassurance Text

Added:

You are not alone.

to the bottom of the left-side registration content.

This provides a subtle emotional closing to the feature section.

12. Existing Patient Registration Functionality

The existing patient registration functionality was preserved.

The frontend continues to call:

POST /api/patient/register/

with:

full_name
email
password
confirm_password

The existing verification-email flow remains unchanged.

The existing success modal also remains unchanged.

13. Backend Safety

No Django backend code was modified.

Backend architecture and behavior remain frozen.

The following remain unchanged:

API endpoint
Authentication architecture
Patient registration logic
Email verification flow
JWT architecture
Backend models
Backend serializers
Backend views
14. Current Register Page State

The current Register page now includes:

                    AnonMind
                        
                Already have an account?
                    Login   [Theme]

        ┌───────────────────┬──────────────────────┐
        │                   │                      │
        │ A Safer Space     │ Create Your Account  │
        │ for a Healthier   │                      │
        │ You               │ Patient | Doctor     │
        │                   │                      │
        │ Supporting text   │ Full Name            │
        │                   │ Email                │
        │ 🔒 Privacy        │ Password             │
        │ ❤️ Support        │ Confirm Password     │
        │ 👥 Kinder         │                      │
        │                   │ Create Account       │
        │ You are not alone │ Terms / Privacy      │
        │                   │                      │
        └───────────────────┴──────────────────────┘

The page also switches between the light and dark registration backgrounds according to the current theme.

15. What Was NOT Done

The following were intentionally left for future days:

Login functionality from Register page
Doctor registration UI
Advanced form validation
Registration loading state
Detailed API error display
Duplicate submission prevention
Terms of Service page
Privacy Policy page
Final responsive/mobile optimization
Final registration UX testing
Day 22 Status
Phase 3 — Frontend & Dashboards

Day 22 is COMPLETE.

Completed
 Home Get Started navigation
 Navbar Get Started navigation
 Register page branding
 Register top utility area
 ThemeContext integration
 Light mode background
 Dark mode background
 Dynamic theme-based background switching
 Background layering
 Registration card spacing refinement
 Form spacing refinement
 Terms / Privacy text
 "You are not alone." text
 Existing patient registration functionality preserved
 Backend remains frozen
Next Day
Day 23 — Patient Registration UX & Validation

The next focus will be improving the actual patient registration experience.

Planned areas:

Required-field validation
Password requirements
Password confirmation validation
Better validation messages
Registration loading state
Preventing accidental duplicate submissions
API error display
Registration success-flow polish
Final patient registration testing

The implementation will continue one small task at a time.