"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PROFESSIONS, COUNTRIES, CITIES_BY_COUNTRY, LANGUAGES, NATIONALITIES } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const steps = ["ძირითადი ინფო", "სერვისის დეტალები", "ფასი და ფოტოები"];

const CreateListingPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    provider_name: "",
    phone: "",
    nationality: "",
    languages: [] as string[],
    profession: "",
    country: "",
    city: "",
    description: "",
    listing_type: "standard",
    price_type: "negotiable",
    price_value: "",
    booking_mode: "request",
  });

  const cities = form.country ? CITIES_BY_COUNTRY[form.country] || [] : [];

  const toggleLanguage = (lang: string) => {
    setForm(f => ({
      ...f,
      languages: f.languages.includes(lang) ? f.languages.filter(l => l !== lang) : [...f.languages, lang],
    }));
  };

  const handlePublish = async () => {
    if (!user) {
      toast({ title: "შეცდომა", description: "გთხოვთ გაიაროთ ავტორიზაცია", variant: "destructive" });
      return;
    }
    setSaving(true);
    // TODO: Replace with Laravel API call: POST /api/listings
    // await axios.post("/api/listings", { ...form, is_vip: form.listing_type === "vip", price_value: form.price_value ? Number(form.price_value) : null, status: "active" });
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast({ title: "განცხადება გამოქვეყნდა!" });
    router.push("/provider/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/provider/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> პანელზე დაბრუნება
        </Link>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">ახალი განცხადების შექმნა</h1>
        <p className="text-muted-foreground mb-8">შეავსეთ სერვისის დეტალები კლიენტების მოსაზიდად</p>

        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i + 1}
              </div>
              <span className={`text-sm hidden sm:inline ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">სრული სახელი *</label>
                <Input placeholder="თქვენი სრული სახელი" value={form.provider_name} onChange={e => setForm(f => ({ ...f, provider_name: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">ტელეფონის ნომერი *</label>
                <Input placeholder="+49 123 456 7890" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">ეროვნება *</label>
                <select className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body" value={form.nationality} onChange={e => setForm(f => ({ ...f, nationality: e.target.value }))}>
                  <option value="">აირჩიეთ ეროვნება</option>
                  {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">ენები *</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {LANGUAGES.map(lang => (
                    <button key={lang} onClick={() => toggleLanguage(lang)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${form.languages.includes(lang) ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border hover:border-foreground/30"}`}>
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">პროფესია/სერვისი *</label>
                <select className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body" value={form.profession} onChange={e => setForm(f => ({ ...f, profession: e.target.value }))}>
                  <option value="">აირჩიეთ პროფესია</option>
                  {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">ქვეყანა *</label>
                  <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value, city: "" }))} className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body">
                    <option value="">აირჩიეთ ქვეყანა</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">ქალაქი *</label>
                  <select disabled={!form.country} value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body disabled:opacity-40">
                    <option value="">აირჩიეთ ქალაქი</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">აღწერა *</label>
                <Textarea placeholder="აღწერეთ თქვენი სერვისი, გამოცდილება და რა გამოგარჩევთ..." rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">განცხადების ტიპი *</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <label className="flex items-center gap-3 border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input type="radio" name="listingType" value="standard" checked={form.listing_type === "standard"} onChange={() => setForm(f => ({ ...f, listing_type: "standard" }))} className="accent-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">სტანდარტული</p>
                      <p className="text-xs text-muted-foreground">უფასო განცხადება</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input type="radio" name="listingType" value="vip" checked={form.listing_type === "vip"} onChange={() => setForm(f => ({ ...f, listing_type: "vip" }))} className="accent-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">VIP ⭐</p>
                      <p className="text-xs text-muted-foreground">პრიორიტეტული განთავსება</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">ფასის ტიპი *</label>
                <select className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body" value={form.price_type} onChange={e => setForm(f => ({ ...f, price_type: e.target.value }))}>
                  <option value="fixed">ფიქსირებული</option>
                  <option value="hourly">საათობრივი</option>
                  <option value="negotiable">შეთანხმებით</option>
                </select>
              </div>
              {form.price_type !== "negotiable" && (
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">ფასი (€)</label>
                  <Input type="number" placeholder="მაგ. 50" value={form.price_value} onChange={e => setForm(f => ({ ...f, price_value: e.target.value }))} />
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">ფოტოები</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">დააჭირეთ ასატვირთად ან გადმოიტანეთ</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG 5MB-მდე</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4 mr-1" /> უკან
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep(step + 1)}>
                შემდეგი <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handlePublish} disabled={saving}>
                {saving ? "იგზავნება..." : "განცხადების გამოქვეყნება"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;
