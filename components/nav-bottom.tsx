"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ScrollText, HandCoins, ChartPie, User } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { signOutAction } from "@/app/actions";
import Link from "next/link";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";

interface NavBottomProps {
  user?: {
    email?: string | null;
  } | null;
}

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
    name: "Overview",
    href: "/protected/overview",
    icon: ChartPie,
  },
  {
    name: "Account",
    href: "#",
    icon: User,
  },
];

export default function NavBottom({ user }: NavBottomProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Modified tab index calculation
  const getCurrentTabIndex = () => {
    if (pathname === "/") return -1; // Return -1 for home path
    return navItems.findIndex((item) => item.href === pathname);
  };

  const currentTabIndex = getCurrentTabIndex();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 3) {
      // Account tab
      setAnchorEl(event.currentTarget as HTMLElement);
    } else {
      router.push(navItems[newValue].href);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <Paper elevation={3}>
        <Tabs
          value={currentTabIndex === -1 ? false : currentTabIndex}
          onChange={handleChange}
          aria-label="navigation tabs"
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "oklch(var(--in))",
            },
            backgroundColor: "oklch(var(--b1))",
            paddingBottom: "1rem",
          }}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Tab
                key={item.name}
                icon={<Icon />}
                aria-label={item.name}
                sx={{
                  "&.MuiTab-root": {
                    color: "oklch(var(--bc))",
                  },
                  "&.Mui-selected": {
                    color: "oklch(var(--in))",
                  },
                }}
              />
            );
          })}
        </Tabs>
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "oklch(var(--b1))",
            color: "oklch(var(--bc))",
            width: "auto",
            minWidth: "25%",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            borderRadius: "1rem",
            padding: "0.5rem",
          },
          margin: "0.5rem",
        }}
      >
        <div className="flex justify-between mx-4 gap-4">
          <div className="avatar online placeholder">
            <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full">
              <span className="text-sm">
                {user ? user.email?.charAt(0).toUpperCase() : "G"}
              </span>
            </div>
          </div>
          <span>{user ? user.email : "Guest"}</span>
          <ThemeSwitcher />
        </div>
        <div className="divider"></div>
        <MenuItem onClick={() => router.push("/")}>Home</MenuItem>
        {user ? (
          <MenuItem
            onClick={() => signOutAction()}
            sx={{ color: "oklch(var(--er))" }}
          >
            Sign out
          </MenuItem>
        ) : (
          <>
            <MenuItem onClick={() => router.push("/sign-in")}>Sign in</MenuItem>
            <MenuItem onClick={() => router.push("/sign-up")}>Sign up</MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
}
