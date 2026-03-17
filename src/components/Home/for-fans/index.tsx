'use client'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const ForFans = () => {
  return (
    <section className='md:py-40 py-20 scroll-mt-32 md:scroll-mt-40' id='for-fans'>
      <div className='container px-4'>
        <div className='grid lg:grid-cols-2 sm:gap-0 gap-10 items-center'>
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
             <p className='sm:text-30 text-20 text-muted mb-3'>
              For <span className='text-primary'>Fans</span>
            </p>
            <h2 className='text-white sm:text-40 text-30 font-medium mb-5'>
              Made for Listeners
            </h2>
            <p className='text-muted/60 text-16 mb-6'>
              Discover voice rooms, connect with people, and join lively talks.
            </p>
            <div className='grid sm:grid-cols-2 lg:w-90% w-full sm:gap-10 gap-6'>
              <div className='flex gap-4 items-start'>
                <div>
                  <Icon icon='la:check-circle-solid' width='24' height='24' className='text-white' />
                </div>
                <div>
                  <h4 className='text-18 text-muted/60'>Discover New Voices</h4>
                  <p className='text-muted/60 sm:text-15 text-13'>
                    Explore rooms from creators across communities.
                  </p>
                </div>
              </div>
              <div className='flex gap-4 items-start'>
                <div>
                  <Icon icon='la:check-circle-solid' width='24' height='24' className='text-white' />
                </div>
                <div>
                  <h4 className='text-18 text-muted/60'>Real-Time Interaction</h4>
                  <p className='text-muted/60 sm:text-15 text-13'>
                    Join live chats and talk directly to hosts.
                  </p>
                </div>
              </div>
              <div className='flex gap-4 items-start'>
                <div>
                  <Icon icon='la:check-circle-solid' width='24' height='24' className='text-white' />
                </div>
                <div>
                  <h4 className='text-18 text-muted/60'>Fun & Engaging Rooms</h4>
                  <p className='text-muted/60 sm:text-15 text-13'>
                    Enjoy music, discussions, and entertaining voice chats.
                  </p>
                </div>
              </div>
              <div className='flex gap-4 items-start'>
                <div>
                  <Icon icon='la:check-circle-solid' width='24' height='24' className='text-white' />
                </div>
                <div>
                  <h4 className='text-18 text-muted/60'>Friendly Community</h4>
                  <p className='text-muted/60 sm:text-15 text-13'>
                    A respectful, welcoming space for everyone.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='relative'>
            <div className='relative w-full sm:h-[450px] h-[400px] flex items-center justify-center'>
                <img 
                 src='/images/Frame 34013 copy.png' 
                 alt='For Fans' 
                 className='max-w-[65%] h-auto object-contain'
               />
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ForFans
