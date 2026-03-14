import { Icon } from '@iconify/react'

const ForFans = () => {
  return (
    <section className='md:py-40 py-20 scroll-mt-32 md:scroll-mt-40' id='for-fans'>
      <div className='container px-4'>
        <div className='grid lg:grid-cols-2 sm:gap-0 gap-10 items-center'>
          <div>
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
          </div>
          <div>
            <div className=''>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForFans
