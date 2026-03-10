import Link from "next/link";
import { Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6" />
              <span className="font-display text-lg font-bold">ემიგრანტ.GE</span>
            </div>
            <p className="text-sm opacity-70">
              დააკავშირეთ ემიგრანტები სანდო პროფესიონალებთან მთელ მსოფლიოში.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">კლიენტებისთვის</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href="/search" className="hover:opacity-100 transition-opacity">პროფესიონალის ძიება</Link></li>
              <li><Link href="/register" className="hover:opacity-100 transition-opacity">ანგარიშის შექმნა</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">პროვაიდერებისთვის</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href="/register" className="hover:opacity-100 transition-opacity">სერვისის განთავსება</Link></li>
              <li><Link href="/login" className="hover:opacity-100 transition-opacity">პროვაიდერის შესვლა</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">სხვა</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href="/search" className="hover:opacity-100 transition-opacity">ყველა განცხადება</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-sm text-center opacity-50">
          © 2026 ემიგრანტ.GE — ყველა უფლება დაცულია.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
