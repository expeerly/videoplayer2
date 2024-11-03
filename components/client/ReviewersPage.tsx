"use client";
import React, { FunctionComponent, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ReadMoreText } from "./ReadMoreText";
import { PaginationContainer } from "./PaginationContainer";
import { Filter } from "./Filter";

export const ReviewersPage: FunctionComponent = () => {
  const pathname = usePathname();
  const router = useRouter();

  const profileNavigation = useCallback(
    (slug: string) => {
      let url = "";

      pathname.includes("explore")
        ? (url = "/explore/reviewers")
        : (url = "/video-reviews/reviewers");
      router.push(`${url}/${slug}`);
    },
    [router, pathname],
  );

  return (
    <div className="py-10   flex flex-col gap-10">
      <div className="px-3">
        <h1 className="  text-2xl mb-5 pr-20 font-extrabold ">
          Video Reviews: All Reviewers
        </h1>
        <ReadMoreText
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Quisquam, quas quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas quisquam. "
        />
      </div>
      <PaginationContainer
        cardHeaderProps={{
          onClick: (slug) => profileNavigation(slug),
          showRating: false,
          data: {
            title: "Marisa C.",
            logoSrc: "",
            subTitle: "38, Zurich (CH)",
          },
        }}
      />
      <div className="absolute top-10 right-10">
        <Filter />
      </div>
    </div>
  );
};
