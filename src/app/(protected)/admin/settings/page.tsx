"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Settings, LogOut, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { icon: LayoutDashboard, label: "პანელი", path: "/admin/dashboard" },
  { icon: MessageSquare, label: "შეტყობინებები", path: "/admin/messages" },
  { icon: Settings, label: "პარამეტრები", path: "/admin/settings" },
];

const AdminSettingsPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [newPassword, setNewPassword] = useState("");

  const changePassword = async () => {
    if (!newPassword || newPassword.length < 6) return;
    // TODO: PUT /api/auth/password
    toast({ title: "პაროლი განახლდა" });
    setNewPassword("");
  };

  const handleLogout = async () => { await signOut(); router.push("/"); };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden md:block w-56 shrink-0">
            <nav className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const active = pathname === item.path;
                return (
                  <Link key={item.path} href={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                    <Icon className="h-4 w-4" /> {item.label}
                  </Link>
                );
              })}
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full">
                <LogOut className="h-4 w-4" /> გასვლა
              </button>
            </nav>
          </aside>
          <main className="flex-1 max-w-2xl">
            <h1 className="font-display text-2xl font-bold text-foreground mb-6">ადმინის პარამეტრები</h1>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div>
                <Label>ელ.ფოსტა</Label>
                <Input value={user?.email || ""} disabled className="opacity-60" />
              </div>
              <div>
                <Label>ახალი პაროლი</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="მინიმუმ 6 სიმბოლო" minLength={6} />
              </div>
              <Button onClick={changePassword} disabled={!newPassword || newPassword.length < 6}>პაროლის განახლება</Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
