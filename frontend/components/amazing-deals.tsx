"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice, calculateDiscount } from "@/lib/utils"

interface Deal {
  id: string
  name: string
  slug: string
  originalPrice: number
  salePrice: number
  image: string
  endTime: string
  stock: number
  sold: number
}

const deals: Deal[] = [
  {
    id: "1",
    name: "گوشی موبایل سامسونگ Galaxy S10 Plus",
    slug: "samsung-galaxy-s10-plus",
    originalPrice: 15990000,
    salePrice: 12990000,
    image: "/samsung-galaxy-s10-plus.png",
    endTime: "2024-12-31T23:59:59",
    stock: 50,
    sold: 23,
  },
  {
    id: "2",
    name: "لپ‌تاپ چووی UltraBook 14 Pro",
    slug: "chuwi-ultrabook-14-pro",
    originalPrice: 12500000,
    salePrice: 9990000,
    image: "/chuwi-ultrabook-14-pro.png",
    endTime: "2024-12-31T23:59:59",
    stock: 30,
    sold: 18,
  },
  {
    id: "3",
    name: "یخچال دونار دو قلو",
    slug: "donar-twin-refrigerator",
    originalPrice: 18500000,
    salePrice: 15990000,
    image: "/donar-twin-refrigerator.png",
    endTime: "2024-12-31T23:59:59",
    stock: 20,
    sold: 8,
  },
]

export function AmazingDeals() {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const newTimeLeft: { [key: string]: string } = {}

      deals.forEach((deal) => {
        const endTime = new Date(deal.endTime).getTime()
        const distance = endTime - now

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24))
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)

          newTimeLeft[deal.id] =
            `${days}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        } else {
          newTimeLeft[deal.id] = "منقضی شده"
        }
      })

      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-red-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="bg-red-500 text-white p-2 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-red-600">پیشنهادات شگفت‌انگیز</h2>
            <p className="text-gray-600">تخفیف‌های ویژه با زمان محدود</p>
          </div>
        </div>
        <Link href="/deals">
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
          >
            مشاهده همه
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => {
          const progressPercentage = (deal.sold / (deal.stock + deal.sold)) * 100

          return (
            <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <Link href={`/products/${deal.slug}`}>
                    <div className="aspect-square relative bg-gray-100">
                      <Image
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  <Badge className="absolute top-2 right-2 bg-red-500">
                    {calculateDiscount(deal.originalPrice, deal.salePrice)}% تخفیف
                  </Badge>
                </div>

                <div className="p-4 space-y-3">
                  <Link href={`/products/${deal.slug}`}>
                    <h3 className="font-medium line-clamp-2 hover:text-red-600 transition-colors">{deal.name}</h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-red-600">{formatPrice(deal.salePrice)}</div>
                      <div className="text-sm text-gray-500 line-through">{formatPrice(deal.originalPrice)}</div>
                    </div>

                    <div className="text-left">
                      <div className="text-xs text-gray-500 mb-1">زمان باقی‌مانده</div>
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-mono">
                        {timeLeft[deal.id] || "در حال محاسبه..."}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>فروخته شده: {deal.sold}</span>
                      <span>باقی‌مانده: {deal.stock}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    <ShoppingCart className="w-4 h-4 ml-1" />
                    خرید فوری
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
