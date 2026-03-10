"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, role, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Emigrant.GE</span>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href={role === "provider" ? "/provider/dashboard" : "/client/dashboard"}>
                  პანელი
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href={role === "provider" ? "/provider/settings" : "/client/settings"}>
                  პარამეტრები
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive">
                <LogOut className="h-4 w-4 mr-1" /> გასვლა
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">შესვლა</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">რეგისტრაცია</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
