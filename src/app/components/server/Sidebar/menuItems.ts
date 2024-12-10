import { BinocularsIcon, StoreIcon, CategoriesIcon, SpeechBubbleIcon } from '@/src/assets/icons';
import { FunctionComponent, SVGProps } from 'react';

type NavItemKey = 'explore' | 'brands' | 'categories' | 'reviewers';

interface NavItem {
  key: NavItemKey;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  href: string;
}

export const navItems: NavItem[] = [
  { key: 'explore', icon: BinocularsIcon, href: '/explore' },
  {
    key: 'brands',
    icon: StoreIcon,
    href: '/video-reviews/brand',
  },
  {
    key: 'categories',
    icon: CategoriesIcon,
    href: '/video-reviews/productcategory',
  },
  {
    key: 'reviewers',
    icon: SpeechBubbleIcon,
    href: '/video-reviews/reviewers',
  },
];
