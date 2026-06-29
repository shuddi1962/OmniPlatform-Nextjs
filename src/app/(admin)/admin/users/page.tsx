"use client";

import { useState } from "react";

const users = [
  { id: 1, name: "Sarah Johnson", email: "sarah@techstart.io", plan: "Professional", role: "Owner", status: "Active", lastActive: "2 min ago", mrr: "$79" },
  { id: 2, name: "Mike Chen", email: "mike@growthco.com", plan: "Enterprise", role: "Admin", status: "Active", lastActive: "15 min ago", mrr: "$199" },
  { id: 3, name: "Emily Rodriguez", email: "emily@scaleup.io", plan: "Starter", role: "Owner", status: "Active", lastActive: "1 hour ago", mrr: "$29" },
  { id: 4, name: "David Kim", email: "david@innovate.dev", plan: "Professional", role: "Owner", status: "Active", lastActive: "3 hours ago", mrr: "$79" },
  { id: 5, name: "Lisa Wang", email: "lisa@dataflow.ai", plan: "Enterprise", role: "Admin", status: "Active", lastActive: "5 hours ago", mrr: "$199" },
  { id: 6, name: "James Wilson", email: "james@nexgen.io", plan: "Starter", role: "Owner", status: "Inactive", lastActive: "2 months ago", mrr: "$0" },
  { id: 7, name: "Anna Martinez", email: "anna@brightpath.com", plan: "Professional", role: "Owner", status: "Active", lastActive: "1 day ago", mrr: "$79" },
  { id: 8, name: "Robert Taylor", email: "robert@quantum.co", plan: "Enterprise", role: "Owner", status: "Active", lastActive: "12 hours ago", mrr: "$199" },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.status.toLowerCase() === filter || u.plan.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">{users.length} total users</p>
        </div>
        <button className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <MaterialIcon name="person_add" className="text-lg" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center gap-4">
          <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
            <MaterialIcon name="search" className="text-gray-400 text-xl" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="flex-1 ml-2 bg-transparent text-sm focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "inactive", "professional", "enterprise"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                  filter === f ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Plan</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">MRR</th>
              <th className="px-5 py-3">Last Active</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
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
                <td className="px-5 py-3 text-sm text-gray-600">{user.role}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    user.status === "Active" ? "bg-success/10 text-success" : "bg-gray-100 text-gray-500"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm font-medium text-success">{user.mrr}</td>
                <td className="px-5 py-3 text-xs text-gray-400">{user.lastActive}</td>
                <td className="px-5 py-3">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MaterialIcon name="more_vert" className="text-lg" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
