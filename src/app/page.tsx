import React from 'react'
import Hero from '@/components/Home/Hero'
import Features from '@/components/Home/features'
import ForCreator from '@/components/Home/for-creator'
import ForFans from '@/components/Home/for-fans'
import DownloadApp from '@/components/Home/download-app'
import Perks from '@/components/Home/perks'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Laya Talk',
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <ForCreator />
      <ForFans />
      <DownloadApp />
      <Perks />
    </main>
  )
}
