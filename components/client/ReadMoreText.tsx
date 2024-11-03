"use client";
import React, { useState } from "react";

type ReadMoreProps = {
  text: string;
  maxLength?: number;
};

export const ReadMoreText: React.FC<ReadMoreProps> = ({
  text,
  maxLength = 100,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div className="max-w-2xl">
      <p className="text-gray-600 leading-relaxed">
        {displayText}
        {shouldTruncate && (
          <>
            {!isExpanded && "... "}
            <button
              className="inline-flex items-center gap-0.5  font-bold transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <>Show Less</> : <>Read More</>}
            </button>
          </>
        )}
      </p>
    </div>
  );
};
