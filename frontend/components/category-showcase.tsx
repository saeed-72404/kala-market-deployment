import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: "1",
    name: "موبایل و تبلت",
    slug: "mobile-tablet",
    image: "/samsung-galaxy-s10-plus.png",
    productCount: 245,
  },
  {
    id: "2",
    name: "لپ‌تاپ و کامپیوتر",
    slug: "computers-laptops",
    image: "/chuwi-ultrabook-14-pro.png",
    productCount: 189,
  },
  {
    id: "3",
    name: "لوازم خانگی",
    slug: "home-appliances",
    image: "/donar-twin-refrigerator.png",
    productCount: 356,
  },
  {
    id: "4",
    name: "آشپزخانه",
    slug: "kitchen",
    image: "/lopez-gas-stove-10000s.png",
    productCount: 128,
  },
  {
    id: "5",
    name: "دوربین",
    slug: "cameras",
    image: "/samsung-st150f.png",
    productCount: 94,
  },
  {
    id: "6",
    name: "لوازم برقی",
    slug: "electrical",
    image: "/sunward-swf-40r-toaster-oven.png",
    productCount: 167,
  },
]

export function CategoryShowcase() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">خرید بر اساس دسته‌بندی</h2>
        <p className="text-gray-600">محصولات متنوع در دسته‌بندی‌های مختلف</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-4 text-center">
                <div className="aspect-square relative mb-3 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-sm mb-1 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">{category.productCount} محصول</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
