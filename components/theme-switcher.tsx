"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const ICON_SIZE = 16;

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "lofi");
    } else if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "black");
    }
  }, [theme]);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute(
      "data-theme",
      newTheme === "light" ? "lofi" : "black"
    );
  };

  return (
    <label className="swap swap-rotate">
      {/* Hidden checkbox controls the swap state */}
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />

      {/* Sun icon */}
      <Sun className="swap-on text-muted-foreground w-4 h-4" />

      {/* Moon icon */}
      <Moon className="swap-off text-muted-foreground w-4 h-4" />
    </label>
  );
};

export { ThemeSwitcher };
