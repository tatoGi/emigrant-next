"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Settings, LogOut, MessageSquare, Users, Pencil, Trash2, Plus, Save } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";

const navItems = [
  { icon: LayoutDashboard, label: "პანელი", path: "/admin/dashboard" },
  { icon: MessageSquare, label: "შეტყობინებები", path: "/admin/messages" },
  { icon: Users, label: "მომხმარებლები", path: "/admin/users" },
  { icon: Settings, label: "პარამეტრები", path: "/admin/settings" },
];

const ROLE_LABELS: Record<string, string> = {
  client: "კლიენტი",
  provider: "პროვაიდერი",
  admin: "ადმინისტრატორი",
};

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

type UserForm = { name: string; email: string; password: string; role: string };

const emptyForm: UserForm = { name: "", email: "", password: "", role: "client" };

const AdminUsersPage = () => {
  const { user: currentUser, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState<UserForm>(emptyForm);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [editForm, setEditForm] = useState<UserForm>(emptyForm);

  const { data, isLoading } = useQuery<{ users: AdminUser[] }>({
    queryKey: ["admin-users"],
    queryFn: () => api.get("/admin/users").then((r) => r.data),
  });

  const users = data?.users ?? [];

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-users"] });

  const createMutation = useMutation({
    mutationFn: () => api.post("/admin/users", createForm),
    onSuccess: () => {
      invalidate();
      toast.success("მომხმარებელი დაემატა.");
      setCreateOpen(false);
      setCreateForm(emptyForm);
    },
    onError: (err: unknown) => {
      const errors = (err as { response?: { data?: { errors?: Record<string, string[]> } } })?.response?.data?.errors;
      toast.error(errors ? (Object.values(errors)[0] as string[])[0] : "დამატება ვერ მოხერხდა.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: () => {
      const payload: Partial<UserForm> = { name: editForm.name, email: editForm.email, role: editForm.role };
      if (editForm.password) payload.password = editForm.password;
      return api.put(`/admin/users/${editUser!.id}`, payload);
    },
    onSuccess: () => {
      invalidate();
      toast.success("მომხმარებელი განახლდა.");
      setEditUser(null);
    },
    onError: (err: unknown) => {
      const errors = (err as { response?: { data?: { errors?: Record<string, string[]> } } })?.response?.data?.errors;
      toast.error(errors ? (Object.values(errors)[0] as string[])[0] : "შენახვა ვერ მოხერხდა.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/admin/users/${id}`),
    onSuccess: () => {
      invalidate();
      toast.success("მომხმარებელი წაიშალა.");
    },
    onError: (err: unknown) => {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(message ?? "წაშლა ვერ მოხერხდა.");
    },
  });

  const handleDelete = (u: AdminUser) => {
    if (String(u.id) === currentUser?.id) {
      toast.error("საკუთარი ანგარიშის წაშლა არ შეიძლება.");
      return;
    }
    if (!confirm(`ნამდვილად გსურთ "${u.name}"-ის წაშლა?`)) return;
    deleteMutation.mutate(u.id);
  };

  const openEdit = (u: AdminUser) => {
    setEditUser(u);
    setEditForm({ name: u.name, email: u.email, password: "", role: u.role });
  };

  const handleLogout = async () => { await signOut(); router.push("/"); };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden md:block w-56 shrink-0">
            <nav className="space-y-1">
              {navItems.map((item) => {
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
              <h1 className="font-display text-2xl font-bold text-foreground">მომხმარებლები</h1>
              <Button onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4 mr-1" /> დამატება
              </Button>
            </div>

            {isLoading ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <p className="text-muted-foreground">იტვირთება...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <p className="text-muted-foreground">მომხმარებლები არ მოიძებნა</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left p-3 font-medium text-muted-foreground">სახელი</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">ელ-ფოსტა</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">როლი</th>
                        <th className="text-left p-3 font-medium text-muted-foreground">დარეგისტრირდა</th>
                        <th className="text-right p-3 font-medium text-muted-foreground">მოქმედება</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3 font-medium text-foreground">{u.name}</td>
                          <td className="p-3 text-muted-foreground">{u.email}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                              {ROLE_LABELS[u.role] ?? u.role}
                            </span>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {new Date(u.created_at).toLocaleDateString("ka-GE")}
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" onClick={() => openEdit(u)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(u)} disabled={deleteMutation.isPending}>
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

      {/* Create */}
      <Dialog open={createOpen} onOpenChange={(open) => { setCreateOpen(open); if (!open) setCreateForm(emptyForm); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>მომხმარებლის დამატება</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>სახელი</Label>
              <Input value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} />
            </div>
            <div>
              <Label>ელ-ფოსტა</Label>
              <Input type="email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} />
            </div>
            <div>
              <Label>პაროლი</Label>
              <Input type="password" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })} />
            </div>
            <div>
              <Label>როლი</Label>
              <Select value={createForm.role} onValueChange={(v) => setCreateForm({ ...createForm, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">კლიენტი</SelectItem>
                  <SelectItem value="provider">პროვაიდერი</SelectItem>
                  <SelectItem value="admin">ადმინისტრატორი</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>გაუქმება</Button>
            <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
              <Save className="h-4 w-4 mr-1" /> {createMutation.isPending ? "ინახება…" : "დამატება"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit */}
      <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>მომხმარებლის რედაქტირება</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>სახელი</Label>
              <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div>
              <Label>ელ-ფოსტა</Label>
              <Input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
            </div>
            <div>
              <Label>ახალი პაროლი (არასავალდებულო)</Label>
              <Input type="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} placeholder="დატოვეთ ცარიელი, თუ არ იცვლება" />
            </div>
            <div>
              <Label>როლი</Label>
              <Select value={editForm.role} onValueChange={(v) => setEditForm({ ...editForm, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">კლიენტი</SelectItem>
                  <SelectItem value="provider">პროვაიდერი</SelectItem>
                  <SelectItem value="admin">ადმინისტრატორი</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)}>გაუქმება</Button>
            <Button onClick={() => updateMutation.mutate()} disabled={updateMutation.isPending}>
              <Save className="h-4 w-4 mr-1" /> {updateMutation.isPending ? "ინახება…" : "შენახვა"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsersPage;
