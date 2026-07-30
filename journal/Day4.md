# Day 4 – Custom Authentication System & PostgreSQL Integration

**Date:** 30 July 2026

---

# Objective

Build the authentication foundation of AnonMind by:

- Creating a custom User model
- Implementing a custom User Manager
- Replacing Django's default authentication
- Migrating from SQLite to PostgreSQL
- Securing database credentials using environment variables

---

# What We Built

## 1. Custom Accounts App

Created a dedicated Django app:

```
apps/accounts/
```

This app will manage:

- User authentication
- Doctor accounts
- Patient accounts
- Future role-based permissions

---

## 2. Custom User Model

Implemented a custom `User` model by extending:

```python
AbstractBaseUser
PermissionsMixin
```

Features:

- Email-based authentication
- No username field
- Custom authentication support
- Ready for future doctor/patient roles

---

## 3. Custom User Manager

Implemented:

- `create_user()`
- `create_superuser()`

Learned:

- `BaseUserManager`
- `normalize_email()`
- `set_password()`
- `self.model`
- `extra_fields`
- `setdefault()`

---

## 4. Django Configuration

Configured Django to use the custom User model.

```python
AUTH_USER_MODEL = "accounts.User"
```

---

## 5. Database Migration

Generated migrations for:

- User model
- is_active field

Successfully applied migrations.

---

## 6. Django Admin

Created and tested:

- Superuser
- Django Admin Login

Verified authentication works correctly.

---

## 7. PostgreSQL Migration

Migrated project from:

SQLite

↓

PostgreSQL

Created database:

```
anonmind_db
```

Updated Django database configuration.

---

## 8. Environment Variables

Installed:

```
python-decouple
```

Moved database credentials into:

```
backend/.env
```

Configured Django to read values using:

```python
config(...)
```

---

## 9. Git Cleanup

Removed from repository:

- SQLite database
- Python cache files

Updated:

```
.gitignore
```

Added:

```
backend/.env.example
```

---

# Problems Faced

### Login Failure

Cause:

```
is_active = False
```

overrode the Django model field.

Fixed by:

- Removing incorrect line
- Creating new migration

---

### Missing Database Column

Error:

```
OperationalError:
no such column:
accounts_user.is_active
```

Solved by:

```
makemigrations
migrate
```

---

### PostgreSQL Migration

Migrated entire project from SQLite to PostgreSQL without losing project structure.

---

# Key Concepts Learned

- Custom User Model
- AbstractBaseUser
- PermissionsMixin
- BaseUserManager
- self.model
- normalize_email()
- set_password()
- AUTH_USER_MODEL
- Django Migrations
- PostgreSQL Integration
- Environment Variables
- Git Ignore Best Practices

---

# Current Project Structure

```
backend/
│
├── apps/
│   └── accounts/
│
├── config/
│
├── manage.py
│
└── .env
```

---

# Current Status

✅ Custom Authentication System Complete

✅ PostgreSQL Connected

✅ Django Admin Working

✅ Secure Environment Variables

✅ Ready to Build Authentication APIs

---

# Next Goal (Day 5)

Build REST Authentication APIs.

Planned endpoints:

- Register
- Login
- Logout
- Current User Profile

These APIs will become the foundation for all future AnonMind features.