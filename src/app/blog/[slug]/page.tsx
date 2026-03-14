import { fetchBlogBySlug } from '@/utils/blogApi'
import Image from 'next/image'

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const apiPost = await fetchBlogBySlug(slug)

  if (!apiPost) {
    return (
      <main>
        <section className='pt-40 pb-28'>
          <div className='container px-6'>
            <div className='max-w-2xl mx-auto text-center'>
              <h1 className='text-white text-32 sm:text-40 font-bold mb-6'>Blog not found</h1>
              <p className='text-muted'>The blog you are looking for does not exist.</p>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section className='pt-40 pb-28'>
        <div className='container px-6'>
          <div className='max-w-4xl mx-auto'>
            {apiPost.featured_image ? (
              <div className='mb-8'>
                <Image
                  src={apiPost.featured_image as string}
                  alt={apiPost.title as string}
                  width={1200}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className='w-full h-auto rounded-xl'
                />
              </div>
            ) : null}
            <p className='text-muted/60 text-14 mb-2'>
              {new Date(apiPost.created_at as string).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
            </p>
            <h1 className='text-white text-32 sm:text-40 font-bold mb-6'>
              {apiPost.title as string}
            </h1>
            <div className='blog-details text-muted' dangerouslySetInnerHTML={{ __html: apiPost.content || '' }} />
          </div>
        </div>
      </section>
    </main>
  )
}
