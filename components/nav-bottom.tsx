"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollText, HandCoins, ChartPie } from "lucide-react";

const NavBottom = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Spend",
      href: "/spend",
      icon: HandCoins,
    },
    {
      name: "Track",
      href: "/track",
      icon: ScrollText,
    },
    {
      name: "Analyst",
      href: "/analyst",
      icon: ChartPie,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <nav className="bg-background border-t border-border/40 backdrop-blur">
        <div className="mx-auto max-w-xs">
          <ul className="flex justify-around p-2 gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name} className="flex-1">
                  <Link
                    href={item.href}
                    target="_self"
                    className={`flex flex-col items-center gap-1 py-2 px-2 text-sm rounded-xl transition-all duration-500 ${
                      isActive
                        ? "text-primary bg-primary/10 shadow-sm"
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
};

export default NavBottom;
