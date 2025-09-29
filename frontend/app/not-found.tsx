import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-300">۴۰۴</h1>
        <h2 className="text-2xl font-bold text-gray-900">صفحه یافت نشد</h2>
        <p className="text-gray-600">صفحه‌ای که دنبال آن می‌گردید وجود ندارد.</p>
        <Link href="/">
          <Button>بازگشت به صفحه اصلی</Button>
        </Link>
      </div>
    </div>
  )
}
