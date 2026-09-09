import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../api/axios";



function Register() {
    const [role, setRole] = useState("patient");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const passwordsMatch = password === confirmPassword;
    const handleSubmit = async(event) => {
  event.preventDefault();

  const data = {
  full_name: fullName,
  email: email,
  password: password,
  confirm_password: confirmPassword,
};
try {
  const response = await api.post("/api/patient/register/", data);

  console.log("Registration response:", response);
} catch (error) {
  console.log("Registration error:", error.response?.data);
}
};
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
  <form className="mt-6" onSubmit={handleSubmit}>
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
  value={fullName}
  onChange={(event) => setFullName(event.target.value)}
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
  value={email}
  onChange={(event) => setEmail(event.target.value)}
  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition focus:border-primary"
/>
</label>
<label className="mt-5 block text-left">
  <span className="text-sm font-medium text-text">
    Password
  </span>

  <div className="relative mt-2">
    <input
  type={showPassword ? "text" : "password"}
  placeholder="Create a password"
  value={password}
  onChange={(event) => setPassword(event.target.value)}
  className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-text outline-none transition focus:border-primary"
/>

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-primary"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  </div>
</label>
<label className="mt-5 block text-left">
  <span className="text-sm font-medium text-text">
    Confirm Password
  </span>

  <div className="relative mt-2">
    <input
  type={showConfirmPassword ? "text" : "password"}
  placeholder="Confirm your password"
  value={confirmPassword}
  onChange={(event) => setConfirmPassword(event.target.value)}
  className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-text outline-none transition focus:border-primary"
/>

    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-primary"
      aria-label={
        showConfirmPassword
          ? "Hide confirm password"
          : "Show confirm password"
      }
    >
      {showConfirmPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  </div>
</label>
{confirmPassword && !passwordsMatch && (
  <p className="mt-2 text-sm text-red-500">
    Passwords do not match.
  </p>
)}
<button
  type="submit"
  className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
>
  Create Account
</button>
  </form>
)}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;