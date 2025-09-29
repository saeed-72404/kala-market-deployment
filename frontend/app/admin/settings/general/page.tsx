"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Save, Upload } from "lucide-react"

export default function GeneralSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">تنظیمات عمومی</h1>
        <p className="text-gray-600">تنظیمات کلی فروشگاه و اطلاعات پایه</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* اطلاعات فروشگاه */}
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات فروشگاه</CardTitle>
            <CardDescription>اطلاعات اصلی و هویت فروشگاه</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storeName">نام فروشگاه</Label>
              <Input id="storeName" defaultValue="کالا مارکت" />
            </div>

            <div>
              <Label htmlFor="storeDescription">توضیحات فروشگاه</Label>
              <Textarea
                id="storeDescription"
                defaultValue="فروشگاه آنلاین کالا مارکت - بهترین محصولات با کیفیت"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="storeEmail">ایمیل فروشگاه</Label>
              <Input id="storeEmail" type="email" defaultValue="info@kalamarket.com" />
            </div>

            <div>
              <Label htmlFor="storePhone">تلفن فروشگاه</Label>
              <Input id="storePhone" defaultValue="021-12345678" />
            </div>

            <div>
              <Label htmlFor="storeAddress">آدرس فروشگاه</Label>
              <Textarea id="storeAddress" defaultValue="تهران، خیابان ولیعصر، پلاک 123" rows={2} />
            </div>
          </CardContent>
        </Card>

        {/* لوگو و تصاویر */}
        <Card>
          <CardHeader>
            <CardTitle>لوگو و تصاویر</CardTitle>
            <CardDescription>لوگو و تصاویر اصلی فروشگاه</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>لوگوی فروشگاه</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="mt-2">
                  <Button variant="outline" size="sm">
                    انتخاب فایل
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG تا 2MB</p>
              </div>
            </div>

            <div>
              <Label>فاویکون</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="mt-2">
                  <Button variant="outline" size="sm">
                    انتخاب فایل
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">ICO, PNG 32x32</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* تنظیمات منطقه‌ای */}
        <Card>
          <CardHeader>
            <CardTitle>تنظیمات منطقه‌ای</CardTitle>
            <CardDescription>واحد پول، زبان و منطقه زمانی</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currency">واحد پول</Label>
              <Select defaultValue="irr">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="irr">ریال ایران (IRR)</SelectItem>
                  <SelectItem value="usd">دلار آمریکا (USD)</SelectItem>
                  <SelectItem value="eur">یورو (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="language">زبان پیش‌فرض</Label>
              <Select defaultValue="fa">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fa">فارسی</SelectItem>
                  <SelectItem value="en">انگلیسی</SelectItem>
                  <SelectItem value="ar">عربی</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timezone">منطقه زمانی</Label>
              <Select defaultValue="asia/tehran">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia/tehran">آسیا/تهران</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="europe/london">اروپا/لندن</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateFormat">فرمت تاریخ</Label>
              <Select defaultValue="jalali">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jalali">شمسی (۱۴۰۲/۰۸/۱۵)</SelectItem>
                  <SelectItem value="gregorian">میلادی (2023/11/06)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* تنظیمات فروشگاه */}
        <Card>
          <CardHeader>
            <CardTitle>تنظیمات فروشگاه</CardTitle>
            <CardDescription>تنظیمات عملکردی فروشگاه</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="allowRegistration" defaultChecked />
              <Label htmlFor="allowRegistration">امکان ثبت‌نام کاربران جدید</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="requireEmailVerification" defaultChecked />
              <Label htmlFor="requireEmailVerification">تایید ایمیل الزامی</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="allowGuestCheckout" />
              <Label htmlFor="allowGuestCheckout">خرید بدون ثبت‌نام</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="enableReviews" defaultChecked />
              <Label htmlFor="enableReviews">فعال‌سازی نظرات</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="enableWishlist" defaultChecked />
              <Label htmlFor="enableWishlist">فعال‌سازی لیست علاقه‌مندی‌ها</Label>
            </div>

            <Separator />

            <div>
              <Label htmlFor="maintenanceMode">حالت تعمیر و نگهداری</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="maintenanceMode" />
                <Label htmlFor="maintenanceMode">فعال‌سازی حالت تعمیر</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="maintenanceMessage">پیام حالت تعمیر</Label>
              <Textarea id="maintenanceMessage" placeholder="فروشگاه در حال به‌روزرسانی است..." rows={2} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* دکمه ذخیره */}
      <div className="flex justify-end">
        <Button className="w-32">
          <Save className="mr-2 h-4 w-4" />
          ذخیره تغییرات
        </Button>
      </div>
    </div>
  )
}
