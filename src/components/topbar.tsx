"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { Button } from "@/components/ui/button";
import { Clapperboard, Home, Search, Tv } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Topbar() {
  const pathname = usePathname(); // Get current route

  const navLinks = [
    {
      label: "Home",
      href: "/",
      Icon: Home,
    },
    {
      label: "Movies",
      href: "/movies",
      Icon: Clapperboard,
    },
    {
      label: "TV Shows",
      href: "/tv",
      Icon: Tv,
    },
    {
      label: "Search",
      href: "/search",
      Icon: Search,
    },
  ];

  return (
    <nav className="bg-secondary">
      <div className="flex items-center justify-between p-4 container">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
        </div>

        <ul className="flex items-center gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href; // Check if current page

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg transition",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <link.Icon className="w-6 h-6" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
}
