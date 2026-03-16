'use client'
import BlogForm from '@/components/Admin/BlogForm'

export default function EditBlogClient({ id }: { id: number }) {
  if (isNaN(id)) {
    return (
      <main className='min-h-screen bg-darkmode text-white p-6'>
        <div className='max-w-[960px] mx-auto'>
          <h1 className='text-36 font-bold mb-4'>Edit Blog</h1>
          <div className='rounded-xl border border-dark_border/20 p-4'>
            <div>Invalid blog id</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-darkmode text-white p-6'>
      <div className='max-w-[960px] mx-auto'>
        <h1 className='text-36 font-bold mb-4'>Edit Blog</h1>
        <div className='rounded-xl border border-dark_border/20 p-4'>
          <BlogForm id={id} />
        </div>
      </div>
    </main>
  )
}
