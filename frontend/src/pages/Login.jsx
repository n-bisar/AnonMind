import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import lightBackground from "../assets/register-light.png";
import darkBackground from "../assets/register-dark.png";
import logo from "../assets/logo.png";
import api from "../api/axios";


function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { theme, setTheme } = useContext(ThemeContext);
  const darkMode = theme === "dark";

  const handlePatientLogin = async () => {
  console.log("PATIENT LOGIN BUTTON CLICKED");

  setFormError("");
  setSuccessMessage("");

  try {
    const response = await api.post("/api/patient/login/", {
      email,
      password,
    });

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);

    setSuccessMessage("Patient login successful!");

    const userResponse = await api.get("/api/accounts/me/");
    console.log("Authenticated patient:", userResponse.data);

  } catch (error) {
    console.error("Patient login failed:", error);
    console.log("Patient backend response:", error.response?.data);

    setFormError(
      error.response?.data?.detail ||
        "Patient login failed. Please check your credentials."
    );
  }
};

const handleDoctorLogin = async () => {
  console.log("DOCTOR LOGIN BUTTON CLICKED");

  setFormError("");
  setSuccessMessage("");

  try {
    const response = await api.post("/api/doctor/login/", {
      email,
      password,
    });

    localStorage.setItem("accessToken", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);

    setSuccessMessage("Doctor login successful!");

    const userResponse = await api.get("/api/accounts/me/");
    console.log("Authenticated doctor:", userResponse.data);

  } catch (error) {
    console.error("Doctor login failed:", error);
    console.log("Doctor backend response:", error.response?.data);

    setFormError(
      error.response?.data?.detail ||
        "Doctor login failed. Please check your credentials."
    );
  }
};

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-8">

      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${
            theme === "light" ? lightBackground : darkBackground
          })`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 md:px-12 py-5">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="AnonMind"
            className="h-10 w-auto object-contain"
          />

          <span
            className={`text-2xl font-bold transition-colors duration-300 ${
              darkMode ? "text-white" : "text-[#102b4c]"
            }`}
          >
            AnonMind
          </span>
        </div>

        {/* Header Right */}
        <div className="flex items-center gap-4">

          <span
            className={`hidden sm:block text-sm transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Don't have an account?
          </span>

          <button
            type="button"
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg transition ${
              darkMode
                ? "border-[#284457] bg-[#162c3d] text-white hover:bg-[#1b3d4d]"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className={`border px-5 py-2 rounded-lg text-sm font-medium transition ${
              darkMode
                ? "border-[#2ab9b5] text-[#2ab9b5] hover:bg-[#1b3d4d]"
                : "border-[#22aaa8] text-[#159b9d] hover:bg-[#e8f8f8]"
            }`}
          >
            Get Started
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 min-h-[calc(100vh-80px)] flex items-center">

        <div className="w-full max-w-6xl mx-auto px-8 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <section className="hidden lg:block">

            <h1
              className={`text-5xl font-bold leading-tight transition-colors duration-300 ${
                darkMode ? "text-white" : "text-[#102b4c]"
              }`}
            >
              A Safer Space
              <br />
              for a Healthier You
            </h1>

            <p
              className={`mt-5 text-lg leading-relaxed transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Anonymous. Supportive. Always here.
              <br />
              Your mental well-being matters.
            </p>

            <div className="mt-9 space-y-6">

              {/* Privacy */}
              <div className="flex items-center gap-4">

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    darkMode
                      ? "bg-[#1b3d4d] text-[#2ab9b5]"
                      : "bg-[#d8f3f3] text-[#159b9d]"
                  }`}
                >
                  🔒
                </div>

                <div>
                  <h3
                    className={`font-semibold transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-[#102b4c]"
                    }`}
                  >
                    Your Privacy Matters
                  </h3>

                  <p
                    className={`text-sm transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Talk freely, without judgment.
                  </p>
                </div>

              </div>

              {/* Support */}
              <div className="flex items-center gap-4">

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    darkMode
                      ? "bg-[#1b3d4d] text-[#2ab9b5]"
                      : "bg-[#d8f3f3] text-[#159b9d]"
                  }`}
                >
                  ♡
                </div>

                <div>
                  <h3
                    className={`font-semibold transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-[#102b4c]"
                    }`}
                  >
                    Support When You Need It
                  </h3>

                  <p
                    className={`text-sm transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    AI-powered guidance and
                    <br />
                    verified professionals.
                  </p>
                </div>

              </div>

              {/* Kinder Tomorrow */}
              <div className="flex items-center gap-4">

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    darkMode
                      ? "bg-[#1b3d4d] text-[#2ab9b5]"
                      : "bg-[#d8f3f3] text-[#159b9d]"
                  }`}
                >
                  ♧
                </div>

                <div>
                  <h3
                    className={`font-semibold transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-[#102b4c]"
                    }`}
                  >
                    A Kinder Tomorrow
                  </h3>

                  <p
                    className={`text-sm transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Because your mental health
                    <br />
                    matters.
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* Right Card */}
          <section
            className={`w-full max-w-[520px] mx-auto rounded-2xl shadow-sm px-8 md:px-10 py-9 transition-colors duration-300 ${
              darkMode
                ? "bg-[#162c3d] border border-[#284457]"
                : "bg-white"
            }`}
          >

            <div className="text-center">

              <h2
                className={`text-3xl font-bold transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-[#102b4c]"
                }`}
              >
                Welcome Back
              </h2>

              <p
                className={`mt-2 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Sign in to continue to AnonMind
                <br />
                safely and securely.
              </p>

              {/* Role */}
              <div className="mt-7">

                <p
                  className={`text-center text-sm font-semibold mb-3 transition-colors duration-300 ${
                    darkMode ? "text-white" : "text-[#102b4c]"
                  }`}
                >
                  I am a
                </p>

                <div className="grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={() => setRole("patient")}
                    className={`py-3 rounded-lg border text-sm font-semibold transition ${
                      role === "patient"
                        ? darkMode
                          ? "border-[#2ab9b5] bg-[#1b3d4d] text-[#2ab9b5]"
                          : "border-[#20aaa9] bg-[#e5f7f7] text-[#159b9d]"
                        : darkMode
                          ? "border-[#284457] bg-[#0f2232] text-gray-300 hover:bg-[#163044]"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    Patient
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("doctor")}
                    className={`py-3 rounded-lg border text-sm font-semibold transition ${
                      role === "doctor"
                        ? darkMode
                          ? "border-[#2ab9b5] bg-[#1b3d4d] text-[#2ab9b5]"
                          : "border-[#20aaa9] bg-[#e5f7f7] text-[#159b9d]"
                        : darkMode
                          ? "border-[#284457] bg-[#0f2232] text-gray-300 hover:bg-[#163044]"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    Doctor
                  </button>

                </div>
              </div>

            </div>

            {/* Email */}
            <div className="mt-7">

              <label
                className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-[#102b4c]"
                }`}
              >
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`w-full h-12 rounded-lg border px-4 text-sm outline-none transition ${
                  darkMode
                    ? "border-[#284457] bg-[#0f2232] text-white placeholder:text-gray-500 focus:border-[#2ab9b5] focus:ring-1 focus:ring-[#2ab9b5]"
                    : "border-gray-200 bg-white text-[#102b4c] focus:border-[#20aaa9] focus:ring-1 focus:ring-[#20aaa9]"
                }`}
              />

            </div>

            {/* Password */}
            <div className="mt-5">

              <label
                className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-[#102b4c]"
                }`}
              >
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={`w-full h-12 rounded-lg border px-4 pr-12 text-sm outline-none transition ${
                    darkMode
                      ? "border-[#284457] bg-[#0f2232] text-white placeholder:text-gray-500 focus:border-[#2ab9b5] focus:ring-1 focus:ring-[#2ab9b5]"
                      : "border-gray-200 bg-white text-[#102b4c] focus:border-[#20aaa9] focus:ring-1 focus:ring-[#20aaa9]"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${
                    darkMode
                      ? "text-gray-400 hover:text-[#2ab9b5]"
                      : "text-gray-400 hover:text-[#159b9d]"
                  }`}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>

              </div>

              {/* Forgot Password */}
              <div className="flex justify-end mt-3">

                <button
                  type="button"
                  className="text-sm font-medium text-[#159b9d] hover:underline"
                >
                  Forgot password?
                </button>

              </div>

              {/* Login */}
              <button
                type="button"
                onClick={
  role === "patient"
    ? handlePatientLogin
    : handleDoctorLogin
}
                className="w-full h-12 mt-6 rounded-lg bg-[#20aaa9] text-white font-semibold hover:bg-[#159b9d] transition"
              >
                Login
              </button>

              {/* Divider */}
              <div className="mt-7">

                <div className="flex items-center gap-3">

                  <div
                    className={`flex-1 h-px ${
                      darkMode ? "bg-[#284457]" : "bg-gray-200"
                    }`}
                  />

                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-400"
                    }`}
                  >
                    OR
                  </span>

                  <div
                    className={`flex-1 h-px ${
                      darkMode ? "bg-[#284457]" : "bg-gray-200"
                    }`}
                  />

                </div>

                <p
                  className={`text-center text-sm mt-5 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Don't have an account?{" "}

                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="font-semibold text-[#159b9d] hover:underline"
                  >
                    Get Started
                  </button>

                </p>

              </div>

            </div>

          </section>

        </div>
      </main>

    </div>
  );
}

export default Login;