"use client"

import { useState } from "react"
import Link from "next/link"
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
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

const products = [
  {
    id: 1,
    name: "گوشی سامسونگ Galaxy S23",
    category: "موبایل",
    price: "25,000,000",
    stock: 15,
    status: "active",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "لپ‌تاپ ایسوس VivoBook",
    category: "لپ‌تاپ",
    price: "18,500,000",
    stock: 8,
    status: "active",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "هدفون بی‌سیم AirPods",
    category: "صوتی",
    price: "3,200,000",
    stock: 0,
    status: "out_of_stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    name: "ساعت هوشمند Apple Watch",
    category: "پوشیدنی",
    price: "12,800,000",
    stock: 25,
    status: "active",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 5,
    name: "تبلت iPad Air",
    category: "تبلت",
    price: "22,000,000",
    stock: 3,
    status: "low_stock",
    image: "/placeholder.svg?height=50&width=50",
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">ناموجود</Badge>
    }
    if (stock < 5) {
      return <Badge variant="secondary">موجودی کم</Badge>
    }
    return <Badge>موجود</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مدیریت محصولات</h1>
          <p className="text-gray-600">مدیریت و ویرایش محصولات فروشگاه</p>
        </div>
        <Link href="/admin/products/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            افزودن محصول جدید
          </Button>
        </Link>
      </div>

      {/* آمار سریع */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">کل محصولات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۵۷۳</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">محصولات فعال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">۵۲۸</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ناموجود</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">۲۳</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">موجودی کم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">۲۲</div>
          </CardContent>
        </Card>
      </div>

      {/* فیلتر و جستجو */}
      <Card>
        <CardHeader>
          <CardTitle>فیلتر محصولات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="جستجو در محصولات..."
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

      {/* جدول محصولات */}
      <Card>
        <CardHeader>
          <CardTitle>لیست محصولات</CardTitle>
          <CardDescription>مدیریت و ویرایش اطلاعات محصولات</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>تصویر</TableHead>
                <TableHead>نام محصول</TableHead>
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>قیمت</TableHead>
                <TableHead>موجودی</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price} تومان</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{getStatusBadge(product.status, product.stock)}</TableCell>
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
                          مشاهده
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          حذف
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
