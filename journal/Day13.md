# AnonMind — Day 13

## Focus

**Doctor Profile API**

**Date:** August 31, 2026

---

## 1. Day 13 Objective

The main objective of Day 13 was to begin the **User Profile APIs** part of Phase 2 — Core Backend APIs.

The main goal was to allow an authenticated doctor to:

* View their own profile.
* Update permitted profile information.
* Access only their own profile.
* Be prevented from modifying protected account information.
* Keep sensitive doctor verification documents protected.

---

# 2. Existing Doctor Data Architecture

Before implementing the Doctor Profile API, the existing database structure was reviewed.

The existing relationship is:

```text
User
  │
  │ OneToOne
  ▼
DoctorProfile
  │
  │ OneToOne
  ▼
DoctorDocument
User

The User model contains account-level information such as:

id
email
full_name
role
verification_status
email_verified
is_active
is_staff
DoctorProfile

The DoctorProfile model contains information specific to a doctor:

phone_number
registration_number
specialization
years_of_experience
hospital

The relationship uses:

user = models.OneToOneField(
    User,
    on_delete=models.CASCADE,
    related_name="doctor_profile",
)

Because of:

related_name="doctor_profile"

the doctor's profile can be accessed through:

request.user.doctor_profile
DoctorDocument

The DoctorDocument model stores sensitive doctor verification documents:

medical_degree
medical_license
government_id
profile_photo

It is related to DoctorProfile through a OneToOne relationship.

3. Understanding request.user

One of the most important concepts learned on Day 13 was:

request.user

When a doctor sends a request with a valid JWT access token:

JWT Access Token
       ↓
JWT Authentication
       ↓
request.user

request.user represents the authenticated User.

Because the User model has a OneToOne relationship with DoctorProfile, we can use:

request.user.doctor_profile

to access the profile belonging to the currently authenticated doctor.

This is safer than accepting a doctor ID from the client.

For example, we should avoid unnecessarily using:

doctor_id = request.data["doctor_id"]

because the server already knows the authenticated user through the JWT.

The backend should determine:

Who is making the request?
        ↓
request.user
        ↓
Which profile belongs to this user?
        ↓
request.user.doctor_profile
4. Doctor Profile GET API
Endpoint
GET /api/auth/doctor/profile/

The endpoint allows an authenticated doctor to retrieve their own profile.

The API uses:

authentication_classes = [JWTAuthentication]
permission_classes = [IsDoctorUser]

The GET method uses:

def get(self, request):
    doctor_profile = request.user.doctor_profile

    serializer = DoctorOwnProfileSerializer(doctor_profile)

    return Response(
        serializer.data,
        status=status.HTTP_200_OK,
    )

The endpoint returns appropriate doctor information such as:

Full name
Email
Phone number
Medical registration number
Specialization
Years of experience
Hospital/clinic
Verification status

Sensitive uploaded verification documents are not unnecessarily exposed through this endpoint.

5. Doctor Own Profile Serializer

A dedicated serializer was created:

DoctorOwnProfileSerializer

The existing DoctorProfileSerializer was not modified because it is already used by the Admin doctor-detail workflow.

Creating a separate serializer avoids unnecessarily changing completed functionality.

The new serializer is specifically responsible for the doctor's own profile API.

It exposes:

full_name
email
phone_number
registration_number
specialization
years_of_experience
hospital
verification_status
6. Serializer source

Some fields returned by the Doctor Profile API belong to the User model rather than DoctorProfile.

The structure is:

User
├── full_name
├── email
└── verification_status

DoctorProfile
├── phone_number
├── registration_number
├── specialization
├── years_of_experience
└── hospital

The serializer uses:

source="user.full_name"
source="user.email"
source="user.verification_status"

This allows data from both related models to be represented in one API response.

Conceptually:

DoctorProfile
      │
      └── user
            ├── full_name
            ├── email
            └── verification_status
7. Protected Fields

The doctor must not be able to modify account-level fields such as:

id
email
role
verification_status
email_verified
is_staff
is_active

These fields are important because they affect:

Authentication
Authorization
Account status
Doctor verification
Administrative privileges

For example, allowing:

{
    "role": "ADMIN"
}

would create a privilege escalation vulnerability.

Similarly, allowing:

{
    "verification_status": "VERIFIED"
}

would allow a doctor to bypass the Admin verification workflow.

Therefore, these fields are protected from modification through the Doctor Profile API.

8. Sensitive Doctor Documents

The existing doctor serializer used by the Admin workflow can expose nested doctor documents.

These documents include:

Medical degree
Medical license
Government ID
Profile photo

However, these sensitive documents were not exposed through the doctor's own profile serializer.

The reasoning is:

Doctor Profile API
        ↓
Profile information
        +
Appropriate account information
        ↓
No unnecessary sensitive documents

This follows the principle of exposing only the information necessary for a particular API.

9. Doctor Profile PATCH API
Endpoint
PATCH /api/auth/doctor/profile/

The endpoint allows an authenticated doctor to update permitted profile information.

The implementation uses:

def patch(self, request):
    doctor_profile = request.user.doctor_profile

    serializer = DoctorOwnProfileSerializer(
        doctor_profile,
        data=request.data,
        partial=True,
    )

    serializer.is_valid(raise_exception=True)

    serializer.save()

    return Response(
        serializer.data,
        status=status.HTTP_200_OK,
    )
10. PATCH

PATCH is used because we are performing a partial update of an existing profile.

For example:

{
    "hospital": "AnonMind Mental Health Center"
}

Only the hospital field needs to be sent.

The doctor does not need to send every profile field.

This is possible because:

partial=True

is passed to the serializer.

The complete flow is:

PATCH Request
      ↓
request.data
      ↓
DoctorOwnProfileSerializer
      ↓
partial=True
      ↓
serializer.is_valid()
      ↓
serializer.save()
      ↓
PostgreSQL
      ↓
Updated Response
11. request.data

request.data contains the data sent by the client.

For example:

{
    "hospital": "AnonMind Mental Health Center"
}

is available inside the view through:

request.data

The data is then passed into the serializer:

DoctorOwnProfileSerializer(
    doctor_profile,
    data=request.data,
    partial=True,
)
12. serializer.is_valid()

Before modifying the database, the submitted data must be validated.

This is done using:

serializer.is_valid(raise_exception=True)

If the submitted data is invalid, the serializer raises a validation error.

For example, the following request was tested:

{
    "years_of_experience": -5
}

The API correctly returned:

HTTP 400 Bad Request

with:

{
    "years_of_experience": [
        "Ensure this value is greater than or equal to 0."
    ]
}

The invalid value was not saved to PostgreSQL.

13. serializer.save()

After validation succeeds:

serializer.save()

persists the changes.

Because the existing DoctorProfile instance is passed to the serializer:

DoctorOwnProfileSerializer(
    doctor_profile,
    data=request.data,
    partial=True,
)

serializer.save() updates the existing database record.

It does not create a new doctor profile.

14. Doctor-Specific Permission

A new permission class was created:

class IsDoctorUser(BasePermission):
    """
    Allows access only to authenticated users
    whose role is DOCTOR.
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "DOCTOR"
        )

The Doctor Profile API uses:

permission_classes = [IsDoctorUser]
15. Why IsAuthenticated Was Not Enough

Initially, the Doctor Profile API used:

permission_classes = [IsAuthenticated]

This only checks:

Is the user authenticated?

It does not check:

Is this user a doctor?

A patient has a valid JWT and is therefore authenticated.

However, a patient does not have a DoctorProfile.

When the patient attempted to access:

GET /api/auth/doctor/profile/

the view reached:

request.user.doctor_profile

and produced:

RelatedObjectDoesNotExist

which resulted in:

HTTP 500 Internal Server Error

This exposed an authorization problem.

16. Security Fix

A doctor-specific permission was introduced:

IsDoctorUser

The profile API was changed from:

permission_classes = [IsAuthenticated]

to:

permission_classes = [IsDoctorUser]

Now the request flow is:

Patient
   ↓
JWT Authentication
   ↓
IsDoctorUser
   ↓
role != DOCTOR
   ↓
403 Forbidden

The request is rejected before the view attempts:

request.user.doctor_profile

This is a cleaner and safer authorization boundary.

17. Authentication vs Authorization

Day 13 reinforced the difference between authentication and authorization.

Authentication

Authentication answers:

Who are you?

JWT authentication identifies the user.

JWT
 ↓
request.user
Authorization

Authorization answers:

Are you allowed to access this resource?

IsDoctorUser checks:

Authenticated?
     +
Role == DOCTOR?

Only then can the user access the Doctor Profile API.

18. Security Testing
Verified Doctor

A verified doctor successfully accessed:

GET /api/auth/doctor/profile/

Result:

HTTP 200 OK

The doctor was able to retrieve their own profile.

Valid Profile Update

A valid PATCH request was tested:

{
    "hospital": "AnonMind Mental Health Center"
}

Result:

HTTP 200 OK

The updated value was returned.

The PostgreSQL database was then checked and confirmed that the update was actually persisted.

Attempt to Change Verification Status

Tested:

{
    "verification_status": "REJECTED"
}

Result:

No change occurred.

The doctor's verification status remained:

VERIFIED

This confirmed that the doctor cannot change their own verification status.

Attempt to Change Role

Tested:

{
    "role": "ADMIN"
}

Result:

No change occurred.

The doctor's role remained:

DOCTOR

This confirmed that the doctor cannot escalate their own privileges.

Attempt to Change Email

Tested:

{
    "email": "hacker@example.com"
}

Result:

No change occurred.

The original email remained unchanged.

This is especially important because email is used as the authentication identity.

Invalid Years of Experience

Tested:

{
    "years_of_experience": -5
}

Result:

HTTP 400 Bad Request

The invalid value was rejected and not saved.

19. Patient Access Test

A valid patient JWT was used against:

GET /api/auth/doctor/profile/

Initially:

Patient
   ↓
IsAuthenticated
   ↓
DoctorProfileAPIView
   ↓
request.user.doctor_profile
   ↓
500 Internal Server Error

After implementing IsDoctorUser:

Patient
   ↓
IsDoctorUser
   ↓
403 Forbidden

The final response was:

{
    "detail": "You do not have permission to perform this action."
}

This confirmed that patients cannot access the Doctor Profile API.

20. Unauthenticated Access Test

A request was sent without a JWT access token:

GET /api/auth/doctor/profile/

Result:

HTTP 401 Unauthorized

This confirmed that authentication is required.

21. Final Security Model

The final request flow is:

                    Request
                       │
                       ▼
               JWT Authentication
                       │
                       ▼
                IsDoctorUser
                       │
                ┌──────┴──────┐
                │             │
             Doctor       Not Doctor
                │             │
                ▼             ▼
        Doctor Profile       403
             API
                │
                ▼
        request.user
                │
                ▼
    request.user.doctor_profile

The client does not provide a doctor ID.

The authenticated user's JWT determines which doctor profile is accessed.

22. HTTP Status Codes

The following HTTP status codes were reviewed:

Situation	Status
Successful GET/PATCH	200 OK
Invalid profile data	400 Bad Request
Authentication required	401 Unauthorized
Authenticated but not a doctor	403 Forbidden
23. Files Changed

Day 13 involved changes to:

views.py
serializers.py
permissions.py
urls.py
views.py

Added:

DoctorProfileAPIView

with:

GET
PATCH
serializers.py

Added:

DoctorOwnProfileSerializer
permissions.py

Added:

IsDoctorUser
urls.py

Added:

doctor/profile/
24. Day 13 Result

The Doctor Profile API was successfully implemented and tested.

Completed:

Doctor profile retrieval
Doctor profile update
JWT authentication
Doctor-specific authorization
Secure use of request.user
OneToOne relationship usage
Serializer-based validation
Partial updates using PATCH
Protected account fields
Sensitive document protection
Patient access prevention
Unauthenticated access prevention
PostgreSQL persistence verification
25. Key Concepts Learned
request.user

Represents the authenticated user associated with the JWT.

OneToOne Relationship

Allows a user to access their related doctor profile through:

request.user.doctor_profile
Serializer

Controls the representation of model data and validates incoming API data.

source

Allows serializer fields to retrieve values from related objects.

read_only

Allows information to be returned through the API without allowing the client to modify it.

PATCH

Used for partial updates.

partial=True

Allows only the fields supplied by the client to be updated.

request.data

Contains data sent by the client.

serializer.is_valid()

Validates incoming data before saving.

serializer.save()

Persists validated changes to the database.

Authentication

Determines who the user is.

Authorization

Determines whether the authenticated user is allowed to access the resource.

26. Production Considerations

The current implementation is suitable for the current development stage.

Possible future improvements include:

Explicitly rejecting attempts to modify protected fields instead of silently ignoring them.
Adding automated API tests for profile GET/PATCH behavior.
Adding more detailed validation where product requirements require it.
Using select_related() if profile queries become performance-sensitive.
Adding audit logging for important profile changes if required.

These improvements should be introduced when they provide real value rather than adding unnecessary complexity now.

Day 13 Status

Doctor Profile API: COMPLETED ✅

The backend now supports secure doctor self-service profile management.

Next Step
Day 14 — Patient Profile API

The next goal is to build the Patient Profile API.

Planned endpoints:

GET   /api/auth/patient/profile/
PATCH /api/auth/patient/profile/

Before implementing it, the existing User model and architecture will be inspected to determine whether patients actually need a separate PatientProfile model.