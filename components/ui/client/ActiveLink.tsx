"use client"

import { FunctionComponent, PropsWithChildren } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type ActiveLinkProps = {
  href: string
  className?: string
}

export const ActiveLink: FunctionComponent<PropsWithChildren<
  ActiveLinkProps
>> = ({ children, href, className }) => {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={`${className} ${
        pathname === href ? "bg-[#F7F7F7] text-black" : "text-transparent"
      } flex w-full justify-start items-center py-2 px-4 gap-2 group rounded transition-colors duration-200 hover:bg-[#F7F7F7] hover:text-black focus:ring-0`}
    >
      {children}
    </Link>
  )
}
