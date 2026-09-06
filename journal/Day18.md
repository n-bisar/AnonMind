# AnonMind — Day 18

## Focus

**Frontend Foundation — React Architecture, Responsive UI & Theme System**

Day 18 marked the beginning of the **Frontend & UI phase** of AnonMind.

The main goal was to establish the React frontend architecture, create the initial responsive UI foundation, and implement a reusable light/dark theme system.

---

## Frontend Stack

The frontend stack was finalized as:

- React
- Vite
- JavaScript
- React Router
- Tailwind CSS
- Axios
- Context API

The backend remains unchanged:

- Python
- Django
- Django REST Framework
- PostgreSQL
- SimpleJWT

The frontend will consume the existing backend APIs rather than modifying backend architecture.

---

## 1. React + Vite Foundation

The empty `frontend/` directory was initialized using Vite with React.

The frontend development server was successfully started using:


npm run dev

The Vite boilerplate was cleaned up and unnecessary starter files were removed.

The frontend structure was established as:

frontend/
└── src/
    ├── assets/
    ├── components/
    ├── pages/
    ├── services/
    ├── context/
    ├── routes/
    ├── App.jsx
    ├── index.css
    └── main.jsx
2. React Application Entry Point

The role of main.jsx was understood in detail.

The React application follows:

index.html
    ↓
main.jsx
    ↓
ThemeProvider
    ↓
App
    ↓
React Router
    ↓
Pages

Important concepts understood:

StrictMode
createRoot()
document.getElementById("root")
React component rendering
JSX
default imports/exports
3. React Router Foundation

React Router was installed and configured.

The initial application route was created:

/

The route renders the Home page.

The difference between:

frontend routes
backend API endpoints

was established.

React Router controls frontend navigation, while Django remains responsible for backend authentication, authorization, and security.

4. Component-Based Architecture

The first reusable components were created:

src/components/
├── Button.jsx
└── Navbar.jsx
Button

A reusable Button component was created with:

children
variant
className

Two initial variants were introduced:

primary
secondary

This introduced and reinforced:

React props
destructuring
default prop values
children
template literals
reusable components
component composition
5. Responsive UI Foundation

The frontend was designed to be responsive across:

Desktop
Laptop
Tablet
Mobile

The project is not being built as separate desktop and mobile interfaces.

Instead, the same React components adapt using responsive Tailwind utilities.

Examples included:

text-4xl sm:text-5xl lg:text-6xl

and:

flex-col sm:flex-row

The importance of designing responsiveness into components from the beginning was established.

6. AnonMind Visual Direction

The first generated AnonMind UI design was selected as the primary visual reference.

The visual direction was established as:

Calm
Clean
Trustworthy
Minimal
Professional
Approachable
Mental-health focused

The main visual language includes:

Deep navy typography
Teal/green brand accents
Very light backgrounds
Dark-mode surfaces
Soft borders
Rounded cards
Clean typography
Organic and approachable visual elements

The generated design is being used as a visual reference, rather than being blindly pixel-copied.

7. Theme System

A semantic color system was created in:

src/index.css
Light Theme
Background:   #f8fbfa
Surface:      #ffffff
Text:         #102a43
Muted Text:   #627d98
Primary:      #159a8a
Primary Dark: #0f766e
Border:       #d9e5e2
Dark Theme
Background:   #0f1f2e
Surface:      #162b3d
Text:         #f1f7f6
Muted Text:   #a9bdc5
Primary:      #35b8a5
Primary Dark: #2a9586
Border:       #294354

Semantic Tailwind color utilities were created:

bg-background
bg-surface
text-text
text-text-muted
bg-primary
bg-primary-dark
border-border

This avoids scattering hardcoded colors throughout the application.

8. React Context API

A theme context was created:

src/context/ThemeContext.jsx

The Context API was introduced to avoid prop drilling.

The architecture became:

createContext()
      ↓
ThemeContext
      ↓
ThemeProvider
      ↓
Components consume context

The following React concepts were understood:

createContext()
Context Provider
children
useContext()
shared state
prop drilling
9. Theme State

React useState() was used to manage the current theme:

const [theme, setTheme] = useState(...)

The distinction between:

theme

and:

setTheme

was established.

theme stores the current value.

setTheme() changes the state and causes React to re-render affected components.

10. useEffect() and DOM Interaction

useEffect() was used to synchronize React state with the browser DOM.

The application adds or removes:

.dark

from the <html> element.

The flow is:

theme changes
      ↓
useEffect()
      ↓
<html class="dark">
      ↓
dark CSS variables activate
      ↓
UI changes

The dependency array:

[theme]

was understood as telling React to run the effect when the theme changes.

The difference between React rendering and external DOM side effects was also established.

11. Persistent Theme

Browser localStorage was introduced.

The application now:

Reads the saved theme when React initializes
Saves the selected theme whenever it changes

The flow is:

User selects Dark
      ↓
setTheme("dark")
      ↓
useEffect()
      ↓
localStorage.setItem("theme", "dark")

On refresh:

localStorage.getItem("theme")
      ↓
"dark"
      ↓
useState("dark")
      ↓
Dark mode restored

Theme persistence was successfully tested.

12. Theme Toggle

A theme toggle was added to the Navbar.

The toggle uses:

setTheme(theme === "light" ? "dark" : "light")

and displays:

🌙

for light mode and:

☀️

for dark mode.

The complete interaction was tested successfully.

13. Landing Page Foundation

The Home page was converted from a placeholder into the beginning of the real AnonMind landing page.

The hero section now contains:

Privacy-focused eyebrow text
Main heading
Supporting description
Get Started CTA
Learn More CTA

A responsive three-card feature section was also added:

Privacy First
Verified Professionals
Support When You Need It

The cards use the semantic theme utilities so they automatically adapt to light and dark mode.

14. Responsive Testing

The landing page was tested using a mobile viewport.

The current mobile layout works, but two visual refinements were identified for Day 19:

Navbar

The mobile Navbar currently feels congested because it contains:

AnonMind
Theme Toggle
Login
Get Started

in a single row.

Hero CTA

The Get Started button currently stretches across the available mobile width and feels larger than necessary.

These are not functional problems. They are intentional UI refinement tasks for Day 19.

Day 18 Outcome

The React frontend is now successfully running with:

React + Vite                 ✅
Tailwind CSS                 ✅
React Router                 ✅
Responsive foundation        ✅
Reusable Button              ✅
Reusable Navbar              ✅
Theme variables              ✅
Dark mode                    ✅
Context API                  ✅
ThemeProvider                ✅
useState                     ✅
useEffect                    ✅
useContext                   ✅
localStorage persistence     ✅
Landing page foundation      ✅
Responsive feature cards     ✅

The backend remains untouched.

Key Learning

Day 18 established the fundamental React architecture that future AnonMind pages will build upon:

React
  ↓
Components
  ↓
Context
  ↓
State
  ↓
Effects
  ↓
Responsive UI
  ↓
Reusable design system

The project is now ready to move from foundational React architecture into polishing the responsive landing page and building the actual frontend experience.