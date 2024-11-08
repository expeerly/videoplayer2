"use client";

import { FunctionComponent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { CloseIcon, MenuIcon, RightChevronIcon } from "@/assets/icons";

interface MenuItem {
  key: string;
  label: string;
  href?: string;
  devider?: boolean;
  items?: Array<{ label: string }>;
  itemsLabel?: string;
}

interface MobileMenuProps {
  menuItems: MenuItem[];
}

export const MobileMenu: FunctionComponent<MobileMenuProps> = ({
  menuItems,
}: MobileMenuProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (key: string) => {
    setActiveSubmenu(activeSubmenu === key ? null : key);
  };

  const navigationHandler = useCallback(
    (path: string) => {
      router.push(path);
      setIsOpen(false);
      setActiveSubmenu(null);
    },
    [router]
  );

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} type="button">
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        className={`fixed top-[60px] left-0 w-full transition-all duration-300 ease-in-out ${
          isOpen ? "h-[calc(100vh-118px)] opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="h-full w-full bg-[#F7F7F7] flex flex-col">
          <div className="flex-1 px-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 relative">
            {menuItems.map((item) => (
              <div key={item.key}>
                {item.devider && <hr className="my-4 border-gray-200" />}
                <button
                  onClick={() =>
                    item.items
                      ? toggleSubmenu(item.key)
                      : item?.href && navigationHandler(item.href)
                  }
                  className="flex w-full items-center justify-between  text-left text-base"
                >
                  <div className="flex w-full font-bold justify-start items-center py-2 px-4 text-black rounded transition-colors duration-200 hover:bg-[#F7F7F7] hover:text-black focus:ring-0">
                    <span>{item.label}</span>
                  </div>

                  {item.items && (
                    <RightChevronIcon
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeSubmenu === item.key ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </button>

                {item.items && activeSubmenu === item.key && (
                  <div className="mt-2 space-y-2 bg-white p-6 rounded-md">
                    {item.itemsLabel && (
                      <button
                        onClick={() =>
                          item?.href && navigationHandler(item?.href)
                        }
                        className="w-full text-left py-2 flex flex-row gap-3 text-pink-500 font-bold text-base"
                      >
                        {item.itemsLabel}
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    )}
                    {item.items.map((subItem) => (
                      <button
                        key={subItem.label}
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
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3 p-4">
            <button className="w-full bg-[#FF1F8C] text-white py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200">
              Sign Up
            </button>
            <button className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
