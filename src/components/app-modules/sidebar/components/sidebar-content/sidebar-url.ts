import { ComponentType, SVGProps } from "react";
import {
  BookOpen,
  HomeIcon,
  Settings2,
  ShoppingCartIcon,
} from "lucide-react";

// Define the shape of sub-items
type SidebarSubItem = {
  title: string;
  url: string;
};

// Define the shape of top-level items
type SidebarItem = {
  title: string;
  url: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  subitems?: SidebarSubItem[];
};

const items: SidebarItem[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: HomeIcon,
    isActive: false,
    subitems: [
      { title: "Analytics", url: "/dashboard" },
      { title: "Starred", url: "#" },
      { title: "Settings", url: "#" },
    ],
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: ShoppingCartIcon,
    isActive: false,
    subitems: [
      { title: "Gallery", url: "/dashboard/products" },
      { title: "Categories", url: "/dashboard/categories" },
      { title: "New Products", url: "/dashboard/products/create" },
    ],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    isActive: false,
    subitems: [
      { title: "Introduction", url: "#" },
      { title: "Get Started", url: "#" },
      { title: "Tutorials", url: "#" },
      { title: "Changelog", url: "#" },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    isActive: false,
    subitems: [
      { title: "General", url: "#" },
      { title: "Team", url: "#" },
      { title: "Billing", url: "#" },
      { title: "Limits", url: "#" },
    ],
  },
];

export default items;
