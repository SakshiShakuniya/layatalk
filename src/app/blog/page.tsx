import BlogCard from '@/components/SharedComponent/Blog/blogCard'
import { fetchBlogs } from '@/utils/blogApi'
import type { Blog } from '@/types/blog'

export const revalidate = 0

async function getData(): Promise<Blog[]> {
  const items = await fetchBlogs()
  return items.map((b) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    coverImage: b.featured_image || '',
    date: (b.created_at || '').replace(' ', 'T'),
  }))
}

export default async function BlogIndex() {
  const blogs = await getData()
  return (
    <main>
      <section className='pt-40 pb-28'>
        <div className='container px-6'>
          <h1 className='text-white text-36 font-bold mb-10'>Blogs</h1>
          <div className='grid grid-cols-12 gap-10'>
            {blogs.map((blog) => (
              <div key={blog.id} className='w-full md:col-span-4 col-span-6 flex'>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
