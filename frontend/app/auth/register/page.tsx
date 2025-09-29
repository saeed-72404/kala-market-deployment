"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.firstName) {
      newErrors.firstName = "نام الزامی است"
    }

    if (!formData.lastName) {
      newErrors.lastName = "نام خانوادگی الزامی است"
    }

    if (!formData.email) {
      newErrors.email = "آدرس ایمیل الزامی است"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "آدرس ایمیل معتبر نیست"
    }

    if (!formData.phone) {
      newErrors.phone = "شماره موبایل الزامی است"
    } else if (!/^09[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست"
    }

    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است"
    } else if (formData.password.length < 8) {
      newErrors.password = "رمز عبور باید حداقل 8 کاراکتر باشد"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تکرار رمز عبور الزامی است"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن مطابقت ندارند"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "پذیرش شرایط و قوانین الزامی است"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Handle successful registration
      console.log("Registration successful:", formData)
      // Redirect to verification page or login
      window.location.href = "/auth/verify-email"
    } catch (error) {
      setErrors({ general: "خطا در ثبت نام. لطفاً دوباره تلاش کنید." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-blue-600 mb-2 block">
            کالا مارکت
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">ایجاد حساب کاربری</h2>
          <p className="mt-2 text-sm text-gray-600">
            قبلاً ثبت نام کرده‌اید؟{" "}
            <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              وارد شوید
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ثبت نام</CardTitle>
            <CardDescription>اطلاعات زیر را برای ایجاد حساب کاربری وارد کنید</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600 text-center">{errors.general}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">نام</Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.firstName ? "border-red-300" : ""}`}
                      placeholder="نام"
                      dir="rtl"
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">نام خانوادگی</Label>
                  <div className="relative">
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.lastName ? "border-red-300" : ""}`}
                      placeholder="نام خانوادگی"
                      dir="rtl"
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">آدرس ایمیل</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.email ? "border-red-300" : ""}`}
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">شماره موبایل</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.phone ? "border-red-300" : ""}`}
                    placeholder="09123456789"
                    dir="ltr"
                  />
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.password ? "border-red-300" : ""}`}
                    placeholder="رمز عبور خود را وارد کنید"
                    dir="rtl"
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-300" : ""}`}
                    placeholder="رمز عبور را دوباره وارد کنید"
                    dir="rtl"
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="agree-terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                    }
                  />
                  <Label htmlFor="agree-terms" className="text-sm">
                    با{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                      شرایط و قوانین
                    </Link>{" "}
                    و{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                      حریم خصوصی
                    </Link>{" "}
                    موافقم
                  </Label>
                </div>
                {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="subscribe-newsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, subscribeNewsletter: checked as boolean }))
                    }
                  />
                  <Label htmlFor="subscribe-newsletter" className="text-sm">
                    عضویت در خبرنامه برای دریافت آخرین اخبار و تخفیف‌ها
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">یا</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="w-full bg-transparent">
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full bg-transparent">
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Facebook
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
