import { Link } from "react-router-dom";
import { AudioWaveform, GitBranch, Link2, X } from "lucide-react";

import { cn } from "@/lib/utils";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Docs", href: "#docs" },
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "API", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  { label: "X", href: "#", icon: X },
  { label: "LinkedIn", href: "#", icon: Link2 },
  { label: "GitHub", href: "#", icon: GitBranch },
];

function FooterLink({ href, label }) {
  return (
    <a
      href={href}
      className="text-sm text-[#A1A1AA] transition-colors duration-300 hover:text-[#FAFAFA]"
    >
      {label}
    </a>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-medium text-[#FAFAFA]">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      aria-label="Site footer"
      className="w-full border-t border-[#27272A]/80 bg-[#09090B]"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50"
            >
              <div className="flex size-8 items-center justify-center rounded-lg border border-[#27272A] bg-[#18181B]">
                <AudioWaveform
                  className="size-4 text-[#3B82F6]"
                  strokeWidth={2.25}
                />
              </div>
              <span className="text-base font-semibold tracking-tight text-[#FAFAFA]">
                Echo<span className="text-[#3B82F6]">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A1A1AA]">
              AI-powered meeting intelligence for teams that want clarity, not
              clutter.
            </p>
          </div>

          <FooterColumn title="Product" links={FOOTER_LINKS.Product} />
          <FooterColumn title="Resources" links={FOOTER_LINKS.Resources} />
          <FooterColumn title="Company" links={FOOTER_LINKS.Company} />

          <div>
            <h3 className="mb-4 text-sm font-medium text-[#FAFAFA]">Socials</h3>
            <ul className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-lg border border-[#27272A]",
                      "bg-[#18181B] text-[#A1A1AA] transition-all duration-300",
                      "hover:border-[#3B82F6]/30 hover:bg-[#18181B]/80 hover:text-[#FAFAFA]"
                    )}
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#27272A]/80 pt-8 sm:flex-row">
          <p className="text-sm text-[#71717A]">
            &copy; {year} EchoAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <FooterLink href="#" label="Terms" />
            <FooterLink href="#" label="Privacy" />
          </div>
        </div>
      </div>
    </footer>
  );
}
