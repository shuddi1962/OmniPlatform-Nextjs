"use client";

const workflows = [
  { id: 1, name: "Welcome New Contacts", trigger: "New contact added", status: "Active", runs: 1247, lastRun: "2 min ago", steps: 4 },
  { id: 2, name: "Follow-up Sequence", trigger: "No reply after 3 days", status: "Active", runs: 856, lastRun: "1 hour ago", steps: 3 },
  { id: 3, name: "Invoice Reminder", trigger: "7 days before due date", status: "Active", runs: 423, lastRun: "5 hours ago", steps: 2 },
  { id: 4, name: "Lead Scoring", trigger: "Contact form submitted", status: "Paused", runs: 2134, lastRun: "2 days ago", steps: 5 },
  { id: 5, name: "NPS Survey", trigger: "30 days after purchase", status: "Active", runs: 678, lastRun: "1 day ago", steps: 3 },
  { id: 6, name: "Re-engagement", trigger: "No activity for 30 days", status: "Draft", runs: 0, lastRun: "Never", steps: 6 },
];

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function AutomatePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Automations</h2>
          <p className="text-sm text-gray-500 mt-1">Create workflows to automate your tasks</p>
        </div>
        <button className="px-4 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <MaterialIcon name="add" className="text-lg" />
          New Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Active Workflows", value: "4", icon: "play_circle", color: "text-success" },
          { label: "Total Runs", value: "5,338", icon: "trending_up", color: "text-secondary" },
          { label: "Time Saved", value: "127 hrs", icon: "schedule", color: "text-tertiary" },
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

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-primary">Your Workflows</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    workflow.status === "Active" ? "bg-success/10" :
                    workflow.status === "Paused" ? "bg-tertiary/10" : "bg-gray-100"
                  }`}>
                    <MaterialIcon
                      name={workflow.status === "Active" ? "play_circle" : workflow.status === "Paused" ? "pause_circle" : "edit"}
                      className={`text-xl ${
                        workflow.status === "Active" ? "text-success" :
                        workflow.status === "Paused" ? "text-tertiary" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary">{workflow.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Trigger: {workflow.trigger}</div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{workflow.runs.toLocaleString()} runs</div>
                    <div className="text-xs text-gray-400">Last: {workflow.lastRun}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{workflow.steps} steps</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    workflow.status === "Active" ? "bg-success/10 text-success" :
                    workflow.status === "Paused" ? "bg-tertiary/10 text-tertiary" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {workflow.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MaterialIcon name="more_vert" className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-primary mb-4">Workflow Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Lead Nurture", description: "Automatically follow up with new leads over 7 days", icon: "psychology" },
            { name: "Customer Onboarding", description: "Guide new customers through setup steps", icon: "onboarding" },
            { name: "Win-back Campaign", description: "Re-engage inactive customers with targeted messages", icon: "replay" },
          ].map((template) => (
            <div key={template.name} className="p-4 rounded-xl border border-gray-200 hover:border-secondary/20 hover:shadow-md transition-all cursor-pointer">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                <MaterialIcon name={template.icon} className="text-secondary text-xl" />
              </div>
              <div className="text-sm font-semibold text-primary mb-1">{template.name}</div>
              <div className="text-xs text-gray-500">{template.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
