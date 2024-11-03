"use client";
import React, { useState } from "react";
import { NextPage } from "next";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { VideoCard } from "./VideoCard";
import { StarRating } from "./StarRating";

import { Video } from "@/types";

const sampleVideos: Video = {
  id: "1",
  playbackId: "DS00Spx1CV902MCtPj5WknGlR102V5HFkDe",
  caption: "🚴‍♂️ Epic mountain biking trails! #mtb #adventure",
  username: "adventu",
  likes: 15420,
  comments: 234,
  shares: 89,
  userAvatar: "/avatars/user1.jpg",
  category: "Adventure",
  brandName: "Dyson",
  productName: "Supersonic",
};
const faqs = [
  {
    question: "How is the Dyson Airwrap Multi-Styler packaged?",
    answer:
      "The Dyson Airwrap Multi-Styler comes carefully and elegantly packaged in a high-quality box, ensuring that all contents are well-protected during transit and storage.",
  },
  {
    question: "How is the Dyson Airwrap Multi-Styler packaged?",
    answer:
      "The Dyson Airwrap Multi-Styler comes carefully and elegantly packaged in a high-quality box, ensuring that all contents are well-protected during transit and storage.",
  },
  {
    question: "How is the Dyson Airwrap Multi-Styler packaged?",
    answer:
      "The Dyson Airwrap Multi-Styler comes carefully and elegantly packaged in a high-quality box, ensuring that all contents are well-protected during transit and storage.",
  },
  {
    question: "How is the Dyson Airwrap Multi-Styler packaged?",
    answer:
      "The Dyson Airwrap Multi-Styler comes carefully and elegantly packaged in a high-quality box, ensuring that all contents are well-protected during transit and storage.",
  },
  {
    question: "How is the Dyson Airwrap Multi-Styler packaged?",
    answer:
      "The Dyson Airwrap Multi-Styler comes carefully and elegantly packaged in a high-quality box, ensuring that all contents are well-protected during transit and storage.",
  },
];

const VideoMoreInfo: NextPage = () => {
  const [videoData, setVideoData] = useState<Video>(sampleVideos);
  const [videoDetails, setVideoDetails] = useState<any>({
    videoTitle: `Discover Mary's Dyson Airwrap Multi-Styler Review: Effortless Hair
          Styling Made Stunningly Simple!`,
    summary: ` The Dyson Airwrap Multi-Styler impresses with its elegant packaging,
            versatile attachments, user-friendly operation, and quick hair
            styling capabilities. Tester Patty highlights its ability to create
            various hairstyles, control curl sizes, and expedite morning
            routines. It's an ideal choice for individuals who enjoy
            experimenting with different hairstyles without compromising hair
            health or spending excessive time styling.`,
    brandName: `Dyson`,
    productName: `Airwrap Multi-Styler`,
    gtin: "5025155071458",
    vendorProductNo: "H505",
    rating: 4.5,
    whatReviewerThinks: ` Hello, I'm Marisa, and I had the opportunity to test for expeerly
            the Dyson Airwrap Multi-Styler for long hair The first thing I
            noticed is how carefully and elegantly everything is packaged
            Everything comes in a high-quality box that protects the contents
            really well It comes with various attachments that you can use to
            style your hair I especially like that it has two different-sized
            curlers which allow you to determine the size of the curls You can
            directly set the direction in which the hair is wrapped by turning a
            small wheel The usage is really easy and it's super quick to achieve
            beautiful curls With the brush attachment that is also included you
            can blow-dry your hair straight and it's dry within minutes It makes
            the morning preparation really fast, especially after showering I
            would recommend this hairdryer to anyone who likes to try out
            different hairstyles but doesn't want to damage their hair with heat
            or spend too much time on it.`,
  });

  return (
    <div className="w-max mx-auto flex flex-col items-center">
      <div className="flex w-full justify-center h-screen">
        <VideoCard key={videoData.id} isVisible video={videoData} />
      </div>
      <div className="p-4 sm:p-0 max-w-[500px] flex flex-col">
        <h2 className="text-2xl font-extrabold text-[#0E0E0F] mb-4">
          {videoDetails.videoTitle}
        </h2>
        <div className="flex gap-2">
          <Button className=" text-white font-semibold bg-pink-500 rounded-full">
            Review
          </Button>
          <Button className=" text-pink-500 border border-pink-500 bg-white rounded-full">
            FAQS & Product Details
          </Button>
        </div>
        <div className="  py-8 ">
          <h3 className="text-2xl text-[#080218] font-medium mb-2">
            Review summary
          </h3>
          <p className="text-[#080218]">{videoDetails.summary}</p>
        </div>

        <Divider className="my-2 " />

        <div className="max-w-[484px]  ">
          <Card className="bg-background shadow-sm">
            <CardBody className="gap-6 p-0">
              <div>
                <h2 className="text-2xl font-medium mb-6">Product details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[#707070] font-bold">BRAND NAME</div>
                      <div className="text-[#080218]">
                        {videoDetails.brandName}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#707070] font-bold">
                        PRODUCT NAME
                      </div>
                      <div className="text-[#080218]">
                        {videoDetails.productName}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[#707070] font-bold">GTIN/EAN</div>
                      <div className="text-[#080218]">{videoDetails.gtin}</div>
                    </div>
                    <div>
                      <div className="text-[#707070] font-bold">
                        VENDOR PRODUCT №
                      </div>
                      <div className="text-[#080218]">
                        {videoDetails.vendorProductNo}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Divider className="my-2 " />

              <div>
                <h2 className="text-2xl font-medium mb-4">
                  Product highlights
                </h2>
                <div className="flex items-center gap-1 mb-4">
                  <span className=" font-medium text-[#0E0E0F]">
                    {videoDetails.rating}
                  </span>
                  <div className="flex gap-0.5">
                    <StarRating
                      editable={false}
                      rating={videoDetails.rating}
                      showRating={false}
                    />
                  </div>
                </div>

                <div className="space-y-4 pb-4 text-[#080218]">
                  <h3 className="">Pros</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      Fast styling
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      Silent
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-black" />
                      Simple to use
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <Divider className="mb-4" />

        <div className="max-w-[484px] py-8">
          <h1 className="font-medium text-2xl text-[#080218]">
            What Marisa thinks
          </h1>
          <p className=" text-[#080218]">{videoDetails.whatReviewerThinks}</p>
        </div>

        <Divider className="mb-4" />

        <div className="max-w-[484px] mx-auto">
          <Card className="bg-background shadow-sm">
            <CardBody>
              <h2 className="text-2xl font-medium mb-6">FAQs</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#080218] mt-2" />
                      <h3 className="text-base font-bold  text-[#080218]">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="pl-3.5">
                      <p className=" font-normal  text-sm text-[#080218] pb-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div>
          <Button className=" text-white font-semibold mt-5 bg-pink-500 w-full rounded-full">
            Review
          </Button>
        </div>

        <div className="flex  justify-center my-10">
          <h1 className=" font-extrabold text-2xl text-[#0E0E0F] ">
            More videos on the Airwrap Styler
          </h1>
        </div>
      </div>
    </div>
  );
};

export default VideoMoreInfo;
