"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, MoreHorizontal, Edit, Eye, Truck, X, Check } from "lucide-react"

const orders = [
  {
    id: "#1001",
    customer: "علی احمدی",
    email: "ali@example.com",
    date: "1402/08/15",
    status: "pending",
    total: "2,500,000",
    items: 3,
    paymentStatus: "paid",
  },
  {
    id: "#1002",
    customer: "فاطمه محمدی",
    email: "fateme@example.com",
    date: "1402/08/14",
    status: "processing",
    total: "1,200,000",
    items: 2,
    paymentStatus: "paid",
  },
  {
    id: "#1003",
    customer: "حسن رضایی",
    email: "hassan@example.com",
    date: "1402/08/13",
    status: "shipped",
    total: "3,800,000",
    items: 5,
    paymentStatus: "paid",
  },
  {
    id: "#1004",
    customer: "مریم کریمی",
    email: "maryam@example.com",
    date: "1402/08/12",
    status: "delivered",
    total: "950,000",
    items: 1,
    paymentStatus: "paid",
  },
  {
    id: "#1005",
    customer: "محمد حسینی",
    email: "mohammad@example.com",
    date: "1402/08/11",
    status: "cancelled",
    total: "1,750,000",
    items: 2,
    paymentStatus: "refunded",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">در انتظار</Badge>
      case "processing":
        return <Badge className="bg-blue-500">در حال پردازش</Badge>
      case "shipped":
        return <Badge className="bg-purple-500">ارسال شده</Badge>
      case "delivered":
        return <Badge>تحویل داده شده</Badge>
      case "cancelled":
        return <Badge variant="destructive">لغو شده</Badge>
      default:
        return <Badge variant="outline">نامشخص</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge>پرداخت شده</Badge>
      case "pending":
        return <Badge variant="secondary">در انتظار پرداخت</Badge>
      case "failed":
        return <Badge variant="destructive">ناموفق</Badge>
      case "refunded":
        return <Badge variant="outline">بازپرداخت شده</Badge>
      default:
        return <Badge variant="outline">نامشخص</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مدیریت سفارشات</h1>
          <p className="text-gray-600">مدیریت و پیگیری سفارشات مشتریان</p>
        </div>
      </div>

      {/* آمار سریع */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">کل سفارشات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۲,۳۵۰</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">در انتظار</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">۱۲۳</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">در حال پردازش</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">۸۹</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ارسال شده</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">۲۰۵</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">تحویل شده</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">۱,۹۳۳</div>
          </CardContent>
        </Card>
      </div>

      {/* فیلتر و جستجو */}
      <Card>
        <CardHeader>
          <CardTitle>فیلتر سفارشات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="جستجو در سفارشات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              فیلتر
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* جدول سفارشات */}
      <Card>
        <CardHeader>
          <CardTitle>لیست سفارشات</CardTitle>
          <CardDescription>مدیریت و پیگیری وضعیت سفارشات</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>شماره سفارش</TableHead>
                <TableHead>مشتری</TableHead>
                <TableHead>تاریخ</TableHead>
                <TableHead>وضعیت سفارش</TableHead>
                <TableHead>وضعیت پرداخت</TableHead>
                <TableHead>تعداد اقلام</TableHead>
                <TableHead>مبلغ کل</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                  <TableCell>{order.items} قلم</TableCell>
                  <TableCell>{order.total} تومان</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          مشاهده جزئیات
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          تایید سفارش
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          ارسال سفارش
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <X className="mr-2 h-4 w-4" />
                          لغو سفارش
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
