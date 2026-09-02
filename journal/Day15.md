# AnonMind — Day 15

## Focus

**Admin View Doctor Documents API**

Day 15 continued the **Admin Module APIs** section of Phase 2 — Core Backend APIs.

The main goal was to allow an authenticated admin to inspect the documents uploaded by a specific doctor during registration.

---

# Day 15 Goal

Create an admin-only endpoint:

http
GET /api/auth/admin/doctors/<doctor_id>/documents/

The endpoint allows an admin to retrieve the document references associated with a specific doctor.

Step 1 — Inspect Existing Models

Before implementing anything, we inspected the existing models.

The relationship between the models is:

User
 │
 │ OneToOne
 ▼
DoctorProfile
 │
 │ OneToOne
 ▼
DoctorDocument
User → DoctorProfile

DoctorProfile contains:

user = models.OneToOneField(
    User,
    on_delete=models.CASCADE,
    related_name="doctor_profile",
)

Therefore, a doctor's profile can be accessed through:

doctor.doctor_profile
DoctorProfile → DoctorDocument

DoctorDocument contains:

doctor = models.OneToOneField(
    DoctorProfile,
    on_delete=models.CASCADE,
    related_name="documents",
)

Therefore, the documents belong to the doctor's DoctorProfile.

The complete relationship is:

User
 ↓
doctor_profile
 ↓
DoctorProfile
 ↓
documents
 ↓
DoctorDocument
Step 2 — Understand Admin Authorization

We inspected the existing admin APIs and found that the project already uses:

permission_classes = [IsAdminUser]

This existing permission system was reused instead of creating a new permission class.

The expected access control is:

Requester	Result
Admin	✅ Allowed
Doctor	❌ 403 Forbidden
Patient	❌ 403 Forbidden
Unauthenticated	❌ 401 Unauthorized

This keeps the new API consistent with the existing Admin Module architecture.

Step 3 — Reuse Existing Serializer

We inspected serializers.py and found that DoctorDocumentSerializer already existed.

It exposes:

class DoctorDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorDocument
        fields = [
            "medical_degree",
            "medical_license",
            "government_id",
            "profile_photo",
        ]

Therefore, no new serializer was required.

The existing serializer was reused for the admin documents API.

Step 4 — Create Admin Doctor Documents API

A new API view was created:

class AdminDoctorDocumentsAPIView(APIView):
    permission_classes = [IsAdminUser]

The API receives the doctor's UUID through the URL:

def get(self, request, doctor_id):
Step 5 — Find the Doctor

The doctor is retrieved from the User model:

doctor = get_object_or_404(
    User,
    id=doctor_id,
    role=User.Role.DOCTOR,
)

This ensures that:

The provided UUID belongs to an existing user.
The user is actually a doctor.
A nonexistent or invalid doctor results in:
404 Not Found
Step 6 — Find the Doctor Documents

After finding the doctor, the API follows the model relationship:

User
 ↓
DoctorProfile
 ↓
DoctorDocument

The document record is retrieved using:

doctor_documents = get_object_or_404(
    DoctorDocument,
    doctor=doctor.doctor_profile,
)

The important concept here is that DoctorDocument.doctor expects a DoctorProfile, not a User.

Therefore:

doctor.doctor_profile

is used.

Step 7 — Serialize the Documents

The existing serializer was used:

serializer = DoctorDocumentSerializer(doctor_documents)

This converts the Django model object into API-friendly data.

Step 8 — Return the Response

The serialized data is returned with HTTP 200:

return Response(
    serializer.data,
    status=status.HTTP_200_OK,
)

The API response contains:

{
    "medical_degree": "...",
    "medical_license": "...",
    "government_id": "...",
    "profile_photo": "..."
}

These values represent the stored document references.

Step 9 — Add the URL

The new route was added:

path(
    "admin/doctors/<uuid:doctor_id>/documents/",
    AdminDoctorDocumentsAPIView.as_view(),
    name="admin-doctor-documents",
),

The complete endpoint is:

GET /api/auth/admin/doctors/<doctor_id>/documents/

Because the User.id field is a UUID:

id = models.UUIDField(
    primary_key=True,
    default=uuid.uuid4,
    editable=False,
)

the URL uses:

<uuid:doctor_id>
Step 10 — Security Testing

The endpoint was tested with different types of users.

Admin
Admin → 200 OK

The admin could successfully retrieve the doctor's documents.

Doctor
Doctor → 403 Forbidden

Doctors cannot access the admin documents endpoint.

Patient
Patient → 403 Forbidden

Patients cannot access the endpoint.

Unauthenticated
Unauthenticated → 401 Unauthorized

Requests without authentication are rejected.

Invalid Doctor UUID

An invalid/nonexistent doctor UUID returned:

404 Not Found
Step 11 — Verify Document References

The API response was checked to ensure that the returned fields corresponded to the documents uploaded during doctor registration.

The returned fields were:

medical_degree
medical_license
government_id
profile_photo

No unnecessary model fields such as created_at or updated_at were exposed through the serializer.

Step 12 — PostgreSQL Verification

The corresponding DoctorDocument database records were checked in PostgreSQL.

The database values were compared with the document references returned by the API.

This verified the complete flow:

PostgreSQL
    ↓
DoctorDocument
    ↓
Django ORM
    ↓
DoctorDocumentSerializer
    ↓
Admin API
    ↓
Postman
Day 15 Result

The Admin View Doctor Documents API was successfully completed and tested.

Final endpoint:

GET /api/auth/admin/doctors/<doctor_id>/documents/

The endpoint now allows:

Admin
  ↓
Select Doctor
  ↓
View Uploaded Documents

while preventing:

Doctor
Patient
Unauthenticated User

from accessing the endpoint.

Key Concepts Learned
1. Model Relationship Traversal
User → DoctorProfile → DoctorDocument
2. get_object_or_404()

Used to retrieve objects safely while automatically returning 404 when the requested object does not exist.

3. Existing Permission Reuse

The existing:

IsAdminUser

permission was reused.

4. Existing Serializer Reuse

The existing:

DoctorDocumentSerializer

was reused instead of creating duplicate serialization logic.

5. UUID URL Parameters

Because doctors are identified by UUIDs, the URL uses:

<uuid:doctor_id>
Phase 2 Progress
Phase 2 — Core Backend APIs
Day 11 — User/Profile APIs
Day 12 — Admin Pending Doctors API
Day 13 — Doctor Profile API
Day 14 — Patient Profile API
Day 15 — Admin View Doctor Documents API ✅
Day 16 — Next Admin Module API