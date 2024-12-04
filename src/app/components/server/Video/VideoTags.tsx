import React, { FunctionComponent } from 'react';
import { Chip } from '../Chip';

type Props = {
  variant?: 'solid' | 'outlined';
};

export const VideoTags: FunctionComponent<Props> = ({ variant }) => {
  return (
    <div className="flex w-full gap-3 px-5 overflow-x-auto scrollbar-hide scrollbar-none">
      <Chip variant={variant}>Explore</Chip>
      <Chip variant={variant}>Beauty & Personal Care</Chip>
      <Chip variant={variant}>Dyson</Chip>
      <Chip variant={variant}>Supersonic Professionalv</Chip>
    </div>
  );
};
