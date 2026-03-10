"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Settings, LogOut, Trash2, Pencil, Search, Save, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { PROFESSIONS, COUNTRIES, CITIES_BY_COUNTRY } from "@/lib/data";

const navItems = [
  { icon: LayoutDashboard, label: "პანელი", path: "/admin/dashboard" },
  { icon: MessageSquare, label: "შეტყობინებები", path: "/admin/messages" },
  { icon: Settings, label: "პარამეტრები", path: "/admin/settings" },
];

interface Listing {
  id: string;
  user_id: string;
  provider_name: string;
  profession: string;
  country: string;
  city: string;
  nationality: string | null;
  languages: string[] | null;
  price_type: string;
  price_value: number | null;
  description: string | null;
  photo_url: string | null;
  is_vip: boolean | null;
  booking_mode: string | null;
  phone: string | null;
  email: string | null;
  status: string | null;
  created_at: string;
}

const AdminDashboardPage = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editListing, setEditListing] = useState<Listing | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // TODO: Replace with Laravel API call: GET /api/admin/listings
    setLoading(false);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("ნამდვილად გსურთ ამ განცხადების წაშლა?")) return;
    // TODO: DELETE /api/admin/listings/:id
    setListings(prev => prev.filter(l => l.id !== id));
    toast({ title: "განცხადება წაიშალა" });
  };

  const handleSaveEdit = async () => {
    if (!editListing) return;
    setSaving(true);
    // TODO: PUT /api/admin/listings/:id
    await new Promise(r => setTimeout(r, 500));
    setSaving(false);
    toast({ title: "განცხადება განახლდა" });
    setListings(prev => prev.map(l => l.id === editListing.id ? editListing : l));
    setEditListing(null);
  };

  const handleLogout = async () => { await signOut(); router.push("/"); };

  const filteredListings = listings.filter(l =>
    l.provider_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cities = editListing?.country ? CITIES_BY_COUNTRY[editListing.country] || [] : [];

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
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-2xl font-bold text-foreground">ადმინის პანელი</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-sm text-muted-foreground">სულ განცხადებები</p>
                <p className="font-display text-3xl font-bold text-foreground mt-1">{listings.length}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-sm text-muted-foreground">აქტიური</p>
                <p className="font-display text-3xl font-bold text-foreground mt-1">{listings.filter(l => l.status === "active").length}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="text-sm text-muted-foreground">VIP</p>
                <p className="font-display text-3xl font-bold text-foreground mt-1">{listings.filter(l => l.is_vip).length}</p>
              </div>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="ძიება სახელით, პროფესიით, ქალაქით..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            </div>

            {loading ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <p className="text-muted-foreground">იტვირთება...</p>
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <p className="text-muted-foreground">განცხადებები არ მოიძებნა</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-3 font-medium text-muted-foreground">სახელი</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">პროფესია</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">ქალაქი</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">ფასი</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">სტატუსი</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">თარიღი</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">მოქმედება</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredListings.map(listing => (
                        <tr key={listing.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3 font-medium text-foreground">
                            {listing.provider_name}
                            {listing.is_vip && <span className="ml-1 text-xs">⭐</span>}
                          </td>
                          <td className="p-3 text-muted-foreground">{listing.profession}</td>
                          <td className="p-3 text-muted-foreground">{listing.city}, {listing.country}</td>
                          <td className="p-3 text-muted-foreground">
                            {listing.price_type === "negotiable" ? "შეთანხმებით" : `€${listing.price_value}`}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${listing.status === "active" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                              {listing.status === "active" ? "აქტიური" : listing.status}
                            </span>
                          </td>
                          <td className="p-3 text-muted-foreground">{new Date(listing.created_at).toLocaleDateString("ka-GE")}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" onClick={() => setEditListing({ ...listing })}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(listing.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Dialog open={!!editListing} onOpenChange={open => !open && setEditListing(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>განცხადების რედაქტირება</DialogTitle>
          </DialogHeader>
          {editListing && (
            <div className="space-y-4">
              <div>
                <Label>სახელი</Label>
                <Input value={editListing.provider_name} onChange={e => setEditListing({ ...editListing, provider_name: e.target.value })} />
              </div>
              <div>
                <Label>პროფესია</Label>
                <Select value={editListing.profession} onValueChange={v => setEditListing({ ...editListing, profession: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{PROFESSIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ქვეყანა</Label>
                  <Select value={editListing.country} onValueChange={v => setEditListing({ ...editListing, country: v, city: "" })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>ქალაქი</Label>
                  <Select value={editListing.city} onValueChange={v => setEditListing({ ...editListing, city: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>აღწერა</Label>
                <Textarea value={editListing.description || ""} onChange={e => setEditListing({ ...editListing, description: e.target.value })} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ფასის ტიპი</Label>
                  <Select value={editListing.price_type} onValueChange={v => setEditListing({ ...editListing, price_type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">ფიქსირებული</SelectItem>
                      <SelectItem value="hourly">საათობრივი</SelectItem>
                      <SelectItem value="negotiable">შეთანხმებით</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {editListing.price_type !== "negotiable" && (
                  <div>
                    <Label>ფასი (€)</Label>
                    <Input type="number" value={editListing.price_value || ""} onChange={e => setEditListing({ ...editListing, price_value: Number(e.target.value) })} />
                  </div>
                )}
              </div>
              <div>
                <Label>სტატუსი</Label>
                <Select value={editListing.status || "active"} onValueChange={v => setEditListing({ ...editListing, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">აქტიური</SelectItem>
                    <SelectItem value="inactive">არააქტიური</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editListing.is_vip || false} onChange={e => setEditListing({ ...editListing, is_vip: e.target.checked })} className="accent-primary" />
                <Label>VIP განცხადება</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditListing(null)}>გაუქმება</Button>
            <Button onClick={handleSaveEdit} disabled={saving}>
              <Save className="h-4 w-4 mr-1" /> {saving ? "ინახება…" : "შენახვა"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboardPage;
