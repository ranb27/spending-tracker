"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Landmark,
  History,
  CirclePlus,
  ChartNoAxesColumn,
  User,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { signOutAction } from "@/app/actions";
import Link from "next/link";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ModalAdd from "./modal-add";

interface NavBottomProps {
  user?: {
    email?: string | null;
  } | null;
}

const navItems = [
  {
    name: "Home",
    href: "/protected/home",
    icon: Landmark,
    type: "path",
  },
  {
    name: "History",
    href: "/protected/history",
    icon: History,
    type: "path",
  },
  {
    name: "Add Transaction",
    href: "#",
    icon: CirclePlus,
    type: "button",
  },
  {
    name: "Overview",
    href: "/protected/overview",
    icon: ChartNoAxesColumn,
    type: "path",
  },
];

export default function NavBottom({ user }: NavBottomProps) {
  return (
    <>
      <div className="btm-nav pb-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={
              item.type === "button" && item.name === "Add Transaction"
                ? () =>
                    (
                      document.getElementById(
                        "modal_add_tracnsaction"
                      ) as HTMLDialogElement
                    ).showModal()
                : undefined
            }
            className={`btm-nav-item ${
              item.name === "Add Transaction" ? "relative -translate-y-4" : ""
            } ${item.href === usePathname() ? "active text-primary" : ""}`}
          >
            <item.icon
              size={24}
              strokeWidth={1.5}
              className={`${
                item.name === "Add Transaction"
                  ? "btn-neutral btn btn-circle"
                  : ""
              }`}
            />
          </Link>
        ))}
        {/* Dropdown for "Account" button */}
        <div className="btm-nav-item">
          <div className="dropdown dropdown-top dropdown-end">
            <div tabIndex={0} role="button" className="btm-nav-item">
              <User size={24} strokeWidth={1.5} />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow"
            >
              <div className="px-4 grid gap-2">
                <div className="flex gap-2">
                  <div className="avatar online placeholder">
                    <div className="bg-neutral text-neutral-content w-8 rounded-full">
                      <span className="text-xs">
                        {user?.email?.split("@")[0].toUpperCase().charAt(0)}
                      </span>
                    </div>
                  </div>
                  <p className="text-start font-semibold text-primary my-auto">
                    {user?.email?.split("@")[0].toUpperCase()}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="">Appearance</p>
                  <ThemeSwitcher />
                </div>
              </div>
              <div className="divider"></div>
              <li>
                <Link href="/" className="">
                  Main page
                </Link>
              </li>
              {/* <li>
              <a>Settings</a>
            </li> */}
              <li className="text-error">
                <a onClick={() => signOutAction()}>Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ModalAdd />
    </>
  );
}
