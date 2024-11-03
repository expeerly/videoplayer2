"use client";

import { FunctionComponent, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { CloseIcon, FilterIcon } from "@/assets/icons";

export const brands = [
  {
    id: "bauknecht",
    name: "Bauknecht",
    logo: "/placeholder.svg?height=20&width=80",
  },
  { id: "dyson", name: "Dyson", logo: "/placeholder.svg?height=20&width=80" },
  {
    id: "getyourguide",
    name: "Get Your Guide",
    logo: "/placeholder.svg?height=20&width=80",
  },
  { id: "koenig", name: "Koenig", logo: "/placeholder.svg?height=20&width=80" },
  {
    id: "philips",
    name: "Philips",
    logo: "/placeholder.svg?height=20&width=80",
  },
  { id: "sony", name: "Sony", logo: "/placeholder.svg?height=20&width=80" },
  { id: "tefal", name: "Tefal", logo: "/placeholder.svg?height=20&width=80" },
  {
    id: "zalando",
    name: "Zalando",
    logo: "/placeholder.svg?height=20&width=80",
  },
];

export const categories = [
  {
    id: "bauknecht1",
    name: "Bauknecht1",
  },
  { id: "dyson1", name: "Dyson1", logo: "/placeholder.svg?height=20&width=80" },
  {
    id: "getyourguide1",
    name: "Get Your Guide1",
  },
  {
    id: "koenig1",
    name: "Koenig1",
  },
  {
    id: "philips1",
    name: "Philips1",
  },
  { id: "sony1", name: "Sony1", logo: "/placeholder.svg?height=20&width=80" },
  { id: "tefal1", name: "Tefal1", logo: "/placeholder.svg?height=20&width=80" },
  {
    id: "zalando1",
    name: "Zalando1",
  },
];

export const Filter: FunctionComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"brands" | "categories">("brands");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Initialize filters from URL params when component mounts
  useEffect(() => {
    const brandsParam = searchParams.get("brands");
    const categoriesParam = searchParams.get("categories");

    if (brandsParam) {
      setSelectedBrands(brandsParam.split(",").filter(Boolean));
    }
    if (categoriesParam) {
      setSelectedCategories(categoriesParam.split(",").filter(Boolean));
    }
  }, [searchParams]);

  const toggleHandler = (newId: string) => {
    if (activeTab === "brands") {
      setSelectedBrands((prev) =>
        prev.includes(newId)
          ? prev.filter((id) => id !== newId)
          : [...prev, newId],
      );
    } else {
      setSelectedCategories((prev) =>
        prev.includes(newId)
          ? prev.filter((id) => id !== newId)
          : [...prev, newId],
      );
    }
  };

  const applyFilters = () => {
    // Create new URLSearchParams object with current params
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove brands parameter
    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","));
    } else {
      params.delete("brands");
    }

    // Update or remove categories parameter
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    // Update URL with new parameters
    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  const viewAll = () => {
    // Clear all state
    setSelectedBrands([]);
    setSelectedCategories([]);

    // Clear URL parameters while preserving other query params
    const params = new URLSearchParams(searchParams.toString());

    params.delete("brands");
    params.delete("categories");

    // If there are other query params, keep them, otherwise just use the pathname
    const newPath = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    // Update URL and close popover
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button isIconOnly className="border-neutral-200" radius="full">
          {isOpen ? <CloseIcon /> : <FilterIcon />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="flex w-full p-5 justify-center border-b border-gray-300">
          <h1>Filter</h1>
        </div>
        <div className="flex flex-col px-10">
          {/* Header Tabs */}
          <div className="flex gap-2 p-4">
            <Button
              className={`flex-1 w-40 rounded-full ${
                activeTab === "brands"
                  ? "bg-pink-500 text-white"
                  : "bg-transparent text-pink-500 border-2 border-pink-500"
              }`}
              onClick={() => setActiveTab("brands")}
            >
              Brands
            </Button>
            <Button
              className={`flex-1 w-40 rounded-full ${
                activeTab === "categories"
                  ? "bg-pink-500 text-white"
                  : "bg-transparent text-pink-500 border-2 border-pink-500"
              }`}
              onClick={() => setActiveTab("categories")}
            >
              Categories
            </Button>
          </div>

          {/* Content List */}
          <div className="px-4 py-2">
            {(activeTab === "brands" ? brands : categories).map((item) => (
              <div
                key={item.id}
                className="flex items-center w-full gap-3 py-2 rounded-lg hover:bg-neutral-100"
              >
                <Checkbox
                  classNames={{
                    wrapper:
                      "before:border-[#D9D9D9] w-[30] h-[30] after:bg-[#2C1277]",
                  }}
                  isSelected={
                    activeTab === "brands"
                      ? selectedBrands.includes(item.id)
                      : selectedCategories.includes(item.id)
                  }
                  radius="full"
                  onValueChange={() => toggleHandler(item.id)}
                >
                  <div className="flex">
                    <span className="ml-2 mr-2">{item.name}</span>
                    {item.logo && (
                      <Image
                        alt={item.name}
                        className="h-5 object-contain"
                        height={20}
                        src={item.logo}
                        width={20}
                      />
                    )}
                  </div>
                </Checkbox>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex gap-2 p-4">
            <Button
              className="flex-1 rounded-full bg-transparent text-pink-500 border-2 border-pink-500"
              onClick={viewAll}
            >
              View All
            </Button>
            <Button
              className="flex-1 rounded-full bg-pink-500 text-white"
              onClick={applyFilters}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
