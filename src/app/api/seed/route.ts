import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

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

export async function GET() {
  const results: { email: string; id?: string; status: string; error?: string }[] = [];

  for (const user of demoUsers) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: {
        full_name: user.full_name,
        role: user.role,
      },
    });

    if (error) {
      if (error.message.includes("already exists")) {
        results.push({ email: user.email, status: "EXISTS" });
      } else {
        results.push({ email: user.email, status: "FAIL", error: error.message });
      }
    } else {
      results.push({ email: user.email, id: data.user.id, status: "CREATED" });
    }
  }

  return NextResponse.json({ results });
}
