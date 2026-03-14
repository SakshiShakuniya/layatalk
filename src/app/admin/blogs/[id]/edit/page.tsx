'use client'
import BlogForm from '@/components/Admin/BlogForm'
import { useParams } from 'next/navigation'

export default function EditBlogPage() {
  const params = useParams()
  const idParam = params?.id
  const id = typeof idParam === 'string' ? parseInt(idParam, 10) : Array.isArray(idParam) ? parseInt(idParam[0], 10) : NaN
  return (
    <main className='min-h-screen bg-darkmode text-white p-6'>
      <div className='max-w-[960px] mx-auto'>
        <h1 className='text-36 font-bold mb-4'>Edit Blog</h1>
        <div className='rounded-xl border border-[#3b0b4f] p-4'>
          {!isNaN(id) ? <BlogForm id={id} /> : <div>Invalid blog id</div>}
        </div>
      </div>
    </main>
  )
}
