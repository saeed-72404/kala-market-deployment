"use client"

import { useState } from "react"
import Link from "next/link"
import { Grid, List, Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
import AdvancedSearch from "@/components/advanced-search"
import { formatPrice } from "@/lib/utils"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  type Product = {
  id: string
  name: string
  slug: string
  description?: string
  shortDescription?: string
  sku: string
  barcode?: string
  price: string // Decimal در Prisma به صورت string در JS/TS
  comparePrice?: string
  costPrice?: string
  salePrice?: string
  stock: number
  trackQuantity: boolean
  quantity: number
  lowStockThreshold: number
  weight?: string
  dimensions?: Record<string, number>
  metaTitle?: string
  metaDescription?: string
  isActive: boolean
  isFeatured: boolean
  isDigital: boolean
  categoryId: string
  brandId?: string
  createdAt: string
  updatedAt: string
  // بقیه روابط می‌تونه optional باشه
}


  const handleResultsChange = (results: any[]) => {
    setProducts(results)
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
          <span>محصولات</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">جست‌وجو و فیلتر محصولات</h1>
          <p className="text-gray-600">جست‌وجوی پیشرفته در بین هزاران محصول با کیفیت</p>
        </div>

        {/* Advanced Search Component */}
        <AdvancedSearch onResultsChange={handleResultsChange} className="mb-8" />

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex border rounded-md">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid/List */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <ShoppingCart className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {loading ? "در حال جست‌وجو..." : "محصولی یافت نشد"}
            </h3>
            <p className="text-gray-500 mb-4">
              {loading ? "لطفاً صبر کنید..." : "عبارت دیگری جستجو کنید یا فیلترهای خود را تغییر دهید"}
            </p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>

      {/* <Footer /> */}
    </div>
  )
}

function ProductCard({
  product,
  viewMode,
}: {
  product: any
  viewMode: "grid" | "list"
}) {
  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <img
                src={product.images?.[0]?.url || "/placeholder.svg"}
                alt={product.name}
                className="w-24 h-24 object-cover rounded"
              />
              {product.discount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500">{product.discount}%</Badge>
              )}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                  <span className="text-white text-xs">ناموجود</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-medium hover:text-blue-600 mb-2">{product.name}</h3>
              </Link>

              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600 mr-1">
                    {product.avgRating || 0} ({product._count?.reviews || 0})
                  </span>
                </div>
                <Badge variant="outline">{product.brand?.name}</Badge>
                <Badge variant="outline">{product.category?.name}</Badge>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                {product.tags?.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-left">
              <div className="mb-2">
                {product.price > product.salePrice && (
                  <span className="text-sm text-gray-500 line-through block">{formatPrice(product.price)}</span>
                )}
                <span className="text-lg font-bold text-green-600">{formatPrice(product.salePrice)}</span>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                <Button size="sm" variant="outline">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" disabled={product.stock === 0}>
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Link href={`/products/${product.id}`}>
            <img
              src={product.images?.[0]?.url || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          {product.discount > 0 && <Badge className="absolute top-2 right-2 bg-red-500">{product.discount}%</Badge>}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
              <span className="text-white font-medium">ناموجود</span>
            </div>
          )}
          {product.tags?.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {product.tags.slice(0, 2).map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">{product.name}</h3>
        </Link>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 mr-1">{product.avgRating || 0}</span>
            <span className="text-xs text-gray-500">({product._count?.reviews || 0})</span>
          </div>
          <Badge variant="outline">{product.brand?.name}</Badge>
        </div>

        <div className="flex flex-col items-end space-y-1 mb-4">
          {product.price > product.salePrice && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
          )}
          <span className="text-lg font-bold text-green-600">{formatPrice(product.salePrice)}</span>
        </div>

        <div className="flex justify-center space-x-2 space-x-reverse">
          <Button size="icon" variant="outline" className="h-8 w-8 bg-transparent">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="h-8 w-8 bg-transparent">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="icon" className="h-8 w-8" disabled={product.stock === 0}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
