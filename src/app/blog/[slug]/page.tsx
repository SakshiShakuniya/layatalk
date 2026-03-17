import BlogDetailsClient from './BlogDetailsClient'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BlogDetailsClient slug={resolvedParams.slug} />
}
