// ActiveLink.tsx
'use client'
import { FC, PropsWithChildren } from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface ActiveLinkProps extends PropsWithChildren {
  href: string
  className: string
}

export const ActiveLink: FC<ActiveLinkProps> = ({ children, href, className }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(window.location.pathname.includes(href))

    const handleRouteChange = () => {
      setIsActive(window.location.pathname.includes(href))
    }

    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [href])

  return (
    <Link
      href={href}
      onClick={() => setIsActive(true)}
      className={`${className} ${
        isActive ? "bg-[#F7F7F7] text-black" : ""
      }`}
    >
      {children}
    </Link>
  )
}

