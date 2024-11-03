"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Link } from "@nextui-org/link";

import { navItems } from "./Sidebar";

export const BottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-around sticky py-2 bg-white border-t bottom-0 items-center w-full md:hidden">
      {navItems.map((item) => (
        <Link
          key={item.name}
          className={`flex w-full justify-center items-center py-2 px-4 gap-2 group text-transparent rounded transition-colors duration-200
           hover:bg-[#F7F7F7] hover:text-black focus:ring-0 ${pathname.includes(item.href) && "bg-[#F7F7F7] text-black"}`}
          href={`/${item.href}`}
        >
          <item.icon />
        </Link>
      ))}
    </div>
  );
};
