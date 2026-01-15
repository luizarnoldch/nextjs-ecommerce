export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  rating: number
  reviews: number
  variants: {
    colors: string[]
    sizes: string[]
  }
  inStock: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  count: number
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedColor: string
  selectedSize: string
  price: number
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: string
  city?: string
  zipCode?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
