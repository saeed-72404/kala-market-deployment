"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, Grid, List, Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { formatPrice } from "@/lib/utils"

// Sample category data
const categoryData = {
  digital: {
    name: "کالای دیجیتال",
    description: "جدیدترین محصولات دیجیتال و الکترونیکی",
    subcategories: ["موبایل", "تبلت", "لپ تاپ", "دوربین", "هدفون"],
  },
  beauty: {
    name: "آرایشی و بهداشتی",
    description: "محصولات آرایشی و بهداشتی با کیفیت",
    subcategories: ["آرایش صورت", "مراقبت پوست", "عطر و ادکلن", "مراقبت مو"],
  },
  fashion: {
    name: "مد و پوشاک",
    description: "آخرین مد پوشاک زنانه و مردانه",
    subcategories: ["پوشاک مردانه", "پوشاک زنانه", "کفش", "اکسسوری"],
  },
}

// Sample products for category
const categoryProducts = [
  {
    id: 1,
    name: "آیفون 15 پرو مکس - 512 گیگابایت",
    image: "/placeholder.svg?height=300&width=300&text=iPhone+15",
    originalPrice: 65000000,
    salePrice: 62000000,
    discount: 5,
    rating: 4.8,
    reviewCount: 245,
    brand: "اپل",
    inStock: true,
  },
  {
    id: 2,
    name: "سامسونگ گلکسی S23 اولترا",
    image: "/placeholder.svg?height=300&width=300&text=Samsung+S23",
    originalPrice: 45000000,
    salePrice: 42000000,
    discount: 7,
    rating: 4.7,
    reviewCount: 189,
    brand: "سامسونگ",
    inStock: true,
  },
  {
    id: 3,
    name: "هواوی P60 پرو",
    image: "/placeholder.svg?height=300&width=300&text=Huawei+P60",
    originalPrice: 28000000,
    salePrice: 25000000,
    discount: 11,
    rating: 4.5,
    reviewCount: 134,
    brand: "هواوی",
    inStock: false,
  },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)

  const category = categoryData[params.slug as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/*         <Header /> */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">دسته‌بندی یافت نشد</h1>
          <Link href="/products">
            <Button>بازگشت به محصولات</Button>
          </Link>
        </div>
        {/*         <Footer /> */}
      </div>
    )
  }

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((s) => s !== subcategory) : [...prev, subcategory],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
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
          <span>{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 ml-2" />
                  فیلترها
                </h3>

                {/* Subcategory Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">زیردسته‌ها</h4>
                  <div className="space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`sub-${subcategory}`}
                          checked={selectedSubcategories.includes(subcategory)}
                          onCheckedChange={() => toggleSubcategory(subcategory)}
                        />
                        <Label htmlFor={`sub-${subcategory}`} className="text-sm">
                          {subcategory}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">برند</h4>
                  <div className="space-y-2">
                    {["اپل", "سامسونگ", "هواوی"].map((brand) => (
                      <div key={brand} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Stock Filter */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {/* <Checkbox id="in-stock" checked={showOnlyInStock} onCheckedChange={setShowOnlyInStock} /> */}
                    <Checkbox
                      id="in-stock"
                      checked={showOnlyInStock}
                      onCheckedChange={(checked) => setShowOnlyInStock(checked === true)}
                    />

                    <Label htmlFor="in-stock" className="text-sm">
                      فقط کالاهای موجود
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-sm text-gray-600">{categoryProducts.length} محصول یافت شد</span>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">جدیدترین</SelectItem>
                    <SelectItem value="price-low">ارزان‌ترین</SelectItem>
                    <SelectItem value="price-high">گران‌ترین</SelectItem>
                    <SelectItem value="rating">بیشترین امتیاز</SelectItem>
                    <SelectItem value="discount">بیشترین تخفیف</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*       <Footer /> */}
    </div>
  )
}

function ProductCard({
  product,
  viewMode,
}: {
  product: (typeof categoryProducts)[0]
  viewMode: "grid" | "list"
}) {
  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-24 h-24 object-cover rounded"
              />
              {product.discount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500">{product.discount}%</Badge>
              )}
              {!product.inStock && (
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
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
                <Badge variant="outline">{product.brand}</Badge>
              </div>
            </div>

            <div className="text-left">
              <div className="mb-2">
                {product.originalPrice > product.salePrice && (
                  <span className="text-sm text-gray-500 line-through block">
                    {formatPrice(product.originalPrice)} تومان
                  </span>
                )}
                <span className="text-lg font-bold text-green-600">{formatPrice(product.salePrice)} تومان</span>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                <Button size="sm" variant="outline">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" disabled={!product.inStock}>
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
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          {product.discount > 0 && <Badge className="absolute top-2 right-2 bg-red-500">{product.discount}%</Badge>}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
              <span className="text-white font-medium">ناموجود</span>
            </div>
          )}
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">{product.name}</h3>
        </Link>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 mr-1">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          <Badge variant="outline">{product.brand}</Badge>
        </div>

        <div className="flex flex-col items-end space-y-1 mb-4">
          {product.originalPrice > product.salePrice && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)} تومان</span>
          )}
          <span className="text-lg font-bold text-green-600">{formatPrice(product.salePrice)} تومان</span>
        </div>

        <div className="flex justify-center space-x-2 space-x-reverse">
          <Button size="icon" variant="outline" className="h-8 w-8 bg-transparent">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="h-8 w-8 bg-transparent">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="h-8 w-8 bg-transparent" disabled={!product.inStock}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
