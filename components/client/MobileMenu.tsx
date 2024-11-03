"use client";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import { ArrowRight, ChevronRight, X } from "lucide-react";
import { useCallback, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { menuItems } from "./MenuDropdown";

import { Logo } from "@/assets/logo";
import { MenuIcon } from "@/assets/icons";

export const MobileMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (key: string) => {
    setActiveSubmenu(activeSubmenu === key ? null : key);
  };

  const navigationHandler = useCallback(
    (path: string) => {
      router.push("/" + path);
      setIsOpen(false);
      setActiveSubmenu(null);
    },
    [router],
  );

  return (
    <>
      <Button isIconOnly radius="full" onPress={() => setIsOpen(true)}>
        <MenuIcon />
      </Button>

      <Modal
        hideCloseButton
        classNames={{
          base: "h-[100dvh] m-0 rounded-none w-full",
          wrapper: "h-[100dvh] p-0",
        }}
        isOpen={isOpen}
        placement="top"
      >
        <ModalContent>
          <ModalBody className="overflow-hidden p-0">
            <div className="flex h-full flex-col bg-[#F7F7F7]">
              {/* Header with close button */}
              <div className="flex justify-between p-4 border-b">
                <NextLink
                  className="flex justify-start items-center gap-1"
                  href="/"
                >
                  <Logo />
                </NextLink>
                <Button
                  isIconOnly
                  className=" bg=[#EFEDF4] rounded-full"
                  onPress={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 overflow-y-auto relative">
                {menuItems.map((item, index) => (
                  <div key={item.key}>
                    {item.devider && <hr className="my-4 border-gray-200" />}
                    <button
                      className="flex w-full items-center justify-between py-2 text-left text-base"
                      onClick={() =>
                        item.items
                          ? toggleSubmenu(item.key)
                          : navigationHandler(item?.href!)
                      }
                    >
                      <div
                        className={`flex w-full justify-start items-center py-2 px-4 text-black rounded transition-colors duration-200
               hover:bg-[#F7F7F7] hover:text-black focus:ring-0`}
                      >
                        <span>{item.label}</span>
                      </div>

                      {item.items && (
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${activeSubmenu === item.key ? "rotate-90" : ""}`}
                        />
                      )}
                    </button>
                    {item.items && activeSubmenu === item.key && (
                      <div className=" mt-2 space-y-2 bg-white p-6 rounded-md">
                        {item.itemsLabel && (
                          <button
                            className="w-full text-left py-2 flex flex-row gap-3 text-pink-500 font-bold text-base"
                            onClick={() => navigationHandler(item?.href!)}
                          >
                            {item.itemsLabel}
                            <ArrowRight />
                          </button>
                        )}
                        {item.items.map((subItem: any) => (
                          <button
                            key={subItem.label}
                            className="w-full text-left text-base flex flex-row gap-x-2 py-2 items-center"
                          >
                            <ChevronRight className="h-4 w-4" />
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="space-y-3 p-4">
                <Button className="w-full bg-[#FF1F8C] text-white" size="lg">
                  Sign Up
                </Button>
                <Button className="w-full" size="lg" variant="bordered">
                  Log In
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
