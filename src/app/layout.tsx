import { DM_Sans } from 'next/font/google'
import './globals.css'
import AdminAwareHeader from '@/components/Layout/AdminAwareHeader'
import AdminAwareFooter from '@/components/Layout/AdminAwareFooter'
import { ThemeProvider } from 'next-themes'
import ScrollToTop from '@/components/ScrollToTop'
import Aoscompo from '@/utils/aos'
import type { Metadata } from 'next'
const font = DM_Sans({ subsets: ['latin'] })
const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

export const metadata: Metadata = {
  title: 'Laya Talk',
  icons: {
    icon: '/images/logo/layatalklogo.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel='preconnect' href={apiBase} crossOrigin='anonymous' />
      </head>
      <body className={`${font.className}`}>
        <ThemeProvider
          attribute='class'
          enableSystem={true}
          defaultTheme='system'>
          <Aoscompo>
            <AdminAwareHeader />
            {children}
            <AdminAwareFooter />
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
