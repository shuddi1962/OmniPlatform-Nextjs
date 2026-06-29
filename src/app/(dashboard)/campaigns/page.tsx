"use client";

import Link from "next/link";

const campaigns = [
  { id: 1, name: "Welcome Series", type: "Email", status: "Active", sent: 2431, opened: 1654, clicked: 823, conversions: 247, date: "Dec 15, 2024" },
  { id: 2, name: "Holiday Sale 2024", type: "Email + SMS", status: "Completed", sent: 12847, opened: 8796, clicked: 3421, conversions: 1247, date: "Dec 10, 2024" },
  { id: 3, name: "Product Launch", type: "Email", status: "Draft", sent: 0, opened: 0, clicked: 0, conversions: 0, date: "Dec 20, 2024" },
  { id: 4, name: "Re-engagement Flow", type: "Email", status: "Active", sent: 5621, opened: 2810, clicked: 987, conversions: 156, date: "Dec 5, 2024" },
  { id: 5, name: "Weekly Newsletter #48", type: "Email", status: "Completed", sent: 8934, opened: 5361, clicked: 1786, conversions: 89, date: "Dec 18, 2024" },
  { id: 6, name: "Flash Sale Reminder", type: "SMS", status: "Completed", sent: 3241, opened: 0, clicked: 2156, conversions: 432, date: "Dec 12, 2024" },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function CampaignsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Campaigns</h2>
          <p className="text-sm text-gray-500 mt-1">{campaigns.length} campaigns total</p>
        </div>
        <Link
          href="/campaigns/new"
          className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <MaterialIcon name="add" className="text-lg" />
          New Campaign
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Sent", value: "33,074", icon: "send" },
          { label: "Avg. Open Rate", value: "54.2%", icon: "mark_email_read" },
          { label: "Avg. Click Rate", value: "21.8%", icon: "ads_click" },
          { label: "Conversions", value: "2,171", icon: "trending_up" },
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

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th className="px-5 py-3">Campaign</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Sent</th>
              <th className="px-5 py-3 text-right">Opened</th>
              <th className="px-5 py-3 text-right">Clicked</th>
              <th className="px-5 py-3 text-right">Conversions</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <span className="text-sm font-medium text-primary">{campaign.name}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-xs px-2 py-0.5 bg-primary/5 text-primary/70 rounded">{campaign.type}</span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    campaign.status === "Active" ? "bg-success/10 text-success" :
                    campaign.status === "Completed" ? "bg-primary/10 text-primary" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right text-sm text-gray-600">{campaign.sent.toLocaleString()}</td>
                <td className="px-5 py-4 text-right text-sm text-gray-600">{campaign.opened.toLocaleString()}</td>
                <td className="px-5 py-4 text-right text-sm text-gray-600">{campaign.clicked.toLocaleString()}</td>
                <td className="px-5 py-4 text-right text-sm text-success font-medium">{campaign.conversions.toLocaleString()}</td>
                <td className="px-5 py-4 text-xs text-gray-400">{campaign.date}</td>
                <td className="px-5 py-4">
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
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
