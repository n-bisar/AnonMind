# Day 26 — Patient Login Integration & Anya AI Chat UI

**Project:** AnonMind  
**Phase:** Phase 3 — Frontend & Dashboards  
**Day:** 26  
**Status:** Completed  
**Next Session:** Day 27

---

## 1. Objective

The objective of Day 26 was to improve the patient experience by connecting successful patient login to the AI Chat page, protecting the chat route, personalizing Anya's welcome experience, and improving the greeting displayed according to the time of day.

The existing backend architecture and behavior were kept unchanged.

## 2. Patient Login Integration

### File
`src/pages/Login.jsx`

### Changes implemented

- Patient login uses the existing endpoint:

  `POST /api/patient/login/`

- After successful authentication, the access token and refresh token are saved in `localStorage`.
- The patient is redirected to `/ai-chat` using React Router's `navigate()`.
- Failed login attempts continue to display the existing error message.
- The doctor login flow was not changed.

### Expected flow

1. Patient opens the login page.
2. Patient enters their credentials.
3. Frontend sends the login request to the existing backend.
4. On successful login, tokens are stored.
5. Patient is redirected to `/ai-chat`.

## 3. Patient Route Protection

### File
`src/components/PatientProtectedRoute.jsx`

The existing patient route guard checks for an access token and validates the authenticated patient by requesting:

`GET /api/patient/profile/`

The guard uses the existing Axios API client and displays a temporary loading message while authentication is checked.

### Expected behavior

- Authenticated patient with a valid token: access to the protected route is allowed.
- Missing or invalid access token: patient is redirected to `/login`.
- Authentication verification in progress: a loading message is displayed.

### Route integration

The `/ai-chat` route is wrapped with `PatientProtectedRoute` in `src/App.jsx`.

The guard does not replace backend authentication or authorization.

## 4. Patient Name Retrieval

### File
`src/pages/AIChat.jsx`

The existing patient profile endpoint is used to retrieve the authenticated patient's full name.

The frontend extracts the first name from `response.data.full_name` and stores it in React state.

Example:

- Backend full name: `Bisar Nawaz`
- Extracted first name: `Bisar`

No new backend endpoint was created.

## 5. Personalized Anya Welcome Experience

The AI Chat page now displays a personalized welcome heading using the patient's first name.

The greeting is selected using the browser's local time.

| Local time | Intended greeting |
|---|---|
| 5:00 AM–11:59 AM | Good morning |
| 12:00 PM–4:59 PM | Good afternoon |
| 5:00 PM–8:59 PM | Good evening |
| 9:00 PM–11:59 PM | Hey, [first name]! Still up? |
| 12:00 AM–4:59 AM | [First name], still awake? |

The welcome area retains the existing botanical styling and supportive subtitle.

The greeting is intended to feel warm, personal, and appropriate to the time of day.

## 6. Initial Assistant Message

The initial assistant message was updated to remove the duplicated personalized greeting.

The intended introductory message is:

"I'm Anya, and I'm here to listen, without judgment. This is your space to talk about what's on your mind, at your own pace. What's been going on for you today?"

New conversations should use this introduction rather than repeating the greeting displayed above the conversation.

Existing conversations are stored locally, so their saved initial messages must be handled carefully. Conversation history must not be deleted or overwritten unnecessarily when adjusting the greeting.

## 7. Existing AI Chat Features

The existing `src/pages/AIChat.jsx` includes:

- Conversation history sidebar.
- New conversation creation.
- Conversation selection.
- Conversation renaming and deletion.
- Sidebar resizing and collapsing.
- Light and dark theme support.
- Message composer.
- Local conversation persistence through `localStorage`.
- Personalized welcome heading.

The following storage keys are used:

- `anonmind_conversations`
- `anonmind_active_conversation`
- `anonmind_sidebar_width`

**Important:** The chat is still a frontend UI prototype. Live AI responses are not connected yet. Patient messages and conversation history are stored locally in the browser.

## 8. Testing and Verification

The following outcomes were verified during Day 26:

- Patient login successfully redirects to `/ai-chat`.
- Direct access to `/ai-chat` without authentication redirects to `/login`.
- Anya's welcome heading displays the patient's first name.
- The greeting uses the browser's local time.
- The doctor login flow and Django backend were not modified.

The existing conversation history and greeting behavior should continue to be checked during future UI changes.

## 9. Files Involved

| File | Purpose |
|---|---|
| `src/pages/Login.jsx` | Patient login redirect |
| `src/pages/AIChat.jsx` | Personalized greeting and chat interface |
| `src/components/PatientProtectedRoute.jsx` | Patient authentication guard |
| `src/App.jsx` | Protected AI Chat route |
| `src/api/axios.js` | Existing API client |

## 10. Rules to Preserve

- Do not modify Django backend code or behavior unless explicitly authorized.
- Do not invent backend endpoints or use fake API data.
- Inspect existing code before modifying it.
- Preserve working authentication and registration functionality.
- Do not delete existing patient conversations unnecessarily.
- Make one logical change at a time.
- Test every change before proceeding.
- Do not start live AI integration during Day 27 unless explicitly requested.

## 11. Next Session — Day 27

**Focus: Patient Dashboard and Find a Doctor Frontend**

Planned work:

1. Inspect `src/App.jsx` and identify all existing routes.
2. Inspect the existing patient dashboard and Find a Doctor components.
3. Determine which buttons and navigation links are implemented, incomplete, or non-functional.
4. Complete the Patient Dashboard frontend.
5. Complete the Find a Doctor frontend.
6. Connect existing APIs only after inspecting their actual endpoints and response formats.
7. Verify navigation, authentication, and existing functionality.
8. Document the completed work in `Day-27.md`.

### Starting checkpoint

Phase 3 — Frontend & Dashboards.

Day 26 is complete. Day 27 begins with code inspection, not immediate implementation.

**The priority is to finish the existing patient experience without creating unnecessary changes or technical debt.**
