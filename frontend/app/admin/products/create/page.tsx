"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateProductPage() {
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">افزودن محصول جدید</h1>
          <p className="text-gray-600">اطلاعات محصول جدید را وارد کنید</p>
        </div>
        <Link href="/admin/products">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            بازگشت
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* اطلاعات اصلی */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات اصلی محصول</CardTitle>
              <CardDescription>نام، توضیحات و مشخصات اصلی محصول را وارد کنید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">نام محصول</Label>
                <Input id="name" placeholder="نام محصول را وارد کنید" />
              </div>

              <div>
                <Label htmlFor="description">توضیحات کوتاه</Label>
                <Textarea id="description" placeholder="توضیحات کوتاه محصول" rows={3} />
              </div>

              <div>
                <Label htmlFor="fullDescription">توضیحات کامل</Label>
                <Textarea id="fullDescription" placeholder="توضیحات کامل و جزئیات محصول" rows={6} />
              </div>
            </CardContent>
          </Card>

          {/* تصاویر محصول */}
          <Card>
            <CardHeader>
              <CardTitle>تصاویر محصول</CardTitle>
              <CardDescription>تصاویر محصول را آپلود کنید (حداکثر ۱۰ تصویر)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="images" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">کلیک کنید یا فایل‌ها را بکشید</span>
                      <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* مشخصات فنی */}
          <Card>
            <CardHeader>
              <CardTitle>مشخصات فنی</CardTitle>
              <CardDescription>ویژگی‌ها و مشخصات فنی محصول</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">برند</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب برند" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="samsung">سامسونگ</SelectItem>
                      <SelectItem value="apple">اپل</SelectItem>
                      <SelectItem value="xiaomi">شیائومی</SelectItem>
                      <SelectItem value="huawei">هوآوی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="model">مدل</Label>
                  <Input id="model" placeholder="مدل محصول" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">وزن (گرم)</Label>
                  <Input id="weight" type="number" placeholder="وزن محصول" />
                </div>

                <div>
                  <Label htmlFor="dimensions">ابعاد</Label>
                  <Input id="dimensions" placeholder="طول × عرض × ارتفاع" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* تنظیمات جانبی */}
        <div className="space-y-6">
          {/* قیمت و موجودی */}
          <Card>
            <CardHeader>
              <CardTitle>قیمت و موجودی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="price">قیمت (تومان)</Label>
                <Input id="price" type="number" placeholder="قیمت محصول" />
              </div>

              <div>
                <Label htmlFor="comparePrice">قیمت مقایسه (تومان)</Label>
                <Input id="comparePrice" type="number" placeholder="قیمت قبل از تخفیف" />
              </div>

              <div>
                <Label htmlFor="stock">موجودی</Label>
                <Input id="stock" type="number" placeholder="تعداد موجودی" />
              </div>

              <div>
                <Label htmlFor="sku">کد محصول (SKU)</Label>
                <Input id="sku" placeholder="کد یکتای محصول" />
              </div>
            </CardContent>
          </Card>

          {/* دسته‌بندی */}
          <Card>
            <CardHeader>
              <CardTitle>دسته‌بندی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">دسته اصلی</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب دسته" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">موبایل</SelectItem>
                    <SelectItem value="laptop">لپ‌تاپ</SelectItem>
                    <SelectItem value="tablet">تبلت</SelectItem>
                    <SelectItem value="audio">صوتی</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subcategory">زیر دسته</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب زیر دسته" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphone">گوشی هوشمند</SelectItem>
                    <SelectItem value="gaming">گیمینگ</SelectItem>
                    <SelectItem value="business">اداری</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* برچسب‌ها */}
          <Card>
            <CardHeader>
              <CardTitle>برچسب‌ها</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="برچسب جدید"
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} variant="outline">
                  افزودن
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* تنظیمات */}
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="active" />
                <Label htmlFor="active">محصول فعال باشد</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <Label htmlFor="featured">محصول ویژه</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="trackQuantity" />
                <Label htmlFor="trackQuantity">پیگیری موجودی</Label>
              </div>
            </CardContent>
          </Card>

          {/* دکمه‌های عملیات */}
          <div className="space-y-2">
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              ذخیره محصول
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              ذخیره به عنوان پیش‌نویس
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
