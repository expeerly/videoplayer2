"use client";
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";

import {
  BinocularsIcon,
  CategoriesIcon,
  SpeechBubbleIcon,
  StoreIcon,
} from "@/assets/icons";

const navItems = [
  { key: "explore", name: "Explore", icon: BinocularsIcon, href: "explore" },
  { key: "brands", name: "Brands", icon: StoreIcon, href: "brands" },
  {
    key: "Categories",
    name: "Categories",
    icon: CategoriesIcon,
    href: "categories",
  },
  {
    key: "reviewers",
    name: "Reviewers",
    icon: SpeechBubbleIcon,
    href: "reviewers",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={` h-full w-[275px] border-e  hidden md:flex   `}>
      <nav className="p-4 mx-auto w-full">
        {navItems.map((item) => (
          <Link
            key={item.name}
            className={`flex w-full justify-start items-center py-2 px-4 gap-2 group text-transparent rounded transition-colors duration-200
               hover:bg-[#F7F7F7] hover:text-black focus:ring-0 ${pathname.includes(item.href) && "bg-[#F7F7F7] text-black"}`}
            href={`/${item.href}`}
          >
            <item.icon />
            <span className="text-black">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
