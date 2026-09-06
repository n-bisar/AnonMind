import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import Button from "./Button";


function Navbar() {
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

          <Button variant="secondary">
            Login
          </Button>

          <Button>
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;