import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import Button from "./Button";
import logo from "../assets/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <nav className="w-full border-b border-border bg-surface">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        
        <div className="flex items-center text-2xl font-bold text-text">
  <img
    src={logo}
    alt="AnonMind"
    className="h-8 w-auto object-contain"
  />
  AnonMind
</div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <a
  href="#"
  className="rounded-lg border border-border px-3 py-2 text-sm text-text transition-colors hover:bg-background hover:text-primary"
>
              Home
            </a>

            <a
  href="#"
  className="rounded-lg border border-border px-3 py-2 text-sm text-text transition-colors hover:bg-background hover:text-primary"
>
              About
            </a>

            <a
  href="#"
  className="rounded-lg border border-border px-3 py-2 text-sm text-text transition-colors hover:bg-background hover:text-primary"
>
              How It Works
            </a>

            <a
  href="#"
  className="rounded-lg border border-border px-3 py-2 text-sm text-text transition-colors hover:bg-background hover:text-primary"
>
              For Patients
            </a>

            <a
  href="#"
  className="rounded-lg border border-border px-3 py-2 text-sm text-text transition-colors hover:bg-background hover:text-primary"
>
              For Doctors
            </a>

            <a
  href="#"
  className="rounded-lg border border-border px-3 py-2 text-sm text-text transition-colors hover:bg-background hover:text-primary"
>
              Contact
            </a>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() =>
              setTheme(theme === "light" ? "dark" : "light")
            }
            className="rounded-lg border border-border bg-surface px-3 py-2 text-text transition-colors duration-200 hover:bg-background"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-text md:hidden"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop Authentication Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="secondary">
              Login
            </Button>

            <Button>
              Get Started
            </Button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">

            <a href="#" className="text-sm text-text hover:text-primary">
              Home
            </a>

            <a href="#" className="text-sm text-text hover:text-primary">
              About
            </a>

            <a href="#" className="text-sm text-text hover:text-primary">
              How It Works
            </a>

            <a href="#" className="text-sm text-text hover:text-primary">
              For Patients
            </a>

            <a href="#" className="text-sm text-text hover:text-primary">
              For Doctors
            </a>

            <a href="#" className="text-sm text-text hover:text-primary">
              Contact
            </a>

            <Button variant="secondary">
              Login
            </Button>

            <Button>
              Get Started
            </Button>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;