"use client";

import { useState } from "react";

const contacts = [
  { id: 1, name: "Sarah Johnson", email: "sarah@techstart.io", phone: "+1 (555) 123-4567", company: "TechStart", status: "Active", tags: ["VIP", "Enterprise"], lastContact: "2 hours ago" },
  { id: 2, name: "Mike Chen", email: "mike@growthco.com", phone: "+1 (555) 234-5678", company: "GrowthCo", status: "Active", tags: ["Lead"], lastContact: "1 day ago" },
  { id: 3, name: "Emily Rodriguez", email: "emily@scaleup.io", phone: "+1 (555) 345-6789", company: "ScaleUp", status: "Active", tags: ["Customer", "Pro"], lastContact: "3 days ago" },
  { id: 4, name: "David Kim", email: "david@innovate.dev", phone: "+1 (555) 456-7890", company: "Innovate", status: "Lead", tags: ["Prospect"], lastContact: "1 week ago" },
  { id: 5, name: "Lisa Wang", email: "lisa@dataflow.ai", phone: "+1 (555) 567-8901", company: "DataFlow", status: "Active", tags: ["Enterprise", "Renewal"], lastContact: "5 days ago" },
  { id: 6, name: "James Wilson", email: "james@nexgen.io", phone: "+1 (555) 678-9012", company: "NexGen", status: "Inactive", tags: ["Churned"], lastContact: "2 months ago" },
  { id: 7, name: "Anna Martinez", email: "anna@brightpath.com", phone: "+1 (555) 789-0123", company: "BrightPath", status: "Active", tags: ["Customer"], lastContact: "4 days ago" },
  { id: 8, name: "Robert Taylor", email: "robert@quantum.co", phone: "+1 (555) 890-1234", company: "Quantum", status: "Active", tags: ["VIP"], lastContact: "12 hours ago" },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  const toggleContact = (id: number) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Contacts</h2>
          <p className="text-sm text-gray-500 mt-1">{contacts.length} total contacts</p>
        </div>
        <button className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <MaterialIcon name="add" className="text-lg" />
          Add Contact
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
              placeholder="Search contacts..."
              className="flex-1 ml-2 bg-transparent text-sm focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-1">
              <MaterialIcon name="filter_list" className="text-lg" />
              Filter
            </button>
            <button className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-1">
              <MaterialIcon name="sort" className="text-lg" />
              Sort
            </button>
          </div>
        </div>

        {selectedContacts.length > 0 && (
          <div className="px-4 py-2 bg-secondary/5 border-b border-secondary/10 flex items-center gap-3">
            <span className="text-sm text-secondary font-medium">{selectedContacts.length} selected</span>
            <button className="text-xs text-gray-500 hover:text-gray-700">Tag</button>
            <button className="text-xs text-gray-500 hover:text-gray-700">Email</button>
            <button className="text-xs text-secondary hover:text-secondary-600">Delete</button>
          </div>
        )}

        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedContacts(filteredContacts.map((c) => c.id));
                    } else {
                      setSelectedContacts([]);
                    }
                  }}
                />
              </th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Last Contact</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => toggleContact(contact.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {contact.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-primary">{contact.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{contact.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{contact.company}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    contact.status === "Active" ? "bg-success/10 text-success" :
                    contact.status === "Lead" ? "bg-tertiary/10 text-tertiary" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {contact.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {contact.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-primary/5 text-primary/70 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{contact.lastContact}</td>
                <td className="px-4 py-3">
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
