"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
  { href: "/inbox", icon: "inbox", label: "Inbox" },
  { href: "/contacts", icon: "contacts", label: "Contacts" },
  { href: "/campaigns", icon: "campaign", label: "Campaigns" },
  { href: "/analytics", icon: "analytics", label: "Analytics" },
  { href: "/drive", icon: "cloud", label: "Drive" },
  { href: "/automate", icon: "smart_toy", label: "Automate" },
  { href: "/billing", icon: "receipt_long", label: "Billing" },
  { href: "/support", icon: "support_agent", label: "Support" },
  { href: "/settings", icon: "settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-primary text-white z-40 flex flex-col">
      <div className="h-16 flex items-center gap-2 px-5 border-b border-white/10">
        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">OP</span>
        </div>
        <span className="text-lg font-bold">OmniPlatform</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
          Admin Panel
        </Link>
      </div>
    </aside>
  );
}
