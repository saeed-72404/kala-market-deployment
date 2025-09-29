import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Users, Package, DollarSign, TrendingUp, TrendingDown, Eye, ArrowUpRight } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">داشبورد</h1>
        <p className="text-gray-600">خلاصه‌ای از وضعیت فروشگاه شما</p>
      </div>

      {/* آمار کلی */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل فروش</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۱۲,۳۴۵,۶۷۸ تومان</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
              +۲۰.۱% نسبت به ماه قبل
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">سفارشات</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۲,۳۵۰</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
              +۱۸۰.۱% نسبت به ماه قبل
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کاربران</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۱۲,۲۳۴</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
              +۱۹% نسبت به ماه قبل
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">محصولات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۵۷۳</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="h-3 w-3 text-red-500 ml-1" />
              -۲% نسبت به ماه قبل
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* آخرین سفارشات */}
        <Card>
          <CardHeader>
            <CardTitle>آخرین سفارشات</CardTitle>
            <CardDescription>سفارشات اخیر دریافت شده</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>شماره سفارش</TableHead>
                  <TableHead>مشتری</TableHead>
                  <TableHead>مبلغ</TableHead>
                  <TableHead>وضعیت</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#۱۰۰۱</TableCell>
                  <TableCell>علی احمدی</TableCell>
                  <TableCell>۲,۵۰۰,۰۰۰ تومان</TableCell>
                  <TableCell>
                    <Badge variant="secondary">در انتظار پرداخت</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#۱۰۰۲</TableCell>
                  <TableCell>فاطمه محمدی</TableCell>
                  <TableCell>۱,۲۰۰,۰۰۰ تومان</TableCell>
                  <TableCell>
                    <Badge>پرداخت شده</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#۱۰۰۳</TableCell>
                  <TableCell>حسن رضایی</TableCell>
                  <TableCell>۳,۸۰۰,۰۰۰ تومان</TableCell>
                  <TableCell>
                    <Badge variant="outline">ارسال شده</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-transparent">
                مشاهده همه سفارشات
                <ArrowUpRight className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* محصولات پرفروش */}
        <Card>
          <CardHeader>
            <CardTitle>محصولات پرفروش</CardTitle>
            <CardDescription>محصولاتی که بیشترین فروش را داشته‌اند</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <div>
                    <p className="font-medium">گوشی سامسونگ Galaxy S23</p>
                    <p className="text-sm text-gray-500">۱۲۳ فروش</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-medium">۲۵,۰۰۰,۰۰۰ تومان</p>
                  <p className="text-sm text-green-600">+۱۲%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <div>
                    <p className="font-medium">لپ‌تاپ ایسوس VivoBook</p>
                    <p className="text-sm text-gray-500">۹۸ فروش</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-medium">۱۸,۵۰۰,۰۰۰ تومان</p>
                  <p className="text-sm text-green-600">+۸%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <div>
                    <p className="font-medium">هدفون بی‌سیم AirPods</p>
                    <p className="text-sm text-gray-500">۸۷ فروش</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-medium">۳,۲۰۰,۰۰۰ تومان</p>
                  <p className="text-sm text-red-600">-۳%</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full bg-transparent">
                مشاهده گزارش کامل
                <Eye className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* آمار سریع */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">سفارشات امروز</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">۴۲</div>
            <p className="text-sm text-gray-500">+۱۶% نسبت به دیروز</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">درآمد امروز</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">۸,۲۳۰,۰۰۰</div>
            <p className="text-sm text-gray-500">تومان</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">کاربران آنلاین</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">۱۲۸</div>
            <p className="text-sm text-gray-500">در حال حاضر</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
