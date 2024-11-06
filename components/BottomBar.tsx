"use client";

import React from "react";
import { navItems } from "./Sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const BottomBar = () => {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-row justify-around sticky bottom-0 py-2 bg-white border-t w-full md:hidden">
      {navItems.map((item) => (
        <Link
          key={item.name}
          className={`flex w-full justify-center items-center py-2 px-4 gap-2 rounded transition-all duration-200 
            hover:bg-gray-100 hover:text-black focus:outline-none
            ${pathname.includes(item.href) ? "bg-gray-100 text-black" : "text-gray-500"}`}
          href={`/${item.href}`}
        >
          <item.icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  );
};

export default BottomBar;