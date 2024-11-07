import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "loading-wave": {
          "0%": { height: "0.625rem" },
          "50%": { height: "3.125rem" },
          "100%": { height: "0.625rem" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
        "fade-in-delay": "fade-in 1s ease-out 0.5s",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "loading-wave": "loading-wave 1s ease-in-out infinite",
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#6373b7",
          secondary: "#bec9e7",
          accent: "#fbd46c",
          neutral: "#1c323d",
          "base-100": "#f3f4f6",
          "base-200": "#e5e7eb",
          "base-300": "#d1d5db",
          info: "#60a5fa",
          success: "#22c55e",
          warning: "#eab308",
          error: "#ef4444",
        },
        dark: {
          primary: "#6373b7",
          secondary: "#bec9e7",
          accent: "#e5a72c",
          neutral: "#324566",
          "base-100": "#252f3f",
          "base-200": "#1a2130",
          "base-300": "#151a27",
          info: "#60a5fa",
          success: "#22c55e",
          warning: "#eab308",
          error: "#ef4444",
        },
      },
    ],

    darkTheme: "dark",
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root",
  },
} satisfies Config;

export default config;
