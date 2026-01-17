import { ComponentType, SVGProps } from "react";
import {
  BookOpen,
  FolderIcon,
  LayoutDashboardIcon,
  SearchIcon,
  Settings2,
  Settings2Icon,
  ShoppingCartIcon,
  Users2Icon,
} from "lucide-react";

// Define the shape of sub-items
export type SidebarSubItem = {
  title: string;
  url: string;
};

// Define the shape of top-level items
export type SidebarItem = {
  title: string;
  url: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  subitems?: SidebarSubItem[];
};

const items: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
    isActive: false,
  },
  {
    title: "Gestión de Productos",
    url: "/dashboard/products",
    icon: ShoppingCartIcon,
    isActive: false,
    subitems: [
      { title: "Productos", url: "/dashboard/products" },
      { title: "Agregar Producto", url: "/dashboard/products/new" },
      { title: "Variantes", url: "/dashboard/products/variants" },
    ],
  },
  {
    title: "Categorías",
    url: "/dashboard/categories",
    icon: FolderIcon,
    isActive: false,
  },
  {
    title: "Órdenes",
    url: "/dashboard/orders",
    icon: ShoppingCartIcon,
    isActive: false,
  },
  {
    title: "Clientes",
    icon: Users2Icon,
    url: "/dashboard/customers",
    isActive: false,
  },
  {
    title: "Búsqueda & Filtros",
    icon: SearchIcon,
    url: "/dashboard/search-analytics",
    isActive: false,
  },
  {
    title: "Configuración",
    icon: Settings2Icon,
    url: "/dashboard/settings",
    isActive: false,
  },
];

export default items;
