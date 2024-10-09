import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import NavBottom from "@/components/nav-bottom";
import { Poppins } from "next/font/google";
import { createClient } from "@/utils/supabase/server";

import type { Metadata, Viewport } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Spending Tracker",
  description: "A simple spending tracker progessive web app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Spending Tracker",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  return (
    <html lang="en" className={`${poppins.variable}`} suppressHydrationWarning>
      <head className="bg-base-100">
        <meta name="theme-color" content="#yourColorHex" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 fixed bg-base-100 z-50">
                <div className="w-full max-w-5xl mx-2 flex justify-between items-center p-3 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"} className="flex gap-1">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="auto"
                        width="2.5em"
                      >
                        <path d="M6 21H3a1 1 0 01-1-1v-8a1 1 0 011-1h3a1 1 0 011 1v8a1 1 0 01-1 1zm7 0h-3a1 1 0 01-1-1V3a1 1 0 011-1h3a1 1 0 011 1v17a1 1 0 01-1 1zm7 0h-3a1 1 0 01-1-1V9a1 1 0 011-1h3a1 1 0 011 1v11a1 1 0 01-1 1z" />
                      </svg>
                      <span className="my-auto text-balance sm:block hidden">
                        Spending Tracker
                      </span>
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}

                    <div className="my-auto">
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5 py-20 w-full h-full min-h-screen">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center mx-auto text-center text-xs gap-8 py-4 absolute bottom-4">
                {user ? (
                  <NavBottom />
                ) : (
                  <p className="fixed mb-4 bottom-0 left-0 right-0 z-50">
                    Developed by{" "}
                    <a
                      href="https://github.com/ranb27"
                      target="_blank"
                      className="font-bold hover:underline"
                      rel="noreferrer"
                    >
                      Ranb27
                    </a>
                  </p>
                )}
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
