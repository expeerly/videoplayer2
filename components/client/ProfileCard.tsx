"use client";
import { Avatar } from "@nextui-org/avatar";
import { ChevronRight } from "lucide-react";
import { FunctionComponent } from "react";

import { StarRating } from "./StarRating";

export type CardHeaderProps = {
  variant?: "primary" | "secondary";
  data?: {
    logoSrc: string;
    title: string;
    rating?: number;
    subTitle: string;
  };
  showRating?: boolean;
  onClick?: (slug: string) => void;
};
const demoData = {
  logoSrc: "/placeholder.svg?height=64&width=64",
  title: "Dyson Headphones",
  rating: 4.2,
  subTitle: "528",
};

export const ProfileCard: FunctionComponent<CardHeaderProps> = ({
  variant = "primary",
  data = demoData,
  showRating = true,
  onClick,
}) => {
  return (
    <div className="max-w-sm ">
      <button
        className="w-full flex items-center gap-4 group"
        onClick={() => onClick && onClick?.(data?.title)}
      >
        <Avatar alt={data.title} className="w-10 h-10" src={data.logoSrc} />
        {variant === "primary" ? (
          <div className="flex-1 text-left">
            <div className="flex items-center gap-1">
              <h2 className="font-bold">{data.title}</h2>
              <ChevronRight className="w-5 h-5 text-[#0E0E0F]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{data.rating}</span>
              {showRating && (
                <StarRating
                  editable={false}
                  rating={data.rating}
                  showRating={false}
                  size="sm"
                />
              )}
              <span className="text-[#8D8B94]">({data.subTitle})</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <h2 className="font-bold">{data.title}</h2>
              <div className="flex items-center">
                <span className="font-medium text-sm mr-1">{data.rating}</span>
                {showRating && (
                  <StarRating
                    editable={false}
                    rating={data.rating}
                    showRating={false}
                    size="sm"
                  />
                )}
                <ChevronRight className="w-5 h-5 text-[#0E0E0F]" />
              </div>
            </div>
            <p className="text-[#8D8B94]">{data.subTitle}</p>
          </div>
        )}
      </button>
    </div>
  );
};
