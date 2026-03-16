 'use client'
 import { usePathname } from 'next/navigation'
 import Header from '@/components/Layout/Header'
 
 export default function AdminAwareHeader() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <Header />
}
