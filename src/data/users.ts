export type UserRole = "customer" | "staff" | "admin";

export interface DummyUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export const dummyUsers: Record<UserRole, DummyUser> = {
  customer: {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "customer",
    avatar: "AJ"
  },
  staff: {
    id: "u2",
    name: "Sarah Miller",
    email: "sarah@reboottech.com",
    role: "staff",
    avatar: "SM"
  },
  admin: {
    id: "u3",
    name: "David Chen",
    email: "david@reboottech.com",
    role: "admin",
    avatar: "DC"
  }
};

export const dashboardRoutes: Record<UserRole, { label: string; href: string; icon: string }[]> = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: "LayoutDashboard" },
    { label: "My Orders", href: "/dashboard/customer#orders", icon: "Package" },
    { label: "Wishlist", href: "/dashboard/customer#wishlist", icon: "Heart" },
    { label: "My Profile", href: "/dashboard/customer#profile", icon: "User" },
    { label: "Support", href: "/dashboard/customer#support", icon: "Headphones" },
  ],
  staff: [
    { label: "Overview", href: "/dashboard/staff", icon: "LayoutDashboard" },
    { label: "Order Management", href: "/dashboard/staff#orders", icon: "Package" },
    { label: "Inventory", href: "/dashboard/staff#inventory", icon: "Warehouse" },
    { label: "Quality Checks", href: "/dashboard/staff#quality", icon: "CheckCircle" },
    { label: "Customer Queries", href: "/dashboard/staff#queries", icon: "MessageSquare" },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: "LayoutDashboard" },
    { label: "User Management", href: "/dashboard/admin#users", icon: "Users" },
    { label: "Product Catalog", href: "/dashboard/admin#products", icon: "Box" },
    { label: "Analytics", href: "/dashboard/admin#analytics", icon: "BarChart3" },
    { label: "Settings", href: "/dashboard/admin#settings", icon: "Settings" },
    { label: "Staff Management", href: "/dashboard/admin#staff", icon: "UserCog" },
  ]
};

export const dummyOrderData = [
  { id: "ORD-001", product: "ThinkPad X1 Carbon Gen 9", status: "Delivered", date: "2024-12-15", amount: 749 },
  { id: "ORD-002", product: "MacBook Air M1", status: "In Transit", date: "2025-01-03", amount: 649 },
  { id: "ORD-003", product: "Dell Latitude 5520", status: "Processing", date: "2025-01-10", amount: 549 },
  { id: "ORD-004", product: "HP EliteBook 840 G8", status: "Delivered", date: "2024-11-20", amount: 699 },
  { id: "ORD-005", product: "ASUS ZenBook 14", status: "Cancelled", date: "2024-10-05", amount: 699 },
];

export const dummyAnalytics = {
  totalRevenue: 124580,
  totalOrders: 342,
  totalCustomers: 189,
  avgOrderValue: 364,
  monthlyRevenue: [
    { month: "Aug", value: 15200 },
    { month: "Sep", value: 18400 },
    { month: "Oct", value: 16800 },
    { month: "Nov", value: 21200 },
    { month: "Dec", value: 24600 },
    { month: "Jan", value: 28380 },
  ]
};
