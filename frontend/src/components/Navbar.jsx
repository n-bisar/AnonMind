import { useContext,useState } from "react";
import ThemeContext from "../context/ThemeContext";
import Button from "./Button";


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme,setTheme  } = useContext(ThemeContext);
  return (
    <nav className="w-full border-b border-border bg-surface">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-text">
          AnonMind
        </div>
      <div className="flex items-center gap-3">
        <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-text transition-colors duration-200 hover:bg-background"
            >
                {theme === "light" ? "🌙" : "☀️"}
            </button>

        <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="rounded-lg border border-border bg-surface px-3 py-2 text-text md:hidden"
>
  {isMenuOpen ? "✕" : "☰"}
</button>

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
      {isMenuOpen && (
  <div className="border-t border-border bg-surface px-6 py-4 md:hidden">
    <div className="flex flex-col gap-3">
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