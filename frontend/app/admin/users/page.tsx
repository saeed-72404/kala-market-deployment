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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MoreHorizontal, Edit, Trash2, Eye, UserPlus, Shield, Ban } from "lucide-react"

const users = [
  {
    id: 1,
    name: "علی احمدی",
    email: "ali@example.com",
    phone: "09123456789",
    role: "customer",
    status: "active",
    joinDate: "1402/01/15",
    orders: 12,
    totalSpent: "15,500,000",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "فاطمه محمدی",
    email: "fateme@example.com",
    phone: "09123456788",
    role: "customer",
    status: "active",
    joinDate: "1402/02/20",
    orders: 8,
    totalSpent: "8,200,000",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "حسن رضایی",
    email: "hassan@example.com",
    phone: "09123456787",
    role: "admin",
    status: "active",
    joinDate: "1401/12/10",
    orders: 0,
    totalSpent: "0",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "مریم کریمی",
    email: "maryam@example.com",
    phone: "09123456786",
    role: "customer",
    status: "blocked",
    joinDate: "1402/03/05",
    orders: 3,
    totalSpent: "2,100,000",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="destructive">مدیر</Badge>
      case "customer":
        return <Badge variant="secondary">مشتری</Badge>
      default:
        return <Badge>کاربر</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge>فعال</Badge>
      case "blocked":
        return <Badge variant="destructive">مسدود</Badge>
      case "pending":
        return <Badge variant="secondary">در انتظار</Badge>
      default:
        return <Badge variant="outline">نامشخص</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مدیریت کاربران</h1>
          <p className="text-gray-600">مدیریت کاربران و دسترسی‌های سیستم</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          افزودن کاربر جدید
        </Button>
      </div>

      {/* آمار سریع */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">کل کاربران</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۱,۲۳۴</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">کاربران فعال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">۱,۱۸۹</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">کاربران مسدود</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">۲۳</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">مدیران</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">۵</div>
          </CardContent>
        </Card>
      </div>

      {/* فیلتر و جستجو */}
      <Card>
        <CardHeader>
          <CardTitle>فیلتر کاربران</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="جستجو در کاربران..."
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

      {/* جدول کاربران */}
      <Card>
        <CardHeader>
          <CardTitle>لیست کاربران</CardTitle>
          <CardDescription>مدیریت و ویرایش اطلاعات کاربران</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>کاربر</TableHead>
                <TableHead>ایمیل</TableHead>
                <TableHead>تلفن</TableHead>
                <TableHead>نقش</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>تاریخ عضویت</TableHead>
                <TableHead>سفارشات</TableHead>
                <TableHead>کل خرید</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.orders}</TableCell>
                  <TableCell>{user.totalSpent} تومان</TableCell>
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
                          مشاهده پروفایل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          ویرایش
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          تغییر نقش
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Ban className="mr-2 h-4 w-4" />
                          مسدود کردن
                        </DropdownMenuItem>
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
