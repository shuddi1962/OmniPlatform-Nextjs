"use client";

import { useState } from "react";

const tickets = [
  { id: "TK-452", subject: "Cannot access campaign analytics", status: "Open", priority: "High", created: "2 hours ago", replies: 3 },
  { id: "TK-451", subject: "Email delivery delay issues", status: "In Progress", priority: "Medium", created: "5 hours ago", replies: 2 },
  { id: "TK-450", subject: "How to set up SMS automation?", status: "Resolved", priority: "Low", created: "1 day ago", replies: 4 },
  { id: "TK-449", subject: "Billing discrepancy on invoice", status: "Open", priority: "High", created: "2 days ago", replies: 1 },
  { id: "TK-448", subject: "Integration with Slack not working", status: "In Progress", priority: "Medium", created: "3 days ago", replies: 5 },
  { id: "TK-447", subject: "Feature request: Bulk contact import", status: "Closed", priority: "Low", created: "5 days ago", replies: 2 },
];

const faqs = [
  { question: "How do I create a new campaign?", answer: "Navigate to Campaigns and click 'New Campaign'. Follow the 3-step wizard to set up your campaign." },
  { question: "How do I set up email automation?", answer: "Go to Automate and create a new workflow. Choose a trigger and add your action steps." },
  { question: "Can I export my contacts?", answer: "Yes, go to Contacts and click the Export button. You can export as CSV or JSON." },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"tickets" | "faq" | "contact">("tickets");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Support</h2>
          <p className="text-sm text-gray-500 mt-1">Get help and manage your support tickets</p>
        </div>
        <button className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <MaterialIcon name="add" className="text-lg" />
          New Ticket
        </button>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(["tickets", "faq", "contact"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
              activeTab === tab ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "faq" ? "FAQ" : tab}
          </button>
        ))}
      </div>

      {activeTab === "tickets" && (
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center gap-4">
            <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
              <MaterialIcon name="search" className="text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="flex-1 ml-2 bg-transparent text-sm focus:outline-none"
              />
            </div>
            <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none">
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                <th className="px-5 py-3">Ticket</th>
                <th className="px-5 py-3">Subject</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Priority</th>
                <th className="px-5 py-3">Replies</th>
                <th className="px-5 py-3">Created</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-5 py-4 text-sm font-medium text-secondary">{ticket.id}</td>
                  <td className="px-5 py-4 text-sm font-medium text-primary">{ticket.subject}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      ticket.status === "Open" ? "bg-secondary/10 text-secondary" :
                      ticket.status === "In Progress" ? "bg-tertiary/10 text-tertiary" :
                      ticket.status === "Resolved" ? "bg-success/10 text-success" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      ticket.priority === "High" ? "bg-secondary/10 text-secondary" :
                      ticket.priority === "Medium" ? "bg-tertiary/10 text-tertiary" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{ticket.replies}</td>
                  <td className="px-5 py-4 text-xs text-gray-400">{ticket.created}</td>
                  <td className="px-5 py-4">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MaterialIcon name="more_vert" className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "faq" && (
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-primary">{faq.question}</span>
                <MaterialIcon
                  name={expandedFaq === i ? "expand_less" : "expand_more"}
                  className="text-gray-400 text-xl"
                />
              </button>
              {expandedFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "contact" && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-2xl">
          <h3 className="font-semibold text-primary mb-4">Contact Support</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none">
                <option>General Inquiry</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Billing Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={5}
                placeholder="Describe your issue in detail..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none"
              />
            </div>
            <button className="px-6 py-2.5 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors">
              Submit Ticket
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
