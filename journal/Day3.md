# Day 3 - Django Backend Foundation

**Date:** 29 July 2026  
**Project:** AnonMind  
**Phase:** Backend Development - Foundation  
**Status:** ✅ Completed

---

# Objective

Today marked the beginning of backend development for **AnonMind**.

Unlike previous days, the goal was **not to build features**, but to establish a strong and clean Django foundation that will support the entire application.

The focus was on understanding Django instead of simply creating files.

---

# What We Accomplished

## 1. Clean Backend Setup

Removed the previous experimental backend setup and started from scratch.

Created a dedicated backend directory for the Django project.

Project structure after cleanup:

```text
AnonMind/
│
├── assets/
├── backend/
├── design/
├── docs/
├── frontend/
├── journal/
├── research/
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 2. Created Python Virtual Environment

Created an isolated Python environment.

Command:

```bash
python -m venv venv
```

Activated using PowerShell:

```powershell
venv\Scripts\Activate.ps1
```

### Why?

A virtual environment isolates project dependencies.

Benefits:

- Prevents package conflicts
- Keeps system Python clean
- Makes collaboration easier
- Allows reproducible development environments

---

## 3. Installed Django

Installed Django inside the virtual environment.

Command:

```bash
pip install django
```

Verified installation:

```bash
django-admin --version
```

---

## 4. Created Django Project

Created the Django project using:

```bash
django-admin startproject config .
```

Using the `.` created the project directly inside the backend directory without unnecessary nesting.

Generated structure:

```text
backend/
│
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── manage.py
└── venv/
```

---

## 5. Successfully Ran Django Server

Started the development server.

Command:

```bash
python manage.py runserver
```

Verified the installation by opening:

```
http://127.0.0.1:8000/
```

The Django welcome page confirmed that the backend was correctly configured.

---

# Django Concepts Learned

## Backend

The backend acts as the brain of the application.

Responsibilities include:

- Authentication
- Database communication
- AI processing
- Business logic
- Security
- API responses

---

## Django

Django is a high-level Python web framework that provides:

- Authentication
- ORM
- Admin Panel
- URL Routing
- Security
- Database abstraction

allowing developers to focus on business logic instead of building everything from scratch.

---

## Django Request Lifecycle

A basic understanding of how a request travels through Django.

```text
Browser
    │
HTTP Request
    │
manage.py
    │
settings.py
    │
urls.py
    │
View
    │
Database
    │
Response
    │
Browser
```

---

## Understanding Generated Files

### manage.py

Used to execute Django management commands.

Examples:

```bash
python manage.py runserver
python manage.py migrate
python manage.py createsuperuser
python manage.py startapp
```

---

### settings.py

Main configuration file.

Responsible for:

- Installed Apps
- Database
- Middleware
- Authentication
- Static Files
- Security

---

### urls.py

Acts as the request router.

Maps incoming URLs to their respective views.

---

### wsgi.py

Used for traditional production deployment.

---

### asgi.py

Supports asynchronous applications and real-time communication.

Useful for future AI chat and WebSocket integration.

---

# Project vs App

One of the most important Django concepts.

## Django Project

Represents the entire backend.

For AnonMind:

```
AnonMind Backend
```

---

## Django Apps

Individual modules responsible for a single feature.

Examples:

- Accounts
- Doctors
- Patients
- Appointments
- Chat
- Notifications

Keeping responsibilities separated improves scalability and maintainability.

---

# Architecture Decision

Instead of placing all apps beside the configuration folder, the project will use a dedicated `apps/` directory.

Chosen architecture:

```text
backend/
│
├── config/
│
├── apps/
│   ├── accounts/
│   ├── doctors/
│   ├── patients/
│   ├── appointments/
│   ├── chat/
│   ├── notifications/
│   └── common/
│
├── media/
├── static/
├── venv/
│
├── manage.py
├── requirements.txt
└── .env
```

This structure is commonly used in production Django projects and keeps the project modular as it grows.

---

# Key Learnings

- Importance of virtual environments
- Difference between Django Project and Django App
- Purpose of Django configuration files
- Basic Django request lifecycle
- Running and verifying a Django project
- Importance of scalable project architecture

---

# Challenges Faced

- Removed the previous backend setup to start with a clean learning-oriented foundation.
- Clarified the purpose of virtual environments.
- Understood why Django projects and apps are separated.
- Chose a production-ready folder organization before creating any apps.

---

# Decisions Made

- Backend Framework: Django
- Programming Language: Python
- Database: PostgreSQL
- Project Architecture: Production-ready modular structure
- Apps will be stored inside an `apps/` directory.
- A custom User model will be created instead of Django's default authentication model.

---

# Next Day Goals (Day 4)

- Create the `apps` directory.
- Create the `accounts` app.
- Register the app in Django.
- Build the custom User model.
- Configure `AUTH_USER_MODEL`.
- Generate the first migration.
- Create the first superuser.
- Explore the Django Admin panel.

---

# Git Commit

```bash
git add .
git commit -m "Initialize Django backend foundation and project structure"
```

---

# Day 3 Summary

Today established the technical foundation of the backend.

No business logic was implemented yet.

Instead, the focus was on understanding Django's architecture, setting up a clean development environment, and preparing a scalable project structure that will support the complete AnonMind platform in the coming days.