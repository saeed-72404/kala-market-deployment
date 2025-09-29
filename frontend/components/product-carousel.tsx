"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice, calculateDiscount } from "@/lib/utils"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  salePrice?: number
  image: string
  category: string
  brand: string
  rating: number
  reviewCount: number
  isFeatured: boolean
}

interface ProductCarouselProps {
  title: string
  products?: Product[]
}

// Mock data - در حالت واقعی از API دریافت می‌شود
const mockProducts: Product[] = [
  {
    id: "1",
    name: "گوشی موبایل سامسونگ Galaxy S10 Plus",
    slug: "samsung-galaxy-s10-plus",
    price: 15990000,
    salePrice: 14990000,
    image: "/samsung-galaxy-s10-plus.png",
    category: "موبایل",
    brand: "سامسونگ",
    rating: 4.5,
    reviewCount: 128,
    isFeatured: true,
  },
  {
    id: "2",
    name: "دوربین دیجیتال سامسونگ ST150F",
    slug: "samsung-st150f-camera",
    price: 3500000,
    salePrice: 3200000,
    image: "/samsung-st150f.png",
    category: "دوربین",
    brand: "سامسونگ",
    rating: 4.2,
    reviewCount: 64,
    isFeatured: true,
  },
  {
    id: "3",
    name: "اجاق گاز لوپز مدل 10000S",
    slug: "lopez-gas-stove-10000s",
    price: 8500000,
    salePrice: 7800000,
    image: "/lopez-gas-stove-10000s.png",
    category: "لوازم خانگی",
    brand: "لوپز",
    rating: 4.7,
    reviewCount: 89,
    isFeatured: true,
  },
  {
    id: "4",
    name: "لپ‌تاپ چووی UltraBook 14 Pro",
    slug: "chuwi-ultrabook-14-pro",
    price: 12500000,
    salePrice: 11900000,
    image: "/chuwi-ultrabook-14-pro.png",
    category: "لپ‌تاپ",
    brand: "چووی",
    rating: 4.3,
    reviewCount: 45,
    isFeatured: true,
  },
  {
    id: "5",
    name: "توستر سان‌وارد SWF-40R",
    slug: "sunward-swf-40r-toaster",
    price: 2800000,
    salePrice: 2500000,
    image: "/sunward-swf-40r-toaster-oven.png",
    category: "لوازم خانگی",
    brand: "سان‌وارد",
    rating: 4.1,
    reviewCount: 32,
    isFeatured: false,
  },
  {
    id: "6",
    name: "اسپرسو ساز مباشی ECM2013",
    slug: "mabashi-ecm2013-espresso",
    price: 5500000,
    salePrice: 5200000,
    image: "/mabashi-ecm2013-espresso-maker.png",
    category: "لوازم خانگی",
    brand: "مباشی",
    rating: 4.6,
    reviewCount: 78,
    isFeatured: true,
  },
]

export default function ProductCarousel({ title, products = mockProducts }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 768) {
        setItemsPerView(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const addToCart = (productId: string) => {
    // Add to cart logic
    console.log("Adding to cart:", productId)
  }

  const toggleWishlist = (productId: string) => {
    // Toggle wishlist logic
    console.log("Toggle wishlist:", productId)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentIndex === 0}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 px-2" style={{ width: `${100 / itemsPerView}%` }}>
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Link href={`/products/${product.slug}`}>
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Badges */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-1">
                      {product.salePrice && (
                        <Badge variant="destructive" className="text-xs">
                          {calculateDiscount(product.price, product.salePrice)}% تخفیف
                        </Badge>
                      )}
                      {product.isFeatured && <Badge className="text-xs bg-blue-500">ویژه</Badge>}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-2 left-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-medium text-sm line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center space-x-1 space-x-reverse text-xs text-gray-500">
                      <span>{product.brand}</span>
                      <span>•</span>
                      <span>{product.category}</span>
                    </div>

                    <div className="flex items-center space-x-1 space-x-reverse">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviewCount})</span>
                    </div>

                    <div className="space-y-1">
                      {product.salePrice ? (
                        <>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="text-lg font-bold text-red-600">{formatPrice(product.salePrice)}</span>
                            <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                          </div>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                      )}
                    </div>

                    <Button className="w-full" size="sm" onClick={() => addToCart(product.id)}>
                      <ShoppingCart className="w-4 h-4 ml-1" />
                      افزودن به سبد
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
