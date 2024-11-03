"use client";
import React, { FC, FunctionComponent, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Share2,
  Twitter,
  ChevronsLeftRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

import { CloseIcon } from "@/assets/icons";
type Platform =
  | "Facebook"
  | "Instagram"
  | "Twitter"
  | "Linkedin"
  | "Email"
  | "Tiktok"
  | "Embed";
type ShareButtonProps = {
  platform: Platform;
  icon: React.ElementType;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  url: string;
};

type ShareDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const generateShareLink = (platform: Platform, url: string): string => {
  const encodedUrl = encodeURIComponent(url);

  switch (platform) {
    case "Facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case "Instagram":
      return `https://www.instagram.com/?url=${encodedUrl}`;
    case "Twitter":
      return `https://twitter.com/intent/tweet?url=${encodedUrl}`;
    case "Linkedin":
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;
    case "Email":
      return `mailto:?body=${encodedUrl}`;
    case "Tiktok":
      return `https://www.tiktok.com/share?url=${encodedUrl}`;
    case "Embed":
      return `<iframe width="560" height="315" src="${encodedUrl}" frameborder="0" allowfullscreen></iframe>`;
    default:
      return "#";
  }
};

const ShareButton: FC<ShareButtonProps> = ({
  platform,
  icon: Icon,
  onClick,
  url,
}) => (
  <div className="relative py-3">
    <Link
      className="rounded-full p-4 bg-gray-100 hover:bg-gray-200 transition-colors flex flex-col items-center justify-center"
      href={generateShareLink(platform, url)}
      rel="noopener noreferrer"
      target="_blank"
      title={`Share on ${platform}`}
      onClick={onClick}
    >
      <Icon className="w-8 h-8" />
      <span className="absolute -bottom-2 font-bold text-sm text-gray-700">
        {platform}
      </span>
    </Link>
  </div>
);

const RenderEmbedContent: FunctionComponent<{
  url: string;
  setModalContent: Function;
  setCopied: Function;
  copied: boolean;
}> = ({ url, setModalContent, setCopied, copied }) => {
  const embedCode = `<iframe width="560" height="315" src="${url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  const handleCopy = () => {
    navigator.clipboard
      .writeText(embedCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <>
      <div className=" absolute top-3">
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setModalContent("share")}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-5 px-36">
        <div className="font-bold mb-2 text-gray-700">Embed Code</div>
        <div className="relative">
          <div className="text-gray-600 rounded-lg break-all ">{embedCode}</div>
          <button
            className="font-bold py-2 px-6 rounded-full border my-8 text-pink-500 border-pink-500 flex items-center"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </>
  );
};

export const ShareDailog: FunctionComponent<ShareDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [modalContent, setModalContent] = useState<"share" | "embed">("share");
  const [url, setUrl] = useState<string>(
    "https://www.example.com/watch?v=xmL0t-2uRts",
  );
  const [copied, setCopied] = useState<boolean>(false);

  const handleEmbedClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setModalContent("embed");
  };
  const copyToClipboard = (): void => {
    navigator.clipboard
      .writeText(url)
      .then(() => alert("URL copied to clipboard!"))
      .catch((err: Error) => console.error("Failed to copy: ", err));
  };

  return (
    <>
      <Modal
        className="max-w-3xl"
        closeButton={
          <Button isIconOnly>
            <CloseIcon />
          </Button>
        }
        isOpen={isOpen}
        radius={"sm"}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex items-center justify-between text-gray-700 border-b mb-5 border-gray-300 text-lg">
            {modalContent === "embed" && (
              <button
                aria-label="Back to Share"
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setModalContent("share")}
              />
            )}
            <span
              className={`flex-1 text-center ${modalContent === "embed" ? "mr-8" : ""}`}
            >
              {modalContent === "share" ? "Share" : "Embed Video"}
            </span>
          </ModalHeader>
          <ModalBody>
            {modalContent === "share" ? (
              <div className="flex justify-between mb-6 w-full flex-wrap gap-2">
                <ShareButton icon={Facebook} platform="Facebook" url={url} />
                <ShareButton icon={Instagram} platform="Instagram" url={url} />
                <ShareButton icon={Share2} platform="Tiktok" url={url} />
                <ShareButton icon={Linkedin} platform="Linkedin" url={url} />
                <ShareButton icon={Twitter} platform="Twitter" url={url} />
                <ShareButton icon={Mail} platform="Email" url={url} />
                <ShareButton
                  icon={ChevronsLeftRight}
                  platform="Embed"
                  url={url}
                  onClick={handleEmbedClick}
                />
              </div>
            ) : (
              <RenderEmbedContent
                copied={copied}
                setCopied={setCopied}
                setModalContent={setModalContent}
                url={url}
              />
            )}
            {modalContent === "share" && (
              <div className="relative w-full mt-10 mb-12">
                <input
                  className="w-full max-w-full pr-36 pl-6 py-3 font-medium text-gray-700 rounded-full border border-gray-300"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white font-bold py-2 px-4 rounded-full"
                  onClick={copyToClipboard}
                >
                  Copy
                </Button>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
