import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Instagram, Twitter, TextIcon as Telegram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image src="/logo-white.png" alt="کالا مارکت" width={240} height={80} className="h-20 w-auto" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              کالا مارکت، فروشگاه آنلاین معتبر با بیش از ۱۰ سال تجربه در ارائه بهترین محصولات با کیفیت و قیمت مناسب
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Telegram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  شرایط بازگشت کالا
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">خدمات مشتریان</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/track-order" className="text-gray-300 hover:text-white transition-colors text-sm">
                  پیگیری سفارش
                </Link>
              </li>
              <li>
                <Link href="/shipping-info" className="text-gray-300 hover:text-white transition-colors text-sm">
                  راهنمای خرید
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className="text-gray-300 hover:text-white transition-colors text-sm">
                  روش‌های پرداخت
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-300 hover:text-white transition-colors text-sm">
                  گارانتی محصولات
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="text-gray-300 hover:text-white transition-colors text-sm">
                  ثبت شکایات
                </Link>
              </li>
              <li>
                <Link href="/suggestions" className="text-gray-300 hover:text-white transition-colors text-sm">
                  پیشنهادات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تماس با ما</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="w-4 h-4 ml-2" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="w-4 h-4 ml-2" />
                <span>info@kalamarket.com</span>
              </div>
              <div className="flex items-start text-sm text-gray-300">
                <MapPin className="w-4 h-4 ml-2 mt-0.5" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <h4 className="font-medium">عضویت در خبرنامه</h4>
              <p className="text-xs text-gray-400">از آخرین تخفیف‌ها و محصولات جدید باخبر شوید</p>
              <div className="flex space-x-2 space-x-reverse">
                <Input
                  type="email"
                  placeholder="ایمیل شما"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button size="sm">عضویت</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">© ۱۴۰۳ کالا مارکت. تمامی حقوق محفوظ است.</div>
          <div className="flex items-center space-x-6 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Image src="/payment/visa.png" alt="Visa" width={32} height={20} className="h-5 w-auto" />
              <Image src="/payment/mastercard.png" alt="Mastercard" width={32} height={20} className="h-5 w-auto" />
              <Image src="/payment/zarinpal.png" alt="ZarinPal" width={32} height={20} className="h-5 w-auto" />
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Image src="/certificates/enamad.png" alt="اینماد" width={40} height={40} className="h-10 w-auto" />
              <Image src="/certificates/samandehi.png" alt="ساماندهی" width={40} height={40} className="h-10 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
