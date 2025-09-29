"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  FolderTree,
  Tag,
  Settings,
  BarChart3,
  CreditCard,
  Bell,
  Truck,
  Star,
  Percent,
  FileText,
} from "lucide-react"

const sidebarItems = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "محصولات",
    icon: Package,
    items: [
      { title: "همه محصولات", href: "/admin/products" },
      { title: "افزودن محصول", href: "/admin/products/create" },
      { title: "موجودی انبار", href: "/admin/products/inventory" },
      { title: "محصولات حذف شده", href: "/admin/products/trash" },
    ],
  },
  {
    title: "کاربران",
    icon: Users,
    items: [
      { title: "همه کاربران", href: "/admin/users" },
      { title: "مدیران", href: "/admin/users/admins" },
      { title: "کاربران مسدود", href: "/admin/users/blocked" },
    ],
  },
  {
    title: "سفارشات",
    icon: ShoppingCart,
    items: [
      { title: "همه سفارشات", href: "/admin/orders" },
      { title: "سفارشات در انتظار", href: "/admin/orders/pending" },
      { title: "سفارشات تکمیل شده", href: "/admin/orders/completed" },
      { title: "سفارشات لغو شده", href: "/admin/orders/cancelled" },
    ],
  },
  {
    title: "دسته‌بندی‌ها",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "برندها",
    href: "/admin/brands",
    icon: Tag,
  },
  {
    title: "تخفیف‌ها",
    icon: Percent,
    items: [
      { title: "کدهای تخفیف", href: "/admin/discounts/codes" },
      { title: "تخفیف‌های محصولات", href: "/admin/discounts/products" },
      { title: "تخفیف‌های دسته‌ای", href: "/admin/discounts/categories" },
    ],
  },
  {
    title: "نظرات و امتیازات",
    icon: Star,
    items: [
      { title: "همه نظرات", href: "/admin/reviews" },
      { title: "نظرات در انتظار تایید", href: "/admin/reviews/pending" },
      { title: "نظرات تایید شده", href: "/admin/reviews/approved" },
      { title: "نظرات رد شده", href: "/admin/reviews/rejected" },
    ],
  },
  {
    title: "پرداخت‌ها",
    icon: CreditCard,
    items: [
      { title: "همه تراکنش‌ها", href: "/admin/payments" },
      { title: "پرداخت‌های موفق", href: "/admin/payments/successful" },
      { title: "پرداخت‌های ناموفق", href: "/admin/payments/failed" },
      { title: "بازپرداخت‌ها", href: "/admin/payments/refunds" },
    ],
  },
  {
    title: "حمل و نقل",
    icon: Truck,
    items: [
      { title: "روش‌های ارسال", href: "/admin/shipping/methods" },
      { title: "مناطق ارسال", href: "/admin/shipping/zones" },
      { title: "هزینه‌های ارسال", href: "/admin/shipping/costs" },
    ],
  },
  {
    title: "گزارشات",
    icon: BarChart3,
    items: [
      { title: "گزارش فروش", href: "/admin/reports/sales" },
      { title: "گزارش محصولات", href: "/admin/reports/products" },
      { title: "گزارش کاربران", href: "/admin/reports/users" },
      { title: "گزارش مالی", href: "/admin/reports/financial" },
    ],
  },
  {
    title: "مدیریت محتوا",
    icon: FileText,
    items: [
      { title: "صفحات", href: "/admin/pages" },
      { title: "مقالات", href: "/admin/blog" },
      { title: "اسلایدرها", href: "/admin/sliders" },
      { title: "بنرها", href: "/admin/banners" },
    ],
  },
  {
    title: "اطلاعیه‌ها",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "تنظیمات",
    icon: Settings,
    items: [
      { title: "تنظیمات عمومی", href: "/admin/settings/general" },
      { title: "تنظیمات پرداخت", href: "/admin/settings/payment" },
      { title: "تنظیمات ایمیل", href: "/admin/settings/email" },
      { title: "تنظیمات SEO", href: "/admin/settings/seo" },
      { title: "تنظیمات امنیتی", href: "/admin/settings/security" },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">پنل مدیریت</h2>
        <p className="text-sm text-gray-600">کالا مارکت</p>
      </div>

      <nav className="mt-6">
        {sidebarItems.map((item, index) => (
          <div key={index}>
            {item.items ? (
              <div className="px-4 py-2">
                <div className="flex items-center text-gray-700 font-medium mb-2">
                  <item.icon className="w-5 h-5 ml-3" />
                  {item.title}
                </div>
                <div className="mr-8 space-y-1">
                  {item.items.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md transition-colors",
                        pathname === subItem.href ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors",
                  pathname === item.href && "bg-blue-100 text-blue-700 border-l-4 border-blue-500",
                )}
              >
                <item.icon className="w-5 h-5 ml-3" />
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
