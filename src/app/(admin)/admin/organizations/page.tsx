"use client";

import { useState } from "react";

const organizations = [
  { id: 1, name: "TechStart Inc.", plan: "Enterprise", users: 24, contacts: 12500, mrr: "$1,990", created: "Jan 15, 2024", status: "Active" },
  { id: 2, name: "GrowthCo", plan: "Professional", users: 8, contacts: 5200, mrr: "$632", created: "Mar 22, 2024", status: "Active" },
  { id: 3, name: "ScaleUp", plan: "Enterprise", users: 15, contacts: 8900, mrr: "$2,985", created: "Jun 10, 2024", status: "Active" },
  { id: 4, name: "Innovate", plan: "Starter", users: 3, contacts: 1200, mrr: "$87", created: "Sep 5, 2024", status: "Active" },
  { id: 5, name: "DataFlow", plan: "Enterprise", users: 32, contacts: 24000, mrr: "$6,368", created: "Feb 18, 2024", status: "Active" },
  { id: 6, name: "NexGen", plan: "Starter", users: 2, contacts: 800, mrr: "$58", created: "Nov 1, 2024", status: "Inactive" },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function AdminOrganizationsPage() {
  const [search, setSearch] = useState("");

  const filtered = organizations.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Organizations</h2>
          <p className="text-sm text-gray-500 mt-1">{organizations.length} total organizations</p>
        </div>
        <button className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <MaterialIcon name="add" className="text-lg" />
          Add Organization
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Orgs", value: "248", icon: "business" },
          { label: "Enterprise", value: "48", icon: "star" },
          { label: "Total MRR", value: "$89,432", icon: "payments" },
          { label: "Avg. Users/Org", value: "8.3", icon: "people" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MaterialIcon name={stat.icon} className="text-primary text-xl" />
            </div>
            <div>
              <div className="text-lg font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
            <MaterialIcon name="search" className="text-gray-400 text-xl" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search organizations..."
              className="flex-1 ml-2 bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th className="px-5 py-3">Organization</th>
              <th className="px-5 py-3">Plan</th>
              <th className="px-5 py-3">Users</th>
              <th className="px-5 py-3">Contacts</th>
              <th className="px-5 py-3">MRR</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Created</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((org) => (
              <tr key={org.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{org.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-medium text-primary">{org.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600">{org.plan}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{org.users}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{org.contacts.toLocaleString()}</td>
                <td className="px-5 py-3 text-sm font-medium text-success">{org.mrr}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    org.status === "Active" ? "bg-success/10 text-success" : "bg-gray-100 text-gray-500"
                  }`}>
                    {org.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-gray-400">{org.created}</td>
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
