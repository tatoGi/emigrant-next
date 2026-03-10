"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Settings, LogOut, User, MapPin, Globe2, Shield, Bell } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES, CITIES_BY_COUNTRY, LANGUAGES, NATIONALITIES } from "@/lib/data";

const navItems = [
  { icon: Heart, label: "შენახული", path: "/client/saved" },
  { icon: Settings, label: "პარამეტრები", path: "/client/settings" },
];

const settingsSections = [
  { id: "personal", label: "პირადი ინფო", icon: User },
  { id: "location", label: "მდებარეობა", icon: MapPin },
  { id: "language", label: "ენა და ეროვნება", icon: Globe2 },
  { id: "security", label: "უსაფრთხოება", icon: Shield },
  { id: "notifications", label: "შეტყობინებები", icon: Bell },
];

const ClientSettingsPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const [profile, setProfile] = useState({ first_name: "", last_name: "", phone: "", country: "", city: "", nationality: "", languages: [] as string[] });
  const [activeSection, setActiveSection] = useState("personal");
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!user) return;
    // TODO: Replace with Laravel API call: GET /api/profile
    // axios.get("/api/profile").then(res => setProfile(res.data));
  }, [user]);

  const saveProfile = async () => {
    setSaving(true);
    // TODO: Replace with Laravel API call: PUT /api/profile
    // await axios.put("/api/profile", profile);
    await new Promise(r => setTimeout(r, 500));
    setSaving(false);
    toast({ title: "შენახულია!" });
  };

  const changePassword = async () => {
    if (!newPassword || newPassword.length < 6) return;
    // TODO: Replace with Laravel API call: PUT /api/auth/password
    // await axios.put("/api/auth/password", { password: newPassword });
    toast({ title: "პაროლი განახლდა" });
    setNewPassword("");
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const cities = profile.country ? CITIES_BY_COUNTRY[profile.country] || [] : [];

  const toggleLanguage = (lang: string) => {
    setProfile(p => ({
      ...p,
      languages: p.languages.includes(lang) ? p.languages.filter(l => l !== lang) : [...p.languages, lang],
    }));
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
          <main className="flex-1 max-w-2xl">
            <h1 className="font-display text-2xl font-bold text-foreground mb-6">პარამეტრები</h1>

            <div className="flex gap-2 flex-wrap mb-6">
              {settingsSections.map(s => (
                <button key={s.id} onClick={() => setActiveSection(s.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeSection === s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                  <s.icon className="h-3.5 w-3.5" /> {s.label}
                </button>
              ))}
            </div>

            {activeSection === "personal" && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>სახელი</Label><Input value={profile.first_name} onChange={e => setProfile(p => ({ ...p, first_name: e.target.value }))} /></div>
                  <div><Label>გვარი</Label><Input value={profile.last_name} onChange={e => setProfile(p => ({ ...p, last_name: e.target.value }))} /></div>
                </div>
                <div><Label>ტელეფონი</Label><Input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} /></div>
                <div><Label>ელ.ფოსტა</Label><Input value={user?.email || ""} disabled className="opacity-60" /></div>
                <Button onClick={saveProfile} disabled={saving}>{saving ? "ინახება…" : "ცვლილებების შენახვა"}</Button>
              </div>
            )}

            {activeSection === "location" && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div><Label>ქვეყანა</Label>
                  <Select value={profile.country} onValueChange={v => setProfile(p => ({ ...p, country: v, city: "" }))}>
                    <SelectTrigger><SelectValue placeholder="აირჩიეთ ქვეყანა" /></SelectTrigger>
                    <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>ქალაქი</Label>
                  <Select value={profile.city} onValueChange={v => setProfile(p => ({ ...p, city: v }))} disabled={!profile.country}>
                    <SelectTrigger><SelectValue placeholder="აირჩიეთ ქალაქი" /></SelectTrigger>
                    <SelectContent>{cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button onClick={saveProfile} disabled={saving}>{saving ? "ინახება…" : "ცვლილებების შენახვა"}</Button>
              </div>
            )}

            {activeSection === "language" && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div><Label>ეროვნება</Label>
                  <Select value={profile.nationality} onValueChange={v => setProfile(p => ({ ...p, nationality: v }))}>
                    <SelectTrigger><SelectValue placeholder="აირჩიეთ ეროვნება" /></SelectTrigger>
                    <SelectContent>{NATIONALITIES.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>ენები</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {LANGUAGES.map(lang => (
                      <button key={lang} onClick={() => toggleLanguage(lang)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${profile.languages.includes(lang) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-foreground/30"}`}>
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={saveProfile} disabled={saving}>{saving ? "ინახება…" : "ცვლილებების შენახვა"}</Button>
              </div>
            )}

            {activeSection === "security" && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div><Label>ახალი პაროლი</Label><Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="მინიმუმ 6 სიმბოლო" minLength={6} /></div>
                <Button onClick={changePassword} disabled={!newPassword || newPassword.length < 6}>პაროლის განახლება</Button>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                {["ჯავშნის განახლებები", "ახალი შეტყობინებები", "აქციები"].map(item => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
                <Button onClick={saveProfile} disabled={saving}>{saving ? "ინახება…" : "ცვლილებების შენახვა"}</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ClientSettingsPage;
