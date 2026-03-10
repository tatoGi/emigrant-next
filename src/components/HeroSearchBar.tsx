"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COUNTRIES, CITIES_BY_COUNTRY, PROFESSIONS } from "@/lib/data";

interface HeroSearchBarProps {
  initialCountry?: string;
  initialCity?: string;
  initialProfession?: string;
  compact?: boolean;
}

const HeroSearchBar = ({
  initialCountry = "",
  initialCity = "",
  initialProfession = "",
  compact = false,
}: HeroSearchBarProps) => {
  const [country, setCountry] = useState(initialCountry);
  const [city, setCity] = useState(initialCity);
  const [profession, setProfession] = useState(initialProfession);
  const router = useRouter();

  const cities = country ? CITIES_BY_COUNTRY[country] || [] : [];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (country) params.set("country", country);
    if (city) params.set("city", city);
    if (profession) params.set("profession", profession);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className={`bg-card rounded-2xl shadow-card-hover border border-border ${compact ? "p-2" : "p-3"}`}>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 min-w-0">
          <label className="text-xs font-medium text-muted-foreground px-3 block mb-1">ქვეყანა</label>
          <select
            value={country}
            onChange={(e) => { setCountry(e.target.value); setCity(""); }}
            className="w-full bg-transparent px-3 pb-2 text-sm text-foreground focus:outline-none font-body"
          >
            <option value="">ნებისმიერი ქვეყანა</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="hidden md:block w-px bg-border self-stretch" />
        <div className="flex-1 min-w-0">
          <label className="text-xs font-medium text-muted-foreground px-3 block mb-1">ქალაქი</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!country}
            className="w-full bg-transparent px-3 pb-2 text-sm text-foreground focus:outline-none font-body disabled:opacity-40"
          >
            <option value="">ნებისმიერი ქალაქი</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="hidden md:block w-px bg-border self-stretch" />
        <div className="flex-1 min-w-0">
          <label className="text-xs font-medium text-muted-foreground px-3 block mb-1">პროფესია / სერვისი</label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full bg-transparent px-3 pb-2 text-sm text-foreground focus:outline-none font-body"
          >
            <option value="">ნებისმიერი პროფესია</option>
            {PROFESSIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <Button
          onClick={handleSearch}
          size={compact ? "default" : "lg"}
          className="rounded-xl gap-2 px-6 shrink-0"
        >
          <Search className="h-4 w-4" />
          ძიება
        </Button>
      </div>
    </div>
  );
};

export default HeroSearchBar;
