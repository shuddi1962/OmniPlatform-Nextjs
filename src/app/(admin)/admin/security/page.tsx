"use client";

const securityEvents = [
  { id: 1, event: "Failed login attempt", user: "james@nexgen.io", ip: "192.168.1.45", time: "5 min ago", severity: "warning" },
  { id: 2, event: "Password changed", user: "sarah@techstart.io", ip: "10.0.0.12", time: "1 hour ago", severity: "info" },
  { id: 3, event: "API key rotated", user: "mike@growthco.com", ip: "172.16.0.8", time: "3 hours ago", severity: "info" },
  { id: 4, event: "Suspicious activity detected", user: "unknown", ip: "203.0.113.42", time: "5 hours ago", severity: "danger" },
  { id: 5, event: "2FA enabled", user: "emily@scaleup.io", ip: "10.0.0.34", time: "1 day ago", severity: "info" },
  { id: 6, event: "Account locked after 5 failed attempts", user: "hacker@evil.com", ip: "198.51.100.23", time: "2 days ago", severity: "danger" },
];

const securitySettings = [
  { label: "Enforce 2FA for all users", enabled: true },
  { label: "Require strong passwords", enabled: true },
  { label: "IP allowlisting", enabled: false },
  { label: "Session timeout (30 min)", enabled: true },
  { label: "Login attempt lockout (5 attempts)", enabled: true },
  { label: "API rate limiting", enabled: true },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function AdminSecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary">Security Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage platform security and access controls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Failed Logins (24h)", value: "12", icon: "lock", color: "text-secondary" },
          { label: "Active Sessions", value: "1,847", icon: "devices", color: "text-primary" },
          { label: "2FA Adoption", value: "78.3%", icon: "security", color: "text-success" },
          { label: "API Keys Active", value: "342", icon: "key", color: "text-tertiary" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MaterialIcon name={stat.icon} className={`${stat.color} text-xl`} />
            </div>
            <div>
              <div className="text-lg font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-primary mb-4">Security Policies</h3>
          <div className="space-y-3">
            {securitySettings.map((setting) => (
              <div key={setting.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-primary">{setting.label}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={setting.enabled} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-primary">Security Events</h3>
          </div>
          <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
            {securityEvents.map((event) => (
              <div key={event.id} className="px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${
                    event.severity === "danger" ? "bg-secondary" :
                    event.severity === "warning" ? "bg-tertiary" : "bg-success"
                  }`} />
                  <span className="text-sm font-medium text-primary">{event.event}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 ml-4">
                  <span>{event.user}</span>
                  <span>{event.ip}</span>
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-primary mb-4">IP Allowlist</h3>
        <p className="text-sm text-gray-500 mb-4">Restrict access to specific IP addresses</p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter IP address (e.g., 192.168.1.0/24)"
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
          />
          <button className="px-4 py-2.5 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors">
            Add IP
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {["192.168.0.0/16", "10.0.0.0/8", "172.16.0.0/12"].map((ip) => (
            <div key={ip} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-mono text-primary">{ip}</span>
              <button className="text-xs text-secondary font-medium hover:text-secondary-600">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
