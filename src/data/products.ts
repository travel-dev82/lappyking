export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  condition: "A+" | "A" | "B+" | "B";
  originalPrice: number;
  refurbishedPrice: number;
  discount: number;
  image: string;
  category: string;
  inStock: boolean;
  warranty: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "ThinkPad X1 Carbon Gen 9",
    brand: "Lenovo",
    model: "X1 Carbon Gen 9",
    processor: "Intel Core i7-1165G7",
    ram: "16GB DDR4",
    storage: "512GB NVMe SSD",
    display: '14" FHD IPS',
    condition: "A+",
    originalPrice: 1499,
    refurbishedPrice: 749,
    discount: 50,
    image: "/products/thinkpad-x1.svg",
    category: "Business",
    inStock: true,
    warranty: "12 Months",
    description: "Premium ultrabook in excellent condition. Lightweight carbon fiber chassis with outstanding keyboard."
  },
  {
    id: "2",
    name: 'MacBook Pro 13" M1',
    brand: "Apple",
    model: "MacBook Pro 13 M1",
    processor: "Apple M1 8-Core",
    ram: "8GB Unified",
    storage: "256GB SSD",
    display: '13.3" Retina',
    condition: "A",
    originalPrice: 1299,
    refurbishedPrice: 779,
    discount: 40,
    image: "/products/macbook-pro.svg",
    category: "Premium",
    inStock: true,
    warranty: "6 Months",
    description: "Apple Silicon powerhouse with incredible battery life. Perfect for creative professionals."
  },
  {
    id: "3",
    name: "Dell Latitude 5520",
    brand: "Dell",
    model: "Latitude 5520",
    processor: "Intel Core i5-1145G7",
    ram: "8GB DDR4",
    storage: "256GB NVMe SSD",
    display: '15.6" FHD',
    condition: "A",
    originalPrice: 1099,
    refurbishedPrice: 549,
    discount: 50,
    image: "/products/dell-latitude.svg",
    category: "Business",
    inStock: true,
    warranty: "12 Months",
    description: "Reliable business laptop with excellent build quality. Ideal for office and remote work."
  },
  {
    id: "4",
    name: "HP EliteBook 840 G8",
    brand: "HP",
    model: "EliteBook 840 G8",
    processor: "Intel Core i7-1185G7",
    ram: "16GB DDR4",
    storage: "512GB NVMe SSD",
    display: '14" FHD IPS',
    condition: "A+",
    originalPrice: 1399,
    refurbishedPrice: 699,
    discount: 50,
    image: "/products/hp-elitebook.svg",
    category: "Business",
    inStock: true,
    warranty: "12 Months",
    description: "Enterprise-grade security features with premium aluminum chassis. MIL-STD tested."
  },
  {
    id: "5",
    name: "Surface Laptop 4",
    brand: "Microsoft",
    model: "Surface Laptop 4",
    processor: "AMD Ryzen 5 4680U",
    ram: "8GB DDR4",
    storage: "256GB SSD",
    display: '13.5" PixelSense',
    condition: "B+",
    originalPrice: 999,
    refurbishedPrice: 499,
    discount: 50,
    image: "/products/surface-laptop.svg",
    category: "Premium",
    inStock: true,
    warranty: "6 Months",
    description: "Stunning PixelSense touchscreen with Alcantara keyboard. Perfect for creative work."
  },
  {
    id: "6",
    name: "MacBook Air M1",
    brand: "Apple",
    model: "MacBook Air M1",
    processor: "Apple M1 7-Core",
    ram: "8GB Unified",
    storage: "256GB SSD",
    display: '13.3" Retina',
    condition: "A+",
    originalPrice: 999,
    refurbishedPrice: 649,
    discount: 35,
    image: "/products/macbook-air.svg",
    category: "Ultrabook",
    inStock: true,
    warranty: "12 Months",
    description: "Fanless design with all-day battery life. The most popular refurbished MacBook."
  },
  {
    id: "7",
    name: "ThinkPad T14 Gen 2",
    brand: "Lenovo",
    model: "ThinkPad T14 Gen 2",
    processor: "Intel Core i5-1145G7",
    ram: "16GB DDR4",
    storage: "512GB NVMe SSD",
    display: '14" FHD IPS',
    condition: "A",
    originalPrice: 1199,
    refurbishedPrice: 599,
    discount: 50,
    image: "/products/thinkpad-t14.svg",
    category: "Business",
    inStock: true,
    warranty: "12 Months",
    description: "The workhorse of business laptops. Legendary ThinkPad keyboard with TrackPoint."
  },
  {
    id: "8",
    name: "ASUS ZenBook 14",
    brand: "ASUS",
    model: "ZenBook 14 UX425",
    processor: "Intel Core i7-1165G7",
    ram: "16GB LPDDR4X",
    storage: "512GB NVMe SSD",
    display: '14" FHD OLED',
    condition: "A",
    originalPrice: 1299,
    refurbishedPrice: 699,
    discount: 46,
    image: "/products/asus-zenbook.svg",
    category: "Premium",
    inStock: true,
    warranty: "6 Months",
    description: "Stunning OLED display in an ultra-thin design. NumberPad 2.0 for enhanced productivity."
  },
  {
    id: "9",
    name: "Dell XPS 13 9310",
    brand: "Dell",
    model: "XPS 13 9310",
    processor: "Intel Core i7-1185G7",
    ram: "16GB LPDDR4X",
    storage: "512GB NVMe SSD",
    display: '13.4" FHD+ InfinityEdge',
    condition: "A+",
    originalPrice: 1499,
    refurbishedPrice: 849,
    discount: 43,
    image: "/products/dell-xps.svg",
    category: "Premium",
    inStock: false,
    warranty: "12 Months",
    description: "Iconic InfinityEdge display with premium build. One of the best Windows ultrabooks."
  },
  {
    id: "10",
    name: "HP ProBook 450 G8",
    brand: "HP",
    model: "ProBook 450 G8",
    processor: "Intel Core i5-1135G7",
    ram: "8GB DDR4",
    storage: "256GB NVMe SSD",
    display: '15.6" FHD',
    condition: "B+",
    originalPrice: 799,
    refurbishedPrice: 399,
    discount: 50,
    image: "/products/hp-probook.svg",
    category: "Budget",
    inStock: true,
    warranty: "6 Months",
    description: "Affordable business laptop with essential features. Great value for everyday computing."
  },
  {
    id: "11",
    name: "Acer Swift 3",
    brand: "Acer",
    model: "Swift 3 SF314",
    processor: "AMD Ryzen 7 5700U",
    ram: "8GB DDR4",
    storage: "512GB NVMe SSD",
    display: '14" FHD IPS',
    condition: "B+",
    originalPrice: 749,
    refurbishedPrice: 379,
    discount: 49,
    image: "/products/acer-swift.svg",
    category: "Budget",
    inStock: true,
    warranty: "6 Months",
    description: "Lightweight and powerful with AMD Ryzen. Excellent battery life at a budget price."
  },
  {
    id: "12",
    name: "Lenovo IdeaPad 3",
    brand: "Lenovo",
    model: "IdeaPad 3 15",
    processor: "Intel Core i5-1135G7",
    ram: "8GB DDR4",
    storage: "256GB SSD",
    display: '15.6" FHD',
    condition: "B",
    originalPrice: 599,
    refurbishedPrice: 279,
    discount: 53,
    image: "/products/ideapad-3.svg",
    category: "Budget",
    inStock: true,
    warranty: "3 Months",
    description: "Budget-friendly everyday laptop. Perfect for students and basic computing needs."
  }
];

export const categories = ["All", "Business", "Premium", "Ultrabook", "Budget"];
export const brands = ["All", "Lenovo", "Apple", "Dell", "HP", "Microsoft", "ASUS", "Acer"];
export const conditions = ["All", "A+", "A", "B+", "B"];
