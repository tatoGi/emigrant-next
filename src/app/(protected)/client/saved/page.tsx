"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Heart, Settings, LogOut } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { icon: Heart, label: "შენახული", path: "/client/saved" },
  { icon: Settings, label: "პარამეტრები", path: "/client/settings" },
];

const ClientSavedPage = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

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
          <main className="flex-1">
            <h1 className="font-display text-2xl font-bold text-foreground mb-6">შენახული</h1>
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <p className="text-muted-foreground">თქვენი შენახული პროვაიდერები აქ გამოჩნდება.</p>
              <Link href="/search" className="text-primary hover:underline text-sm mt-2 inline-block">პროფესიონალის ძიება</Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ClientSavedPage;
