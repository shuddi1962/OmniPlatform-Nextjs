"use client";

import { useState } from "react";

const conversations = [
  { id: 1, name: "Sarah Johnson", lastMessage: "Thanks for the quick response!", time: "2m", unread: 2, channel: "email", avatar: "SJ" },
  { id: 2, name: "Mike Chen", lastMessage: "Can we schedule a call tomorrow?", time: "15m", unread: 1, channel: "whatsapp", avatar: "MC" },
  { id: 3, name: "Emily Rodriguez", lastMessage: "The proposal looks great!", time: "1h", unread: 0, channel: "sms", avatar: "ER" },
  { id: 4, name: "David Kim", lastMessage: "I'll review the docs today", time: "2h", unread: 0, channel: "email", avatar: "DK" },
  { id: 5, name: "Lisa Wang", lastMessage: "Perfect, let's proceed.", time: "3h", unread: 0, channel: "slack", avatar: "LW" },
  { id: 6, name: "James Wilson", lastMessage: "Invoice received, thanks!", time: "5h", unread: 0, channel: "email", avatar: "JW" },
];

const messages = [
  { id: 1, sender: "Sarah Johnson", text: "Hi, I wanted to follow up on our discussion about the new campaign.", time: "10:30 AM", isOwn: false },
  { id: 2, sender: "You", text: "Hi Sarah! Yes, I've been working on the draft. Let me share it with you.", time: "10:32 AM", isOwn: true },
  { id: 3, sender: "Sarah Johnson", text: "That sounds great. Also, could we add the new analytics dashboard to the feature list?", time: "10:35 AM", isOwn: false },
  { id: 4, sender: "You", text: "Absolutely! I'll include that. The analytics page shows real-time metrics which would be a great selling point.", time: "10:38 AM", isOwn: true },
  { id: 5, sender: "Sarah Johnson", text: "Thanks for the quick response!", time: "10:40 AM", isOwn: false },
];

const channelIcons: Record<string, string> = {
  email: "mail",
  whatsapp: "chat",
  sms: "sms",
  slack: "forum",
};

function MaterialIcon({ name, className }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className || ""}`}>{name}</span>;
}

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="flex h-[calc(100vh-7rem)] bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="w-80 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              placeholder="Search conversations..."
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
          </div>
          <div className="flex gap-1">
            {["all", "unread", "email", "sms"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                  filter === f ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                selectedConversation.id === conv.id ? "bg-secondary/5" : ""
              }`}
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">{conv.avatar}</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{conv.name}</span>
                  <span className="text-xs text-gray-400">{conv.time}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <MaterialIcon name={channelIcons[conv.channel]} className="text-gray-400 text-sm" />
                  <span className="text-xs text-gray-500 truncate">{conv.lastMessage}</span>
                </div>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{selectedConversation.avatar}</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-primary">{selectedConversation.name}</div>
              <div className="text-xs text-gray-400 capitalize">via {selectedConversation.channel}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <MaterialIcon name="phone" className="text-xl" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <MaterialIcon name="videocam" className="text-xl" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <MaterialIcon name="more_vert" className="text-xl" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-md px-4 py-3 rounded-2xl ${
                msg.isOwn
                  ? "bg-secondary text-white rounded-br-md"
                  : "bg-gray-100 text-primary rounded-bl-md"
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.isOwn ? "text-white/70" : "text-gray-400"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <MaterialIcon name="attach_file" className="text-xl" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
            />
            <button className="px-4 py-2.5 bg-secondary hover:bg-secondary-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1">
              <MaterialIcon name="send" className="text-lg" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
