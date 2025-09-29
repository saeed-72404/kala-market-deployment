"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { formatPrice } from "@/lib/utils"

// Sample product data (in real app, this would be fetched based on ID)
const productData = {
  id: 1,
  name: "آیفون 15 پرو مکس - 512 گیگابایت",
  images: [
    "/placeholder.svg?height=600&width=600&text=iPhone+15+Main",
    "/placeholder.svg?height=600&width=600&text=iPhone+15+Side",
    "/placeholder.svg?height=600&width=600&text=iPhone+15+Back",
    "/placeholder.svg?height=600&width=600&text=iPhone+15+Screen",
  ],
  originalPrice: 65000000,
  salePrice: 62000000,
  discount: 5,
  rating: 4.8,
  reviewCount: 245,
  brand: "اپل",
  category: "موبایل",
  inStock: true,
  stockCount: 15,
  tags: ["جدید", "پرفروش"],
  colors: [
    { name: "طبیعی", code: "#F5F5DC", available: true },
    { name: "آبی", code: "#4A90E2", available: true },
    { name: "سفید", code: "#FFFFFF", available: false },
    { name: "مشکی", code: "#000000", available: true },
  ],
  storages: ["128GB", "256GB", "512GB", "1TB"],
  description: "آیفون 15 پرو مکس با سیستم دوربین پیشرفته، تراشه A17 Pro، بدنه تیتانیومی و USB-C ارائه می‌شود.",
  features: [
    "صفحه نمایش 6.7 اینچی Super Retina XDR",
    "تراشه A17 Pro با فناوری 3 نانومتر",
    "سیستم دوربین پرو با سنسور اصلی 48 مگاپیکسل",
    "بدنه تیتانیومی مقاوم و سبک",
    "باتری تا 29 ساعت پخش ویدیو",
    "مقاوم در برابر آب و گرد و غبار (IP68)",
  ],
  specifications: {
    "صفحه نمایش": "6.7 اینچ Super Retina XDR OLED",
    پردازنده: "Apple A17 Pro",
    "حافظه RAM": "8GB",
    "دوربین اصلی": "48MP + 12MP + 12MP",
    "دوربین سلفی": "12MP TrueDepth",
    باتری: "4441mAh",
    "سیستم عامل": "iOS 17",
    اتصالات: "USB-C, Lightning, Wi-Fi 6E, 5G",
  },
  seller: {
    name: "کالا مارکت",
    rating: 4.9,
    responseTime: "کمتر از 2 ساعت",
    warranty: "18 ماهه",
  },
}

// Sample related products
const relatedProducts = [
  {
    id: 2,
    name: "سامسونگ گلکسی S23 اولترا",
    image: "/samsung-galaxy-s10-plus.png",
    salePrice: 42000000,
    originalPrice: 45000000,
    discount: 7,
    rating: 4.7,
  },
  {
    id: 3,
    name: "گوگل پیکسل 8 پرو",
    image: "/placeholder.svg?height=300&width=300&text=Pixel+8",
    salePrice: 38000000,
    originalPrice: 40000000,
    discount: 5,
    rating: 4.6,
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(productData.colors[0])
  const [selectedStorage, setSelectedStorage] = useState(productData.storages[2])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      productId: productData.id,
      color: selectedColor,
      storage: selectedStorage,
      quantity,
    })
    // Handle add to cart logic
  }

  const handleBuyNow = () => {
    console.log("Buy now:", {
      productId: productData.id,
      color: selectedColor,
      storage: selectedStorage,
      quantity,
    })
    // Handle buy now logic
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
          <Link href="/products" className="hover:text-blue-600">
            محصولات
          </Link>
          <span>/</span>
          <Link href={`/category/${productData.category}`} className="hover:text-blue-600">
            {productData.category}
          </Link>
          <span>/</span>
          <span>{productData.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={productData.images[selectedImage] || "/placeholder.svg"}
                alt={productData.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {productData.discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white">{productData.discount}% تخفیف</Badge>
              )}
              {productData.tags.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {productData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden ${selectedImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${productData.name} ${index + 1}`}
                    className="w-full h-20 object-cover hover:scale-105 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{productData.name}</h1>

              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(productData.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 mr-2">
                    {productData.rating} ({productData.reviewCount} نظر)
                  </span>
                </div>

                <Badge variant="outline">{productData.brand}</Badge>

                <div className="flex space-x-2 space-x-reverse">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                {productData.originalPrice > productData.salePrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(productData.originalPrice)} تومان
                  </span>
                )}
                <span className="text-2xl font-bold text-green-600">{formatPrice(productData.salePrice)} تومان</span>
                {productData.discount > 0 && (
                  <span className="text-sm text-red-600 font-medium">
                    ({formatPrice(productData.originalPrice - productData.salePrice)} تومان تخفیف)
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">رنگ:</h3>
              <div className="flex space-x-2 space-x-reverse">
                {productData.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => color.available && setSelectedColor(color)}
                    disabled={!color.available}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor.name === color.name ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
                      } ${!color.available ? "opacity-50 cursor-not-allowed" : "hover:scale-110"} transition-transform`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 mt-1 block">انتخاب شده: {selectedColor.name}</span>
            </div>

            {/* Storage Selection */}
            <div>
              <h3 className="font-medium mb-3">حافظه:</h3>
              <div className="grid grid-cols-4 gap-2">
                {productData.storages.map((storage) => (
                  <Button
                    key={storage}
                    variant={selectedStorage === storage ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStorage(storage)}
                  >
                    {storage}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">تعداد:</h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 border rounded">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(productData.stockCount, quantity + 1))}
                  disabled={quantity >= productData.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">(حداکثر {productData.stockCount} عدد)</span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 space-x-reverse">
              {productData.inStock ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">موجود در انبار</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-600">ناموجود</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleAddToCart} disabled={!productData.inStock} className="w-full" size="lg">
                <ShoppingCart className="h-5 w-5 ml-2" />
                افزودن به سبد خرید
              </Button>

              <Button
                onClick={handleBuyNow}
                disabled={!productData.inStock}
                variant="outline"
                className="w-full bg-transparent"
                size="lg"
              >
                خرید فوری
              </Button>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">اطلاعات فروشنده</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>فروشنده:</span>
                    <span className="font-medium">{productData.seller.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>امتیاز فروشنده:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                      <span>{productData.seller.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>زمان پاسخگویی:</span>
                    <span>{productData.seller.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>گارانتی:</span>
                    <span>{productData.seller.warranty}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <Truck className="h-8 w-8 text-blue-600" />
                <span className="text-sm">ارسال رایگان</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Shield className="h-8 w-8 text-green-600" />
                <span className="text-sm">گارانتی اصلی</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <RotateCcw className="h-8 w-8 text-purple-600" />
                <span className="text-sm">7 روز ضمانت برگشت</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">توضیحات</TabsTrigger>
              <TabsTrigger value="specifications">مشخصات</TabsTrigger>
              <TabsTrigger value="reviews">نظرات ({productData.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-6">
              <h3 className="text-lg font-semibold mb-4">توضیحات محصول</h3>
              <p className="text-gray-700 mb-6">{productData.description}</p>

              <h4 className="font-medium mb-3">ویژگی‌های کلیدی:</h4>
              <ul className="space-y-2">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 ml-3 flex-shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="specifications" className="p-6">
              <h3 className="text-lg font-semibold mb-4">مشخصات فنی</h3>
              <div className="space-y-4">
                {Object.entries(productData.specifications).map(([key, value], index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <h3 className="text-lg font-semibold mb-4">نظرات کاربران</h3>
              <div className="space-y-6">
                {/* Sample reviews */}
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-medium mr-2">علی رضایی</span>
                    </div>
                    <span className="text-sm text-gray-500">2 روز پیش</span>
                  </div>
                  <p className="text-gray-700">
                    محصول عالی با کیفیت بسیار بالا. ارسال سریع و بسته‌بندی مناسب. پیشنهاد می‌کنم.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="font-medium mr-2">فاطمه احمدی</span>
                    </div>
                    <span className="text-sm text-gray-500">1 هفته پیش</span>
                  </div>
                  <p className="text-gray-700">کیفیت ساخت خوب است ولی قیمت کمی بالاست. در کل راضی هستم.</p>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  نمایش همه نظرات
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">محصولات مشابه</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                    <h3 className="font-medium mb-2 line-clamp-2 hover:text-blue-600">{product.name}</h3>
                  </Link>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 mr-1">{product.rating}</span>
                    </div>
                    {product.discount > 0 && <Badge className="bg-red-500">{product.discount}%</Badge>}
                  </div>

                  <div className="space-y-1 mb-4">
                    {product.originalPrice > product.salePrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)} تومان
                      </span>
                    )}
                    <div className="text-lg font-bold text-green-600">{formatPrice(product.salePrice)} تومان</div>
                  </div>

                  <Button className="w-full" size="sm">
                    <ShoppingCart className="h-4 w-4 ml-2" />
                    افزودن به سبد
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

{/*       <Footer /> */}
    </div>
  )
}
