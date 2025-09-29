import Image from "next/image"
import Link from "next/link"

export function AdBanner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link href="/category/electronics" className="group">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">محصولات الکترونیکی</h3>
            <p className="mb-4">تا ۴۰٪ تخفیف ویژه</p>
            <span className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium group-hover:bg-blue-50 transition-colors">
              مشاهده محصولات
            </span>
          </div>
          <div className="absolute left-0 top-0 h-full w-32 opacity-20">
            <Image src="/placeholder-hlams.png" alt="Electronics" fill className="object-cover" />
          </div>
        </div>
      </Link>

      <Link href="/category/home-appliances" className="group">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-teal-600 p-8 text-white">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">لوازم خانگی</h3>
            <p className="mb-4">کیفیت برتر، قیمت مناسب</p>
            <span className="inline-block bg-white text-green-600 px-4 py-2 rounded-lg font-medium group-hover:bg-green-50 transition-colors">
              خرید کنید
            </span>
          </div>
          <div className="absolute left-0 top-0 h-full w-32 opacity-20">
            <Image src="/lopez-gas-stove.png" alt="Home Appliances" fill className="object-cover" />
          </div>
        </div>
      </Link>
    </div>
  )
}
