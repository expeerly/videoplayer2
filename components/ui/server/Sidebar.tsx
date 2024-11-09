import { FunctionComponent } from "react";

import {
  BinocularsIcon,
  CategoriesIcon,
  SpeechBubbleIcon,
  StoreIcon,
} from "@/assets/icons";
import { ActiveLink } from "../client/ActiveLink";
import { BottomBar } from "../client/BottomBar";

export const navItems = [
  { key: "explore", name: "Explore", icon: BinocularsIcon, href: "/explore" },
  {
    key: "brands",
    name: "Brands",
    icon: StoreIcon,
    href: "/video-reviews/brand",
  },
  {
    key: "Categories",
    name: "Categories",
    icon: CategoriesIcon,
    href: "/video-reviews/productcategory",
  },
  {
    key: "reviewers",
    name: "Reviewers",
    icon: SpeechBubbleIcon,
    href: "/video-reviews/reviewers",
  },
];

export const Sidebar: FunctionComponent = () => {
  return (
    <>
      <div className="h- min-h-screen w-[200px] border-e hidden md:flex">
        <nav className="p-4 mx-auto w-full fixed top-24">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <ActiveLink
                key={item.name}
                href={item.href}
                className="flex w-full justify-start items-center py-2 px-4 gap-2 group text-transparent rounded transition-colors duration-200 hover:bg-[#F7F7F7] hover:text-black focus:ring-0"
              >
                <Icon />
                <span className="text-black">{item.name}</span>
              </ActiveLink>
            );
          })}
        </nav>
      </div>
      <BottomBar />
    </>
  );
};
