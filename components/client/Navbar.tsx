import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { FunctionComponent } from "react";

import { Logo } from "../../assets/logo";

import { MenuDropdown } from "./MenuDropdown";
import { MobileMenu } from "./MobileMenu";

export const Navbar: FunctionComponent = () => {
  return (
    <NextUINavbar className="border-b" maxWidth="xl" position="static">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="" justify="end">
        <NavbarItem className="ml-auto">
          <div className="hidden md:flex">
            <MenuDropdown />
          </div>
          <div className=" md:hidden">
            <MobileMenu />
          </div>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
