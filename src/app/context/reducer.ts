import { createContext, Dispatch, useContext } from 'react';

import { SharedActionsProps, SharedStateProps } from './types';

export const initialState: SharedStateProps = {
  videoDetailsDrawer: false,
  userHistory: [],
};

export const SharedState = createContext<SharedStateProps>(initialState);

export const SharedDispatch = createContext<Dispatch<SharedActionsProps>>(() => {});

export const useSharedState = () => useContext(SharedState);
export const useSharedDispatch = () => useContext(SharedDispatch);

export const sharedReducer = (
  state: SharedStateProps,
  action: SharedActionsProps
): SharedStateProps => {
  switch (action.type) {
    case 'VIDEO_DETAILS_DRAWER':
      return {
        ...state,
        videoDetailsDrawer: action.payload,
      };

    case 'USER_HISTORY':
      return {
        ...state,
        userHistory: action.payload,
      };

    default:
      throw new Error(`Can't get type.`);
  }
};
