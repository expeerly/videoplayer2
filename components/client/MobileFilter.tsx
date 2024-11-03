"use client";

import { Modal, ModalContent, ModalBody } from "@nextui-org/modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { useRouter, useSearchParams } from "next/navigation";

import { brands, categories } from "./Filter";

import { CloseIcon, FilterIcon } from "@/assets/icons";

type MobileFilterProps = {
  defaultActiveTab?: "brands" | "categories";
};

export const MobileFilter: React.FC<MobileFilterProps> = ({
  defaultActiveTab = "brands",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"brands" | "categories">(
    defaultActiveTab,
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Dyson pre-selected
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <>
      <Button
        isIconOnly
        className="border-neutral-200"
        radius="full"
        onPress={() => setIsOpen(true)}
      >
        {isOpen ? "" : <FilterIcon />}
      </Button>

      <Modal
        hideCloseButton
        classNames={{
          base: "h-screen m-0 rounded-none w-full",
          wrapper: "h-[100dvh] p-0",
        }}
        isOpen={isOpen}
        placement="bottom"
      >
        <ModalContent>
          <ModalBody className="overflow-hidden p-0">
            <div className="flex h-full flex-col bg-white">
              {/* Header */}
              <div className="p-5 border-b items-center relative">
                <h2 className="text-lg font-semibold  capitalize text-center">
                  {activeTab}
                </h2>
                <Button
                  isIconOnly
                  className="border-neutral-200 absolute top-[15px] right-[15px] bg-[#E2E0E7]"
                  radius="full"
                  onPress={() => setIsOpen(false)}
                >
                  <CloseIcon />
                </Button>
              </div>
              <div className="flex gap-2 p-4 justify-start">
                <Button
                  className={` rounded-full ${
                    activeTab === "brands"
                      ? "bg-[#FF1F8C] text-white"
                      : "bg-transparent text-black border-2"
                  }`}
                  onPress={() => setActiveTab("brands")}
                >
                  Brands
                </Button>
                <Button
                  className={` rounded-full ${
                    activeTab === "categories"
                      ? "bg-[#FF1F8C] text-white"
                      : "bg-transparent text-black border-2"
                  }`}
                  onPress={() => setActiveTab("categories")}
                >
                  Categories
                </Button>
              </div>

              {/* Brand List */}
              <div className="flex-1 overflow-y-auto px-4 py-2">
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

              {/* Footer Buttons */}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
