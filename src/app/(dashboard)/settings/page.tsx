"use client";

import { useState } from "react";

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "team">("profile");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(["profile", "security", "notifications", "team"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
              activeTab === tab ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-2xl space-y-6">
          <h3 className="font-semibold text-primary">Profile Information</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">JD</span>
            </div>
            <div>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
                Change Avatar
              </button>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                defaultValue="John"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                defaultValue="Doe"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue="john@company.com"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              defaultValue="TechStart Inc."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
            <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none">
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC-6 (Central Time)</option>
              <option>UTC-7 (Mountain Time)</option>
              <option>UTC-8 (Pacific Time)</option>
            </select>
          </div>
          <button className="px-6 py-2.5 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors">
            Save Changes
          </button>
        </div>
      )}

      {activeTab === "security" && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
            <h3 className="font-semibold text-primary">Change Password</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
            <button className="px-6 py-2.5 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors">
              Update Password
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-primary mb-4">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-primary">Authenticator App</div>
                <div className="text-xs text-gray-500">Use an authenticator app to generate one-time codes</div>
              </div>
              <button className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors">
                Enable
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-primary mb-4">Active Sessions</h3>
            <div className="space-y-3">
              {[
                { device: "Chrome on macOS", location: "New York, US", lastActive: "Current session" },
                { device: "Safari on iPhone", location: "New York, US", lastActive: "2 hours ago" },
              ].map((session, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MaterialIcon name={i === 0 ? "laptop" : "smartphone"} className="text-gray-400 text-xl" />
                    <div>
                      <div className="text-sm font-medium text-primary">{session.device}</div>
                      <div className="text-xs text-gray-400">{session.location} &middot; {session.lastActive}</div>
                    </div>
                  </div>
                  {i > 0 && (
                    <button className="text-xs text-secondary font-medium hover:text-secondary-600">Revoke</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-2xl space-y-4">
          <h3 className="font-semibold text-primary">Notification Preferences</h3>
          {[
            { label: "Email notifications for new messages", checked: true },
            { label: "Email notifications for campaign reports", checked: true },
            { label: "Email notifications for new contacts", checked: false },
            { label: "Push notifications for support tickets", checked: true },
            { label: "Weekly activity digest", checked: true },
            { label: "Product updates and announcements", checked: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-primary">{item.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
              </label>
            </div>
          ))}
          <button className="px-6 py-2.5 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors">
            Save Preferences
          </button>
        </div>
      )}

      {activeTab === "team" && (
        <div className="space-y-6 max-w-2xl">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-primary">Team Members</h3>
              <button className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1">
                <MaterialIcon name="add" className="text-lg" />
                Invite
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: "John Doe", email: "john@company.com", role: "Owner", avatar: "JD" },
                { name: "Sarah Johnson", email: "sarah@company.com", role: "Admin", avatar: "SJ" },
                { name: "Mike Chen", email: "mike@company.com", role: "Member", avatar: "MC" },
              ].map((member) => (
                <div key={member.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{member.avatar}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary">{member.name}</div>
                      <div className="text-xs text-gray-400">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 bg-primary/5 text-primary/70 rounded">{member.role}</span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MaterialIcon name="more_vert" className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
