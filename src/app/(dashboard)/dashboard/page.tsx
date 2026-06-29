"use client";

const stats = [
  { label: "Total Contacts", value: "12,847", change: "+12.5%", up: true, icon: "contacts" },
  { label: "Messages Sent", value: "48,293", change: "+8.3%", up: true, icon: "mail" },
  { label: "Open Rate", value: "68.4%", change: "+2.1%", up: true, icon: "mark_email_read" },
  { label: "Revenue", value: "$45,678", change: "+15.2%", up: true, icon: "trending_up" },
];

const activity = [
  { id: 1, action: "New contact added", detail: "Sarah Johnson - sarah@techstart.io", time: "2 min ago", icon: "person_add", color: "text-success" },
  { id: 2, action: "Campaign sent", detail: "Welcome Series - 2,431 recipients", time: "15 min ago", icon: "send", color: "text-secondary" },
  { id: 3, action: "Invoice paid", detail: "#INV-2024-089 - $1,250.00", time: "1 hour ago", icon: "receipt_long", color: "text-success" },
  { id: 4, action: "Support ticket resolved", detail: "#TK-452 - Login issue", time: "2 hours ago", icon: "check_circle", color: "text-success" },
  { id: 5, action: "New subscriber", detail: "mike@growthco.com - Professional plan", time: "3 hours ago", icon: "group_add", color: "text-tertiary" },
  { id: 6, action: "File uploaded", detail: "Q4-Report.pdf to Marketing folder", time: "5 hours ago", icon: "upload_file", color: "text-primary" },
];

const upcomingTasks = [
  { id: 1, task: "Follow up with Emily Rodriguez", due: "Today", priority: "high" },
  { id: 2, task: "Send weekly newsletter", due: "Tomorrow", priority: "medium" },
  { id: 3, task: "Review campaign analytics", due: "Dec 30", priority: "low" },
  { id: 4, task: "Update pricing page", due: "Jan 2", priority: "medium" },
];

const recentContacts = [
  { name: "Sarah Johnson", email: "sarah@techstart.io", company: "TechStart", status: "Active" },
  { name: "Mike Chen", email: "mike@growthco.com", company: "GrowthCo", status: "Active" },
  { name: "Emily Rodriguez", email: "emily@scaleup.io", company: "ScaleUp", status: "Pending" },
  { name: "David Kim", email: "david@innovate.dev", company: "Innovate", status: "Active" },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Welcome back!</h2>
          <p className="text-sm text-gray-500 mt-1">Here&apos;s what&apos;s happening with your business today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <MaterialIcon name="download" className="text-lg" />
            Export
          </button>
          <button className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <MaterialIcon name="add" className="text-lg" />
            New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MaterialIcon name={stat.icon} className="text-primary text-xl" />
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.up ? "bg-success/10 text-success" : "bg-secondary/10 text-secondary"}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-primary">Recent Activity</h3>
            <button className="text-sm text-secondary font-medium hover:text-secondary-600">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {activity.map((item) => (
              <div key={item.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gray-50 ${item.color}`}>
                  <MaterialIcon name={item.icon} className="text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary">{item.action}</p>
                  <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-primary">Upcoming Tasks</h3>
            </div>
            <div className="p-4 space-y-2">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    task.priority === "high" ? "bg-secondary" :
                    task.priority === "medium" ? "bg-tertiary" : "bg-gray-300"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-primary truncate">{task.task}</p>
                    <p className="text-xs text-gray-400">{task.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold text-primary">Recent Contacts</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {recentContacts.map((contact) => (
                <div key={contact.email} className="px-5 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-primary">
                      {contact.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{contact.name}</p>
                    <p className="text-xs text-gray-400 truncate">{contact.company}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    contact.status === "Active" ? "bg-success/10 text-success" : "bg-tertiary/10 text-tertiary"
                  }`}>
                    {contact.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-primary">Campaign Performance</h3>
          <div className="flex gap-2">
            {["7D", "30D", "90D"].map((period) => (
              <button key={period} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                period === "30D" ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"
              }`}>
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Emails Sent", value: "12,847", bar: 85 },
            { label: "Opened", value: "8,796", bar: 68 },
            { label: "Clicked", value: "3,421", bar: 27 },
            { label: "Converted", value: "1,247", bar: 10 },
          ].map((metric) => (
            <div key={metric.label}>
              <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
              <div className="text-lg font-bold text-primary mb-2">{metric.value}</div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${metric.bar}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
