import { Stethoscope, Scale, Wrench, Zap, Droplets, Languages, Dumbbell, Palette, Briefcase, GraduationCap, Scissors, Calculator } from "lucide-react";

export const PROFESSIONS = [
  "Doctor", "Dentist", "Lawyer", "Worker/Handyman", "Electrician",
  "Plumber", "Translator", "Trainer", "Designer", "Accountant",
  "Teacher", "Barber/Hairstylist", "Mechanic", "Real Estate Agent",
  "IT Specialist", "Nurse", "Psychologist", "Architect",
];

export const CATEGORIES = [
  { name: "Doctor", icon: Stethoscope },
  { name: "Lawyer", icon: Scale },
  { name: "Electrician", icon: Zap },
  { name: "Plumber", icon: Droplets },
  { name: "Translator", icon: Languages },
  { name: "Designer", icon: Palette },
  { name: "Teacher", icon: GraduationCap },
  { name: "სხვა", icon: Briefcase },
];

export const COUNTRIES = [
  "Germany", "France", "United Kingdom", "United States", "Canada",
  "Australia", "Netherlands", "Sweden", "Spain", "Italy",
  "Turkey", "Brazil", "UAE", "Saudi Arabia", "Poland",
];

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  "Germany": ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart"],
  "France": ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"],
  "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
  "Canada": ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht"],
  "Sweden": ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
  "Spain": ["Madrid", "Barcelona", "Valencia", "Seville"],
  "Italy": ["Rome", "Milan", "Naples", "Turin", "Florence"],
  "Turkey": ["Istanbul", "Ankara", "Izmir", "Antalya"],
  "Brazil": ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
  "UAE": ["Dubai", "Abu Dhabi", "Sharjah"],
  "Saudi Arabia": ["Riyadh", "Jeddah", "Mecca", "Medina"],
  "Poland": ["Warsaw", "Kraków", "Wrocław", "Gdańsk", "Poznań"],
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
    profession: "Doctor", country: "Germany", city: "Berlin",
    nationality: "Syrian", languages: ["Arabic", "German", "English"],
    priceType: "fixed", priceValue: 80, photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    rating: 4.9, reviewCount: 47, isVip: true, bookingMode: "calendar",
    description: "General practitioner with 12 years of experience. Specialized in family medicine. I understand the challenges immigrants face navigating healthcare systems.",
    createdAt: "2026-02-20", phone: "+49 30 1234567", email: "amira.hassan@example.com",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], workingHoursStart: "09:00", workingHoursEnd: "18:00",
  },
  {
    id: "2", providerId: "p2", providerName: "Mehmet Yılmaz",
    profession: "Electrician", country: "Germany", city: "Munich",
    nationality: "Turkish", languages: ["Turkish", "German"],
    priceType: "hourly", priceValue: 45, photo: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
    rating: 4.7, reviewCount: 32, isVip: true, bookingMode: "request",
    description: "Certified electrician with expertise in residential and commercial installations. Quick, reliable, and affordable.",
    createdAt: "2026-02-18", phone: "+49 89 9876543", email: "mehmet.yilmaz@example.com",
    workingDays: ["Monday", "Wednesday", "Friday"], workingHoursStart: "08:00", workingHoursEnd: "17:00",
  },
  {
    id: "3", providerId: "p3", providerName: "Fatima Al-Rashid",
    profession: "Lawyer", country: "United Kingdom", city: "London",
    nationality: "Iraqi", languages: ["Arabic", "English", "French"],
    priceType: "fixed", priceValue: 150, photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    rating: 4.8, reviewCount: 63, isVip: true, bookingMode: "calendar",
    description: "Immigration and family law specialist. I help immigrants with visa applications, asylum cases, and legal representation.",
    createdAt: "2026-02-15",
  },
  {
    id: "4", providerId: "p4", providerName: "Carlos Rivera",
    profession: "Plumber", country: "United States", city: "Miami",
    nationality: "Colombian", languages: ["Spanish", "English"],
    priceType: "hourly", priceValue: 55, photo: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop",
    rating: 4.6, reviewCount: 28, isVip: false, bookingMode: "request",
    description: "Licensed plumber serving the Miami area. Emergency repairs, installations, and maintenance. Available weekends.",
    createdAt: "2026-02-22",
  },
  {
    id: "5", providerId: "p5", providerName: "Olena Kovalenko",
    profession: "Translator", country: "Germany", city: "Frankfurt",
    nationality: "Ukrainian", languages: ["Ukrainian", "Russian", "German", "English"],
    priceType: "fixed", priceValue: 40, photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    rating: 5.0, reviewCount: 19, isVip: true, bookingMode: "calendar",
    description: "Certified translator and interpreter. Official document translation, medical and legal interpreting.",
    createdAt: "2026-02-24",
  },
  {
    id: "6", providerId: "p6", providerName: "Ali Reza Mohammadi",
    profession: "Dentist", country: "Sweden", city: "Stockholm",
    nationality: "Iranian", languages: ["Persian", "Swedish", "English"],
    priceType: "fixed", priceValue: 120, photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    rating: 4.8, reviewCount: 41, isVip: true, bookingMode: "calendar",
    description: "Experienced dentist offering general and cosmetic dentistry. Modern clinic with multilingual staff.",
    createdAt: "2026-02-12",
  },
  {
    id: "7", providerId: "p7", providerName: "Priya Sharma",
    profession: "Designer", country: "Canada", city: "Toronto",
    nationality: "Indian", languages: ["Hindi", "English", "French"],
    priceType: "negotiable", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    rating: 4.5, reviewCount: 15, isVip: false, bookingMode: "request",
    description: "UI/UX and graphic designer. Branding, web design, and marketing materials for small businesses.",
    createdAt: "2026-02-25",
  },
  {
    id: "8", providerId: "p8", providerName: "Ahmed Ibrahim",
    profession: "Trainer", country: "Netherlands", city: "Amsterdam",
    nationality: "Egyptian", languages: ["Arabic", "English", "Dutch"],
    priceType: "hourly", priceValue: 35, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9, reviewCount: 55, isVip: true, bookingMode: "calendar",
    description: "Certified personal trainer and nutrition coach. Specializing in strength training and body transformation.",
    createdAt: "2026-02-19",
  },
  {
    id: "9", providerId: "p9", providerName: "Maria Kowalski",
    profession: "Teacher", country: "Germany", city: "Hamburg",
    nationality: "Polish", languages: ["Polish", "German", "English"],
    priceType: "hourly", priceValue: 30, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4.7, reviewCount: 22, isVip: false, bookingMode: "calendar",
    description: "German language teacher for immigrants. A1-C1 levels. Exam preparation and integration courses.",
    createdAt: "2026-02-26",
  },
  {
    id: "10", providerId: "p10", providerName: "Hassan Diallo",
    profession: "Worker/Handyman", country: "France", city: "Paris",
    nationality: "Nigerian", languages: ["French", "English"],
    priceType: "hourly", priceValue: 25, photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    rating: 4.4, reviewCount: 18, isVip: false, bookingMode: "request",
    description: "General handyman services: furniture assembly, painting, small repairs, moving assistance.",
    createdAt: "2026-02-21",
  },
];
