"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { formatPrice } from "@/lib/utils"

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    productId: 1,
    name: "آیفون 15 پرو مکس - 512 گیگابایت",
    image: "/placeholder.svg?height=120&width=120&text=iPhone+15",
    price: 62000000,
    originalPrice: 65000000,
    quantity: 1,
    color: "طبیعی",
    storage: "512GB",
    seller: "کالا مارکت",
    inStock: true,
    maxQuantity: 5,
  },
  {
    id: 2,
    productId: 3,
    name: "لپ تاپ ایسوس ROG Strix G15",
    image: "/chuwi-ultrabook-14-pro.png",
    price: 32000000,
    originalPrice: 35000000,
    quantity: 1,
    color: "مشکی",
    storage: "1TB SSD",
    seller: "کالا مارکت",
    inStock: true,
    maxQuantity: 3,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(item.maxQuantity, newQuantity)) } : item,
      ),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    // Sample coupon logic
    if (couponCode === "SAVE10") {
      setAppliedCoupon({ code: couponCode, discount: 10 })
      setCouponCode("")
    } else if (couponCode === "WELCOME20") {
      setAppliedCoupon({ code: couponCode, discount: 20 })
      setCouponCode("")
    } else {
      alert("کد تخفیف معتبر نیست")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalOriginalPrice = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const productDiscount = totalOriginalPrice - subtotal
  const couponDiscount = appliedCoupon ? Math.floor((subtotal * appliedCoupon.discount) / 100) : 0
  const shipping = subtotal > 50000000 ? 0 : 150000 // Free shipping over 50M
  const total = subtotal - couponDiscount + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Header /> */}

        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <ShoppingBag className="w-full h-full" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">سبد خرید شما خالی است</h1>
            <p className="text-gray-600 mb-6">برای مشاهده محصولات و افزودن به سبد خرید، به فروشگاه مراجعه کنید.</p>
            <Link href="/products">
              <Button size="lg">مشاهده محصولات</Button>
            </Link>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            خانه
          </Link>
          <span>/</span>
          <span>سبد خرید</span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">سبد خرید</h1>
          <span className="text-gray-600">{cartItems.length} محصول</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="font-medium text-gray-900 hover:text-blue-600 mb-2">{item.name}</h3>
                      </Link>

                      <div className="text-sm text-gray-500 space-y-1">
                        <p>فروشنده: {item.seller}</p>
                        {item.color && <p>رنگ: {item.color}</p>}
                        {item.storage && <p>حافظه: {item.storage}</p>}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Price */}
                        <div className="text-right">
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through block">
                              {formatPrice(item.originalPrice)} تومان
                            </span>
                          )}
                          <span className="text-lg font-bold text-green-600">{formatPrice(item.price)} تومان</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="px-3 py-1 border rounded text-center min-w-[3rem]">{item.quantity}</span>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {!item.inStock && <p className="text-sm text-red-600 mt-2">این کالا در حال حاضر موجود نیست</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">کد تخفیف</h3>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <span className="font-medium text-green-700">{appliedCoupon.code}</span>
                      <p className="text-sm text-green-600">{appliedCoupon.discount}% تخفیف</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeCoupon}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2 space-x-reverse">
                    <Input
                      placeholder="کد تخفیف را وارد کنید"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                      dir="rtl"
                    />
                    <Button onClick={applyCoupon} disabled={!couponCode.trim()}>
                      اعمال
                    </Button>
                  </div>
                )}

                <div className="mt-4 text-sm text-gray-600">
                  <p>کدهای تخفیف نمونه:</p>
                  <p>SAVE10 - 10% تخفیف</p>
                  <p>WELCOME20 - 20% تخفیف</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">خلاصه سفارش</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>قیمت کالاها ({cartItems.length} کالا):</span>
                    <span>{formatPrice(totalOriginalPrice)} تومان</span>
                  </div>

                  {productDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>تخفیف محصولات:</span>
                      <span>-{formatPrice(productDiscount)} تومان</span>
                    </div>
                  )}

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>تخفیف کوپن ({appliedCoupon?.discount}%):</span>
                      <span>-{formatPrice(couponDiscount)} تومان</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>هزینه ارسال:</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">رایگان</span>
                      ) : (
                        `${formatPrice(shipping)} تومان`
                      )}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>مجموع:</span>
                    <span className="text-green-600">{formatPrice(total)} تومان</span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-sm text-gray-600">
                      برای ارسال رایگان {formatPrice(50000000 - subtotal)} تومان دیگر خرید کنید
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <Link href="/checkout">
                    <Button className="w-full" size="lg">
                      ادامه فرآیند خرید
                    </Button>
                  </Link>

                  <Link href="/products">
                    <Button variant="outline" className="w-full bg-transparent">
                      <ArrowRight className="h-4 w-4 ml-2" />
                      ادامه خرید
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">اطلاعات ارسال</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>ارسال رایگان برای خرید بالای 50 میلیون تومان</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>ارسال فوری در شهر تهران</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>امکان تحویل درب منزل</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}
