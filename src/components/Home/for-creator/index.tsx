'use client'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

const ForCreator = () => {
  return (
    <section className='md:pt-48 sm:pt-28 pt-12' id='for-creator'>
      <div className='container px-4 sm:px-6'>
        <div className='grid lg:grid-cols-2 items-center gap-20'>
          <div className='lg:-ml-32 relative'>
            <div className='relative w-full sm:h-[450px] h-[350px] flex items-center justify-center'>
              <img 
                src='/images/Frame 34014 (4).png' 
                alt='For Creators' 
                className='max-w-[65%] h-auto object-contain'
              />
            </div>
          </div>

          <div>
            <p className='sm:text-30 text-20 text-muted mb-3'>
              For <span className='text-primary'>Creator</span>
            </p>
            <h2 className='text-white sm:text-58 text-44 mb-4 font-medium'>
              Built for Voice Creators
            </h2>
            <p className='text-muted/60 sm:text-16 text-14 mb-6'>
              Share your voice with the world. Laya Talk gives creators the tools they need to host rooms,
              grow communities, and engage with listeners in real time.
            </p>

            <div className='space-y-4 sm:w-[90%]'>
              <div className='flex items-start gap-3'>
                <Icon icon='la:check-circle-solid' className='text-primary flex-shrink-0' width={20} height={20} />
                <div>
                  <h4 className='text-muted sm:text-18 text-16'>Earn Through Virtual Gifts</h4>
                  <p className='text-muted/60 sm:text-15 text-13'>
                    Receive gifts from listeners while hosting voice chats.
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <Icon icon='la:check-circle-solid' className='text-primary flex-shrink-0' width={20} height={20} />
                <div>
                  <h4 className='text-muted sm:text-18 text-16'>Grow Your Community</h4>
                  <p className='text-muted/60 sm:text-15 text-13'>
                    Reach new listeners and expand your audience.
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <Icon icon='la:check-circle-solid' className='text-primary flex-shrink-0' width={20} height={20} />
                <div>
                  <h4 className='text-muted sm:text-18 text-16'>Creator Insights</h4>
                  <p className='text-muted/60 sm:text-15 text-13'>
                    Track your room activity and audience growth.
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <Icon icon='la:check-circle-solid' className='text-primary flex-shrink-0' width={20} height={20} />
                <div>
                  <h4 className='text-muted sm:text-18 text-16'>Creator-Friendly Rewards</h4>
                  <p className='text-muted/60 sm:text-15 text-13'>
                    Enjoy a simple and fair reward system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForCreator
