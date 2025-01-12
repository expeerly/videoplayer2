export type SharedStateProps = {
  videoDetailsDrawer: boolean;
  userHistory: string[];
};

export type SharedActionsProps =
  | { type: 'VIDEO_DETAILS_DRAWER'; payload: boolean }
  | { type: 'USER_HISTORY'; payload: string[] };

export type CSVData = {
  [key: string]: string | number;
}[];
