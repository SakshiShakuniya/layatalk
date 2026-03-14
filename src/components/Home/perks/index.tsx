 

const Perks = () => {
  return (
    <section className='pb-28 relative'>
      <div className='container px-4 relative z-2'>
        <div className='text-center'>
          <p className="text-muted sm:text-28 text-18 mb-4 pb-6 relative after:content-[''] after:w-8 after:h-0.5 after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            Getting <span className='text-primary'>Started</span>
          </p>
          <h2 className='text-white sm:text-40 text-30 font-medium'>
            Start voice chatting in <span className='text-primary'>4 steps</span>
          </h2>
          <div className='mt-16 w-full border border-border/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch py-16 gap-6 sm:gap-8 lg:gap-12 px-6 md:px-10 lg:px-12 rounded-3xl bg-dark_grey/35 lg:bg-bottom bg-center bg-no-repeat'>
            <div className='flex items-start gap-4 text-left h-full lg:border-l-0'>
              <div className='bg-primary/25 p-3 rounded-full w-12 h-12 flex items-center justify-center'>
                <span className='text-white text-18 font-medium'>1</span>
              </div>
              <div className='pr-2'>
                <h4 className='text-white text-22 mb-2 whitespace-nowrap'>Download the App</h4>
                <p className='text-muted/60 text-16'>
                  Install Laya Talk from the Play Store.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-4 text-left h-full lg:border-l border-dark_border/20 lg:pl-6'>
              <div className='bg-primary/25 p-3 rounded-full w-12 h-12 flex items-center justify-center'>
                <span className='text-white text-18 font-medium'>2</span>
              </div>
              <div className='pr-2'>
                <h4 className='text-white text-22 mb-2 whitespace-nowrap'>Create Your Profile</h4>
                <p className='text-muted/60 text-16'>
                  Sign up and set up your account.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-4 text-left h-full lg:border-l border-dark_border/20 lg:pl-6'>
              <div className='bg-primary/25 p-3 rounded-full w-12 h-12 flex items-center justify-center'>
                <span className='text-white text-18 font-medium'>3</span>
              </div>
              <div className='pr-2'>
                <h4 className='text-white text-22 mb-2 whitespace-nowrap'>Join Voice Rooms</h4>
                <p className='text-muted/60 text-16'>
                  Enter live audio chats or host your own.
                </p>
              </div>
            </div>
            <div className='flex items-start gap-4 text-left h-full lg:border-l border-dark_border/20 lg:pl-6'>
              <div className='bg-primary/25 p-3 rounded-full w-12 h-12 flex items-center justify-center'>
                <span className='text-white text-18 font-medium'>4</span>
              </div>
              <div className='pr-2'>
                <h4 className='text-white text-22 mb-2 whitespace-nowrap'>Connect & Enjoy</h4>
                <p className='text-muted/60 text-16'>
                  Talk, meet new people, and have fun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-linear-to-br from-tealGreen to-charcoalGray sm:w-50 w-96 z-0 sm:h-50 h-96 rounded-full sm:-bottom-80 bottom-0 blur-400 absolute sm:-left-48 opacity-60'></div>
    </section>
  )
}

export default Perks
