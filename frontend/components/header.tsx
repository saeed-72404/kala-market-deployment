"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, X, Heart, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "1", name: "الکترونیک", slug: "electronics", hasSubmenu: true },
  { id: "2", name: "لوازم خانگی", slug: "home-appliances", hasSubmenu: true },
  { id: "3", name: "کامپیوتر و لپ‌تاپ", slug: "computers-laptops", hasSubmenu: true },
  { id: "4", name: "موبایل و تبلت", slug: "mobile-tablet", hasSubmenu: true },
  { id: "5", name: "مد و پوشاک", slug: "fashion", hasSubmenu: false },
  { id: "6", name: "کتاب و لوازم‌التحریر", slug: "books", hasSubmenu: false },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cartCount, setCartCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)

    // Get cart count
    const savedCartCount = localStorage.getItem("cartCount")
    setCartCount(savedCartCount ? Number.parseInt(savedCartCount) : 0)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    window.location.href = "/"
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center">
              <Phone className="w-4 h-4 ml-1" />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 ml-1" />
              <span>ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/about" className="hover:text-blue-600">
              درباره ما
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              تماس با ما
            </Link>
            <Link href="/faq" className="hover:text-blue-600">
              سوالات متداول
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="کالا مارکت" width={130} height={30} className="h-10 w-auto" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="جستجو در میان هزاران محصول..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full"
              />
              <Button type="submit" size="sm" className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center rtl:text-right">
                  <User className="w-5 h-5 ml-1" />
                  <span className="hidden md:inline">{isLoggedIn ? "حساب کاربری" : "ورود / ثبت‌نام"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rtl text-right">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuLabel className="justify-end text-right">حساب کاربری</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="justify-end text-right">
                      <Link href="/profile">پروفایل</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="justify-end text-right">
                      <Link href="/orders">سفارشات من</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="justify-end text-right">
                      <Link href="/addresses">آدرس‌ها</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="justify-end text-right">خروج از حساب</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="justify-end text-right">
                      <Link href="/auth/login">ورود</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="justify-end text-right">
                      <Link href="/auth/register">ثبت‌نام</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="w-5 h-5" />
                <span className="hidden md:inline mr-1">علاقه‌مندی‌ها</span>
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden md:inline mr-1">سبد خرید</span>
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-blue-600 text-white">
        <div className="container">
          <div className="hidden md:flex items-center space-x-8 space-x-reverse py-3">
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild className="justify-end text-right">
                <Button variant="ghost" className="text-white hover:bg-blue-700">
                  <Menu className="w-4 h-4 ml-1" />
                  دسته‌بندی محصولات
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end"        // از سمت راست باز شود
                sideOffset={4}
                className="w-64 text-right">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild className="justify-end text-right">
                    <Link href={`/category/${category.slug}`} className="flex items-center justify-between rtl text-right ">
                      {category.name}
                      {category.hasSubmenu && <span className="text-xs">›</span>}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/products" className="hover:text-blue-200 transition-colors">
              همه محصولات
            </Link>
            <Link href="/deals" className="hover:text-blue-200 transition-colors">
              تخفیف‌ها و پیشنهادها
            </Link>
            <Link href="/brands" className="hover:text-blue-200 transition-colors">
              برندها
            </Link>
            <Link href="/blog" className="hover:text-blue-200 transition-colors">
              وبلاگ
            </Link>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-500">
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block py-2 px-4 hover:bg-blue-700 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  href="/products"
                  className="block py-2 px-4 hover:bg-blue-700 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  همه محصولات
                </Link>
                <Link
                  href="/deals"
                  className="block py-2 px-4 hover:bg-blue-700 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  تخفیف‌ها و پیشنهادها
                </Link>
                <Link
                  href="/brands"
                  className="block py-2 px-4 hover:bg-blue-700 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  برندها
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
