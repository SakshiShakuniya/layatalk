'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { API_BASE, getToken } from '@/utils/adminApi'
import { format } from 'date-fns'

type Blog = {
  id: number
  title: string
  status: 'published' | 'draft'
  created_at: string
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const loadBlogs = async () => {
    const token = getToken()
    if (!token) {
      router.push('/admin/login')
      return
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/blogs`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json'
        },
        cache: 'no-store',
      })
      if (res.status === 401) {
        window.location.href = '/admin/login/'
        return
      }
      const data = await res.json()
      if (Array.isArray(data)) setBlogs(data)
    } catch (err) {
      console.error('Load blogs error', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogs()
  }, [router])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    const token = getToken()
    try {
      const res = await fetch(`${API_BASE}/api/admin/blog/${id}`, {
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Accept': 'application/json'
        },
      })
      if (res.ok) {
        setBlogs(blogs.filter((b) => b.id !== id))
      }
    } catch (err) {
      console.error('Delete error', err)
    }
  }

  return (
    <main className='min-h-screen bg-darkmode text-white p-12'>
      <div className='max-w-[1000px] mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center gap-4'>
            <a href='/admin/dashboard' className='text-primary hover:underline'>
              ← Dashboard
            </a>
            <h1 className='text-32 font-bold'>Manage Blogs</h1>
          </div>
          <a
            href='/admin/blogs/create/'
            className='bg-primary text-white font-bold px-6 py-2 rounded-xl hover:brightness-105 transition-all'>
            Create New Blog
          </a>
        </div>

        {loading ? (
          <p className='text-muted/60'>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <div className='bg-darklight p-12 rounded-2xl border border-dark_border/20 text-center'>
            <p className='text-muted/60 mb-4'>No blogs found in the database.</p>
            <a href='/admin/blogs/create/' className='text-primary font-medium hover:underline'>
              Create your first blog
            </a>
          </div>
        ) : (
          <div className='bg-darklight rounded-2xl border border-dark_border/20 overflow-hidden'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='border-b border-dark_border/10 bg-darkmode/50'>
                  <th className='p-4 text-14 uppercase tracking-wider text-muted/60 font-medium'>Title</th>
                  <th className='p-4 text-14 uppercase tracking-wider text-muted/60 font-medium'>Status</th>
                  <th className='p-4 text-14 uppercase tracking-wider text-muted/60 font-medium'>Created</th>
                  <th className='p-4 text-14 uppercase tracking-wider text-muted/60 font-medium'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className='border-b border-dark_border/10 hover:bg-white/5 transition-colors'>
                    <td className='p-4 font-medium'>{blog.title}</td>
                    <td className='p-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-12 font-bold uppercase ${
                          blog.status === 'published'
                            ? 'bg-success/20 text-success'
                            : 'bg-warning/20 text-warning'
                        }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className='p-4 text-muted/80'>
                      {blog.created_at ? format(new Date(blog.created_at), 'MMM dd, yyyy') : '-'}
                    </td>
                    <td className='p-4'>
                      <div className='flex gap-3'>
                        <a
                          href={`/admin/blogs/edit/?id=${blog.id}`}
                          className='text-primary hover:underline font-medium'>
                          Edit
                        </a>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className='text-error hover:underline font-medium'>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
