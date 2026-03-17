'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_BASE, getToken } from '@/utils/adminApi'

export default function AdminDashboardPage() {
  const [blogCount, setBlogCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push('/admin/login')
      return
    }

    const loadStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/blogs`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json'
          },
        })
        if (res.status === 401) {
          router.push('/admin/login')
          return
        }
        const data = await res.json()
        if (Array.isArray(data)) setBlogCount(data.length)
      } catch (err) {
        console.error('Stats error', err)
      }
    }
    loadStats()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.replace('/')
  }

  return (
    <main className='min-h-screen bg-darkmode text-white p-12'>
      <div className='max-w-[960px] mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-32 font-bold'>Dashboard</h1>
          <div className='flex gap-4'>
            <a
              href='/admin/blogs/'
              className='bg-primary text-white font-bold px-6 py-2 rounded-xl hover:brightness-105 transition-all'>
              Manage Blogs
            </a>
            <a
              href='/admin/blogs/create/'
              className='border border-primary text-primary font-bold px-6 py-2 rounded-xl hover:bg-primary/10 transition-all'>
              Create Blog
            </a>
            <button
              onClick={handleLogout}
              className='border border-error text-error px-6 py-2 rounded-xl hover:bg-error/10 transition-all'>
              Logout
            </button>
          </div>
        </div>

        <div className='bg-darklight p-6 rounded-2xl border border-dark_border/20 mb-8'>
          <p className='text-18'>Welcome, Admin</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-darklight border border-dark_border/20 rounded-2xl p-6'>
            <p className='text-muted/60 text-12 uppercase tracking-widest mb-2'>Total Blogs</p>
            <p className='text-40 font-bold'>{blogCount}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
