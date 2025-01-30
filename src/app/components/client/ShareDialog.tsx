import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
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
import { VideoResponse } from '@/src/db/types';

const shareOptions = [
  { platform: 'Facebook', icon: FacebookIcon },
  { platform: 'Instagram', icon: InstagramIcon },
  { platform: 'Tiktok', icon: TikTokIcon },
  { platform: 'Linkedin', icon: LinkedinIcon },
  { platform: 'X', icon: XIcon },
  { platform: 'Email', icon: MailIcon },
  { platform: 'Embed', icon: StreamlineBracketIcon },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  video: VideoResponse;
};

export const ShareDialog: FunctionComponent<Props> = ({ isOpen, video, onClose }) => {
  const [modalContent, setModalContent] = useState<string>('share');
  const [url, setUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setUrl(`${process.env.SITEBASEURL}/explore/${video.id}`);
  }, [video]);

  const generateShareLink = useCallback(
    (platform: string) => {
      const encodedUrl = encodeURIComponent(url);
      const encodedTitle = encodeURIComponent(video.videoTitle);
      const encodedDescription = encodeURIComponent(video.metaDescription);

      const links: { [key: string]: string } = {
        Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        // Instagram doesn't support direct web sharing, we'll handle it differently in the UI
        Instagram: '#',
        // Updated to X.com
        X: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        Linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        // Enhanced email sharing with subject and body
        Email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
        // Enhanced TikTok sharing
        Tiktok: `https://www.tiktok.com/share?url=${encodedUrl}&title=${encodedTitle}`,
        Embed: `<iframe width="560" height="315" src="${encodedUrl}" frameborder="0" allowfullscreen></iframe>`,
      };
      return links[platform] || '#';
    },
    [url, video]
  );

  const handleShare = useCallback(
    (platform: string) => {
      if (platform === 'Instagram') {
        // Handle Instagram sharing differently - maybe show a tooltip or message
        alert('To share on Instagram, please copy the link and share it through the Instagram app');
        return;
      }

      const shareUrl = generateShareLink(platform);
      if (shareUrl !== '#') {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }
    },
    [generateShareLink]
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
      `<iframe 
        width="441px" 
        height="784px" 
        src="https://stream.mux.com/${video.playbackId}/high.mp4"
        title="${video.videoTitle}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen
      ></iframe>`,
    [video]
  );

  if (!isOpen) return null;

  return (
    <div className="z-[99999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          {modalContent !== 'share' && (
            <button
              onClick={() => setModalContent('share')}
              className="size-10 p-2 flex justify-center items-center hover:bg-gray-100 rounded-full"
            >
              <LeftChevronIcon className="w-4 h-4" />
            </button>
          )}

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
                    <button
                      onClick={() =>
                        platform === 'Embed' ? setModalContent('embed') : handleShare(platform)
                      }
                      className="transition-colors flex flex-col items-center justify-center"
                    >
                      <div className="rounded-full p-4 bg-gray-100 hover:bg-gray-200">
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="font-bold text-sm text-gray-700">{platform}</span>
                    </button>
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
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </>
          ) : (
            <>
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
