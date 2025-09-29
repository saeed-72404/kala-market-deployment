"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Package, Heart, MapPin, Settings, LogOut, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { formatPrice } from "@/lib/utils"

// Sample user data
const userData = {
  firstName: "علی",
  lastName: "محمدی",
  email: "ali.mohammadi@example.com",
  phone: "09123456789",
  joinDate: "1402/05/15",
  totalOrders: 12,
  totalSpent: 45000000,
}

const recentOrders = [
  {
    id: "KM14020815001",
    date: "1402/08/15",
    status: "delivered",
    total: 15000000,
    items: 2,
  },
  {
    id: "KM14020810002",
    date: "1402/08/10",
    status: "shipped",
    total: 8500000,
    items: 1,
  },
  {
    id: "KM14020805003",
    date: "1402/08/05",
    status: "processing",
    total: 12000000,
    items: 3,
  },
]

const addresses = [
  {
    id: 1,
    title: "منزل",
    name: "علی محمدی",
    phone: "09123456789",
    address: "تهران، خیابان ولیعصر، پلاک 123",
    postalCode: "1234567890",
    isDefault: true,
  },
  {
    id: 2,
    title: "محل کار",
    name: "علی محمدی",
    phone: "09123456789",
    address: "تهران، خیابان آزادی، پلاک 456",
    postalCode: "0987654321",
    isDefault: false,
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userData)

  const handleSave = () => {
    console.log("Saving profile:", formData)
    setIsEditing(false)
    // Handle save logic
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      delivered: { label: "تحویل شده", variant: "default" as const },
      shipped: { label: "ارسال شده", variant: "secondary" as const },
      processing: { label: "در حال پردازش", variant: "outline" as const },
    }
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: "outline" as const }
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
          <span>پنل کاربری</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {userData.firstName.charAt(0)}
                    {userData.lastName.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-lg">
                    {userData.firstName} {userData.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm">عضو از {userData.joinDate}</p>
                </div>

                <nav className="space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg bg-blue-50 text-blue-700"
                  >
                    <User className="h-5 w-5" />
                    <span>اطلاعات شخصی</span>
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-100"
                  >
                    <Package className="h-5 w-5" />
                    <span>سفارشات من</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-100"
                  >
                    <Heart className="h-5 w-5" />
                    <span>علاقه‌مندی‌ها</span>
                  </Link>
                  <Link
                    href="/addresses"
                    className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-100"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>آدرس‌های من</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-100"
                  >
                    <Settings className="h-5 w-5" />
                    <span>تنظیمات</span>
                  </Link>
                  <button className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-100 text-red-600 w-full text-right">
                    <LogOut className="h-5 w-5" />
                    <span>خروج</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">پروفایل</TabsTrigger>
                <TabsTrigger value="orders">سفارشات</TabsTrigger>
                <TabsTrigger value="addresses">آدرس‌ها</TabsTrigger>
                <TabsTrigger value="stats">آمار</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>اطلاعات شخصی</CardTitle>
                    <Button variant="outline" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
                      <Edit className="h-4 w-4 ml-2" />
                      {isEditing ? "ذخیره" : "ویرایش"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">نام</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">نام خانوادگی</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">ایمیل</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">شماره موبایل</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        dir="ltr"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>آخرین سفارشات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => {
                        const statusInfo = getStatusBadge(order.status)
                        return (
                          <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">سفارش #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {order.date} • {order.items} کالا
                              </p>
                            </div>
                            <div className="text-left">
                              <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                              <p className="text-sm font-semibold mt-1">{formatPrice(order.total)} تومان</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-6">
                      <Link href="/orders">
                        <Button variant="outline" className="w-full bg-transparent">
                          مشاهده همه سفارشات
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>آدرس‌های من</CardTitle>
                    <Button>افزودن آدرس جدید</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2 space-x-reverse mb-2">
                                <h4 className="font-medium">{address.title}</h4>
                                {address.isDefault && <Badge variant="secondary">پیش‌فرض</Badge>}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{address.name}</p>
                              <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
                              <p className="text-sm text-gray-600 mb-1">{address.address}</p>
                              <p className="text-sm text-gray-600">کد پستی: {address.postalCode}</p>
                            </div>
                            <div className="flex space-x-2 space-x-reverse">
                              <Button variant="outline" size="sm">
                                ویرایش
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                                حذف
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Package className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold">{userData.totalOrders}</h3>
                      <p className="text-gray-600">کل سفارشات</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-green-500 text-2xl font-bold mb-2">💰</div>
                      <h3 className="text-2xl font-bold">{formatPrice(userData.totalSpent)}</h3>
                      <p className="text-gray-600">کل خریدها (تومان)</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold">15</h3>
                      <p className="text-gray-600">علاقه‌مندی‌ها</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

{/*       <Footer /> */}
    </div>
  )
}
