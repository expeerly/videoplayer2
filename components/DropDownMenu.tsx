"use client";

import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon,
  BinocularsIcon,
  CartIcon,
  CategoriesIcon,
  DownArrowIcon,
  InfoIcon,
  MenuIcon,
  RightArrowIcon,
  SpeechBubbleIcon,
  StoreIcon,
  TagIcon,
  VideoIcon,
  WorldIcon,
} from "@/assets/icons";
import Link from "next/link";
type Item = {
  key: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  href?: string;
  items?: { label: string; key?: string; icon?: any }[];
  itemsLabel?: string | undefined;
  devider?: boolean | undefined;
};

export const categroies = [
  { label: "Arts & Crafts" },
  { label: "Automobile" },
  { label: "Baby & Child Care" },
  { label: "Beauty & Personal Care" },
  { label: "Books & Media" },
  { label: "Clothes and Fashion" },
  { label: "Electronics & Gadgets" },
  { label: "Food & Beverages" },
  { label: "Furniture & Decor" },
  { label: "Gardening & Outdoor Living" },
  { label: "Health & Wellness" },
];

export const defaultMenuItems: Item[] = [
  { key: "explore", label: "Explore", icon: BinocularsIcon, href: "/explore" },
  {
    key: "brands",
    label: "Brands",
    icon: StoreIcon,
    href: "/video-reviews/brand",
  },
  {
    key: "Categories",
    label: "Categories",
    icon: CategoriesIcon,
    items: categroies,
    itemsLabel: "View all categories",
    href: "/video-reviews/productcategory",
  },
  {
    key: "reviewers",
    label: "Reviewers",
    icon: SpeechBubbleIcon,
    devider: true,
    href: "/video-reviews/reviewers",
  },
  { key: "learn", label: "Learn more", icon: InfoIcon },
  { key: "submit", label: "Submit a video review", icon: VideoIcon },
  {
    key: "brands_businesses",
    label: "For brands & businesses",
    icon: TagIcon,
  },
  {
    key: "marketplaces",
    label: "For marketplaces",
    icon: CartIcon,
    devider: true,
  },
  {
    key: "language",
    label: "English (EN)",
    icon: WorldIcon,
    items: [
      { key: "change_language", label: "Change language", icon: DownArrowIcon },
    ],
  },
];

type DropDownMenuProps = {
  menuItems?: Item[],
  className?: string
}

export const DropDownMenu:FunctionComponent<DropDownMenuProps>=  ({
  menuItems = defaultMenuItems,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);
 
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenSubmenuKey(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setOpenSubmenuKey(null);
    }
  };

  const toggleSubmenu = (key: string) => {
    setOpenSubmenuKey(openSubmenuKey === key ? null : key);
  };

  return (
    <div className={`relative z-[9999999] ${className}`} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 p-3 rounded-full bg-[#EFEDF4] focus:ring-2 focus:ring-[#EFEDF4] focus:ring-opacity-50 transition-colors duration-200"
        type="button"
        aria-haspopup="true"
      >
        <MenuIcon />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-64 bg-white rounded-md shadow-lg py-1 ">
          <ul className="">
            {menuItems.map((item) => (
              <li key={item.key} className="relative">
                {item.items ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.key)}
                      className="w-full flex items-center justify-between px-4 py-2  text-transparent hover:text-black hover:bg-gray-50 transition-colors duration-200"
                    
                    >
                      <span className="flex gap-4 items-center">
                        <item.icon />
                        <span className="text-black">{item.label}</span>
                      </span>
                      <span className="ml-2">
                        {openSubmenuKey === item.key ? (
                          <DownArrowIcon />
                        ) : (
                          <RightArrowIcon />
                        )}
                      </span>
                    </button>
                    {openSubmenuKey === item.key && (
                      <div className="absolute -left-64 top-0 w-64 bg-white rounded-md shadow-lg py-1  border border-gray-100">
           
                          {item.itemsLabel &&(
                            <Link
                              key={item.itemsLabel}
                              href={`${item.href}`}
                              className="text-pink-500 cursor-pointer font-bold text-base flex flex-row w-full text-left px-4 py-2 gap-3 items-center"
                            >
                              {item.itemsLabel}
                              <ArrowRightIcon/>
                            </Link>
                          )}
              
                        <ul>
                          {item.items.map((subItem, index) => (
                            <li key={index}>
                              <button
                                
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                              >
                                {subItem.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    className="w-full flex items-center text-transparent hover:text-black hover:bg-[#F7F7F7] px-4 py-2 gap-4  transition-colors duration-200"
                    href={`${item.href}`}
                  >
                    <item.icon />
                    <span className="text-black">{item.label}</span>
                  </Link>
                )}
                {item.devider && (
                  <div className="border-b border-default-200 my-2" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
