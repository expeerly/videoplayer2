"use client";

import React, { FunctionComponent, useCallback, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";

import {
  CartIcon,
  CategoriesIcon,
  InfoIcon,
  MenuIcon,
  SpeechBubbleIcon,
  StoreIcon,
  TagIcon,
  VideoIcon,
  WorldIcon,
} from "@/assets/icons";
import { BinocularsIcon } from "@/assets/icons/";

type Item = {
  key: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  href?: string;
  items?: { label: string; key?: string; icon?: any }[];
  itemsLabel?: string | undefined;
  devider?: boolean | undefined;
};

export const categroies = [
  { label: "Arts & Crafts" },
  { label: "Automobile" },
  { label: "Baby & Child Care" },
  { label: "Beauty & Personal Care" },
  { label: "Books & Media" },
  { label: "Clothes and Fashion" },
  { label: "Electronics & Gadgets" },
  { label: "Food & Beverages" },
  { label: "Furniture & Decor" },
  { label: "Gardening & Outdoor Living" },
  { label: "Health & Wellness" },
];

export const menuItems: Item[] = [
  { key: "explore", label: "Explore", icon: BinocularsIcon, href: "explore" },
  {
    key: "brands",
    label: "Brands",
    icon: StoreIcon,
    href: "video-reviews/brand",
  },
  {
    key: "Categories",
    label: "Categories",
    icon: CategoriesIcon,
    items: categroies,
    itemsLabel: "View all categories",
    href: "video-reviews/productcategory",
  },
  {
    key: "reviewers",
    label: "Reviewers",
    icon: SpeechBubbleIcon,
    devider: true,
    href: "video-reviews/reviewers",
  },
  { key: "learn", label: "Learn more", icon: InfoIcon },
  { key: "submit", label: "Submit a video review", icon: VideoIcon },
  {
    key: "brands_businesses",
    label: "For brands & businesses",
    icon: TagIcon,
  },
  {
    key: "marketplaces",
    label: "For marketplaces",
    icon: CartIcon,
    devider: true,
  },
  {
    key: "language",
    label: "English (EN)",
    icon: WorldIcon,
    items: [
      { key: "change_language", label: "Change language", icon: ChevronDown },
    ],
  },
];

export const MenuDropdown: FunctionComponent = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  const handleDropdownOpenChange = (isOpen: boolean, key: string) => {
    if (isOpen) {
      setOpenDropdown(key);
    } else if (openDropdown === key) {
      setOpenDropdown(null);
    }
  };
  const navigationHandler = useCallback(
    (path: string) => {
      router.push("/" + path);
    },
    [router],
  );

  const toggleSubmenu = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const onClick = useCallback((item: Item) => {
    if (item.items) {
      toggleSubmenu(item.key);
    } else {
      navigationHandler(item.href!);
    }
  }, []);

  return (
    <Popover
      isOpen={isPopoverOpen}
      placement="bottom-start"
      radius="none"
      onOpenChange={(open) => setIsPopoverOpen(open)}
    >
      <PopoverTrigger>
        <Button isIconOnly radius="full">
          <MenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="py-2">
          {menuItems.map((item, index) =>
            item.items ? (
              <Dropdown
                key={`${item.key}-${index}-1`}
                isOpen={openDropdown === item.key}
                offset={15}
                placement="left-start"
                radius="none"
                onOpenChange={(isOpen) =>
                  handleDropdownOpenChange(isOpen, item.key)
                }
              >
                <DropdownTrigger>
                  <Button
                    className={`w-full justify-start text-left mb-1 text-transparent ${
                      openDropdown === item.key ? "font-bold bg-gray-300" : ""
                    }`}
                    endContent={
                      openDropdown === item.key ? (
                        <ChevronDown className="!ml-auto" />
                      ) : (
                        <ChevronRight className="!ml-auto" />
                      )
                    }
                    startContent={<item.icon className="w-4 h-4" />}
                    variant="light"
                  >
                    <span className="text-black">{item.label}</span>
                  </Button>
                </DropdownTrigger>

                <DropdownMenu className="w-64">
                  <DropdownSection>
                    {item?.itemsLabel ? (
                      <DropdownItem
                        key={item.itemsLabel}
                        className="text-pink-500 font-bold text-base"
                        endContent={<ArrowRight />}
                        onClick={() => navigationHandler(item?.href!)}
                      >
                        {item.itemsLabel}
                      </DropdownItem>
                    ) : (
                      <DropdownItem className="hidden" />
                    )}
                  </DropdownSection>
                  <DropdownSection>
                    {item.items.map((subItem) => (
                      <DropdownItem key={subItem.label} className="w-full">
                        {subItem.label}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                <Button
                  key={item.key + "button"}
                  className="w-full justify-start text-left mb-1 text-transparent"
                  radius="sm"
                  startContent={<item.icon />}
                  variant="light"
                  onClick={() => onClick(item)}
                >
                  <span className="text-black">{item.label}</span>
                </Button>
                {item.devider && (
                  <div className="border-b border-default-200 my-2" />
                )}
              </>
            ),
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
