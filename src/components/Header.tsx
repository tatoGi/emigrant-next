"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Emigrant.GE</span>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/provider/dashboard">პროვაიდერის პანელი</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/dashboard">ადმინ პანელი</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/client/saved">კლიენტის პანელი</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
