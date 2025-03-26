import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  weight: ["400", "500", "600", "700"],
  preload: true,
  variable: "--font-inter",
})
