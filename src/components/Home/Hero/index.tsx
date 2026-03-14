'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react/dist/iconify.js'

const Hero = () => {
  const leftAnimation = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.6 },
  }

  const rightAnimation = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <section
      className='relative md:pt-30 pt-8 md:pb-12 pb-8 overflow-hidden z-1'
      id='main-banner'>
      <div className='container px-4'>
        <div className='grid grid-cols-12'>
          <motion.div {...leftAnimation} className='lg:col-span-5 col-span-12'>
            <div className='flex gap-6 items-center lg:justify-start justify-center mb-5 mt-24'>
            <div className="w-12 h-12 flex items-center justify-center border-[0.5px] border-white/30 rounded-full">
              <Icon
                icon="mdi:chat-outline"
                className="text-white text-[22px]"
              />
            </div>
              <p className='text-white sm:text-28 text-18 mb-0'>
                Meet. Chat. <span className='text-primary'>Connect.</span>
              </p>
            </div>
            <h1 className='font-medium lg:text-64 md:text-60 text-44 lg:text-start text-center text-white mb-6'>
              The Ultimate <span className='text-primary'>Group</span> Voice Chat{' '}
              <span className='text-primary'>Platform</span>!
            </h1>

            {/* Subtitle */}
            <p className='text-gray-300 lg:text-20 text-16 lg:text-start text-center mb-10 max-w-xl'>
              Join live audio chat rooms, connect with friends, and discover new
              communities. Laya Talk brings people together through fun
              conversations, music sharing, and interactive voice experiences.
            </p>
            <div className='flex items-center md:justify-start justify-center gap-6'>
            <Link
              href="https://play.google.com/store/apps/details?id=com.ahaagroup.ahaavoice&hl=en_IN"
              className='bg-primary border border-primary rounded-lg text-16 font-medium hover:bg-transparent hover:text-primary text-darkmode py-2 px-5'>
              Download Now
            </Link>
            <Link
              href="/#features"
              className='bg-transparent border border-primary rounded-lg text-16 font-medium hover:bg-primary hover:text-darkmode text-primary py-2 px-5'>
              Learn More
            </Link>
          </div>
          </motion.div>
          <motion.div
            {...rightAnimation}
            className='col-span-7 lg:block hidden'>
          </motion.div>
        </div>

      </div>

      <div className='absolute w-50 h-50 bg-linear-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1'></div>

    </section>
  )
}

export default Hero
