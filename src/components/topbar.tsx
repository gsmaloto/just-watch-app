"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { Clapperboard, Home, Menu, Search, Tv } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the NavLink type
interface NavLinkProps {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

export default function Topbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", Icon: Home },
    { label: "Movies", href: "/movies", Icon: Clapperboard },
    { label: "TV Shows", href: "/tv", Icon: Tv },
    { label: "Search", href: "/search", Icon: Search },
  ];

  return (
    <nav className="bg-secondary/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50 h-20 shadow-lg">
      <div className="flex items-center justify-between p-4 container">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink label={link.label} href={link.href} Icon={link.Icon} />
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-secondary">
            <SheetHeader>
              <SheetTitle>Just Watch</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  Icon={link.Icon}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex items-center gap-2">
          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
}

// NavLink Component
const NavLink = ({ label, href, Icon, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition",
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
      )}
      onClick={onClick}
    >
      <Icon className="w-6 h-6" />
      {label}
    </Link>
  );
};
