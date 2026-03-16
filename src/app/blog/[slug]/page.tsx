import BlogDetailsClient from './BlogDetailsClient'

export async function generateStaticParams() {
  // For static export of a dynamic blog page, we return a list of paths
  // if possible, but to allow any slug on the client, we return at least one path
  // so the build system generates the HTML template.
  return [{ slug: 'post-1' }]
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BlogDetailsClient slug={resolvedParams.slug} />
}
