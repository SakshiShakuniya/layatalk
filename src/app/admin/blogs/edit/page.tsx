'use client'
import { useSearchParams } from 'next/navigation'
import EditBlogClient from '@/app/admin/blogs/edit/EditBlogClient'
import { Suspense } from 'react'

function EditBlogPageContent() {
  const searchParams = useSearchParams()
  const idStr = searchParams?.get('id')
  const id = idStr ? parseInt(idStr, 10) : NaN
  
  return <EditBlogClient id={id} />
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditBlogPageContent />
    </Suspense>
  )
}
