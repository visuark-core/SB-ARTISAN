export interface NavLinkItem {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  title: string;
  href?: string;
  items: NavLinkItem[];
}

export interface MegaMenuPromo {
  image: string;
  title: string;
  href: string;
  linkText: string;
}

export interface MegaMenuConfig {
  columns: MegaMenuColumn[];
  promo?: MegaMenuPromo;
}

export interface NavItem {
  label: string;
  href?: string;
  megaMenu?: MegaMenuConfig;
}

// Professional B2B export navigation data registry
export const NAVIGATION_DATA: NavItem[] = [
  {
    label: "Hospitality Range",
    href: "/collections",
    megaMenu: {
      columns: [
        {
          title: "Restaurant Furniture",
          href: "/category/restaurant-furniture",
          items: [
            { label: "Restaurant Chairs", href: "/category/restaurant-furniture?sub=restaurant-chairs" },
            { label: "Restaurant Dining Tables", href: "/category/restaurant-furniture?sub=restaurant-dining-tables" },
            { label: "Restaurant Booth Seating", href: "/category/restaurant-furniture?sub=restaurant-booth-seating" },
            { label: "Restaurant Benches", href: "/category/restaurant-furniture?sub=restaurant-benches" },
            { label: "Outdoor Restaurant Furniture", href: "/category/restaurant-furniture?sub=outdoor-restaurant-furniture" },
          ],
        },
        {
          title: "Café Furniture",
          href: "/category/cafe-furniture",
          items: [
            { label: "Cafe Chairs", href: "/category/cafe-furniture?sub=cafe-chairs" },
            { label: "Cafe Tables", href: "/category/cafe-furniture?sub=cafe-tables" },
            { label: "Cafe Benches", href: "/category/cafe-furniture?sub=cafe-benches" },
            { label: "Outdoor Cafe Furniture", href: "/category/cafe-furniture?sub=outdoor-cafe-furniture" },
          ],
        },
        {
          title: "Bar Furniture",
          href: "/category/bar-furniture",
          items: [
            { label: "Bar Stools", href: "/category/bar-furniture?sub=bar-stools" },
            { label: "Bar Chairs", href: "/category/bar-furniture?sub=bar-chairs" },
            { label: "Bar Tables", href: "/category/bar-furniture?sub=bar-tables" },
            { label: "Outdoor Bar Furniture", href: "/category/bar-furniture?sub=outdoor-bar-furniture" },
          ],
        },
        {
          title: "Hotel Furniture",
          href: "/category/hotel-furniture",
          items: [
            { label: "Hotel Chairs", href: "/category/hotel-furniture?sub=hotel-chairs" },
            { label: "Hotel Dining Tables", href: "/category/hotel-furniture?sub=hotel-dining-tables" },
            { label: "Hotel Bedroom Furniture", href: "/category/hotel-furniture?sub=hotel-bedroom-furniture" },
            { label: "Hotel Sofas", href: "/category/hotel-furniture?sub=hotel-sofas" },
            { label: "Outdoor Hotel Furniture", href: "/category/hotel-furniture?sub=outdoor-hotel-furniture" },
          ],
        },
      ],
      promo: {
        image: "/images/hotel_lobby_furniture.png",
        title: "Bespoke Hotel & Resort Volume Programs",
        href: "/contact",
        linkText: "Request Hospitality Catalog",
      },
    },
  },
  {
    label: "Material & Craft",
    href: "/collections",
    megaMenu: {
      columns: [
        {
          title: "Cane Furniture",
          href: "/category/cane-furniture",
          items: [
            { label: "Cane Chairs", href: "/category/cane-furniture?sub=cane-chairs" },
            { label: "Cane Dining Chairs", href: "/category/cane-furniture?sub=cane-dining-chairs" },
            { label: "Cane Tables", href: "/category/cane-furniture?sub=cane-tables" },
            { label: "Cane Sofas", href: "/category/cane-furniture?sub=cane-sofas" },
            { label: "Outdoor Cane Furniture", href: "/category/cane-furniture?sub=outdoor-cane-furniture" },
          ],
        },
        {
          title: "Bone Inlay Furniture",
          href: "/category/bone-inlay-furniture",
          items: [
            { label: "Bone Inlay Cabinets", href: "/category/bone-inlay-furniture?sub=bone-inlay-cabinets" },
            { label: "Bone Inlay Sideboards", href: "/category/bone-inlay-furniture?sub=bone-inlay-sideboards" },
            { label: "Bone Inlay Coffee Tables", href: "/category/bone-inlay-furniture?sub=bone-inlay-coffee-tables" },
            { label: "Bone Inlay Bedside Tables", href: "/category/bone-inlay-furniture?sub=bone-inlay-bedside-tables" },
            { label: "Bone Inlay Console Tables", href: "/category/bone-inlay-furniture?sub=bone-inlay-console-tables" },
          ],
        },
        {
          title: "Rope Furniture",
          href: "/category/rope-furniture",
          items: [
            { label: "Rope Chairs", href: "/category/rope-furniture?sub=rope-chairs" },
            { label: "Rope Sofas", href: "/category/rope-furniture?sub=rope-sofas" },
            { label: "Rope Benches", href: "/category/rope-furniture?sub=rope-benches" },
            { label: "Outdoor Rope Furniture", href: "/category/rope-furniture?sub=outdoor-rope-furniture" },
          ],
        },
      ],
      promo: {
        image: "/images/commercial_workshop_custom.png",
        title: "Ethical Sourcing & Heritage Joinery Showcase",
        href: "/our-story",
        linkText: "Discover Our Story",
      },
    },
  },

  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Our Story",
    href: "/our-story",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "Contact Desk",
    href: "/contact",
  },
];
