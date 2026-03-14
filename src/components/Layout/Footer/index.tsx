import Logo from '../Header/Logo';
import React, { FC } from 'react'
import Link from 'next/link'
import { headerData } from '../Header/Navigation/menuData'
import { Icon } from '@iconify/react'

const Footer: FC = () => {
  return (
    <footer className='pt-16 bg-darkmode'>
      <div className='container px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 pb-16'>
          <div className='sm:col-span-2 w-full'>
            <div className="flex justify-center"><Logo /></div>
            <div className='flex justify-center gap-6 items-center mt-8 relative z-1'>
              <Link href='#' className='group'>
                <Icon
                  icon='fa6-brands:facebook-f'
                  width='24'
                  height='24'
                  className='text-white group-hover:text-primary'
                />
              </Link>
              <Link href='#' className='group'>
                <Icon
                  icon='fa6-brands:instagram'
                  width='24'
                  height='24'
                  className='text-white group-hover:text-primary'
                />
              </Link>
              <Link href='#' className='group'>
                <Icon
                  icon='fa6-brands:x-twitter'
                  width='24'
                  height='24'
                  className='text-white group-hover:text-primary'
                />
              </Link>
            </div>
          </div>
          <div className='sm:col-span-2 w-full'>
            <div className='flex flex-nowrap items-center justify-center gap-x-6 whitespace-nowrap overflow-x-hidden'>
              {/* <span className='text-white font-medium text-24'>Links :</span> */}
              {headerData.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span className='text-muted/60'>|</span>}
                  <Link
                    href={item.href}
                    className='text-white hover:text-primary text-17'>
                    {item.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className='border-t border-dark_border/20 pt-6 pb-10'>
          <p className='text-white text-14 text-center'>2026@LayaTalk</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
