import { MOCK_LISTINGS } from "@/lib/data";
import ListingCard from "./ListingCard";

const VipOffers = () => {
  const vipListings = MOCK_LISTINGS.filter((l) => l.isVip);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vipListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VipOffers;
