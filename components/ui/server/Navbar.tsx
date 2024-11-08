import React, { FunctionComponent } from "react";
import { Logo } from "@/assets/Logo";
import Link from "next/link";
import { DropDownMenu } from "../../../app/components/client/DropDownMenu";
import { MobileMenu } from "./MobileMenu";
import { defaultMenuItems } from "../../../app/components/client/DropDownMenu";
import { Button } from "./Button";

export const Navbar: FunctionComponent = () => {
  return (
    <nav className="flex z-40 flex-row w-full bg-white justify-between  py-[15px] px-5 sm:py-5 sm:px-12 border-b sticky top-0">
      <Link href={"/"} className="max-w-[30px] sm:max-w-max overflow-hidden">
        <Logo className="h-[30px] w-auto sm:w-auto sm-h-auto" />
      </Link>
      <div className="hidden md:flex gap-[22px]">
        <div className="flex gap-3">
          <Button className="w-[150px]">Sign Up</Button>

          <Button className="w-[150px]" variant="outline">
            Login
          </Button>
        </div>

        <DropDownMenu />
      </div>
      <div className=" md:hidden">
        <MobileMenu menuItems={defaultMenuItems} />
      </div>
    </nav>
  );
};
