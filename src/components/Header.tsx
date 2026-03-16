"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";

const DASHBOARD_ROUTES: Record<string, string> = {
  client: "/client/saved",
  provider: "/provider/dashboard",
  admin: "/admin/dashboard",
};

const Header = () => {
  const { user, role, signOut } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"login" | "register">("login");

  const openLogin = () => { setModalTab("login"); setModalOpen(true); };
  const openRegister = () => { setModalTab("register"); setModalOpen(true); };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Globe className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">Emigrant.GE</span>
          </Link>
          <div className="flex items-center gap-3">
            {user && role ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={DASHBOARD_ROUTES[role]}>პანელი</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  გამოსვლა
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={openLogin}>
                  შესვლა
                </Button>
                <Button size="sm" onClick={openRegister}>
                  რეგისტრაცია
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal open={modalOpen} defaultTab={modalTab} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;
