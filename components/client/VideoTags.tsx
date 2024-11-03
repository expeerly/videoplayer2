import React from "react";
import { Chip } from "@nextui-org/chip";

function VideoTags() {
  return (
    <div className=" flex w-full gap-3 px-5 overflow-x-auto scrollbar-hide">
      <Chip className="bg-[#0E0E0FB2] text-white" radius="sm" size="lg">
        Explore
      </Chip>
      <Chip className="bg-[#0E0E0FB2] text-white" radius="sm" size="lg">
        Beauty & Personal Care
      </Chip>
      <Chip className="bg-[#0E0E0FB2] text-white" radius="sm" size="lg">
        Dyson
      </Chip>
      <Chip className="bg-[#0E0E0FB2] text-white" radius="sm" size="lg">
        Supersonic Professionalv
      </Chip>
    </div>
  );
}

export default VideoTags;
