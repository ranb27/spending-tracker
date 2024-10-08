"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollText, HandCoins, ChartPie } from "lucide-react";

export default async function NavBottom() {
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
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <nav className="bg-background border-t border-border/40 backdrop-blur pb-4">
        <div className="mx-auto max-w-xs">
          <ul className="flex justify-around p-2 gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name} className="flex-1">
                  <Link
                    href={item.href}
                    target="_self"
                    className={`flex flex-col items-center gap-1 py-2 px-2 text-sm rounded-xl transition-all duration-300 ${
                      isActive
                        ? "text-neutral-content bg-neutral shadow-sm"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <item.icon className={`h-6 w-6 ${isActive ? "" : ""}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
