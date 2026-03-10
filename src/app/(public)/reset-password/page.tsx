"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Replace with Laravel API call: POST /api/auth/reset-password (use token from URL query param)
    // const token = new URLSearchParams(window.location.search).get("token");
    // await axios.post("/api/auth/reset-password", { token, password });
    setSubmitting(false);
    toast({ title: "პაროლი განახლდა", description: "ახლა შეგიძლიათ ახალი პაროლით შესვლა." });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <Globe className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">ემიგრანტ.GE</span>
        </Link>
        <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1 text-center">ახალი პაროლის დაყენება</h1>
          <p className="text-muted-foreground text-center mb-6">შეიყვანეთ თქვენი ახალი პაროლი</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="ახალი პაროლი" className="pl-10" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            </div>
            <Button className="w-full gap-2" size="lg" disabled={submitting}>
              {submitting ? "მიმდინარეობს…" : "პაროლის განახლება"} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
