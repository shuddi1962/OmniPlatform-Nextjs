"use client";

const invoices = [
  { id: "INV-2024-091", date: "Dec 20, 2024", amount: "$79.00", status: "Paid", plan: "Professional" },
  { id: "INV-2024-089", date: "Nov 20, 2024", amount: "$79.00", status: "Paid", plan: "Professional" },
  { id: "INV-2024-087", date: "Oct 20, 2024", amount: "$79.00", status: "Paid", plan: "Professional" },
  { id: "INV-2024-085", date: "Sep 20, 2024", amount: "$29.00", status: "Paid", plan: "Starter" },
  { id: "INV-2024-083", date: "Aug 20, 2024", amount: "$29.00", status: "Paid", plan: "Starter" },
];

const usage = [
  { feature: "Contacts", used: 8432, limit: 10000, unit: "" },
  { feature: "Emails Sent", used: 48293, limit: 100000, unit: "" },
  { feature: "SMS Sent", used: 2341, limit: 5000, unit: "" },
  { feature: "Storage", used: 12.4, limit: 50, unit: "GB" },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary">Billing & Invoices</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your subscription and payment details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-primary">Current Plan</h3>
            <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full font-medium">Active</span>
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-3xl font-bold text-primary">$79</span>
            <span className="text-gray-500">/month</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">Professional Plan &middot; Renews on Jan 20, 2025</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors">
              Upgrade Plan
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
              Cancel Subscription
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-primary mb-4">Payment Method</h3>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
            <div className="w-12 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div>
              <div className="text-sm font-medium text-primary">•••• •••• •••• 4242</div>
              <div className="text-xs text-gray-400">Expires 12/2026</div>
            </div>
          </div>
          <button className="text-sm text-secondary font-medium hover:text-secondary-600">
            Update Payment Method
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-primary mb-4">Usage This Month</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {usage.map((item) => {
            const percentage = (item.used / item.limit) * 100;
            return (
              <div key={item.feature}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{item.feature}</span>
                  <span className="text-xs text-gray-400">
                    {item.used.toLocaleString()}{item.unit} / {item.limit.toLocaleString()}{item.unit}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      percentage > 80 ? "bg-secondary" : percentage > 60 ? "bg-tertiary" : "bg-success"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">{percentage.toFixed(1)}% used</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-primary">Invoice History</h3>
          <button className="text-sm text-secondary font-medium hover:text-secondary-600 flex items-center gap-1">
            <MaterialIcon name="download" className="text-lg" />
            Download All
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th className="px-5 py-3">Invoice</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Plan</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-primary">{invoice.id}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{invoice.date}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{invoice.plan}</td>
                <td className="px-5 py-4 text-sm font-medium text-primary">{invoice.amount}</td>
                <td className="px-5 py-4">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-success/10 text-success">
                    {invoice.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <button className="text-sm text-secondary font-medium hover:text-secondary-600">
                    Download
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
