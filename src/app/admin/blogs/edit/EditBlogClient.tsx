'use client'
import BlogForm from '@/components/Admin/BlogForm'

export default function EditBlogClient({ id }: { id: number }) {
  if (isNaN(id)) {
    return (
      <main className='min-h-screen bg-[#0a192f] text-white p-6' data-v='v2-blue'>
        <div className='max-w-[960px] mx-auto'>
          <h1 className='text-36 font-bold mb-8'>Edit Blog</h1>
          <div className='rounded-xl border border-[#1e293b] bg-[#112240] p-6'>
            <div>Invalid blog id</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-[#0a192f] text-white p-6' data-v='v3-blue-confirmed'>
      <div className='max-w-[960px] mx-auto'>
        <h1 className='text-36 font-bold mb-8 text-[#3b82f6]'>Edit Blog</h1>
        <div className='rounded-xl border border-[#1e293b] bg-[#112240] p-6 shadow-2xl'>
          <BlogForm id={id} />
        </div>
      </div>
    </main>
  )
}
