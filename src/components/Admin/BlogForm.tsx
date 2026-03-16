'use client'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { API_BASE } from '@/utils/adminApi'
import { useRouter } from 'next/navigation'

type BlogItem = {
  id?: number
  title?: string
  description?: string
  content?: string
  status?: 'published' | 'draft'
  featured_image?: string
}

export default function BlogForm({ id }: { id?: number }) {
  const router = useRouter()
  const isEdit = useMemo(() => typeof id === 'number', [id])
  const [form, setForm] = useState<BlogItem>({
    title: '',
    description: '',
    content: '',
    status: 'draft',
  })
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const previewSrc = useMemo(() => {
    if (file) {
      try {
        return URL.createObjectURL(file)
      } catch {
        // ignore
      }
    }
    const src = form.featured_image || ''
    if (!src) return ''
    if (src.startsWith('/')) return `${API_BASE}${src}`
    if (!/^https?:\/\//i.test(src) && !/^data:/i.test(src)) {
      return `${API_BASE}/${src.replace(/^\.?\/*/, '')}`
    }
    return src
  }, [file, form.featured_image])

  useEffect(() => {
    if (!isEdit) return
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/admin/login')
      return
    }
    ;(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/blogs`, {
          headers: { 
            Authorization: 'Bearer ' + token,
            'Accept': 'application/json'
          },
          cache: 'no-store',
        })
        if (res.status === 401) {
          router.replace('/admin/login')
          return
        }
        const data = (await res.json()) as BlogItem[]
        const current = data.find((b) => b.id === id)
        if (current) {
          setForm({
            title: current.title || '',
            description: current.description || '',
            content: current.content || '',
            status: (current.status as 'published' | 'draft') || 'draft',
            featured_image: current.featured_image,
          })
        }
      } catch {}
    })()
  }, [id, isEdit, router])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.replace('/admin/login')
        return
      }
      const fd = new FormData()
      if (!isEdit || form.title) fd.append('title', form.title || '')
      fd.append('description', form.description || '')
      fd.append('content', form.content || '')
      fd.append('status', form.status || 'draft')
      if (file) fd.append('featured_image', file)
      if (isEdit) fd.append('_method', 'PUT')

      const url = isEdit ? `${API_BASE}/api/admin/blog/${id}` : `${API_BASE}/api/admin/blog`
      const method = 'POST'
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: 'Bearer ' + token,
          'Accept': 'application/json'
        },
        body: fd,
      })
      if (!res.ok) {
        const payload: any = await res.json().catch(() => ({}))
        console.error('Save blog error response:', payload)
        let msg = payload.message || payload.error || `Failed to ${isEdit ? 'update' : 'create'} blog`
        if (payload.errors) {
          const first = Object.values(payload.errors)[0]
          if (Array.isArray(first)) msg = first[0]
        }
        setError(msg)
        setSaving(false)
        return
      }
      router.push('/admin/blogs')
    } catch (err: any) {
      console.error('Save blog exception:', err)
      setError(err.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      {error && <div className='text-red-400 text-14'>{error}</div>}
      <div>
        <input
          value={form.title || ''}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          type='text'
          placeholder='Title'
          className='w-full rounded-xl border border-[#123057] bg-[#081127] text-white px-3 py-3 outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-[#3b82f6]/15'
          required={!isEdit}
        />
      </div>
      <div>
        <input
          value={form.description || ''}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          type='text'
          placeholder='Short description'
          className='w-full rounded-xl border border-[#123057] bg-[#081127] text-white px-3 py-3 outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-[#3b82f6]/15'
        />
      </div>
      <div>
        <textarea
          value={form.content || ''}
          onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          placeholder='Content (supports HTML)'
          rows={10}
          className='w-full rounded-xl border border-[#123057] bg-[#081127] text-white px-3 py-3 outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-[#3b82f6]/15'
          required={!isEdit}
        />
      </div>
      <div>
        <select
          value={form.status || 'draft'}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as 'published' | 'draft' }))}
          className='w-full rounded-xl border border-[#123057] bg-[#081127] text-white px-3 py-3 outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-[#3b82f6]/15'
        >
          <option value='draft'>draft</option>
          <option value='published'>published</option>
        </select>
      </div>
      <div>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className='w-full rounded-xl border border-[#123057] bg-[#081127] text-white px-3 py-3 outline-none'
        />
        {previewSrc ? (
          <div className='mt-2'>
            <Image
              src={previewSrc}
              alt='current'
              width={320}
              height={180}
              className='rounded-lg border border-[#123057] h-auto'
            />
          </div>
        ) : null}
      </div>
      <div className='flex gap-3'>
        <button
          type='submit'
          disabled={saving}
          className='inline-flex items-center justify-center min-w-[140px] px-4 py-3 rounded-xl border border-[#3b82f6] bg-[#3b82f6] text-darkmode'
        >
          {saving ? 'Saving...' : isEdit ? 'Update Blog' : 'Create Blog'}
        </button>
        <button
          type='button'
          onClick={() => router.push('/admin/blogs')}
          className='inline-flex items-center justify-center min-w-[140px] px-4 py-3 rounded-xl border border-[#123057] bg-transparent text-white'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
