import EditBlogClient from './EditBlogClient'

export async function generateStaticParams() {
  // For static export of an admin page, we return at least one path
  // so that the build system generates the HTML template.
  return [{ id: '1' }]
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  
  return <EditBlogClient id={id} />
}
