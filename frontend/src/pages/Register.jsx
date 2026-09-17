import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import lightBackground from "../assets/register-light.png";
import darkBackground from "../assets/register-dark.png";

import {
  Eye,
  EyeOff,
  CircleCheck,
  LockKeyhole,
  Heart,
  Users,
  Moon,
  Sun,
} from "lucide-react";
import api from "../api/axios";
import logo from "../assets/logo.png";

function Register() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
const [registrationNumber, setRegistrationNumber] = useState("");
const [specialization, setSpecialization] = useState("");
const [yearsOfExperience, setYearsOfExperience] = useState("");
const [hospital, setHospital] = useState("");

  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
  setFormError("Please fill in all required fields.");
  return;
}

    const data = {
      full_name: fullName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    try {
      await api.post("/api/patient/register/", data);

      setRegistrationSuccess(true);
    } catch (error) {
      console.log("Registration error:", error.response?.data);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-6 py-8">
      <div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${theme === "light" ? lightBackground : darkBackground})`,
  }}
/>
  
  <div className="relative z-10 mx-auto flex h-12 max-w-7xl items-center justify-between">
    <div className="flex items-center gap-3">
  <img
    src={logo}
    alt="AnonMind"
    className="h-10 w-auto object-contain"
  />

  <span className="text-2xl font-bold text-text">
    AnonMind
  </span>
</div>
    <div className="flex items-center gap-4">
  <span className="text-sm text-text-muted">
    Already have an account?
  </span>

  <button
    type="button"
    className="text-sm font-medium text-primary transition hover:opacity-80"
  >
    Login
  </button>

  <button
  type="button"
  onClick={() =>
    setTheme(theme === "light" ? "dark" : "light")
  }
  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text transition-colors hover:bg-background"
  aria-label="Toggle dark mode"
>
  {theme === "light" ? (
    <Moon className="h-5 w-5" />
  ) : (
    <Sun className="h-5 w-5" />
  )}
</button>
</div>
  </div>

  <div className="relative z-10 mx-auto mt-2 grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">

        {/* Success Modal */}
        {registrationSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
            <div className="w-full max-w-md rounded-2xl bg-background p-8 text-center shadow-xl animate-in fade-in zoom-in-95">
              <CircleCheck className="mx-auto mb-4 h-12 w-12 text-primary" />

              <h2 className="text-2xl font-semibold text-primary">
                Registration Successful
              </h2>

              <p className="mt-3 text-text-secondary">
                Please check your email to verify your account before logging in.
              </p>

              <button
                type="button"
                onClick={() => setRegistrationSuccess(false)}
                className="mt-6 w-full rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Left Section */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center">
          <h1 className="max-w-xl text-5xl font-bold leading-tight text-text">
  A Safer Space for a Healthier You
</h1>
<p className="mt-6 max-w-lg text-lg leading-8 text-text-muted">
  A private and supportive space where you can talk freely, find
  understanding, and take the next step toward better mental well-being.
</p>
<div className="mt-10 flex items-start gap-4">
  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
    <LockKeyhole className="h-6 w-6 text-primary" />
  </div>

  <div>
    <h3 className="text-base font-semibold text-text">
      Your Privacy Matters
    </h3>

    <p className="mt-1 text-sm leading-6 text-text-muted">
      Talk freely, without judgment.
    </p>
  </div>
</div>
<div className="mt-6 flex items-start gap-4">
  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
    <Heart className="h-6 w-6 text-primary" />
  </div>

  <div>
    <h3 className="text-base font-semibold text-text">
      Support When You Need It
    </h3>

    <p className="mt-1 max-w-sm text-sm leading-6 text-text-muted">
      AI-powered guidance and verified professionals.
    </p>
  </div>
</div>
<div className="mt-6 flex items-start gap-4">
  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
    <Users className="h-6 w-6 text-primary" />
  </div>

  <div>
    <h3 className="text-base font-semibold text-text">
      A Kinder Tomorrow
    </h3>

    <p className="mt-1 max-w-sm text-sm leading-6 text-text-muted">
      Because your mental health matters.
    </p>
  </div>
</div>

        </div>

        {/* Right Section */}
        <div className="lg:col-start-2">
         <div className="mx-auto flex w-full max-w-lg items-center justify-center">
            <div className="w-full max-w-lg rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm">
              <div className="text-center">

                <h1 className="text-3xl font-bold text-text">
  {role === "patient" ? "Create Your Account" : "Doctor Registration"}
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

                    
                    <label className="mt-4 block text-left">
                      <span className="text-sm font-medium text-text">
                        Full Name
                      </span>

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(event) =>
                          setFullName(event.target.value)
                        }
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
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
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
                          onChange={(event) =>
                            setPassword(event.target.value)
                          }
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-text outline-none transition focus:border-primary"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition hover:text-primary"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
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
                          type={
                            showConfirmPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-text outline-none transition focus:border-primary"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
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
                    {formError && (
  <p className="mt-2 text-sm text-red-500">
    {formError}
  </p>
)}

                    <button
                      type="submit"
                      className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Create Account
                    </button>
                      <p className="mt-4 text-center text-xs leading-5 text-text-muted">
  By creating an account, you agree to our{" "}
  <span className="text-primary underline underline-offset-2">
    Terms of Service
  </span>{" "}
  and{" "}
  <span className="text-primary underline underline-offset-2">
    Privacy Policy
  </span>
  .
</p>
                  </form>
                )}
                {role === "doctor" && (
  <div className="mt-6 text-center">
    <p className="text-text-muted">
      Doctor registration form coming next.
    </p>
  </div>
)}

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;