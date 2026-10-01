import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import lightBackground from "../assets/register-light.png";
import darkBackground from "../assets/register-dark.png";
import logo from "../assets/logo.png";


function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
const { theme, setTheme } = useContext(ThemeContext);
const darkMode = theme === "dark";

  return (
    <div
  className={`min-h-screen overflow-hidden transition-colors duration-300 ${
    darkMode ? "bg-[#0f172a]" : "bg-[#f4fbfc]"
  }`}
>

      {/* Header */}
      <header className="flex items-center justify-between px-8 md:px-12 py-5">
        
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-[#102b4c]">
            AnonMind
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-gray-500">
            Don't have an account?
          </span>
<button
  type="button"
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-lg hover:bg-gray-50 transition"
>
  {theme === "light" ? "🌙" : "☀️"}
</button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="border border-[#22aaa8] text-[#159b9d] px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#e8f8f8] transition"
          >
            Get Started
          </button>
        </div>

      </header>

      {/* Main */}
      <main className="min-h-[calc(100vh-80px)] flex items-center">

        <div className="w-full max-w-6xl mx-auto px-8 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left side */}
          <section className="hidden lg:block">

            <h1 className="text-5xl font-bold leading-tight text-[#102b4c]">
              A Safer Space
              <br />
              for a Healthier You
            </h1>

            <p className="mt-5 text-lg text-gray-500 leading-relaxed">
              Anonymous. Supportive. Always here.
              <br />
              Your mental well-being matters.
            </p>
            <div className="mt-9 space-y-6">

  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-[#d8f3f3] flex items-center justify-center text-[#159b9d] text-xl">
      🔒
    </div>

    <div>
      <h3 className="font-semibold text-[#102b4c]">
        Your Privacy Matters
      </h3>

      <p className="text-sm text-gray-500">
        Talk freely, without judgment.
      </p>
    </div>
  </div>


  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-[#d8f3f3] flex items-center justify-center text-[#159b9d] text-xl">
      ♡
    </div>

    <div>
      <h3 className="font-semibold text-[#102b4c]">
        Support When You Need It
      </h3>

      <p className="text-sm text-gray-500">
        AI-powered guidance and
        <br />
        verified professionals.
      </p>
    </div>
  </div>


  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-[#d8f3f3] flex items-center justify-center text-[#159b9d] text-xl">
      ♧
    </div>

    <div>
      <h3 className="font-semibold text-[#102b4c]">
        A Kinder Tomorrow
      </h3>

      <p className="text-sm text-gray-500">
        Because your mental health
        <br />
        matters.
      </p>
    </div>
  </div>

</div>

          </section>

          {/* Right card */}
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
    className="w-full h-12 rounded-lg border border-gray-200 px-4 text-sm text-[#102b4c] outline-none focus:border-[#20aaa9] focus:ring-1 focus:ring-[#20aaa9] transition"
  />

</div>
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
      className="w-full h-12 rounded-lg border border-gray-200 px-4 pr-12 text-sm text-[#102b4c] outline-none focus:border-[#20aaa9] focus:ring-1 focus:ring-[#20aaa9] transition"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#159b9d] transition"
    >
      {showPassword ? "🙈" : "👁"}
    </button>

  </div>
<div className="flex justify-end mt-3">
  <button
    type="button"
    className="text-sm font-medium text-[#159b9d] hover:underline"
  >
    Forgot password?
  </button>
</div>
<button
  type="button"
  className="w-full h-12 mt-6 rounded-lg bg-[#20aaa9] text-white font-semibold hover:bg-[#159b9d] transition"
>
  Login
</button>
<div className="mt-7">
  <div className="flex items-center gap-3">
    <div className="flex-1 h-px bg-gray-200"></div>
    <span className="text-xs text-gray-400">OR</span>
    <div className="flex-1 h-px bg-gray-200"></div>
  </div>

  <p className="text-center text-sm text-gray-500 mt-5">
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