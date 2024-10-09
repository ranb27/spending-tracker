"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollText, HandCoins, ChartPie, User } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { signOutAction } from "@/app/actions";

interface NavBottomProps {
  user?: {
    email?: string | null;
  } | null;
}

export default function NavBottom({ user }: NavBottomProps) {
  const pathname = usePathname();
  const navItems = [
    {
      name: "Spend",
      href: "/protected/spend",
      icon: HandCoins,
    },
    {
      name: "Track",
      href: "/protected/track",
      icon: ScrollText,
    },
    {
      name: "Analyst",
      href: "/protected/analyst",
      icon: ChartPie,
    },
    {
      name: "Account",
      href: "#",
      icon: User,
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {/* Main Navigation */}
      <nav className="bg-base-100/80 backdrop-blur-lg border-t border-base-300 pb-4">
        <ul className="flex justify-around pb-safe-bottom">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="flex-1">
                {item.name === "Account" ? (
                  <div className="dropdown dropdown-top dropdown-end w-full">
                    <label
                      tabIndex={0}
                      className={`flex flex-col items-center py-1 px-2 w-full ${
                        isActive
                          ? "text-primary"
                          : "text-base-content/60 active:text-primary"
                      }`}
                    >
                      <item.icon className="h-6 w-6 mb-1" />
                      <span className="text-[10px]">{item.name}</span>
                    </label>
                    <div
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box shadow-lg w-full min-w-56 m-2 overflow-hidden"
                    >
                      <div className="bg-base-200 px-4 py-2 flex items-center justify-between rounded-lg">
                        <span className="text-sm font-medium">
                          {user ? user.email?.split("@")[0] : "Guest"}
                        </span>
                        <ThemeSwitcher />
                      </div>
                      <ul className="py-1">
                        <li>
                          <Link href="/" className="py-2 px-4">
                            Home
                          </Link>
                        </li>
                        {user ? (
                          <li>
                            <form action={signOutAction}>
                              <button
                                type="submit"
                                className="w-full text-left py-2 px-4 text-error"
                              >
                                Sign out
                              </button>
                            </form>
                          </li>
                        ) : (
                          <>
                            <li>
                              <Link href="/sign-in" className="py-2 px-4">
                                Sign in
                              </Link>
                            </li>
                            <li>
                              <Link href="/sign-up" className="py-2 px-4">
                                Sign up
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex flex-col items-center py-1 px-2 ${
                      isActive
                        ? "text-primary"
                        : "text-base-content/60 active:text-primary"
                    }`}
                  >
                    <item.icon className="h-6 w-6 mb-1" />
                    <span className="text-[10px]">{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
