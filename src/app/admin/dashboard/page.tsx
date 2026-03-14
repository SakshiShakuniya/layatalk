'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE } from '@/utils/adminApi'
import type { ApiBlog } from '@/utils/blogApi'
import { Icon } from '@iconify/react'

export default function AdminDashboard() {
  const router = useRouter()
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/admin/login')
      return
    }
    ;(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/blogs`, {
          headers: { Authorization: 'Bearer ' + token },
        })
        if (res.status === 401) {
          router.replace('/admin/login')
          return
        }
        const data = (await res.json()) as ApiBlog[]
        setCount(Array.isArray(data) ? data.length : 0)
      } catch {}
    })()
  }, [router])

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  return (
    <main className='min-h-screen bg-darkmode text-white p-6'>
      <div className='max-w-[960px] mx-auto'>
        <h1 className='text-36 font-bold mb-4'>Dashboard</h1>
        <div className='flex gap-3 mb-4 items-center'>
          <a
            href='/admin/blogs'
            title='Manage Blogs'
            className='inline-flex items-center justify-center h-11 w-11 rounded-xl border border-[#3b82f6] bg-[#3b82f6] text-darkmode hover:brightness-105'
            aria-label='Manage Blogs'
          >
            <Icon icon='ion:newspaper-outline' width='22' height='22' />
          </a>
          <button
            onClick={logout}
            title='Logout'
            className='inline-flex items-center justify-center h-11 w-11 rounded-xl border border-[#3b82f6] bg-[#3b82f6] text-darkmode hover:brightness-105'
            aria-label='Logout'
          >
            <Icon icon='ion:log-out-outline' width='22' height='22' />
          </button>
        </div>
        <div className='rounded-xl border border-[#123057] bg-[#0b1b3a] p-4 mb-3'>
          Welcome, Admin
        </div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4 rounded-xl border border-[#123057] bg-[#0a1531] p-4'>
            <div className='text-[#93c5fd] text-12 uppercase tracking-wide'>Blogs</div>
            <div className='text-32 font-bold mt-1'>{count}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
