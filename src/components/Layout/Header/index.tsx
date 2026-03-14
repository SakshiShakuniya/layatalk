'use client'
import Logo from './Logo';
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { headerData } from './Navigation/menuData'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const router = useRouter()

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  useEffect(() => {
    router.prefetch('/blog')
  }, [router])

  return (
    <header
      className={`fixed top-0 z-40 w-full pb-5 transition-all duration-300 ${
        sticky ? ' shadow-lg bg-darkmode pt-5' : 'shadow-none md:pt-14 pt-5'
      }`}>
      <div className='lg:py-0 py-2'>
        <div className='container px-4 flex items-center justify-between px-4'>
            <Logo />
          <nav className='hidden lg:flex grow items-center gap-8 justify-center'>
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className='flex items-center gap-4'>
            <Link
              href='/admin/login'
              className='hidden lg:block text-white hover:text-primary px-3 py-2 rounded-lg border border-transparent hover:border-primary'>
              Admin
            </Link>
            <Link
              href='https://play.google.com/store/apps/details?id=com.ahaagroup.ahaavoice&hl=en_IN'
              target='_blank'
              rel='noopener noreferrer'
              className='hidden lg:block bg-primary text-darkmode hover:bg-transparent hover:text-primary border border-primary px-4 py-2 rounded-lg'>
              Get the App
            </Link>
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className='block lg:hidden p-2 rounded-lg'
              aria-label='Toggle mobile menu'>
              <span className='block w-6 h-0.5 bg-white'></span>
              <span className='block w-6 h-0.5 bg-white mt-1.5'></span>
              <span className='block w-6 h-0.5 bg-white mt-1.5'></span>
            </button>
          </div>
        </div>
        {navbarOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
        )}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50`}>
          <div className='flex items-center justify-between p-4'>
            <h2 className='text-lg font-bold text-midnight_text dark:text-midnight_text'>
              
            </h2>
            <button
              onClick={() => setNavbarOpen(false)}
              className="bg-[url('/images/closed.svg')] bg-no-repeat bg-contain w-5 h-5 absolute top-0 right-0 mr-8 mt-8 dark:invert"
              aria-label='Close menu Modal'></button>
          </div>
          <nav className='flex flex-col items-start p-4'>
            {headerData.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className='mt-4 w-full'>
              <Link
                href='/admin/login'
                className='text-white px-4 py-2 rounded-lg border border-primary/50 block text-center mb-3'>
                Admin
              </Link>
              <Link
                href='https://play.google.com/store/apps/details?id=com.ahaagroup.ahaavoice&hl=en_IN'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 block text-center'>
                Get the App
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
