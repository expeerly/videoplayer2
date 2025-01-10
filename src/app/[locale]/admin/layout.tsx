import React, { FunctionComponent, PropsWithChildren } from 'react';

const AdminLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-[calc(100vh-80px)] fixed top-[80px] left-0 w-full bg-white">
      <div className="max-w-screen-xl mx-auto relative h-full overflow-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
