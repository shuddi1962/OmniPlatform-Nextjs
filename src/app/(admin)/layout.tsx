import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - OmniPlatform",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 bg-primary flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-4 flex-1">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">OP</span>
            </div>
            <span className="text-white font-bold">Admin Panel</span>
          </Link>
          <nav className="flex items-center gap-1 ml-8">
            <Link href="/admin" className="px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/users" className="px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              Users
            </Link>
            <Link href="/admin/organizations" className="px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              Organizations
            </Link>
            <Link href="/admin/security" className="px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              Security
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-white/70 hover:text-white transition-colors">
            Back to Dashboard
          </Link>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
