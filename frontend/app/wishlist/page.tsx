"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { formatPrice } from "@/lib/utils"

// Sample wishlist data
const initialWishlistItems = [
  {
    id: 1,
    name: "آیفون 15 پرو مکس - 512 گیگابایت",
    image: "/placeholder.svg?height=200&width=200&text=iPhone+15",
    price: 62000000,
    originalPrice: 65000000,
    discount: 5,
    rating: 4.8,
    reviewCount: 245,
    inStock: true,
    brand: "اپل",
  },
  {
    id: 2,
    name: "لپ تاپ ایسوس ROG Strix G15",
    image: "/placeholder.svg?height=200&width=200&text=ASUS+ROG",
    price: 32000000,
    originalPrice: 35000000,
    discount: 9,
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    brand: "ایسوس",
  },
  {
    id: 3,
    name: "تبلت اپل آیپد پرو 12.9 اینچ",
    image: "/placeholder.svg?height=200&width=200&text=iPad+Pro",
    price: 36000000,
    originalPrice: 38000000,
    discount: 5,
    rating: 4.8,
    reviewCount: 198,
    inStock: false,
    brand: "اپل",
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const removeFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (id: number) => {
    console.log("Adding to cart:", id)
    // Handle add to cart logic
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
{/*         <Header /> */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Heart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">لیست علاقه‌مندی‌های شما خالی است</h2>
            <p className="text-gray-600 mb-8">محصولات مورد علاقه خود را به این لیست اضافه کنید</p>
            <Link href="/products">
              <Button size="lg">مشاهده محصولات</Button>
            </Link>
          </div>
        </div>
{/*         <Footer /> */}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
{/*       <Header /> */}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            خانه
          </Link>
          <span>/</span>
          <span>علاقه‌مندی‌ها</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">علاقه‌مندی‌های من</h1>
          <span className="text-gray-600">{wishlistItems.length} محصول</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Link href={`/products/${item.id}`}>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  {item.discount > 0 && <Badge className="absolute top-2 right-2 bg-red-500">{item.discount}%</Badge>}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                      <span className="text-white font-medium">ناموجود</span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-2 bg-white/80 hover:bg-white text-red-500"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <Link href={`/products/${item.id}`}>
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">{item.name}</h3>
                </Link>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600 mr-1">{item.rating}</span>
                    <span className="text-xs text-gray-500">({item.reviewCount})</span>
                  </div>
                  <Badge variant="outline">{item.brand}</Badge>
                </div>

                <div className="flex flex-col items-end space-y-1 mb-4">
                  {item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)} تومان</span>
                  )}
                  <span className="text-lg font-bold text-green-600">{formatPrice(item.price)} تومان</span>
                </div>

                <div className="flex space-x-2 space-x-reverse">
                  <Button className="flex-1" onClick={() => addToCart(item.id)} disabled={!item.inStock}>
                    <ShoppingCart className="h-4 w-4 ml-2" />
                    {item.inStock ? "افزودن به سبد" : "ناموجود"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

{/*       <Footer /> */}
    </div>
  )
}
