import React from 'react'
import { Logo } from '@/assets/Logo'
import { MenuIcon } from '@/assets/icons/MenuIcon'
import { Button } from './ui/Button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex flex-row w-full justify-around py-5 px-10 border-b sticky top-0'>
        <Link href='/'>
        <Logo/>
        </Link>
        <div className='flex flex-1 flex-row-reverse gap-3'>
            <MenuIcon className='rounded-full bg-[#EFEDF4] w-11 h-11 p-2' />
            <div className='hidden gap-3 md:flex flex-row-reverse'>
            <Button size='lg' variant='outline'>Log In</Button>
            <Button size='lg' variant='primary' >Sign Up</Button>
            </div>
        </div>
    </div>
  )
}

export default Navbar