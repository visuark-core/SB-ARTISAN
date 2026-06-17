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
  { parentSlug: 'cafe-furniture', name: 'Cafe Chairs', slug: 'cafe-chairs', description: 'Atelier design dining chairs' },
  { parentSlug: 'cafe-furniture', name: 'Cafe Tables', slug: 'cafe-tables', description: 'Heritage teak table tops' },
  { parentSlug: 'cafe-furniture', name: 'Cafe Benches', slug: 'cafe-benches', description: 'Traditional weaving benches' },
  { parentSlug: 'cafe-furniture', name: 'Outdoor Cafe Furniture', slug: 'outdoor-cafe', description: 'Weather resistant items' },
  { parentSlug: 'hotel-furniture', name: 'Hotel Beds', slug: 'hotel-beds', description: 'Sanctuary bedroom suites' },
  { parentSlug: 'hotel-furniture', name: 'Hotel Chairs', slug: 'hotel-chairs', description: 'Lobby easy chairs' },
  { parentSlug: 'hotel-furniture', name: 'Hotel Sofas', slug: 'hotel-sofas', description: 'Deep seat modular lounges' },
  { parentSlug: 'hotel-furniture', name: 'Hotel Tables', slug: 'hotel-tables', description: 'Large scale layout desks' },
  { parentSlug: 'hotel-furniture', name: 'Wardrobes', slug: 'wardrobes', description: 'Mango wood custom storage' },
  { parentSlug: 'hotel-furniture', name: 'Bedside Tables', slug: 'bedside-tables', description: 'Bespoke accent chests' },
  { parentSlug: 'restaurant-furniture', name: 'Dining Seating', slug: 'seating', description: 'High-density restaurant seating' },
  { parentSlug: 'restaurant-furniture', name: 'Dining Tables', slug: 'tables', description: 'Solid wood dining configurations' },
  { parentSlug: 'bar-furniture', name: 'Bar Seating', slug: 'bar-seating', description: 'Woven high chairs' },
  { parentSlug: 'bar-furniture', name: 'Bar Cabinets', slug: 'bar-cabinets', description: 'Liquor casegoods' },
  { parentSlug: 'cane-furniture', name: 'Lounge Loungers', slug: 'lounge-loungers', description: 'Airy tropical loungers' },
  { parentSlug: 'cane-furniture', name: 'Cane Tables', slug: 'cane-tables', description: 'Marble topped cane coffee tables' },
  { parentSlug: 'rope-furniture', name: 'Daybeds & Benches', slug: 'daybed-benches', description: 'Charpais and rope weaving beds' },
  { parentSlug: 'rope-furniture', name: 'Dining Benches', slug: 'dining-benches', description: 'Coromandel jute benches' },
  { parentSlug: 'bone-inlay-furniture', name: 'Cabinets & Storage', slug: 'bone-cabinets', description: 'Damask inlay credenzas' },
  { parentSlug: 'bone-inlay-furniture', name: 'Bistro & Accent Tables', slug: 'bone-tables', description: 'Stepped arch bone inlay tops' }
];

// Default Products Mock
const INDIAN_HOSPITALITY_PRODUCTS = [
  {
    title: 'Haveli Reclaimed Teak Dining Chair',
    slug: 'haveli-reclaimed-teak-dining-chair',
    categorySlug: 'restaurant-furniture',
    subcategorySlug: 'seating',
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
    subcategorySlug: 'lounge-loungers',
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
    subcategorySlug: 'bone-cabinets',
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
    subcategorySlug: 'daybed-benches',
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
    subcategorySlug: 'bone-tables',
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
    subcategorySlug: 'bar-seating',
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
    subcategorySlug: 'hotel-tables',
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
    console.log('Seeding default administrator user: rahul05...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('200505', salt);
    await Admin.create({
      fullName: 'Rahul Dev',
      email: 'rahul05@sbartisan.com',
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
