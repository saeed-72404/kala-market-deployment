export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="loading-spinner mx-auto"></div>
        <p className="text-gray-600">در حال بارگذاری...</p>
      </div>
    </div>
  )
}
