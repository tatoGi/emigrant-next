"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, PlusCircle, Settings, LogOut, User, MapPin, Globe2, Shield, Bell, Briefcase, Clock } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES, CITIES_BY_COUNTRY, LANGUAGES, NATIONALITIES, PROFESSIONS } from "@/lib/data";

const navItems = [
  { icon: LayoutDashboard, label: "პანელი", path: "/provider/dashboard" },
  { icon: PlusCircle, label: "განცხადების შექმნა", path: "/provider/create-listing" },
  { icon: Settings, label: "პარამეტრები", path: "/provider/settings" },
];

const settingsSections = [
  { id: "personal", label: "პირადი ინფო", icon: User },
  { id: "location", label: "მდებარეობა", icon: MapPin },
  { id: "language", label: "ენა და ეროვნება", icon: Globe2 },
  { id: "service", label: "სერვისის პარამეტრები", icon: Briefcase },
  { id: "availability", label: "ხელმისაწვდომობა", icon: Clock },
  { id: "security", label: "უსაფრთხოება", icon: Shield },
  { id: "notifications", label: "შეტყობინებები", icon: Bell },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAYS_GE = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"];

const ProviderSettingsPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const [profile, setProfile] = useState({ first_name: "", last_name: "", phone: "", country: "", city: "", nationality: "", languages: [] as string[] });
  const [provSettings, setProvSettings] = useState({
    default_profession: "", default_price_type: "negotiable", default_price_value: "",
    service_mode: "onsite", booking_mode: "request",
    working_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as string[],
    working_hours_start: "09:00", working_hours_end: "18:00", slot_duration_minutes: 60,
  });
  const [activeSection, setActiveSection] = useState("personal");
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!user) return;
    // TODO: Replace with Laravel API calls:
    // GET /api/profile → setProfile
    // GET /api/provider/settings → setProvSettings
  }, [user]);

  const saveProfile = async () => {
    setSaving(true);
    // TODO: PUT /api/profile
    await new Promise(r => setTimeout(r, 500));
    setSaving(false);
    toast({ title: "შენახულია!" });
  };

  const saveProviderSettings = async () => {
    setSaving(true);
    // TODO: PUT /api/provider/settings
    await new Promise(r => setTimeout(r, 500));
    setSaving(false);
    toast({ title: "შენახულია!" });
  };

  const changePassword = async () => {
    if (!newPassword || newPassword.length < 6) return;
    // TODO: PUT /api/auth/password
    toast({ title: "პაროლი განახლდა" });
    setNewPassword("");
  };

  const handleLogout = async () => { await signOut(); router.push("/"); };

  const cities = profile.country ? CITIES_BY_COUNTRY[profile.country] || [] : [];

  const toggleLanguage = (lang: string) => {
    setProfile(p => ({ ...p, languages: p.languages.includes(lang) ? p.languages.filter(l => l !== lang) : [...p.languages, lang] }));
  };

  const toggleDay = (day: string) => {
    setProvSettings(s => ({ ...s, working_days: s.working_days.includes(day) ? s.working_days.filter(d => d !== day) : [...s.working_days, day] }));
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

            {activeSection === "service" && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div><Label>ძირითადი პროფესია</Label>
                  <Select value={provSettings.default_profession} onValueChange={v => setProvSettings(s => ({ ...s, default_profession: v }))}>
                    <SelectTrigger><SelectValue placeholder="აირჩიეთ პროფესია" /></SelectTrigger>
                    <SelectContent>{PROFESSIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>ფასის ტიპი</Label>
                  <Select value={provSettings.default_price_type} onValueChange={v => setProvSettings(s => ({ ...s, default_price_type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">ფიქსირებული</SelectItem>
                      <SelectItem value="hourly">საათობრივი</SelectItem>
                      <SelectItem value="negotiable">შეთანხმებით</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {provSettings.default_price_type !== "negotiable" && (
                  <div><Label>ფასი (€)</Label><Input type="number" value={provSettings.default_price_value} onChange={e => setProvSettings(s => ({ ...s, default_price_value: e.target.value }))} /></div>
                )}
                <div><Label>სერვისის რეჟიმი</Label>
                  <Select value={provSettings.service_mode} onValueChange={v => setProvSettings(s => ({ ...s, service_mode: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">ონლაინ</SelectItem>
                      <SelectItem value="onsite">ადგილზე</SelectItem>
                      <SelectItem value="both">ორივე</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>დაჯავშნის რეჟიმი</Label>
                  <Select value={provSettings.booking_mode} onValueChange={v => setProvSettings(s => ({ ...s, booking_mode: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="calendar">კალენდარით დაჯავშნა</SelectItem>
                      <SelectItem value="request">მხოლოდ მოთხოვნით</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={saveProviderSettings} disabled={saving}>{saving ? "ინახება…" : "ცვლილებების შენახვა"}</Button>
              </div>
            )}

            {activeSection === "availability" && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                  <Label>სამუშაო დღეები</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {DAYS.map((day, idx) => (
                      <button key={day} onClick={() => toggleDay(day)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${provSettings.working_days.includes(day) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-foreground/30"}`}>
                        {DAYS_GE[idx].slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>დაწყების დრო</Label><Input type="time" value={provSettings.working_hours_start} onChange={e => setProvSettings(s => ({ ...s, working_hours_start: e.target.value }))} /></div>
                  <div><Label>დასრულების დრო</Label><Input type="time" value={provSettings.working_hours_end} onChange={e => setProvSettings(s => ({ ...s, working_hours_end: e.target.value }))} /></div>
                </div>
                <div><Label>სლოტის ხანგრძლივობა (წუთი)</Label>
                  <Select value={provSettings.slot_duration_minutes.toString()} onValueChange={v => setProvSettings(s => ({ ...s, slot_duration_minutes: Number(v) }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 წთ</SelectItem>
                      <SelectItem value="30">30 წთ</SelectItem>
                      <SelectItem value="45">45 წთ</SelectItem>
                      <SelectItem value="60">60 წთ</SelectItem>
                      <SelectItem value="90">90 წთ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={saveProviderSettings} disabled={saving}>{saving ? "ინახება…" : "ცვლილებების შენახვა"}</Button>
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
                {["ჯავშნის განახლებები", "ახალი შეტყობინებები", "ახალი შეფასებები", "აქციები"].map(item => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
                <Button onClick={saveProviderSettings} disabled={saving}>{saving ? "ინახება…" : "ცვლილებების შენახვა"}</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProviderSettingsPage;
