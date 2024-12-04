import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  CloseIcon,
  FacebookIcon,
  InstagramIcon,
  LeftChevronIcon,
  LinkedinIcon,
  MailIcon,
  StreamlineBracketIcon,
  TikTokIcon,
  XIcon,
} from '@/src/assets/icons';
import { Button } from './Button';

const shareOptions = [
  { platform: 'Facebook', icon: FacebookIcon },
  { platform: 'Instagram', icon: InstagramIcon },
  { platform: 'Tiktok', icon: TikTokIcon },
  { platform: 'Linkedin', icon: LinkedinIcon },
  { platform: 'Twitter', icon: XIcon },
  { platform: 'Email', icon: MailIcon },
  { platform: 'Embed', icon: StreamlineBracketIcon },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ShareDialog: FunctionComponent<Props> = ({ isOpen, onClose }) => {
  const [modalContent, setModalContent] = useState<string>('share');
  const [url, setUrl] = useState<string>('https://www.example.com/watch?v=xmL0t-2uRts');
  const [copied, setCopied] = useState<boolean>(false);

  const generateShareLink = useCallback(
    (platform: string) => {
      const links: { [key: string]: string } = {
        Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        Instagram: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
        Twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
        Linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
        Email: `mailto:?body=${encodeURIComponent(url)}`,
        Tiktok: `https://www.tiktok.com/share?url=${encodeURIComponent(url)}`,
        Embed: `<iframe width="560" height="315" src="${encodeURIComponent(
          url
        )}" frameborder="0" allowfullscreen></iframe>`,
      };
      return links[platform] || '#';
    },
    [url]
  );

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy:', err));
  }, []);

  const embedCode = useMemo(
    () =>
      `<iframe width="560" height="315" src="${encodeURIComponent(
        url
      )}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
    [url]
  );

  if (!isOpen) return null;

  return (
    <div className="z-[99999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <span className="flex-1 text-center text-lg text-gray-700">
            {modalContent === 'share' ? 'Share' : 'Embed Video'}
          </span>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <CloseIcon />
          </button>
        </div>

        <div className="p-6">
          {modalContent === 'share' ? (
            <>
              <div className="flex justify-between mb-6 w-full gap-10 h-max overflow-x-auto overflow-y-hidden">
                {shareOptions.map(({ platform, icon: Icon }) => (
                  <div key={platform} className="relative py-3">
                    <Link
                      href={generateShareLink(platform)}
                      onClick={
                        platform === 'Embed'
                          ? e => {
                              e.preventDefault();
                              setModalContent('embed');
                            }
                          : undefined
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" transition-colors flex flex-col items-center justify-center"
                    >
                      <div className="rounded-full p-4 bg-gray-100 hover:bg-gray-200">
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className=" font-bold text-sm text-gray-700">{platform}</span>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="relative w-full mt-10 mb-12">
                <input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="w-full max-w-full pr-20 pl-6 py-3 font-medium text-gray-700 rounded-full border border-gray-300"
                />
                <Button
                  onClick={() => handleCopy(url)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10"
                >
                  Copy
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="absolute top-3">
                <button
                  onClick={() => setModalContent('share')}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <LeftChevronIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-5 px-8 md:px-36">
                <div className="font-bold mb-2 text-gray-700">Embed Code</div>
                <div className="relative">
                  <div className="text-gray-600 rounded-lg break-all mb-5">{embedCode}</div>
                  <Button onClick={() => handleCopy(embedCode)} variant="outline">
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
