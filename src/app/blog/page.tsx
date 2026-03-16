'use client'
import { useEffect, useState } from 'react'
import BlogCard from '@/components/SharedComponent/Blog/blogCard'
import { fetchBlogs, ApiBlog } from '@/utils/blogApi'

export default function BlogIndex() {
  const [blogs, setBlogs] = useState<ApiBlog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const items = await fetchBlogs()
        setBlogs(items)
      } catch (err) {
        console.error('Failed to load blogs', err)
      } finally {
        setLoading(false)
      }
    }
    loadBlogs()
  }, [])

  return (
    <main>
      <section className='pt-40 pb-28'>
        <div className='container px-6'>
          <h1 className='text-white text-36 font-bold mb-10'>Blogs</h1>
          <div className='grid grid-cols-12 gap-10'>
            {loading ? (
              <p className='text-muted/60 col-span-12 text-center'>Loading blogs...</p>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog.id} className='w-full md:col-span-4 col-span-6 flex'>
                  <BlogCard
                    blog={{
                      id: blog.id,
                      title: blog.title,
                      slug: blog.slug,
                      coverImage: blog.featured_image || '',
                      date: (blog.created_at || '').replace(' ', 'T'),
                    }}
                  />
                </div>
              ))
            ) : (
              <div className='col-span-12 text-center py-20'>
                <p className='text-muted/60 text-18'>No blogs found. Please check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
