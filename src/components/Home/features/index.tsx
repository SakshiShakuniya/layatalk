 'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify/react'

const Features = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const TopAnimation = {
    initial: { y: '-100%', opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: '-100%', opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  }

  const bottomAnimation = {
    initial: { y: '100%', opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  }

  const services = [
    { icon: 'mdi:video-4k-box', text: 'HD Live Streaming' },
    { icon: 'mdi:chat-outline', text: 'Real-time Chat' },
    { icon: 'mdi:gift-outline', text: 'Virtual Gifts' },
    { icon: 'mdi:account-circle-outline', text: 'Creator Profiles' },
    { icon: 'mdi:sword-cross', text: 'PK Battles' },
    { icon: 'mdi:cash-fast', text: 'Easy Withdrawals' },
  ]

  return (
    <section className='pt-8 md:pt-12 scroll-mt-24' id='features'>
      <div className='container px-4 mx-auto lg:max-w-(--breakpoint-xl) px-4'>
        <div ref={ref} className='grid grid-cols-12 items-center'>
          <motion.div
            {...bottomAnimation}
            className='lg:col-span-7 col-span-12'>
            <p className='sm:text-24 text-16 text-white'>Features</p>
            <h2 className='sm:text-36 text-24 text-white lg:w-full md:w-70% font-medium'>
              Everything you need for <span className='text-primary'>live streaming</span> and growth
            </h2>
            <div className='grid md:grid-cols-2 gap-7 mt-11'>
              {services.map((service, index) => (
                <div key={index} className='flex items-center gap-5'>
                  <div className='px-4 py-4 bg-light_grey/30 rounded-full'>
                    <Icon icon={service.icon} className='text-white' width={22} height={22} />
                  </div>
                  <p className='text-18 text-muted'>{service.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...TopAnimation} className='lg:col-span-5 col-span-12 relative'>
            <div className='relative w-full sm:h-[600px] h-[450px] flex items-center justify-center'>
              <img 
                src='/images/pngwing.com_19.png' 
                alt='Features' 
                className='max-w-full h-auto object-contain'
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Features
