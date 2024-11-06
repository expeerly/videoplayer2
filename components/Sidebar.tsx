import Link from "next/link";
import { headers } from "next/headers";

import {
  BinocularsIcon,
  CategoriesIcon,
  SpeechBubbleIcon,
  StoreIcon,
} from "@/assets/icons";

export const navItems = [
  { key: "explore", name: "Explore", icon: BinocularsIcon, href: "explore" },
  {
    key: "brands",
    name: "Brands",
    icon: StoreIcon,
    href: "video-reviews/brand",
  },
  {
    key: "Categories",
    name: "Categories",
    icon: CategoriesIcon,
    href: "video-reviews/productcategory",
  },
  {
    key: "reviewers",
    name: "Reviewers",
    icon: SpeechBubbleIcon,
    href: "video-reviews/reviewers",
  },
];

export default async function Sidebar() {

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  return (
    <div className="h-full w-[200px] border-e hidden md:flex sticky top-20">
      <nav className="p-4 mx-auto w-full">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={`/${item.href}`}
            className={`flex w-full justify-start items-center py-2 px-4 gap-2 group text-transparent rounded transition-colors duration-200
               hover:bg-[#F7F7F7] hover:text-black focus:ring-0 ${
                 pathname.includes(item.href) && "bg-[#F7F7F7] text-black"
               }`}
          >
            <item.icon />
            <span className="text-black">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}