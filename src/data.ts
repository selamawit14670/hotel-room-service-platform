import { MenuItem, StaffMember, Testimonial, PricingPlan, Order } from './types';

export const PROBLEM_WORKFLOWS = {
  traditional: [
    { title: "Manual Browsing", desc: "Guests browse static paper menus, often outdated, wrinkled, or missing pictures." },
    { title: "Phone Hurdles", desc: "Calling front-desk or dining service. Facing busy lines, language blockages, or holding." },
    { title: "Kitchen Chaos", desc: "Receipts hand-written by receptionist, slipped onto pegs. Manual entry is highly error-prone." },
    { title: "Blind Deliveries", desc: "Waiters search blindly for room corridors. No live progress updates for hungry, premium guests." },
    { title: "Zero Analytics", desc: "Scribbled bills stacked; managers cannot see what items sell best or which staff complete faster." }
  ],
  digital: [
    { title: "Instant QR Portal", desc: "Guest scans high-end room-specific QR code. Immediate access to a beautiful mobile digital menu." },
    { title: "One-Tap Secure Orders", desc: "Add options, input custom request, and place order directly, auto-verifying room number." },
    { title: "Instant Kitchen KDS", desc: "Orders route instantly to Kitchen screens with smart timers, automated preparation sequencing." },
    { title: "Streamlined Delivery", desc: "Waiters receive automatic pick-up notifications with direct pathing and claim tracking." },
    { title: "Real-time Metrics Hub", desc: "Supervisors see delay warnings instantly; Admins track sales trends and optimize kitchen staffing." }
  ]
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Imperial Wagyu Beef Burger",
    description: "Premium A5 Wagyu beef patty, organic brioche bun, cave-aged white cheddar, black truffle aioli, gold-dusted skin-on fries.",
    price: 42.00,
    category: "Main Courses",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    tags: ["Signature", "Chef Special"]
  },
  {
    id: "m2",
    name: "Black Truffle Tagliolini",
    description: "Housemade ribbon pasta tossed in rich Normandy butter fusion, shaved fresh Périgord truffles, 36-month aged Parmigiano-Reggiano.",
    price: 48.00,
    category: "Main Courses",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80",
    tags: ["Vegetarian", "Best Seller"]
  },
  {
    id: "m3",
    name: "Amiens Ribeye Steak",
    description: "14oz dry-aged USDA Prime Ribeye, fire-seared with rosemary and smoked garlic butter, accompanied by roasted heirloom asparagus.",
    price: 64.00,
    category: "Main Courses",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    tags: ["Gluten-Free", "Featured"]
  },
  {
    id: "m4",
    name: "Smoked Crimson French Martini",
    description: "Chambord premium blackberry liqueur, super premium vodka, pressed pineapple, served with custom aroma-infused woodsmoke overlay.",
    price: 24.00,
    category: "Artisanal Beverages",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
    tags: ["Alcoholic", "Popular"]
  },
  {
    id: "m5",
    name: "Golden Leaf Champagne Cocktail",
    description: "Dom Pérignon vintage reduction, premium cognac touch, brown sugar pearl cube, garnished with edible 24k gold leaf foil.",
    price: 36.00,
    category: "Artisanal Beverages",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1578401424476-35227185fe6e?auto=format&fit=crop&w=600&q=80",
    tags: ["Luxury", "Signature"]
  },
  {
    id: "m6",
    name: "Tahitian Vanilla Bean Soufflé",
    description: "Warm, light vanilla bean whipped soufflé core, salted caramel liqueur companion drizzle, Madagascar cocoa shavings.",
    price: 22.00,
    category: "Delectable Desserts",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80",
    tags: ["Sweet", "Finesse"]
  }
];

export const STAFF_MEMBERS: StaffMember[] = [
  { id: "s1", name: "Chef Thomas Keller", role: "chef", status: "active", assignedOrdersCount: 1, rating: 4.9, avatar: "👨‍🍳" },
  { id: "s2", name: "Chef Helene Darroze", role: "chef", status: "busy", assignedOrdersCount: 2, rating: 4.8, avatar: "👩‍🍳" },
  { id: "s3", name: "Courier Marcus Perez", role: "waiter", status: "active", assignedOrdersCount: 0, rating: 4.9, avatar: "🕴️" },
  { id: "s4", name: "Courier Sofia Lin", role: "waiter", status: "active", assignedOrdersCount: 1, rating: 4.7, avatar: "🏃‍♀️" },
  { id: "s5", name: "Supervisor Julian Vance", role: "supervisor", status: "active", assignedOrdersCount: 0, rating: 5.0, avatar: "🤵" }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Implementing RoomServiceOS turned our traditional room dining into our highest-yielding luxury channel. Order values surged by 38% immediately, and our call-center load dropped by 60%. Guests love the frictionless elegant UI.",
    author: "Gianluca Bianchi",
    role: "Director of Rooms & Operations",
    hotelBrand: "The Grand Venetia Resort & Spa",
    impactMetrics: "+38% In-Room Revenue",
    imgUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    id: "t2",
    quote: "Our fine dining kitchen structure went from pure noise and ticket clutter to absolute silence. The KDS color-coded delay rules and direct waiter notifications cut our room service fulfillment time from 45 minutes down to 22.",
    author: "Samantha Sterling",
    role: "Executive Corporate Chef",
    hotelBrand: "Monarch Luxury Residences",
    impactMetrics: "-52% Delivery Processing Time",
    imgUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    id: "t3",
    quote: "We require absolute perfection across our 450 luxury rooms. RoomServiceOS allows us to monitor critical active delay alarms across portals in real time. We have eliminated order error complaints completely.",
    author: "Edward Harrington",
    role: "General Manager",
    hotelBrand: "The Royal Crest Chateau & Golf Club",
    impactMetrics: "99.8% Perfect Order Rate",
    imgUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200&q=80"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Boutique Starter",
    priceMonthly: 199,
    priceYearly: 159,
    description: "Tailored for small luxury boutique hotels, private bed-and-breakfast mansions, and intimate guest estates.",
    features: [
      "Up to 45 active rooms or suites",
      "Dynamic QR-based mobile guest ordering",
      "Standard cloud Kitchen Display visual feed",
      "Waiter companion simple dispatcher web-app",
      "Basic sales statistics visual metrics (PDF export)",
      "Standard email & chat customer support",
      "Single logo custom menu design setup"
    ],
    notIncluded: [
      "Advanced PMS (Opera, Toast, Oracle) integration",
      "Supervisor real-time delay nudges & SMS triggers",
      "Multi-hotel central command dashboard panel",
      "Dedicated account integration manager"
    ]
  },
  {
    name: "Luxury Professional",
    priceMonthly: 399,
    priceYearly: 319,
    badge: "Most Recommended",
    description: "Designed for premium upscale hotels, mid-sized resort estates, design hotels, and prestigious serviced residences.",
    features: [
      "Unlimited rooms & penthouses",
      "QR-code builder with room-specific auto-routing",
      "Premium KDS with 25m auto-flag delay warnings",
      "Waiter live GPS corridor dispatcher with SMS notices",
      "Supervisor Live Operations command panel with live alerts",
      "Full API & native integration for PMS (Opera, Oracle)",
      "Multi-category visual analytics with interactive charts",
      "Priority SLA custom support (under 1 hour feedback)",
      "Bespoke typography, translations & hotel-brand styling"
    ],
    notIncluded: [
      "Multi-property master hub visualization config",
      "Fully dedicated offline-router hardware kits"
    ]
  },
  {
    name: "Resort Enterprise",
    priceMonthly: 799,
    priceYearly: 639,
    description: "Architected for global luxury chains, multi-property resorts, enterprise hospitality networks & casino towers.",
    features: [
      "Multi-hotel Central Command architecture",
      "Custom local Offline backup hybrid integration",
      "Unlimited guest views, orders & full KDS display terminals",
      "Bespoke visual branding & custom CSS UI overlays",
      "Multi-currency, multilingual system, and country tax laws",
      "Annual custom developments & bespoke culinary metrics",
      "Dedicated technical success manager & onsite staff bootcamps",
      "Guaranteed 99.99% system availability SLA",
      "Advanced custom database synchronization rules"
    ],
    notIncluded: []
  }
];

export const FAQS = [
  {
    q: "How long does the physical and digital setup take?",
    a: "Digital onboarding takes less than 24 hours. We setup your initial menu, customize colors, and configure rooms. We ship premium, durable, custom room-specific QR codes (synthetic tear-proof paper or acrylic gold stands) in 3-5 business days."
  },
  {
    q: "Do hotel guests need to download a mobile app?",
    a: "Absolutely not. Guests simply scan their physical in-room QR code using any smartphone camera, opening their room's custom Guest Portal instantly inside a safe mobile Web browser. This ensures maximum adoption and zero download friction."
  },
  {
    q: "Can we configure complex menu structures and preparation timings?",
    a: "Yes. Chef and Food Directors can easily change dining categories, add premium tag ribbons (Vegan, Truffles, Halal), alter prices instantly, and declare kitchen peak hours to adjust estimated prep counters automatically in real time."
  },
  {
    q: "Does KDS and Waiter apps support standard tablets and iPads?",
    a: "Yes. Our platform runs smoothly in responsive layout states across standard Android tablets, iPads, wall-mounted monitors, and hospitality receipt-printer displays. Waiters can run the companion app directly on mobile touch devices."
  },
  {
    q: "Can multiple global hotel properties be managed in one dashboard?",
    a: "Yes. Our Resort Enterprise plan provides a Global central command dashboard, allowing regional directors or brand operations managers to seamlessly monitor revenues, average fulfillment times, and staff efficiency scores across all cities."
  },
  {
    q: "Is interactive training provided for hotel kitchen teams and staff?",
    a: "Yes. Every professional setup contains high-definition video walkthrough cards, visual training checklists, and a interactive playground environment. Enterprise packages include custom hands-on bootcamps with our integration teams."
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-302",
    roomNumber: "Suite 412",
    guestName: "Lord Arthur Pendelton",
    items: [
      { id: "m1", name: "Imperial Wagyu Beef Burger", price: 42.00, quantity: 1, category: "Main Courses" },
      { id: "m4", name: "Smoked Crimson French Martini", price: 24.00, quantity: 2, category: "Artisanal Beverages" }
    ],
    specialRequests: "Patty medium-rare, fries very crispy please.",
    status: "preparing",
    timestamp: new Date(Date.now() - 14 * 60 * 1000), // 14 mins ago
    prepStartedAt: new Date(Date.now() - 13 * 60 * 1000),
    secondsElapsed: 840,
    chefName: "Chef Thomas Keller"
  },
  {
    id: "ORD-304",
    roomNumber: "Room 105",
    guestName: "Clara Jenkins",
    items: [
      { id: "m2", name: "Black Truffle Tagliolini", price: 48.00, quantity: 1, category: "Main Courses" },
      { id: "m6", name: "Tahitian Vanilla Bean Soufflé", price: 22.00, quantity: 1, category: "Delectable Desserts" }
    ],
    specialRequests: "Keep dessert hot until finish main course.",
    status: "preparing",
    timestamp: new Date(Date.now() - 27 * 60 * 1000), // 27 mins ago (Delayed!)
    prepStartedAt: new Date(Date.now() - 25 * 60 * 1000),
    secondsElapsed: 1620,
    chefName: "Chef Helene Darroze",
    isDelayed: true
  },
  {
    id: "ORD-305",
    roomNumber: "Penthouse 801",
    guestName: "Sophia Loren",
    items: [
      { id: "m5", name: "Golden Leaf Champagne Cocktail", price: 36.00, quantity: 3, category: "Artisanal Beverages" }
    ],
    specialRequests: "Extra 24k gold leaf if possible, celebrate anniversary.",
    status: "ready",
    timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 mins ago
    prepStartedAt: new Date(Date.now() - 7 * 60 * 1000),
    readyAt: new Date(Date.now() - 1 * 60 * 1000),
    secondsElapsed: 480
  }
];
