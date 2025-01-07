import React, { FunctionComponent, PropsWithChildren } from 'react';
import { LogoutButton } from '../../components/client/LogoutButton';

const AdminLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-[calc(100vh-80px)] fixed top-[80px] left-0 w-full bg-white">
      <div className="max-w-screen-xl mx-auto relative">
        <div className="absolute top-8 right-4">
          <LogoutButton />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
