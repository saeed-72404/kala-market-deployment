import type React from "react"
import type { Metadata } from "next"
// import { Vazirmatn as Vazir } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// const vazir = Vazir({
//   subsets: ["arabic"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-vazir",
// })


const iranSans = localFont({
  src: [
    {
      path: "./fonts/IRANSans/woff2/IRANSansWeb_UltraLight.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/IRANSans/woff2/IRANSansWeb_Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/IRANSans/woff2/IRANSansWeb.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IRANSans/woff2/IRANSansWeb_Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IRANSans/woff2/IRANSansWeb_Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "کالا مارکت - فروشگاه آنلاین",
  description: "بهترین محصولات با کیفیت و قیمت مناسب",
  keywords: "فروشگاه آنلاین، خرید اینترنتی، کالا مارکت",
  authors: [{ name: "Kala Market Team" }],
  creator: "Kala Market",
  publisher: "Kala Market",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kalamarket.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "کالا مارکت - فروشگاه آنلاین",
    description: "بهترین محصولات با کیفیت و قیمت مناسب",
    url: "https://kalamarket.com",
    siteName: "کالا مارکت",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "کالا مارکت",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "کالا مارکت - فروشگاه آنلاین",
    description: "بهترین محصولات با کیفیت و قیمت مناسب",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={iranSans.variable}>
      <body className={`iransans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
