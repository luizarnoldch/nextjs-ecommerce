"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../lib/auth-context"
import { useCart } from "../lib/cart-context"
import { useRouter } from "next/navigation"

export function Header() {
  const { state, logout } = useAuth()
  const { items } = useCart()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl md:text-2xl text-foreground hover:text-primary transition"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              TH
            </div>
            <span className="hidden sm:inline">TechHome</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition font-medium">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition font-medium">
              Products
            </Link>
            <Link href="/categories" className="text-foreground hover:text-primary transition font-medium">
              Categories
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-foreground hover:text-primary transition rounded-lg hover:bg-secondary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2-8m0 0h5m-5 0a2 2 0 100 4 2 2 0 000-4zm-8 8a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative group">
              <button className="p-2 text-foreground hover:text-primary transition rounded-lg hover:bg-secondary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
              <div className="absolute right-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
                {state.isAuthenticated && state.user ? (
                  <>
                    <div className="px-4 py-3 border-b border-border">
                      <p className="font-semibold text-foreground">{state.user.name}</p>
                      <p className="text-sm text-muted-foreground">{state.user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-foreground hover:bg-secondary transition"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in" className="block px-4 py-2 text-foreground hover:bg-secondary transition">
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block px-4 py-2 text-foreground hover:bg-secondary transition border-t border-border"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border space-y-2">
            <Link href="/" className="block px-4 py-2 text-foreground hover:bg-secondary rounded transition">
              Home
            </Link>
            <Link href="/products" className="block px-4 py-2 text-foreground hover:bg-secondary rounded transition">
              Products
            </Link>
            <Link href="/categories" className="block px-4 py-2 text-foreground hover:bg-secondary rounded transition">
              Categories
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
