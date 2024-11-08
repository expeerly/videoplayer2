import React, { FunctionComponent } from "react";
import { Logo } from "@/assets/Logo";
import Link from "next/link";
import { DropDownMenu } from "./DropDownMenu";
import { MobileMenu } from "./MobileMenu";
import { defaultMenuItems } from "./DropDownMenu";

export const Navbar: FunctionComponent = () => {
  return (
    <div className="flex z-40 flex-row w-full bg-white items-center justify-between px-4 py-2 lg:py-3 md:px-10 relative md:border-b md:sticky md:top-0">
      <Link href="/">
        <Logo />
      </Link>
      <div className="hidden md:flex">
        <DropDownMenu />
      </div>
      <div className=" md:hidden">
        <MobileMenu menuItems={defaultMenuItems} />
      </div>
    </div>
  );
};
