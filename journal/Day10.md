# Day 10 – Completing JWT Authentication Module

**Project:** AnonMind  
**Backend Stack:** Django, Django REST Framework, PostgreSQL, SimpleJWT

---

# Objective

The objective of Day 10 was to complete the JWT Authentication module by implementing protected APIs, logout functionality, refresh token support, and understanding the complete JWT authentication lifecycle.

By the end of Day 10, the authentication module became feature-complete and production-ready.

---

# Features Implemented

## Phase 1 – Current Authenticated User API

### Endpoint

```http
GET /api/accounts/me/
```

### Implemented

- CurrentUserSerializer
- CurrentUserAPIView
- JWT Authentication
- IsAuthenticated Permission
- Protected Route

### Response

```json
{
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "role": "patient",
    "email_verified": true,
    "verification_status": "approved"
}
```

---

# Concepts Learned

## Why /me API?

After login, the frontend only possesses JWT tokens.

To retrieve the latest user information, the frontend calls:

```
GET /api/accounts/me/
```

instead of storing user data permanently.

This ensures that every dashboard always displays the latest information.

---

## Authentication vs Authorization

### Authentication

Authentication answers:

> Who are you?

Implemented using:

```python
JWTAuthentication
```

Responsibilities:

- Read Authorization Header
- Verify JWT Signature
- Verify Expiration
- Decode Token
- Retrieve User
- Populate `request.user`

---

### Authorization

Authorization answers:

> What are you allowed to do?

Implemented using:

```python
IsAuthenticated
```

Responsibilities:

- Allow authenticated users
- Reject anonymous requests

---

# Authentication Flow

```
Incoming Request
        │
        ▼
JWTAuthentication
        │
        ▼
Token Verified
        │
        ▼
request.user
        │
        ▼
Permission Check
        │
        ▼
APIView Executes
```

---

# request.user

One of the most important concepts learned today.

Instead of writing:

```python
User.objects.get(...)
```

Django REST Framework automatically provides:

```python
request.user
```

because JWTAuthentication authenticates the request before the view executes.

---

# Testing Current User API

Tested:

### Without JWT

Expected:

```
401 Unauthorized
```

---

### Invalid JWT

Expected:

```
401 Unauthorized
```

---

### Expired JWT

Expected:

```
401 Unauthorized
```

---

### Valid JWT

Expected:

```
200 OK
```

Returns the authenticated user's information.

---

# Phase 2 – Logout API

### Endpoint

```http
POST /api/logout/
```

---

## LogoutSerializer

Created:

```python
LogoutSerializer
```

Purpose:

Validate incoming refresh token.

---

## LogoutAPIView

Responsibilities:

- Authenticate user
- Validate refresh token
- Blacklist refresh token
- Return success response

---

# Why JWT Logout is Different

Traditional Session Authentication

```
Login

↓

Server creates Session

↓

Logout

↓

Delete Session
```

JWT Authentication

```
Login

↓

Access Token
Refresh Token

↓

Logout

↓

Blacklist Refresh Token

↓

Frontend deletes tokens

↓

Logout Complete
```

Unlike session authentication, the server cannot delete an Access Token because it is stored on the client.

---

# Token Blacklisting

Enabled:

```python
'rest_framework_simplejwt.token_blacklist'
```

Database Tables Created:

- OutstandingToken
- BlacklistedToken

Purpose:

Store revoked refresh tokens.

---

# Logout Flow

```
User clicks Logout

↓

POST /api/logout/

↓

Validate Refresh Token

↓

Blacklist Refresh Token

↓

Return Success

↓

Frontend deletes Access Token

↓

Frontend deletes Refresh Token
```

---

# Phase 3 – Refresh Token API

Implemented using SimpleJWT built-in view.

### Endpoint

```http
POST /api/token/refresh/
```

Registered:

```python
TokenRefreshView
```

---

## Request

```json
{
    "refresh": "<refresh_token>"
}
```

---

## Response

```json
{
    "access": "<new_access_token>"
}
```

---

# Why Refresh Tokens Exist

Access Tokens are intentionally short-lived.

```
Login

↓

Access Token

↓

Expires

↓

Refresh Token

↓

Generate New Access Token

↓

Continue Using Application
```

Without Refresh Tokens, users would have to log in repeatedly.

---

# Complete JWT Lifecycle

```
Register

↓

Verify Email

↓

Login

↓

Access Token
Refresh Token

↓

Protected APIs

↓

Access Token Expires

↓

POST /api/token/refresh/

↓

New Access Token

↓

Continue Using APIs

↓

Logout

↓

Refresh Token Blacklisted

↓

Refresh Request Rejected
```

---

# Internal Working of JWT Authentication

Every protected request follows:

```
Client Request

↓

Authorization Header

↓

JWTAuthentication

↓

Decode JWT

↓

Verify Signature

↓

Verify Expiration

↓

Retrieve User

↓

request.user

↓

Permission Check

↓

APIView

↓

Serializer

↓

JSON Response
```

---

# APIs Completed

## Patient Authentication

- ✅ Registration
- ✅ Email Verification
- ✅ Login

---

## Doctor Authentication

- ✅ Registration
- ✅ Document Upload
- ✅ Email Verification
- ✅ Admin Approval
- ✅ Login

---

## JWT

- ✅ JWT Authentication
- ✅ Protected APIs
- ✅ Current User API
- ✅ Refresh Token API
- ✅ Logout API
- ✅ Token Blacklisting

---

# Testing Completed

Successfully Tested:

- ✅ Patient Registration
- ✅ Patient Email Verification
- ✅ Patient Login
- ✅ Doctor Registration
- ✅ Doctor Email Verification
- ✅ Doctor Login
- ✅ Current User API
- ✅ Protected APIs
- ✅ Refresh Token API
- ✅ Logout API
- ✅ Blacklisted Refresh Token
- ✅ JWT Authentication

---

# Key Learnings

- Authentication vs Authorization
- JWT Authentication Workflow
- Authentication Classes
- Permission Classes
- request.user
- Current User Endpoint
- Protected APIs
- Access Token vs Refresh Token
- JWT Logout
- Token Blacklisting
- Refresh Token Workflow
- Complete JWT Lifecycle
- DRF Authentication Pipeline

---

# Production Improvements (Future)

- Forgot Password
- Reset Password
- Change Password
- Refresh Token Rotation
- Login Rate Limiting
- Better Exception Handling
- Audit Logging

---

# Git Commit Message

```text
feat(auth): complete JWT authentication with protected APIs, refresh token support and logout
```

---

# Day 10 Summary

Today marks the completion of the **Authentication Module** of AnonMind.

Completed:

- JWT Authentication
- Patient & Doctor Authentication
- Email Verification
- Doctor Approval Logic
- Protected APIs
- Current User Endpoint
- Refresh Token Endpoint
- Logout with Token Blacklisting

The backend authentication system is now production-ready and fully tested using Postman.

---

# Next Day (Day 11)

We will begin **Phase 2 – Core Backend APIs** by implementing the **Admin Module**.

Planned Features:

- List Pending Doctors
- View Doctor Details
- View Uploaded Documents
- Approve Doctor
- Reject Doctor
- Verification Email after Approval

This completes the authentication phase and begins the core business logic of the AnonMind platform.