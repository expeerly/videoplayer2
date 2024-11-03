"use client";
import { Pagination } from "@nextui-org/pagination";
import React, { FunctionComponent, useState } from "react";

import { ReviewsGrid } from "../server/ReviewsGrid";

import { CardHeaderProps } from "./ProfileCard";

type Props = {
  cardHeaderProps?: CardHeaderProps;
  maxItem?: number;
};

export const PaginationContainer: FunctionComponent<Props> = ({
  cardHeaderProps,
  maxItem,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages needed
  const totalItems = 6; // Adjust this based on your actual total number of items
  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range of items to display for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // You can add scroll to top here if needed
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex h-full flex-col gap-10 pl-3">
      {/* Only render 4 items for the current page */}
      {Array.from({ length: maxItem ?? itemsPerPage }).map((_, index) => (
        <ReviewsGrid
          key={startIndex + index}
          cardHeaderProps={cardHeaderProps}
        />
      ))}

      <Pagination
        className="mx-auto"
        color="danger"
        initialPage={1}
        page={currentPage}
        radius="full"
        total={totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
};
