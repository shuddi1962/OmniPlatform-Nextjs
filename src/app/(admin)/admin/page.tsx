"use client";

const stats = [
  { label: "Total Users", value: "10,847", change: "+234 this month", icon: "people" },
  { label: "Active Today", value: "3,421", change: "31.5% of total", icon: "person" },
  { label: "Organizations", value: "248", change: "+12 this month", icon: "business" },
  { label: "Revenue (MRR)", value: "$89,432", change: "+8.2% from last month", icon: "payments" },
];

const recentUsers = [
  { name: "Sarah Johnson", email: "sarah@techstart.io", plan: "Professional", status: "Active", joined: "2 hours ago" },
  { name: "Mike Chen", email: "mike@growthco.com", plan: "Enterprise", status: "Active", joined: "5 hours ago" },
  { name: "Emily Rodriguez", email: "emily@scaleup.io", plan: "Starter", status: "Active", joined: "1 day ago" },
  { name: "David Kim", email: "david@innovate.dev", plan: "Professional", status: "Active", joined: "2 days ago" },
  { name: "Lisa Wang", email: "lisa@dataflow.ai", plan: "Enterprise", status: "Active", joined: "3 days ago" },
];

const systemAlerts = [
  { level: "info", message: "System update scheduled for Jan 1, 2025 at 2:00 AM UTC", time: "1 hour ago" },
  { level: "warning", message: "Email delivery rate dropped to 95.2% (threshold: 97%)", time: "3 hours ago" },
  { level: "info", message: "New feature: Workflow Automation v2.0 deployed", time: "1 day ago" },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary">Admin Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Overview of platform metrics and system health</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MaterialIcon name={stat.icon} className="text-primary text-xl" />
              </div>
            </div>
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            <div className="text-xs text-success mt-2">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-primary">Recent Users</h3>
            <a href="/admin/users" className="text-sm text-secondary font-medium hover:text-secondary-600">View All</a>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentUsers.map((user) => (
                <tr key={user.email} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{user.plan}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-success/10 text-success">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-primary mb-4">System Alerts</h3>
          <div className="space-y-3">
            {systemAlerts.map((alert, i) => (
              <div key={i} className={`p-3 rounded-lg border-l-4 ${
                alert.level === "warning" ? "bg-tertiary/5 border-tertiary" : "bg-primary/5 border-primary"
              }`}>
                <p className="text-sm text-primary">{alert.message}</p>
                <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-primary mb-3">Plan Distribution</h3>
          <div className="space-y-3">
            {[
              { plan: "Enterprise", count: 48, percentage: 36, color: "bg-secondary" },
              { plan: "Professional", count: 892, percentage: 45, color: "bg-primary" },
              { plan: "Starter", count: 407, percentage: 19, color: "bg-tertiary" },
            ].map((item) => (
              <div key={item.plan}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{item.plan}</span>
                  <span className="text-sm font-medium text-primary">{item.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-primary mb-3">System Health</h3>
          <div className="space-y-3">
            {[
              { service: "API Server", status: "Operational", uptime: "99.99%", color: "text-success" },
              { service: "Database", status: "Operational", uptime: "99.98%", color: "text-success" },
              { service: "Email Service", status: "Degraded", uptime: "95.2%", color: "text-tertiary" },
              { service: "CDN", status: "Operational", uptime: "100%", color: "text-success" },
            ].map((service) => (
              <div key={service.service} className="flex items-center justify-between p-2">
                <div>
                  <div className="text-sm font-medium text-primary">{service.service}</div>
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${service.color}`} />
                    <span className="text-xs text-gray-500">{service.status}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{service.uptime}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-primary mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: "Send System Notification", icon: "notifications" },
              { label: "View Audit Logs", icon: "history" },
              { label: "Manage Integrations", icon: "extension" },
              { label: "Database Backup", icon: "backup" },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 p-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <MaterialIcon name={action.icon} className="text-gray-400 text-xl" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
