"use client"

import { FunctionComponent, useEffect, useState } from "react"
import { CloseIcon, MenuIcon, RightChevronIcon } from "@/assets/icons"
import { Button } from "../server/Button"
import { ArrowRightIcon } from "@/assets/icons/ArrowRightIcon"
import Link from "next/link"
import { MenuItem } from "@/app/components/client/DropDownMenu"
import { usePathname } from "next/navigation"

type MobileMenuProps = {
  menuItems: MenuItem[]
}

export const MobileMenu: FunctionComponent<MobileMenuProps> = ({
  menuItems,
}) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (key: string) => {
    setActiveSubmenu(activeSubmenu === key ? null : key)
  }

  useEffect(() => {
    if (pathname) {
      setIsOpen(false)
    }
  }, [pathname])

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center space-x-2 p-3 rounded-full bg-[#EFEDF4] focus:ring-2 focus:ring-[#EFEDF4] focus:ring-opacity-50 transition-colors duration-200"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        className={`fixed top-[75px] left-0 w-full transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "h-[calc(100vh-120px)] opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className={`h-full w-full bg-[#F7F7F7] flex flex-col`}>
          <ul className="flex-1 px-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 relative">
            {menuItems.map((item) => (
              <li key={item.key}>
                {item.devider && <hr className="my-4 border-gray-200" />}
                {!item.items?.length && item.href ? (
                  <Link
                    href={item?.href}
                    className="flex w-full items-center justify-between  text-left text-base"
                  >
                    <span className="font-bold py-2 px-4 text-black rounded">
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleSubmenu(item.key)}
                    className="flex w-full items-center justify-between  text-left text-base"
                  >
                    <span className="font-bold py-2 px-4 text-black rounded">
                      {item.label}
                    </span>

                    {item.items && (
                      <RightChevronIcon
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeSubmenu === item.key ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </button>
                )}

                {item.items && activeSubmenu === item.key && (
                  <div className="mt-2 space-y-2 bg-white p-6 rounded-md">
                    {item.itemsLabel && item.href && (
                      <Link
                        href={item.href}
                        title={item.itemsLabel}
                        aria-label={item.itemsLabel}
                        className="w-full text-left py-2 flex flex-row gap-3 items-center text-pink-500 font-bold text-base"
                      >
                        {item.itemsLabel}
                        <ArrowRightIcon />
                      </Link>
                    )}
                    {item.items.map((subItem) => (
                      <Link
                        title={subItem.label}
                        href={subItem?.href}
                        key={subItem.label}
                        aria-label={subItem.label}
                        className="w-full text-left text-base flex flex-row gap-x-2 py-2 items-center"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="space-y-3 p-4">
            <Button size="lg" fullWidth>
              Sign Up
            </Button>
            <Button size="lg" fullWidth variant="outline">
              Log In
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
