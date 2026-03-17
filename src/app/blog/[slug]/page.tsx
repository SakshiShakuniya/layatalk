import BlogDetailsClient from './BlogDetailsClient'
import { fetchBlogs, ApiBlog } from '@/utils/blogApi'

export async function generateStaticParams() {
  try {
    const blogs: ApiBlog[] = await fetchBlogs();
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Failed to fetch blogs for static params', error);
    return [];
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BlogDetailsClient slug={resolvedParams.slug} />
}
