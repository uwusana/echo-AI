import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AudioWaveform,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Contact", href: "#contact" },
];

function NavLink({ href, label, className, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative text-sm font-medium text-[#A1A1AA] transition-colors duration-300 hover:text-[#FAFAFA]",
        className
      )}
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#3B82F6] transition-all duration-300 ease-out group-hover:w-full" />
    </a>
  );
}

function Logo() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5 rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50"
    >
      <div className="flex size-8 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B] transition-all duration-300 group-hover:border-[#3B82F6]/40 group-hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.45)]">
        <AudioWaveform className="size-4 text-[#3B82F6]" strokeWidth={2.25} />
      </div>
      <span className="text-base font-semibold tracking-tight text-[#FAFAFA]">
        Echo<span className="text-[#3B82F6]">AI</span>
      </span>
    </Link>
  );
}

function DesktopActions() {
  return (
    <div className="hidden items-center gap-2 lg:flex">
      <Button
        variant="ghost"
        className="h-9 px-4 text-[#A1A1AA] transition-colors duration-300 hover:bg-white/5 hover:text-[#FAFAFA]"
      >
        Sign In
      </Button>
      <Button className="h-9 gap-1.5 border-0 bg-[#3B82F6] px-4 text-white shadow-[0_0_24px_-6px_rgba(59,130,246,0.55)] transition-all duration-300 hover:bg-[#2563EB] hover:shadow-[0_0_28px_-4px_rgba(59,130,246,0.65)]">
        Get Started
        <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5" />
      </Button>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-[#A1A1AA] hover:bg-white/5 hover:text-[#FAFAFA] lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full border-[#27272A] bg-[#18181B]/95 text-[#FAFAFA] backdrop-blur-xl sm:max-w-sm"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <div className="mt-8 flex flex-col gap-8">
          <Logo />

          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <SheetClose key={link.href} asChild>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-[#A1A1AA] transition-colors duration-300 hover:bg-white/5 hover:text-[#FAFAFA]"
                >
                  {link.label}
                </a>
              </SheetClose>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t border-[#27272A] pt-6">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="h-10 w-full border-[#27272A] bg-transparent text-[#FAFAFA] hover:bg-white/5 hover:text-[#FAFAFA]"
              >
                Sign In
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className="h-10 w-full gap-1.5 border-0 bg-[#3B82F6] text-white hover:bg-[#2563EB]">
                Get Started
                <ArrowRight className="size-4" />
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      id="navbar"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-out",
        scrolled
          ? "border-b border-[#27272A]/80 bg-[#09090B]/75 shadow-[0_1px_0_0_rgba(255,255,255,0.04)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DesktopActions />
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}
