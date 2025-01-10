import { BrandWithData, CategoryWithData } from '@/src/db/types';

export type SharedStateProps = {
  videoDetailsDrawer: boolean;
  userHistory: string[];
  categories: CategoryWithData[];
  brands: BrandWithData[];
};

export type SharedActionsProps =
  | { type: 'VIDEO_DETAILS_DRAWER'; payload: boolean }
  | { type: 'USER_HISTORY'; payload: string[] }
  | { type: 'CATEGORIES'; payload: CategoryWithData[] }
  | { type: 'BRANDS'; payload: BrandWithData[] }
  | { type: 'USER_HISTORY'; payload: string[] };

export type CSVData = {
  [key: string]: string | number;
}[];
