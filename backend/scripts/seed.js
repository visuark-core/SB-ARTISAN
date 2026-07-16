const db = require('../config/db');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Product = require('../models/Product');
const Blog = require('../models/Blog');
const Project = require('../models/Project');
const Inquiry = require('../models/Inquiry');

// Default Categories Mock
const DEFAULT_CATEGORIES = [
  {
    slug: 'restaurant-furniture',
    name: 'Restaurant Furniture',
    description: 'Sculptural dining seating, hand-planed tables, and serving casegoods designed for upscale hotel private dining salons and fine-dining spaces.'
  },
  {
    slug: 'cafe-furniture',
    name: 'Cafe Furniture',
    description: 'Compact bistro tables, weather-treated dining chairs, and lightweight cane armchair sets engineered for breezy indoor-outdoor cafe placements.'
  },
  {
    slug: 'bar-furniture',
    name: 'Bar Furniture',
    description: 'High-tensile woven silk barstools, wood-wrapped leather counters, and ornate bone inlay bar cabinets designed to elevate high-end hotel lounges.'
  },
  {
    slug: 'hotel-furniture',
    name: 'Hotel Furniture',
    description: 'Grand lobby tables, custom carved consoles, and reading lounger statements that define hotel guest sanctuaries.'
  },
  {
    slug: 'cane-furniture',
    name: 'Cane Furniture',
    description: 'Organically steam-bent cane loungers, two-tiered green marble tables, and breezy rattan armchairs showcasing natural peel weaves for tropical hospitality.'
  },
  {
    slug: 'rope-furniture',
    name: 'Rope Furniture',
    description: 'Traditional Rosewood charpais and benches featuring hand-tensioned coconut coir and jute rope grids.'
  },
  {
    slug: 'bone-inlay-furniture',
    name: 'Bone Inlay Furniture',
    description: 'Intricately detailed bar cabinets, credenzas, and bistro tables hand-laid tile-by-tile in water-resistant resins.'
  }
];

// Default Subcategories Mock
const DEFAULT_SUBCATEGORIES = [
  // Restaurant Furniture
  { parentSlug: 'restaurant-furniture', name: 'Restaurant Chairs', slug: 'restaurant-chairs', description: 'Atelier dining chairs' },
  { parentSlug: 'restaurant-furniture', name: 'Restaurant Dining Tables', slug: 'restaurant-dining-tables', description: 'Atelier dining tables' },
  { parentSlug: 'restaurant-furniture', name: 'Restaurant Booth Seating', slug: 'restaurant-booth-seating', description: 'Leather and custom dining booths' },
  { parentSlug: 'restaurant-furniture', name: 'Restaurant Benches', slug: 'restaurant-benches', description: 'Haveli teak benches' },
  { parentSlug: 'restaurant-furniture', name: 'Outdoor Restaurant Furniture', slug: 'outdoor-restaurant-furniture', description: 'Patio and terrace dining groups' },
  
  // Cafe Furniture
  { parentSlug: 'cafe-furniture', name: 'Cafe Chairs', slug: 'cafe-chairs', description: 'Atelier design cafe chairs' },
  { parentSlug: 'cafe-furniture', name: 'Cafe Tables', slug: 'cafe-tables', description: 'Heritage teak table tops' },
  { parentSlug: 'cafe-furniture', name: 'Cafe Benches', slug: 'cafe-benches', description: 'Traditional weaving benches' },
  { parentSlug: 'cafe-furniture', name: 'Outdoor Cafe Furniture', slug: 'outdoor-cafe-furniture', description: 'Weather resistant items' },
  
  // Bar Furniture
  { parentSlug: 'bar-furniture', name: 'Bar Stools', slug: 'bar-stools', description: 'Woven high stools' },
  { parentSlug: 'bar-furniture', name: 'Bar Chairs', slug: 'bar-chairs', description: 'Woven bar chairs' },
  { parentSlug: 'bar-furniture', name: 'Bar Tables', slug: 'bar-tables', description: 'Cocktail tables' },
  { parentSlug: 'bar-furniture', name: 'Outdoor Bar Furniture', slug: 'outdoor-bar-furniture', description: 'Weather resistant bar items' },
  
  // Hotel Furniture
  { parentSlug: 'hotel-furniture', name: 'Hotel Chairs', slug: 'hotel-chairs', description: 'Lobby and suite lounge easy chairs' },
  { parentSlug: 'hotel-furniture', name: 'Hotel Dining Tables', slug: 'hotel-dining-tables', description: 'Banqueting and private dining tables' },
  { parentSlug: 'hotel-furniture', name: 'Hotel Bedroom Furniture', slug: 'hotel-bedroom-furniture', description: 'Beds, nightstands, and bedroom casegoods' },
  { parentSlug: 'hotel-furniture', name: 'Hotel Sofas', slug: 'hotel-sofas', description: 'Lobby sofas and suite sectionals' },
  { parentSlug: 'hotel-furniture', name: 'Outdoor Hotel Furniture', slug: 'outdoor-hotel-furniture', description: 'Resort pool loungers and patio items' },
  
  // Cane Furniture
  { parentSlug: 'cane-furniture', name: 'Cane Chairs', slug: 'cane-chairs', description: 'Airy tropical loungers' },
  { parentSlug: 'cane-furniture', name: 'Cane Dining Chairs', slug: 'cane-dining-chairs', description: 'Cane dining seating' },
  { parentSlug: 'cane-furniture', name: 'Cane Tables', slug: 'cane-tables', description: 'Cane coffee and side tables' },
  { parentSlug: 'cane-furniture', name: 'Cane Sofas', slug: 'cane-sofas', description: 'Cane lounge seating' },
  { parentSlug: 'cane-furniture', name: 'Outdoor Cane Furniture', slug: 'outdoor-cane-furniture', description: 'Weatherproof cane items' },
  
  // Rope Furniture
  { parentSlug: 'rope-furniture', name: 'Rope Chairs', slug: 'rope-chairs', description: 'Woven rope chairs' },
  { parentSlug: 'rope-furniture', name: 'Rope Sofas', slug: 'rope-sofas', description: 'Woven rope sofas and lounges' },
  { parentSlug: 'rope-furniture', name: 'Rope Benches', slug: 'rope-benches', description: 'Charpais and rope weaving benches' },
  { parentSlug: 'rope-furniture', name: 'Outdoor Rope Furniture', slug: 'outdoor-rope-furniture', description: 'Outdoor treated rope items' },
  
  // Bone Inlay Furniture
  { parentSlug: 'bone-inlay-furniture', name: 'Bone Inlay Cabinets', slug: 'bone-inlay-cabinets', description: 'Damask inlay cabinets' },
  { parentSlug: 'bone-inlay-furniture', name: 'Bone Inlay Sideboards', slug: 'bone-inlay-sideboards', description: 'Damask inlay credenzas' },
  { parentSlug: 'bone-inlay-furniture', name: 'Bone Inlay Coffee Tables', slug: 'bone-inlay-coffee-tables', description: 'Stepped arch bone inlay coffee tables' },
  { parentSlug: 'bone-inlay-furniture', name: 'Bone Inlay Bedside Tables', slug: 'bone-inlay-bedside-tables', description: 'Floral inlay nightstands' },
  { parentSlug: 'bone-inlay-furniture', name: 'Bone Inlay Console Tables', slug: 'bone-inlay-console-tables', description: 'Decorative bone inlay console tables' }
];

// Default Products Mock
const INDIAN_HOSPITALITY_PRODUCTS = [
  {
    title: 'Haveli Reclaimed Teak Dining Chair',
    slug: 'haveli-reclaimed-teak-dining-chair',
    categorySlug: 'restaurant-furniture',
    subcategorySlug: 'restaurant-chairs',
    description: 'Monolithic, hand-planed dining chair sculpted from century-old Shekhawati haveli timbers.',
    materials: ['Reclaimed Teakwood', 'Natural Rattan Cane', 'Brushed Brass Dowels'],
    dimensions: { height: 82, width: 54, depth: 56, unit: 'cm' },
    price: 24500.00,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Dune Sand Wet-Bent Cane Lounge',
    slug: 'dune-sand-wet-bent-cane-lounge',
    categorySlug: 'cane-furniture',
    subcategorySlug: 'cane-chairs',
    description: 'An organically curved lounge chair showcasing steam-bent cane wrapped in rich rattan peel.',
    materials: ['Natural Wet-Bent Cane', 'Premium Linen Bouclé', 'Satin Brass Fittings'],
    dimensions: { height: 74, width: 82, depth: 80, unit: 'cm' },
    price: 48000.00,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Shekhawati Floral Bone Inlay Bar Cabinet',
    slug: 'shekhawati-floral-bone-inlay-bar-cabinet',
    categorySlug: 'bone-inlay-furniture',
    subcategorySlug: 'bone-inlay-cabinets',
    description: 'An ornate bar cabinet featuring hand-cut camel bone tiles set in deep charcoal resin.',
    materials: ['Ethically Sourced Camel Bone', 'Water-resistant Resin Inlay', 'Brushed Brass Hardware', 'Solid Mango Wood Frame'],
    dimensions: { height: 142, width: 92, depth: 46, unit: 'cm' },
    price: 125000.00,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Keralite Coir Rope Daybed',
    slug: 'keralite-coir-rope-daybed',
    categorySlug: 'rope-furniture',
    subcategorySlug: 'rope-benches',
    description: 'A low-profile daybed crafted from solid Indian rosewood and hand-tensioned coir ropes.',
    materials: ['Solid Indian Rosewood', 'Organic Coconut Coir Ropes', 'Unbleached Cotton Cushioning'],
    dimensions: { height: 45, width: 200, depth: 95, unit: 'cm' },
    price: 62000.00,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 0
  },
  {
    title: 'Monsoon Rattan Dining Armchair',
    slug: 'monsoon-rattan-dining-armchair',
    categorySlug: 'cafe-furniture',
    subcategorySlug: 'cafe-chairs',
    description: 'A weather-treated rattan dining armchair designed for breezy, coastal hospitality spaces.',
    materials: ['Heavy-Gauge Cane', 'Weather-treated Rattan Peel', 'Water-repellent Performance Canvas'],
    dimensions: { height: 80, width: 58, depth: 56, unit: 'cm' },
    price: 16500.00,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 0
  },
  {
    title: 'Jaipur Arch Bone Inlay Bistro Table',
    slug: 'jaipur-arch-bone-inlay-bistro-table',
    categorySlug: 'bone-inlay-furniture',
    subcategorySlug: 'bone-inlay-coffee-tables',
    description: 'An octagonal bistro table with chevron bone inlay and an architectural stepped base.',
    materials: ['Ethically Sourced Bone', 'Black Resin Pigment', 'Solid Mango Wood Core', 'Weighted Steel Sub-base'],
    dimensions: { height: 76, width: 80, depth: 80, unit: 'cm' },
    price: 38000.00,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 0
  },
  {
    title: 'Varanasi Silk-Rope Barstool',
    slug: 'varanasi-silk-rope-barstool',
    categorySlug: 'bar-furniture',
    subcategorySlug: 'bar-stools',
    description: 'A sleek barstool weaving high-tensile silk-blend cords with full-grain Indian leather.',
    materials: ['High-tensile Silk-blend Cord', 'Powder-coated Stainless Steel Frame', 'Full-grain Indian Saddle Leather'],
    dimensions: { height: 96, width: 46, depth: 46, unit: 'cm' },
    price: 19500.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 0
  },
  {
    title: 'Thar Teakwood Monolithic Coffee Table',
    slug: 'thar-teakwood-monolithic-coffee-table',
    categorySlug: 'hotel-furniture',
    subcategorySlug: 'hotel-bedroom-furniture',
    description: 'A grounding, monolithic coffee table carved from a single slab of desert teakwood.',
    materials: ['Aged Solid Teakwood Wood', 'Traditional Wooden Joinery'],
    dimensions: { height: 36, width: 120, depth: 120, unit: 'cm' },
    price: 82000.00,
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Jodhpur Starry Night Bone Inlay Credenza',
    slug: 'jodhpur-starry-night-bone-inlay-credenza',
    categorySlug: 'bone-inlay-furniture',
    subcategorySlug: 'bone-inlay-sideboards',
    description: 'A celestial-themed credenza featuring bone inlay motifs set in midnight indigo resin.',
    materials: ['Ethically Sourced Bone', 'Indigo Blue Resin', 'Aged Walnut Cabinetry', 'Solid Brass Legs'],
    dimensions: { height: 78, width: 160, depth: 45, unit: 'cm' },
    price: 145000.00,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Nilgiri Forest Cane Coffee Table',
    slug: 'nilgiri-forest-cane-coffee-table',
    categorySlug: 'cane-furniture',
    subcategorySlug: 'cane-tables',
    description: 'A double-tiered circular table combining green Indian marble, cane weave, and teak.',
    materials: ['Plantation Teakwood Frame', 'Woven Cane Mesh', 'Forest Green Indian Marble'],
    dimensions: { height: 40, width: 90, depth: 90, unit: 'cm' },
    price: 34000.00,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 0
  },
  {
    title: 'Maharaja Oval Sheesham Dining Table',
    slug: 'maharaja-oval-sheesham-dining-table',
    categorySlug: 'restaurant-furniture',
    subcategorySlug: 'restaurant-dining-tables',
    description: 'An expansive oval dining table sculpted from solid Indian Rosewood with elegant brass inlay strips.',
    materials: ['Solid Sheesham Wood', 'Brushed Brass Inlays', 'Weighted Iron Core'],
    dimensions: { height: 76, width: 240, depth: 110, unit: 'cm' },
    price: 95000.00,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Malabar Coastal Cane Easy Chair',
    slug: 'malabar-coastal-cane-easy-chair',
    categorySlug: 'cane-furniture',
    subcategorySlug: 'cane-chairs',
    description: 'A low-slung, reclining lounge chair weaving blonde Malabar cane onto a plantation teak frame.',
    materials: ['Plantation Teakwood', 'Natural Malabar Cane', 'Brass Pivot Screws'],
    dimensions: { height: 70, width: 68, depth: 78, unit: 'cm' },
    price: 26500.00,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 0
  },
  {
    title: 'Coromandel Hand-woven Rope Bench',
    slug: 'coromandel-hand-woven-rope-bench',
    categorySlug: 'rope-furniture',
    subcategorySlug: 'rope-benches',
    description: 'An elegant dining bench featuring organic jute cords hand-tensioned in a basket-weave grid.',
    materials: ['Solid Indian Rosewood', 'Dyed Organic Jute Rope', 'Brass Joinery Pins'],
    dimensions: { height: 46, width: 140, depth: 40, unit: 'cm' },
    price: 29500.00,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 0
  },
  {
    title: 'Artisan Reclaimed Teak Cafe Table',
    slug: 'artisan-reclaimed-teak-cafe-table',
    categorySlug: 'cafe-furniture',
    subcategorySlug: 'cafe-tables',
    description: 'A compact square bistro table crafted from seasoned reclaimed teakwood with a fluted cast-iron base.',
    materials: ['Reclaimed Teakwood', 'Cast-Iron Base', 'Brass Edge Brackets'],
    dimensions: { height: 75, width: 75, depth: 75, unit: 'cm' },
    price: 21000.00,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Heritage Brass-Repoussé Bar Cabinet',
    slug: 'heritage-brass-repousse-bar-cabinet',
    categorySlug: 'bar-furniture',
    subcategorySlug: 'bar-tables',
    description: 'An opulent bar cabinet clad in hand-beaten repoussé brass sheets over solid teak.',
    materials: ['Solid Brass Sheets', 'Solid Teakwood Core', 'Tempered Mirrored Glass', 'Velvet Lining'],
    dimensions: { height: 135, width: 85, depth: 45, unit: 'cm' },
    price: 135000.00,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Mehrangarh Carved Teak Lobby Console',
    slug: 'mehrangarh-carved-teak-lobby-console',
    categorySlug: 'hotel-furniture',
    subcategorySlug: 'hotel-bedroom-furniture',
    description: 'A grand carved teakwood console featuring intricate Mughal arch lattice work.',
    materials: ['Plantation Teakwood', 'Brass Handle Accents'],
    dimensions: { height: 85, width: 180, depth: 50, unit: 'cm' },
    price: 88000.00,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 0
  },
  {
    title: 'Mughal Octagonal Floral Bone Inlay Table',
    slug: 'mughal-octagonal-floral-bone-inlay-table',
    categorySlug: 'bone-inlay-furniture',
    subcategorySlug: 'bone-inlay-console-tables',
    description: 'An octagonal accent table featuring floral bone inlay detailing set in olive green resin.',
    materials: ['Ethically Sourced Camel Bone', 'Olive Green Resin', 'Solid Mango Wood Core'],
    dimensions: { height: 50, width: 45, depth: 45, unit: 'cm' },
    price: 24500.00,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 0
  },
  {
    title: 'Rajputana Chevron Bone Inlay Wall Mirror',
    slug: 'rajputana-chevron-bone-inlay-wall-mirror',
    categorySlug: 'bone-inlay-furniture',
    subcategorySlug: 'bone-inlay-console-tables',
    description: 'A wide, rectangular wall mirror with a hand-laid geometric bone inlay frame.',
    materials: ['Ethically Sourced Bone', 'Black Resin Pigment', 'Premium Mirrored Glass', 'Mango Wood Frame'],
    dimensions: { height: 120, width: 80, depth: 4, unit: 'cm' },
    price: 16500.00,
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 0
  },
  {
    title: 'Thar Desert Handwoven Rope Dining Chair',
    slug: 'thar-desert-handwoven-rope-dining-chair',
    categorySlug: 'rope-furniture',
    subcategorySlug: 'rope-chairs',
    description: 'Sleek dining chair weaving high-tensile coir ropes over a reclaimed teak frame.',
    materials: ['Reclaimed Teakwood', 'Natural Coir Rope'],
    dimensions: { height: 85, width: 50, depth: 52, unit: 'cm' },
    price: 18500.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Malabar Coastal Organic Rope Sofa',
    slug: 'malabar-coastal-organic-rope-sofa',
    categorySlug: 'rope-furniture',
    subcategorySlug: 'rope-sofas',
    description: 'An elegant, low-profile two-seater sofa featuring high-tensile organic jute rope backing.',
    materials: ['Solid Indian Rosewood', 'Dyed Organic Jute Rope', 'Natural Canvas Cushioning'],
    dimensions: { height: 75, width: 160, depth: 85, unit: 'cm' },
    price: 54000.00,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Goa Resort Weatherproof Outdoor Rope Lounger',
    slug: 'goa-resort-weatherproof-outdoor-rope-lounger',
    categorySlug: 'rope-furniture',
    subcategorySlug: 'outdoor-rope-furniture',
    description: 'A reclining outdoor lounger crafted from powder-coated aluminum and UV-resistant polyester rope.',
    materials: ['Powder-coated Aluminum', 'UV-resistant Polyester Rope', 'Quick-dry Foam Cushioning'],
    dimensions: { height: 68, width: 75, depth: 150, unit: 'cm' },
    price: 32500.00,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Amanbagh Palace Teak Lobby Lounge Chair',
    slug: 'amanbagh-palace-teak-lobby-lounge-chair',
    categorySlug: 'hotel-furniture',
    subcategorySlug: 'hotel-chairs',
    description: 'Low-slung, premium lobby lounge chair sculpted from seasoned teak with woven cane back.',
    materials: ['Plantation Teakwood', 'Natural Rattan Cane'],
    dimensions: { height: 74, width: 78, depth: 80, unit: 'cm' },
    price: 36000.00,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Udaipur Palace Carved Hotel Dining Table',
    slug: 'udaipur-palace-carved-hotel-dining-table',
    categorySlug: 'hotel-furniture',
    subcategorySlug: 'hotel-dining-tables',
    description: 'An opulent, hand-carved rectangular hotel dining table made of premium solid rosewood.',
    materials: ['Solid Sheesham Wood', 'Brass Details'],
    dimensions: { height: 76, width: 220, depth: 100, unit: 'cm' },
    price: 92000.00,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Rajputana Velvet Chesterfield Hotel Sofa',
    slug: 'rajputana-velvet-chesterfield-hotel-sofa',
    categorySlug: 'hotel-furniture',
    subcategorySlug: 'hotel-sofas',
    description: 'A deep-buttoned chesterfield hotel lounge sofa upholstered in premium organic cotton velvet.',
    materials: ['Solid Teak Frame', 'Cotton Velvet', 'Brass Casters'],
    dimensions: { height: 80, width: 210, depth: 90, unit: 'cm' },
    price: 72000.00,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Goa Resort Weatherproof Rattan Hotel Pool Lounger',
    slug: 'goa-resort-weatherproof-rattan-hotel-pool-lounger',
    categorySlug: 'hotel-furniture',
    subcategorySlug: 'outdoor-hotel-furniture',
    description: 'An adjustable outdoor lounger featuring weather-resistant wicker rattan and quick-dry cushioning.',
    materials: ['Powder-coated Aluminum', 'UV-resistant Wicker Rattan', 'Performance Canvas'],
    dimensions: { height: 40, width: 70, depth: 200, unit: 'cm' },
    price: 28500.00,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Haveli Leather Upholstered Booth Seating',
    slug: 'haveli-leather-upholstered-booth-seating',
    categorySlug: 'restaurant-furniture',
    subcategorySlug: 'restaurant-booth-seating',
    description: 'Modular contract booth seating upholstered in premium full-grain Indian leather with a teak base.',
    materials: ['Plantation Teakwood', 'Full-grain Indian Leather'],
    dimensions: { height: 95, width: 150, depth: 70, unit: 'cm' },
    price: 65000.00,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Shekhawati Reclaimed Teak Dining Bench',
    slug: 'shekhawati-reclaimed-teak-dining-bench',
    categorySlug: 'restaurant-furniture',
    subcategorySlug: 'restaurant-benches',
    description: 'A solid, hand-planed dining bench crafted from century-old reclaimed haveli teak timbers.',
    materials: ['Reclaimed Teakwood'],
    dimensions: { height: 46, width: 160, depth: 40, unit: 'cm' },
    price: 28000.00,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Thar Desert Weatherproof Restaurant Dining Set',
    slug: 'thar-desert-weatherproof-restaurant-dining-set',
    categorySlug: 'restaurant-furniture',
    subcategorySlug: 'outdoor-restaurant-furniture',
    description: 'An outdoor dining set featuring a weather-treated teakwood table and 4 woven armchairs.',
    materials: ['Plantation Teakwood', 'Synthetic Wicker'],
    dimensions: { height: 75, width: 140, depth: 80, unit: 'cm' },
    price: 88000.00,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Bespoke Jodhpur Live Edge Restaurant Table',
    slug: 'bespoke-jodhpur-live-edge-restaurant-table',
    categorySlug: 'restaurant-furniture',
    subcategorySlug: 'restaurant-dining-tables',
    description: 'A dramatic live-edge table top carved from a single slab of local Acacia wood.',
    materials: ['Acacia Wood', 'Industrial Steel Legs'],
    dimensions: { height: 76, width: 200, depth: 90, unit: 'cm' },
    price: 76000.00,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Atelier Teakwood High Bar Chair',
    slug: 'atelier-teakwood-high-bar-chair',
    categorySlug: 'bar-furniture',
    subcategorySlug: 'bar-chairs',
    description: 'Sleek, high-profile bar seating crafted from seasoned teakwood and premium leather.',
    materials: ['Plantation Teakwood', 'Premium Leather', 'Brass Hardware'],
    dimensions: { height: 104, width: 48, depth: 50, unit: 'cm' },
    price: 22500.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Jodhpur Industrial Steel & Wood Bar Table',
    slug: 'jodhpur-industrial-steel-and-wood-bar-table',
    categorySlug: 'bar-furniture',
    subcategorySlug: 'bar-tables',
    description: 'A high-top bar dining table combining a solid mango wood top with an industrial steel base.',
    materials: ['Solid Mango Wood', 'Industrial Steel Base'],
    dimensions: { height: 105, width: 120, depth: 60, unit: 'cm' },
    price: 38000.00,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Goa Beach Club Weatherproof Barstool',
    slug: 'goa-beach-club-weatherproof-barstool',
    categorySlug: 'bar-furniture',
    subcategorySlug: 'outdoor-bar-furniture',
    description: 'An outdoor barstool weaving UV-resistant polyester rope over a powder-coated aluminum frame.',
    materials: ['Powder-coated Aluminum', 'UV-resistant Polyester Rope'],
    dimensions: { height: 98, width: 44, depth: 46, unit: 'cm' },
    price: 18500.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Bespoke Live Edge Suwar Wood Bar Counter',
    slug: 'bespoke-live-edge-suwar-wood-bar-counter',
    categorySlug: 'bar-furniture',
    subcategorySlug: 'bar-tables',
    description: 'A monumental live-edge bar counter carved from a single solid slab of Suwar wood.',
    materials: ['Solid Suwar Wood', 'Brass Inserts'],
    dimensions: { height: 110, width: 240, depth: 80, unit: 'cm' },
    price: 145000.00,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Monsoon Rattan Bar Stool',
    slug: 'monsoon-rattan-bar-stool',
    categorySlug: 'cafe-furniture',
    subcategorySlug: 'cafe-chairs',
    description: 'A high-profile café bar stool woven from sustainable natural rattan cane.',
    materials: ['Natural Rattan Cane', 'Split Wicker'],
    dimensions: { height: 102, width: 45, depth: 45, unit: 'cm' },
    price: 16500.00,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Artisan Teakwood Cafe Bench',
    slug: 'artisan-teakwood-cafe-bench',
    categorySlug: 'cafe-furniture',
    subcategorySlug: 'cafe-benches',
    description: 'A minimalist solid teak dining bench designed for bistro and café group seating.',
    materials: ['Plantation Teakwood'],
    dimensions: { height: 45, width: 140, depth: 38, unit: 'cm' },
    price: 24000.00,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Monsoon Weatherproof Outdoor Cafe Bistro Set',
    slug: 'monsoon-weatherproof-outdoor-cafe-bistro-set',
    categorySlug: 'cafe-furniture',
    subcategorySlug: 'outdoor-cafe-furniture',
    description: 'A lightweight bistro set featuring a weather-treated teak table and 2 woven armchairs.',
    materials: ['Plantation Teakwood', 'Synthetic Wicker', 'Aluminum Frame'],
    dimensions: { height: 74, width: 70, depth: 70, unit: 'cm' },
    price: 45000.00,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Nilgiri Rattan Cane Dining Chair',
    slug: 'nilgiri-rattan-cane-dining-chair',
    categorySlug: 'cane-furniture',
    subcategorySlug: 'cane-dining-chairs',
    description: 'A sturdy, hand-woven dining armchair blending grade-A teakwood with natural cane webbing.',
    materials: ['Plantation Teakwood', 'Natural Cane Webbing'],
    dimensions: { height: 85, width: 56, depth: 58, unit: 'cm' },
    price: 18500.00,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Malabar Coastal Cane Sofa Set',
    slug: 'malabar-coastal-cane-sofa-set',
    categorySlug: 'cane-furniture',
    subcategorySlug: 'cane-sofas',
    description: 'A premium three-seater living room sofa utilizing organically bent cane framing and soft cotton upholstery.',
    materials: ['Steamed Bent Cane', 'Premium Cotton Fabric'],
    dimensions: { height: 80, width: 180, depth: 85, unit: 'cm' },
    price: 54000.00,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  },
  {
    title: 'Goa Resort Weatherproof Synthetic Cane Armchair',
    slug: 'goa-resort-weatherproof-synthetic-cane-armchair',
    categorySlug: 'cane-furniture',
    subcategorySlug: 'outdoor-cane-furniture',
    description: 'An outdoor armchair combining weather-treated synthetic cane mesh and powder-coated metal frame.',
    materials: ['Synthetic Cane', 'Powder-coated Aluminum Frame'],
    dimensions: { height: 76, width: 62, depth: 65, unit: 'cm' },
    price: 22000.00,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80'
    ],
    featured: 1
  }
];

// Default Blogs Mock
const BLOG_ARTICLES = [
  {
    title: 'Hotel Furniture Sourcing & Sizing Guide',
    slug: 'hotel-guide',
    excerpt: 'A technical guide to hotel furniture procurement. Learn about wood seasoning kilns, moisture targets, and container logistics.',
    content: 'Creating a cohesive luxury hospitality layout is an exercise in rigorous logistics. When procurement directors coordinate contracts for boutique resorts or large-scale business lobbies, they must address durability thresholds, fire-retarding foam indices, FSC-certified legal logs registries, and freight calculations. Solid seasoned teakwood remains the benchmark standard for suite frames, requiring slow kiln seasoning down to an 8-12% moisture target to prevent structural warping in air-conditioned suites.',
    featured_image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80',
    author: 'Atelier Project Desk',
    published_date: '2026-05-10'
  },
  {
    title: 'Commercial Restaurant Furniture Trends',
    slug: 'restaurant-trends',
    excerpt: 'Explore the shift towards reclaimed haveli teakwood, visible mechanical joinery, and organic food-safe matte finishes.',
    content: 'Modern fine-dining establishments are distancing themselves from corporate veneer surfaces. The current movement points toward grounding materials with high-tactility textures: hand-beaten sandstone slabs, exposed metal pinning, double-woven star-pattern cane, and ebonized mango wood consoles. Standard restaurant tables need commercial-grade food-safe polyurethane coatings, maintaining the organic visual grain while offering protection against hot plates and acidic vinegar spills.',
    featured_image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    author: 'Fine Dining Guild',
    published_date: '2026-05-24'
  },
  {
    title: 'Cane Furniture Design for Resort Spaces',
    slug: 'cane-ideas',
    excerpt: 'How to incorporate steam-bent rattan easy chairs and double-woven cane mesh panels in tropical hospitality lounges.',
    content: 'Cane weaving is experiencing a luxurious renaissance in modern coastal verandas and tropical wellness retreats. By wrapping heavy-gauge steam-bent rattan cane peel around solid teak frames, designers create strong, flexible, lightweight loungers that evoke immediate relaxation. Using open star-weave patterns on backing panels facilitates ambient air circulation, making these chairs functional and breathable in hot, humid climates.',
    featured_image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    author: 'Rattan Craft Master',
    published_date: '2026-06-01'
  }
];

// Default Projects Mock
const CASE_STUDIES = [
  {
    title: 'The Amanbagh Resort Suite Fit-Out',
    slug: 'amanbagh-resort',
    project_type: 'Resorts',
    location: 'Jaipur, Rajasthan',
    client_name: 'Aman Resorts Group',
    description: 'For this suite modernization project, we fabricated low-slung teak structural frames combined with hand-tensioned Malabar coir cordage. The items have been finished with organic sun-bleached grey wax oils to withstand regional semi-outdoor humidity.',
    image_url: '/images/resort_bedroom_daybed.png',
    completion_year: 2026
  },
  {
    title: 'Olive Bar & Kitchen Teak Dining Salons',
    slug: 'olive-bar-dining',
    project_type: 'Restaurants',
    location: 'Mumbai, Maharashtra',
    client_name: 'Olive Bar & Kitchen Pvt Ltd',
    description: 'Using seasoned reclaimed teakwood, we sculpted a rustic-modern dining set emphasizing exposed mortise-and-tenon structural joints. Finished in smoked charcoal matte oil to provide a durable, food-safe surface.',
    image_url: '/images/restaurant_dining_tables.png',
    completion_year: 2025
  },
  {
    title: 'Roastery Coffee House Custom Rattan Café',
    slug: 'roastery-rattan-cafe',
    project_type: 'Cafés',
    location: 'Hyderabad, Telangana',
    client_name: 'Roastery Coffee House',
    description: 'Designed to endure intensive daily café traffic, these frames feature steam-bent cane wrapped in natural rattan peel, paired with water-repellent performance canvas cushions and cast-iron pedestal bases.',
    image_url: '/images/cafe_patio_chairs.png',
    completion_year: 2026
  }
];

// Default Inquiries Mock
const DEFAULT_INQUIRIES = [
  {
    name: 'Rajiv Mehta',
    company_name: 'Taj Hotels Group',
    email: 'r.mehta@tajhotels.com',
    phone: '+91 98765 43210',
    country: 'India',
    message: 'We are looking to source 24 premium teak dining chairs for our private dining room at the Taj Mahal Palace, Mumbai. Please provide lead times and custom leather options.',
    inquiry_type: 'B2B Sourcing',
    status: 'New',
    notes: 'Follow up via phone call before Friday.'
  },
  {
    name: 'Ayesha Sen',
    company_name: 'Soma Wellness Retreat',
    email: 'ayesha@somaretreats.in',
    phone: '+91 99112 23344',
    country: 'India',
    message: 'Seeking 8 loungers for our spa terrace in Munnar. We need water-resistant finishes on the teakwood frames.',
    inquiry_type: 'Trade Order',
    status: 'Contacted',
    notes: 'Ayesha requested coir rope finish sample sheets.'
  }
];

async function seed() {
  console.log('Initiating SB Artisan PostgreSQL database seeding sequence...');
  
  try {
    // 1. Clean Database
    console.log('Cleaning existing records from registry tables...');
    await db.pool.query('TRUNCATE TABLE product_images, products, subcategories, categories, blogs, projects, inquiries, admins RESTART IDENTITY CASCADE');
    console.log('Tables truncated successfully.');

    // 2. Seed Admin
    console.log('Seeding default administrator user: admin@site.com...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('12345678', salt);
    await Admin.create({
      fullName: 'Administrator',
      email: 'admin@site.com',
      passwordHash,
      role: 'admin'
    });
    console.log('Admin seeded.');

    // 3. Seed Categories
    console.log('Seeding main showroom categories...');
    const categoryIdMap = {}; // Maps slug to ID
    for (const cat of DEFAULT_CATEGORIES) {
      const inserted = await Category.create(cat);
      categoryIdMap[cat.slug] = inserted.id;
      console.log(`- Category inserted: ${cat.name} (ID: ${inserted.id})`);
    }

    // 4. Seed Subcategories
    console.log('Seeding subcategories...');
    const subcategoryIdMap = {}; // Maps slug to ID
    for (const sub of DEFAULT_SUBCATEGORIES) {
      const parentId = categoryIdMap[sub.parentSlug];
      if (!parentId) {
        console.error(`Warning: Parent category not found for subcategory ${sub.name}`);
        continue;
      }
      const inserted = await Subcategory.create({
        category_id: parentId,
        ...sub
      });
      subcategoryIdMap[sub.slug] = inserted.id;
      console.log(`  - Subcategory inserted: ${sub.name} (ID: ${inserted.id})`);
    }

    // 5. Seed Products and Product Images
    console.log('Seeding contract-grade catalog products...');
    for (const prod of INDIAN_HOSPITALITY_PRODUCTS) {
      const catId = categoryIdMap[prod.categorySlug];
      const subId = subcategoryIdMap[prod.subcategorySlug];

      if (!catId || !subId) {
        console.error(`Warning: Unresolved relationships for product: ${prod.title}`);
        continue;
      }

      const materialStr = prod.materials.join(', ');
      const dimStr = `${prod.dimensions.height} x ${prod.dimensions.width} x ${prod.dimensions.depth} ${prod.dimensions.unit}`;

      const images = [
        { url: prod.image, is_primary: true },
        ...prod.imageGallery
          .filter(imgUrl => imgUrl !== prod.image)
          .map(imgUrl => ({ url: imgUrl, is_primary: false }))
      ];

      const inserted = await Product.create({
        category_id: catId,
        subcategory_id: subId,
        name: prod.title,
        slug: prod.slug,
        description: prod.description,
        material: materialStr,
        dimensions: dimStr,
        price: prod.price,
        featured: prod.featured,
        images
      });

      console.log(`- Product inserted: ${prod.title} (ID: ${inserted.id})`);
    }

    // 6. Seed Blogs
    console.log('Seeding blog insight articles...');
    for (const blog of BLOG_ARTICLES) {
      await Blog.create(blog);
      console.log(`- Blog inserted: ${blog.title}`);
    }

    // 7. Seed Projects
    console.log('Seeding case studies...');
    for (const proj of CASE_STUDIES) {
      await Project.create(proj);
      console.log(`- Project inserted: ${proj.title}`);
    }

    // 8. Seed Inquiries
    console.log('Seeding customer trade inquiries...');
    for (const inq of DEFAULT_INQUIRIES) {
      await Inquiry.create(inq);
      console.log(`- Inquiry logged from: ${inq.name}`);
    }

    console.log('Database seeding sequence completed successfully!');
  } catch (error) {
    console.error('Fatal error during database seeding:', error);
  } finally {
    await db.pool.end();
  }
}

seed();
