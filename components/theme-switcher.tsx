"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // Effect to handle initial theme setup
  useEffect(() => {
    // Get the stored theme from localStorage
    const storedTheme = localStorage.getItem("theme");

    if (!storedTheme) {
      // If no theme is stored, use system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    } else {
      // Ensure the stored theme is applied
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }

    setMounted(true);
  }, [setTheme]);

  useEffect(() => {
    if (mounted && theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <Sun className="swap-on text-muted-foreground w-4 h-4" />
      <Moon className="swap-off text-muted-foreground w-4 h-4" />
    </label>
  );
};

export { ThemeSwitcher };
