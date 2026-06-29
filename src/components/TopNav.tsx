"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const pageTitle: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/inbox": "Inbox",
  "/contacts": "Contacts",
  "/campaigns": "Campaigns",
  "/analytics": "Analytics",
  "/drive": "Drive",
  "/automate": "Automate",
  "/billing": "Billing",
  "/support": "Support",
  "/settings": "Settings",
};

export default function TopNav({ user }: { user: User }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const title = pageTitle[pathname] || "Dashboard";
  const initials = user.user_metadata?.full_name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase() || user.email?.charAt(0).toUpperCase() || "U";

  const notifications = [
    { id: 1, text: "New message from Sarah Johnson", time: "2m ago", unread: true },
    { id: 2, text: "Campaign 'Welcome Series' completed", time: "1h ago", unread: true },
    { id: 3, text: "New contact added: Mike Chen", time: "3h ago", unread: false },
    { id: 4, text: "Invoice #INV-2024 paid", time: "5h ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-xl font-semibold text-primary">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
          <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent ml-2 text-sm focus:outline-none w-48"
          />
        </div>

        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-primary">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 ${
                      notif.unread ? "bg-secondary/5" : ""
                    }`}
                  >
                    <p className="text-sm text-gray-700">{notif.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-100">
                <button className="text-xs text-secondary font-medium hover:text-secondary-600">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{initials}</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
              {user.user_metadata?.full_name || user.email}
            </span>
            <span className="material-symbols-outlined text-gray-400 text-lg">expand_more</span>
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-primary">{user.user_metadata?.full_name || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={() => router.push("/settings")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">settings</span>
                Account Settings
              </button>
              <hr className="my-1 border-gray-100" />
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-secondary hover:bg-secondary/5 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
