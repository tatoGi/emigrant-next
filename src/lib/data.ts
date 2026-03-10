import { Scale, Languages, Car, Home, FileText, Users, Briefcase } from "lucide-react";

export const PROFESSIONS = [
  "საბუთების მენეჯერი",
  "დამსაქმებელი",
  "ტაქსისტი",
  "მაკლერი",
  "ადვოკატი",
  "თარჯიმანი",
  "სხვა",
];

export const CATEGORIES = [
  { name: "საბუთების მენეჯერი", icon: FileText },
  { name: "დამსაქმებელი", icon: Users },
  { name: "ტაქსისტი", icon: Car },
  { name: "მაკლერი", icon: Home },
  { name: "ადვოკატი", icon: Scale },
  { name: "თარჯიმანი", icon: Languages },
  { name: "სხვა", icon: Briefcase },
];

export const COUNTRIES = [
  "რუსეთი",
  "საბერძნეთი",
  "თურქეთი",
  "იტალია",
  "გერმანია",
  "აშშ",
  "ესპანეთი",
  "საფრანგეთი",
  "პოლონეთი",
  "ისრაელი",
];

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  "რუსეთი": ["მოსკოვი", "სანქტ-პეტერბურგი", "კრასნოდარი", "როსტოვი"],
  "საბერძნეთი": ["ათენი", "თესალონიკი"],
  "თურქეთი": ["სტამბოლი", "ტრაპიზონი", "ანკარა", "იზმირი"],
  "იტალია": ["რომი", "მილანი", "ნეაპოლი", "ფლორენცია", "ტარანტო", "ბარი"],
  "გერმანია": ["ბერლინი", "მიუნხენი", "ჰამბურგი", "კიოლნი", "დიუსელდორფი", "ფრანკფურტი", "ჰანოვერი"],
  "აშშ": ["ნიუ-იორქი", "ბრუქლინი", "ნიუ ჯერსი", "ჩიკაგო", "ლოს-ანჯელესი"],
  "ესპანეთი": ["მადრიდი", "ბარსელონა", "ვალენსია"],
  "საფრანგეთი": ["პარიზი", "მარსელი", "ლიონი", "ნიცა", "სტრასბურგი"],
  "პოლონეთი": ["ვარშავა", "კრაკოვი", "გდანსკი", "პოზნანი"],
  "ისრაელი": ["თელ-ავივი", "ჰაიფა"],
};

export const LANGUAGES = [
  "Arabic", "Turkish", "Spanish", "Portuguese", "French",
  "German", "English", "Russian", "Chinese", "Hindi",
  "Urdu", "Persian", "Polish", "Romanian", "Italian",
];

export const NATIONALITIES = [
  "Syrian", "Turkish", "Iraqi", "Afghan", "Iranian",
  "Moroccan", "Egyptian", "Indian", "Pakistani", "Nigerian",
  "Brazilian", "Colombian", "Mexican", "Ukrainian", "Romanian",
  "Polish", "Chinese", "Vietnamese", "Filipino", "Somali",
];

export interface Listing {
  id: string;
  providerId: string;
  providerName: string;
  profession: string;
  country: string;
  city: string;
  nationality: string;
  languages: string[];
  priceType: "fixed" | "hourly" | "negotiable";
  priceValue?: number;
  description: string;
  photo: string;
  rating?: number;
  reviewCount?: number;
  isVip?: boolean;
  bookingMode: "calendar" | "request";
  createdAt: string;
  phone?: string;
  email?: string;
  workingDays?: string[];
  workingHoursStart?: string;
  workingHoursEnd?: string;
}

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "1", providerId: "p1", providerName: "Dr. Amira Hassan",
    profession: "ადვოკატი", country: "გერმანია", city: "ბერლინი",
    nationality: "Syrian", languages: ["Arabic", "German", "English"],
    priceType: "fixed", priceValue: 80, photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    rating: 4.9, reviewCount: 47, isVip: true, bookingMode: "calendar",
    description: "General practitioner with 12 years of experience. Specialized in family medicine. I understand the challenges immigrants face navigating healthcare systems.",
    createdAt: "2026-02-20", phone: "+49 30 1234567", email: "amira.hassan@example.com",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], workingHoursStart: "09:00", workingHoursEnd: "18:00",
  },
  {
    id: "2", providerId: "p2", providerName: "Mehmet Yılmaz",
    profession: "სხვა", country: "გერმანია", city: "მიუნხენი",
    nationality: "Turkish", languages: ["Turkish", "German"],
    priceType: "hourly", priceValue: 45, photo: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
    rating: 4.7, reviewCount: 32, isVip: true, bookingMode: "request",
    description: "Certified electrician with expertise in residential and commercial installations. Quick, reliable, and affordable.",
    createdAt: "2026-02-18", phone: "+49 89 9876543", email: "mehmet.yilmaz@example.com",
    workingDays: ["Monday", "Wednesday", "Friday"], workingHoursStart: "08:00", workingHoursEnd: "17:00",
  },
  {
    id: "3", providerId: "p3", providerName: "Fatima Al-Rashid",
    profession: "ადვოკატი", country: "საბერძნეთი", city: "ათენი",
    nationality: "Iraqi", languages: ["Arabic", "English", "French"],
    priceType: "fixed", priceValue: 150, photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    rating: 4.8, reviewCount: 63, isVip: true, bookingMode: "calendar",
    description: "Immigration and family law specialist. I help immigrants with visa applications, asylum cases, and legal representation.",
    createdAt: "2026-02-15",
  },
  {
    id: "4", providerId: "p4", providerName: "Carlos Rivera",
    profession: "სხვა", country: "აშშ", city: "ნიუ-იორქი",
    nationality: "Colombian", languages: ["Spanish", "English"],
    priceType: "hourly", priceValue: 55, photo: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop",
    rating: 4.6, reviewCount: 28, isVip: false, bookingMode: "request",
    description: "Licensed plumber serving the area. Emergency repairs, installations, and maintenance. Available weekends.",
    createdAt: "2026-02-22",
  },
  {
    id: "5", providerId: "p5", providerName: "Olena Kovalenko",
    profession: "თარჯიმანი", country: "გერმანია", city: "ფრანკფურტი",
    nationality: "Ukrainian", languages: ["Ukrainian", "Russian", "German", "English"],
    priceType: "fixed", priceValue: 40, photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    rating: 5.0, reviewCount: 19, isVip: true, bookingMode: "calendar",
    description: "Certified translator and interpreter. Official document translation, medical and legal interpreting.",
    createdAt: "2026-02-24",
  },
  {
    id: "6", providerId: "p6", providerName: "Ali Reza Mohammadi",
    profession: "სხვა", country: "იტალია", city: "რომი",
    nationality: "Iranian", languages: ["Persian", "Italian", "English"],
    priceType: "fixed", priceValue: 120, photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    rating: 4.8, reviewCount: 41, isVip: true, bookingMode: "calendar",
    description: "Experienced dentist offering general and cosmetic dentistry. Modern clinic with multilingual staff.",
    createdAt: "2026-02-12",
  },
  {
    id: "7", providerId: "p7", providerName: "Priya Sharma",
    profession: "სხვა", country: "ესპანეთი", city: "მადრიდი",
    nationality: "Indian", languages: ["Hindi", "English", "Spanish"],
    priceType: "negotiable", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    rating: 4.5, reviewCount: 15, isVip: false, bookingMode: "request",
    description: "UI/UX and graphic designer. Branding, web design, and marketing materials for small businesses.",
    createdAt: "2026-02-25",
  },
  {
    id: "8", providerId: "p8", providerName: "Ahmed Ibrahim",
    profession: "სხვა", country: "თურქეთი", city: "სტამბოლი",
    nationality: "Egyptian", languages: ["Arabic", "English", "Turkish"],
    priceType: "hourly", priceValue: 35, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9, reviewCount: 55, isVip: true, bookingMode: "calendar",
    description: "Certified personal trainer and nutrition coach. Specializing in strength training and body transformation.",
    createdAt: "2026-02-19",
  },
  {
    id: "9", providerId: "p9", providerName: "Maria Kowalski",
    profession: "სხვა", country: "გერმანია", city: "ჰამბურგი",
    nationality: "Polish", languages: ["Polish", "German", "English"],
    priceType: "hourly", priceValue: 30, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4.7, reviewCount: 22, isVip: false, bookingMode: "calendar",
    description: "German language teacher for immigrants. A1-C1 levels. Exam preparation and integration courses.",
    createdAt: "2026-02-26",
  },
  {
    id: "10", providerId: "p10", providerName: "Hassan Diallo",
    profession: "სხვა", country: "საფრანგეთი", city: "პარიზი",
    nationality: "Nigerian", languages: ["French", "English"],
    priceType: "hourly", priceValue: 25, photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    rating: 4.4, reviewCount: 18, isVip: false, bookingMode: "request",
    description: "General handyman services: furniture assembly, painting, small repairs, moving assistance.",
    createdAt: "2026-02-21",
  },
];
