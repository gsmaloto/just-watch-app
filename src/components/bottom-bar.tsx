"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard, Home, Search, Tv } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const navLinks: NavLinkProps[] = [
  { href: "/", Icon: Home },
  { href: "/movies", Icon: Clapperboard },
  { href: "/tv", Icon: Tv },
  { href: "/search", Icon: Search },
];

export default function BottomBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-6 bg-secondary/80 hover:bg-secondary/90 hover:scale-110 backdrop-blur-md px-6 py-3 rounded-full shadow-lg transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      {navLinks.map(({ href, Icon }) => (
        <NavLink key={href} href={href} Icon={Icon} />
      ))}
    </nav>
  );
}

const NavLink = ({ href, Icon }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center p-3 rounded-full transition",
        isActive
          ? "bg-primary text-white"
          : "text-muted-foreground hover:text-white hover:scale-110"
      )}
    >
      <Icon className="w-6 h-6" />
    </Link>
  );
};
