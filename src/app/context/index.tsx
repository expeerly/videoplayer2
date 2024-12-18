'use client';

import { FunctionComponent, PropsWithChildren, useReducer } from 'react';

import { SharedDispatch, initialState, sharedReducer, SharedState } from './reducer';

const SharedContextProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(sharedReducer, initialState, () => {
    return initialState;
  });

  return (
    <SharedDispatch.Provider value={dispatch}>
      <SharedState.Provider value={state}>{children}</SharedState.Provider>
    </SharedDispatch.Provider>
  );
};

export default SharedContextProvider;
