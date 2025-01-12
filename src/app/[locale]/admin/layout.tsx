import React, { FunctionComponent, PropsWithChildren } from 'react';

const AdminLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-[calc(100vh-80px)] fixed top-[80px] left-0 w-full bg-white overflow-auto">
      <div className="max-w-screen-xl mx-auto relative h-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
