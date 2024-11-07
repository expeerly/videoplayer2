'use client'

import { FC, PropsWithChildren } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ActiveLinkProps extends PropsWithChildren {
  href: string
  className: string
}

export const ActiveLink: FC<ActiveLinkProps> = ({ children, href, className }) => {
  const pathname = usePathname()
 
  return (
    <Link
      href={href}
      className={`${className} ${
        pathname === href ? "bg-[#F7F7F7] text-black" : ""
      }`}
    >
      {children}
    </Link>
  )
}

