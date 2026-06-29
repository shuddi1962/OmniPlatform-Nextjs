"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const demoUsers = [
  {
    email: "admin@omniplatform.demo",
    password: "Demo@1234",
    full_name: "Admin User",
    role: "admin",
  },
  {
    email: "user@omniplatform.demo",
    password: "Demo@1234",
    full_name: "John Doe",
    role: "user",
  },
  {
    email: "manager@omniplatform.demo",
    password: "Demo@1234",
    full_name: "Sarah Manager",
    role: "user",
  },
];

export default function SetupPage() {
  const [results, setResults] = useState<
    { email: string; status: string; error?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function seedUsers() {
    setLoading(true);
    setResults([]);
    const supabase = createClient();
    const newResults: { email: string; status: string; error?: string }[] = [];

    for (const user of demoUsers) {
      const { error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: { full_name: user.full_name, role: user.role },
        },
      });

      if (error) {
        newResults.push({
          email: user.email,
          status: "FAIL",
          error: error.message,
        });
      } else {
        newResults.push({ email: user.email, status: "OK" });
      }
    }

    setResults(newResults);
    setLoading(false);
    setDone(true);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">OP</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">
            Demo Account Setup
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Click the button below to create 3 demo accounts.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {!done && (
            <button
              onClick={seedUsers}
              disabled={loading}
              className="w-full py-3 bg-secondary hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Creating accounts..." : "Create Demo Accounts"}
            </button>
          )}

          {results.length > 0 && (
            <div className="mt-4 space-y-2">
              {results.map((r) => (
                <div
                  key={r.email}
                  className={`p-3 rounded-lg text-sm ${
                    r.status === "OK"
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  <span className="font-medium">{r.email}</span> — {r.status}
                  {r.error && (
                    <span className="block text-xs mt-1 opacity-75">
                      {r.error}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {done && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Accounts created! You can now log in.
              </p>
              <a
                href="/login"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-400 transition-colors"
              >
                Go to Login
              </a>
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Demo Credentials
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span className="font-mono">admin@omniplatform.demo</span>
                <span className="font-mono">Demo@1234</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">user@omniplatform.demo</span>
                <span className="font-mono">Demo@1234</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">manager@omniplatform.demo</span>
                <span className="font-mono">Demo@1234</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
