# Day 2 - Business Rules & Database Design

**Project:** AnonMind – Privacy-First Mental Health Platform  
**Date:** _(Add today's date)_  
**Status:** ✅ Completed

---

# Objective

The goal of Day 2 was to design the complete backend database architecture before writing any code.

Instead of jumping directly into Django models, the entire system was designed from the business requirements first, ensuring that the database accurately reflects the application's workflow.

This follows a professional software engineering approach:

```
Business Requirements
        ↓
Business Rules
        ↓
Database Design
        ↓
ER Diagram
        ↓
Django Models
        ↓
API Development
```

---

# Modules Designed

The complete database was divided into independent modules.

## 1. Authentication Module

Responsible for user management and doctor verification.

### Tables

- User
- PatientProfile
- DoctorProfile
- DoctorVerification

### Design Decisions

- Custom User model will be used instead of Django's default User.
- Patients and Doctors have separate profile tables.
- Doctors require manual verification before consulting patients.
- Authentication information remains separate from profile information.

---

## 2. AI Module

Responsible for AI conversations and consultation summaries.

### Tables

- Conversation
- Message
- AIConsultationBrief

### Business Rules

- A Conversation is created only after the patient sends the first message.
- Empty conversations are never stored.
- Every conversation can have zero or one AI Consultation Brief.
- AI Consultation Briefs are generated only when the patient books an appointment.
- Doctors never access raw conversations.
- Patients explicitly decide whether to share the generated summary.

---

## 3. Wellness Module

Responsible for self-tracking features.

### Tables

- MoodEntry
- JournalEntry

### Business Rules

- Patients can record moods independently.
- Mood intensity ranges from 1–10.
- Journal entries are optional and editable.
- Journal entries can optionally be linked to a mood entry.

---

## 4. Healthcare Module

Responsible for doctor consultation workflow.

### Tables

- Appointment
- DoctorConsultationNote
- Review

### Appointment Workflow

Patient

↓

Select Doctor

↓

Choose Consultation Mode

↓

(Optional) Generate AI Consultation Brief

↓

Patient decides what to share

↓

Appointment Request

↓

Doctor Accept / Reject / Reschedule

↓

Consultation

↓

Doctor Consultation Note

↓

Patient Review

---

### Consultation Modes

- ONLINE
- OFFLINE

For online appointments:

- Meeting link is required.

For offline appointments:

- Clinic information stored in DoctorProfile is used.

---

### Business Rules

- Only completed appointments can receive:
  - Doctor Consultation Notes
  - Reviews
- One appointment can have only one consultation note.
- One appointment can have only one review.
- Patients choose whether to share mood history and journals.

---

## 5. Notification Module

Responsible for application notifications.

### Table

- Notification

### Supported Notifications

- Appointment Updates
- Doctor Verification
- Appointment Reminders
- System Announcements

Notifications support:

- Read status
- Read timestamp
- Optional action URL

---

# Database Statistics

| Item | Count |
|------|------:|
| Modules | 5 |
| Tables | 13 |
| Enums | Multiple |
| Relationships | Fully Designed |

---

# Complete Table List

Authentication

- User
- PatientProfile
- DoctorProfile
- DoctorVerification

AI

- Conversation
- Message
- AIConsultationBrief

Wellness

- MoodEntry
- JournalEntry

Healthcare

- Appointment
- DoctorConsultationNote
- Review

Notification

- Notification

---

# Important Architectural Decisions

## Privacy First

Doctors never receive access to raw AI conversations.

Instead, they receive an AI-generated consultation brief only if the patient explicitly shares it.

---

## Conversation Creation

Conversation records are created only after the first user message.

This prevents unnecessary empty conversations from being stored.

---

## AI Summary Generation

AI Consultation Briefs are generated on demand when booking an appointment instead of after every conversation.

Benefits:

- Lower AI cost
- Latest conversation context
- Better privacy
- Cleaner architecture

---

## Appointment Workflow

Appointments support both:

- Online consultations
- Offline consultations

Meeting links are stored only for online appointments.

---

## Selective Data Sharing

Patients control what doctors can access.

Optional sharing includes:

- AI Consultation Brief
- Mood History
- Journal Entries

---

## Professional Database Design

The database was normalized and organized into independent modules.

Each module has a single responsibility, making the project easier to maintain and scale.

---

# Deliverables

Completed:

- Business Rules
- Database Schema
- Relationships
- Module Separation
- Complete DBML
- Database Review

Generated Files

```
docs/
└── ERD/
    ├── anonmind.dbml
    ├── anonmind-erd.png
    └── anonmind-erd.pdf
```

---

# Git Commit

```bash
git add .
git commit -m "docs: finalize database architecture and ER diagram"
```

---

# Next Steps (Day 3)

Backend implementation begins.

Planned tasks:

- Initialize Django project
- Configure PostgreSQL
- Create project apps
- Configure environment variables
- Implement Custom User Model
- Create Authentication models
- Generate first migrations

---

# Lessons Learned

- Designing the database before coding reduces future refactoring.
- Business rules should drive database design.
- Modular architecture improves maintainability.
- Privacy-focused design requires careful separation of responsibilities.
- Django models should reflect business requirements instead of being designed ad hoc.

---

# Status

✅ Phase 1 – Product & Database Design Completed

Next milestone:

**Phase 2 – Django Backend Development**