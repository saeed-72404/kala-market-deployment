"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-600">خطایی رخ داده است!</h2>
        <p className="text-gray-600">متأسفانه مشکلی در بارگذاری صفحه پیش آمده است.</p>
        <Button onClick={reset}>تلاش مجدد</Button>
      </div>
    </div>
  )
}
