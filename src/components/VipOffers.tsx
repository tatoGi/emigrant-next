"use client";

import { useEffect, useState } from "react";
import type { Listing } from "@/lib/data";
import ListingCard from "./ListingCard";

type ApiListing = {
  id: number;
  provider_id: number;
  provider_name: string;
  profession: string;
  country: string;
  city: string;
  nationality: string;
  languages: string[];
  price_type: "fixed" | "hourly" | "negotiable";
  price_value: number | null;
  description: string;
  photo: string | null;
  is_vip: boolean;
  booking_mode: "calendar" | "request";
  created_at: string | null;
  phone?: string | null;
  email?: string | null;
};

const VipOffers = () => {
  const [vipListings, setVipListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadVipListings = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
        const response = await fetch(`${apiBase}/api/listings/vip`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load VIP listings");
        }

        const data: { listings: ApiListing[] } = await response.json();

        setVipListings(
          (data.listings ?? []).map((listing) => ({
            id: String(listing.id),
            providerId: String(listing.provider_id),
            providerName: listing.provider_name,
            profession: listing.profession,
            country: listing.country,
            city: listing.city,
            nationality: listing.nationality,
            languages: listing.languages ?? [],
            priceType: listing.price_type,
            priceValue: listing.price_value ?? undefined,
            description: listing.description,
            photo: listing.photo ?? "/placeholder.svg",
            isVip: listing.is_vip,
            bookingMode: listing.booking_mode,
            createdAt: listing.created_at ?? new Date().toISOString().slice(0, 10),
            phone: listing.phone ?? undefined,
            email: listing.email ?? undefined,
          }))
        );
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setVipListings([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadVipListings();

    return () => controller.abort();
  }, []);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">VIP შეთავაზებები</h2>
          <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
            რჩეული
          </span>
        </div>
        <p className="text-muted-foreground mb-8">
          საზოგადოების მიერ სანდო მაღალი რეიტინგის მქონე პროფესიონალები
        </p>
        {loading ? (
          <p className="text-sm text-muted-foreground">იტვირთება...</p>
        ) : vipListings.length === 0 ? (
          <p className="text-sm text-muted-foreground">VIP შეთავაზებები ჯერ არ არის.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vipListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VipOffers;
