"use client";

const metrics = [
  { label: "Total Revenue", value: "$124,563", change: "+18.2%", up: true, icon: "payments" },
  { label: "Conversion Rate", value: "3.45%", change: "+0.8%", up: true, icon: "conversion_path" },
  { label: "Avg. Session", value: "4m 32s", change: "-0.5%", up: false, icon: "schedule" },
  { label: "Bounce Rate", value: "32.1%", change: "-2.3%", up: true, icon: "exit_to_app" },
];

const chartData = [
  { month: "Jul", revenue: 8200, contacts: 340 },
  { month: "Aug", revenue: 9100, contacts: 380 },
  { month: "Sep", revenue: 10500, contacts: 420 },
  { month: "Oct", revenue: 9800, contacts: 400 },
  { month: "Nov", revenue: 11200, contacts: 460 },
  { month: "Dec", revenue: 12800, contacts: 510 },
];

const topCampaigns = [
  { name: "Holiday Sale 2024", sent: 12847, opened: 68.4, clicked: 26.6, revenue: "$45,231" },
  { name: "Welcome Series", sent: 2431, opened: 68.0, clicked: 33.8, revenue: "$12,890" },
  { name: "Weekly Newsletter #48", sent: 8934, opened: 60.0, clicked: 20.0, revenue: "$8,432" },
  { name: "Re-engagement Flow", sent: 5621, opened: 50.0, clicked: 17.6, revenue: "$3,210" },
];

const trafficSources = [
  { source: "Email Campaigns", visitors: 45231, percentage: 38, color: "bg-secondary" },
  { source: "Organic Search", visitors: 32145, percentage: 27, color: "bg-success" },
  { source: "Social Media", visitors: 21340, percentage: 18, color: "bg-tertiary" },
  { source: "Direct", visitors: 15672, percentage: 13, color: "bg-primary" },
  { source: "Referrals", visitors: 5210, percentage: 4, color: "bg-gray-400" },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Track your business performance</p>
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <MaterialIcon name="download" className="text-lg" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white p-5 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MaterialIcon name={metric.icon} className="text-primary text-xl" />
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                metric.up ? "bg-success/10 text-success" : "bg-secondary/10 text-secondary"
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-primary">{metric.value}</div>
            <div className="text-sm text-gray-500 mt-1">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-primary">Revenue Trend</h3>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-secondary rounded-full"></span> Revenue
              </span>
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {chartData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-gray-500">${(data.revenue / 1000).toFixed(1)}k</span>
                <div
                  className="w-full bg-secondary/20 rounded-t-lg relative group"
                  style={{ height: `${(data.revenue / maxRevenue) * 160}px` }}
                >
                  <div className="absolute inset-0 bg-secondary rounded-t-lg transition-all hover:bg-secondary-600" style={{ height: "100%" }} />
                </div>
                <span className="text-xs text-gray-400">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-primary mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{source.source}</span>
                  <span className="text-sm font-medium text-primary">{source.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${source.color} rounded-full`} style={{ width: `${source.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-primary">Top Performing Campaigns</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th className="px-5 py-3">Campaign</th>
              <th className="px-5 py-3 text-right">Sent</th>
              <th className="px-5 py-3 text-right">Open Rate</th>
              <th className="px-5 py-3 text-right">Click Rate</th>
              <th className="px-5 py-3 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {topCampaigns.map((campaign, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-sm font-medium text-primary">{campaign.name}</td>
                <td className="px-5 py-4 text-right text-sm text-gray-600">{campaign.sent.toLocaleString()}</td>
                <td className="px-5 py-4 text-right text-sm text-gray-600">{campaign.opened}%</td>
                <td className="px-5 py-4 text-right text-sm text-gray-600">{campaign.clicked}%</td>
                <td className="px-5 py-4 text-right text-sm font-medium text-success">{campaign.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
