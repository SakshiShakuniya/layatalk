'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE } from '@/utils/adminApi'
import { Icon } from '@iconify/react'

type Blog = {
  id: number
  title: string
  status: string
  created_at: string
}

export default function AdminBlogs() {
  const router = useRouter()
  const [items, setItems] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/admin/login')
      return
    }
    try {
      const res = await fetch(`${API_BASE}/api/admin/blogs`, {
        headers: { Authorization: 'Bearer ' + token },
        cache: 'no-store',
      })
      if (res.status === 401) {
        router.replace('/admin/login')
        return
      }
      const data = (await res.json()) as Blog[]
      setItems(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const del = async (id: number) => {
    const token = localStorage.getItem('token')
    if (!token) return router.replace('/admin/login')
    await fetch(`${API_BASE}/api/admin/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    })
    load()
  }

  return (
    <main className='min-h-screen bg-darkmode text-white p-6'>
      <div className='max-w-[960px] mx-auto'>
        <h1 className='text-36 font-bold mb-4'>Blogs</h1>
        <div className='mb-3 flex gap-3'>
          <a
            href='/admin/dashboard'
            title='Back to Dashboard'
            className='inline-flex items-center justify-center h-11 w-11 rounded-xl border border-[#3b82f6] bg-[#3b82f6] text-darkmode hover:brightness-105'
            aria-label='Back to Dashboard'
          >
            <Icon icon='ion:arrow-back-outline' width='22' height='22' />
          </a>
          <a
            href='/admin/blogs/create'
            title='Create Blog'
            className='inline-flex items-center justify-center h-11 w-11 rounded-xl border border-[#3b82f6] bg-[#3b82f6] text-darkmode hover:brightness-105'
            aria-label='Create Blog'
          >
            <Icon icon='ion:add' width='22' height='22' />
          </a>
        </div>
        <div className='overflow-x-auto rounded-xl border border-[#123057]'>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b border-[#123057]'>
                <th className='p-3'>Title</th>
                <th className='p-3'>Status</th>
                <th className='p-3'>Created</th>
                <th className='p-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && items.length === 0 && (
                <tr>
                  <td className='p-4 text-[#93c5fd]' colSpan={4}>
                    No blogs found
                  </td>
                </tr>
              )}
              {items.map((b) => (
                <tr key={b.id} className='border-b border-[#123057]'>
                  <td className='p-3'>{b.title}</td>
                  <td className='p-3 capitalize'>{b.status}</td>
                  <td className='p-3'>
                    {new Date(b.created_at).toLocaleDateString()}
                  </td>
                  <td className='p-3'>
                    <a
                      href={`/admin/blogs/${b.id}/edit`}
                      title='Edit'
                      aria-label={`Edit ${b.title}`}
                      className='inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[#123057] text-white mr-2 hover:brightness-110'
                    >
                      <Icon icon='ion:pencil' width='18' height='18' />
                    </a>
                    <button
                      onClick={() => del(b.id)}
                      title='Delete'
                      aria-label={`Delete ${b.title}`}
                      className='inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[#3b82f6] bg-[#3b82f6] text-darkmode mr-2 hover:brightness-110'>
                      <Icon icon='ion:trash' width='18' height='18' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
