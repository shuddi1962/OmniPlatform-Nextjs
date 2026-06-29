"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [campaignType, setCampaignType] = useState("email");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("all");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Create Campaign</h2>
          <p className="text-sm text-gray-500 mt-1">Step {step} of 3</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-700">
          Cancel
        </button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        {["Setup", "Content", "Review"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i + 1 <= step ? "bg-secondary text-white" : "bg-gray-100 text-gray-400"
            }`}>
              {i + 1 < step ? <MaterialIcon name="check" className="text-lg" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${i + 1 <= step ? "text-primary" : "text-gray-400"}`}>{s}</span>
            {i < 2 && <div className={`w-16 h-0.5 ${i + 1 < step ? "bg-secondary" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
          <h3 className="font-semibold text-primary">Campaign Setup</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g. Welcome Series"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "email", label: "Email", icon: "mail" },
                { value: "sms", label: "SMS", icon: "sms" },
                { value: "both", label: "Email + SMS", icon: "dynamic_feed" },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setCampaignType(type.value)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    campaignType === type.value
                      ? "border-secondary bg-secondary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <MaterialIcon name={type.icon} className={`text-2xl mb-1 ${campaignType === type.value ? "text-secondary" : "text-gray-400"}`} />
                  <div className="text-sm font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "all", label: "All Contacts", count: "12,847" },
                { value: "active", label: "Active Customers", count: "8,432" },
                { value: "leads", label: "Leads", count: "3,215" },
                { value: "inactive", label: "Inactive (30+ days)", count: "1,200" },
              ].map((audience) => (
                <button
                  key={audience.value}
                  onClick={() => setSelectedAudience(audience.value)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedAudience === audience.value
                      ? "border-secondary bg-secondary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm font-medium">{audience.label}</div>
                  <div className="text-xs text-gray-500">{audience.count} contacts</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Next: Content
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
          <h3 className="font-semibold text-primary">Campaign Content</h3>

          {(campaignType === "email" || campaignType === "both") && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject Line</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter a compelling subject line"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  placeholder="Write your email content here..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none"
                />
              </div>
            </>
          )}

          {(campaignType === "sms" || campaignType === "both") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SMS Message</label>
              <textarea
                rows={4}
                placeholder="Write your SMS message (160 characters)"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">0/160 characters</p>
            </div>
          )}

          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
              Back
            </button>
            <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors">
              Next: Review
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-6">
          <h3 className="font-semibold text-primary">Review & Launch</h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Campaign Name</label>
                <p className="text-sm font-medium text-primary mt-1">{campaignName || "Untitled Campaign"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Type</label>
                <p className="text-sm font-medium text-primary mt-1 capitalize">{campaignType}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Audience</label>
                <p className="text-sm font-medium text-primary mt-1 capitalize">{selectedAudience}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Subject</label>
                <p className="text-sm font-medium text-primary mt-1">{subject || "No subject"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Schedule</label>
                <p className="text-sm font-medium text-primary mt-1">Send immediately</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Preview</p>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <p className="text-sm font-medium text-primary mb-2">{subject || "Subject line"}</p>
              <p className="text-sm text-gray-600">{content || "Your campaign content will appear here..."}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
              Back
            </button>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                Save as Draft
              </button>
              <button className="px-6 py-2.5 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <MaterialIcon name="send" className="text-lg" />
                Launch Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
