import { RightChevronIcon } from '@/src/assets/icons';
import { Avatar } from './Avatar';
import { FunctionComponent } from 'react';

export type ProfileCardProps = {
  description?: string;
  title?: string;
  subTitle?: string;
  imageUrl?: string;
};

const tempData = {
  title: 'Marisa C.',
  subTitle: '38, Zurich (CH)',
  description:
    'I love cooking and getting people around in our garden, specially when weather is good...',
};

export const ProfileCard: FunctionComponent<ProfileCardProps> = ({
  description = tempData.description,
  title = tempData.title,
  subTitle = tempData.subTitle,
  imageUrl,
}) => {
  return (
    <div>
      <div className="flex items-center gap-4 py-b bg-white  max-w-sm">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Avatar src={imageUrl} alt={title} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className=" font-bold text-gray-700">{title}</h2>
            <RightChevronIcon className="w-2 h-3" />
          </div>
          <p className="text-sm text-gray-500">{subTitle}</p>
        </div>
      </div>

      <div className="flex  sm:w-2/5 items-center mt-2">
        <p className=" text-gray-700 ml-0 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};
