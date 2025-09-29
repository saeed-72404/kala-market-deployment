import { HeroSlider } from "@/components/hero-slider"
import ProductCarousel from "@/components/product-carousel"
import { AmazingDeals } from "@/components/amazing-deals"
import { AdBanner } from "@/components/ad-banner"
import { CategoryShowcase } from "@/components/category-showcase"

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Amazing Deals Section */}
      <section className="container">
        <AmazingDeals />
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">محصولات ویژه</h2>
          <p className="text-gray-600">بهترین محصولات با کیفیت عالی</p>
        </div>
        <ProductCarousel title="محصولات ویژه" />
      </section>

      {/* Ad Banner */}
      <section className="container">
        <AdBanner />
      </section>

      {/* Category Showcase */}
      <section className="container">
        <CategoryShowcase />
      </section>

      {/* Latest Products */}
      <section className="container">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">جدیدترین محصولات</h2>
          <p className="text-gray-600">آخرین محصولات اضافه شده</p>
        </div>
        <ProductCarousel title="جدیدترین محصولات" />
      </section>

      {/* Best Sellers */}
      <section className="container">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">پرفروش‌ترین محصولات</h2>
          <p className="text-gray-600">محصولاتی که بیشترین فروش را دارند</p>
        </div>
        <ProductCarousel title="پرفروش‌ترین محصولات" />
      </section>
    </div>
  )
}
