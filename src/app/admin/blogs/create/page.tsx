'use client'
import BlogForm from '@/components/Admin/BlogForm'

export default function CreateBlogPage() {
  return (
    <main className='min-h-screen bg-darkmode text-white p-6'>
      <div className='max-w-[960px] mx-auto'>
        <h1 className='text-36 font-bold mb-4'>Create Blog</h1>
        <div className='rounded-xl border border-[#3b0b4f] p-4'>
          <BlogForm />
        </div>
      </div>
    </main>
  )
}
