import React, { FunctionComponent } from "react";
import { Logo } from "@/assets/Logo";
import Link from "next/link";
import { DropDownMenu } from "../../../app/components/client/DropDownMenu";
import { MobileMenu } from "./MobileMenu";
import { defaultMenuItems } from "../../../app/components/client/DropDownMenu";

export const Navbar:FunctionComponent = () => {
  return (
    <div className="flex z-40 flex-row w-full bg-white justify-between py-5 px-10 border-b sticky top-0">
      <Link href="/">
        <Logo />
      </Link>
      <div className="hidden md:flex">
        <DropDownMenu />
      </div>
      <div className="flex flex-row-reverse flex-1 md:hidden">
        <MobileMenu menuItems={defaultMenuItems} />
      </div>
    </div>
  );
};


