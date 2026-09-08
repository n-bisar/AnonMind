import { useState } from "react";



function Register() {
    const [role, setRole] = useState("patient");
  return (
    <div className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto flex min-h-[80vh] w-full max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-border bg-surface p-8 shadow-sm">
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-text">
              Create Your Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-text-muted">
              Join AnonMind and take the first step toward better mental
              well-being.
            </p>
            <div className="mt-6">
  <p className="mb-3 text-sm font-medium text-text">
    I am a
  </p>

  <div className="grid grid-cols-2 gap-3">
    <button
      type="button"
      onClick={() => setRole("patient")}
      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
        role === "patient"
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-text-muted"
      }`}
    >
      Patient
    </button>

    <button
      type="button"
      onClick={() => setRole("doctor")}
      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
        role === "doctor"
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-text-muted"
      }`}
    >
      Doctor
    </button>
  </div>
</div>

{role === "patient" && (
  <div className="mt-6">
    <h2 className="text-lg font-semibold text-text">
      Patient Registration
    </h2>

    <label className="mt-5 block text-left">
      <span className="text-sm font-medium text-text">
        Full Name
      </span>

      <input
        type="text"
        placeholder="Enter your full name"
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary"
      />
    </label>
    <label className="mt-5 block text-left">
  <span className="text-sm font-medium text-text">
    Email Address
  </span>

  <input
    type="email"
    placeholder="you@example.com"
    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary"
  />
</label>
<label className="mt-5 block text-left">
  <span className="text-sm font-medium text-text">
    Password
  </span>

  <input
    type="password"
    placeholder="Create a password"
    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary"
  />
</label>
<label className="mt-5 block text-left">
  <span className="text-sm font-medium text-text">
    Confirm Password
  </span>

  <input
    type="password"
    placeholder="Confirm your password"
    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary"
  />
</label>
  </div>
)}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;