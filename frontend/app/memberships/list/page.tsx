'use strict';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import MembershipList from '@/components/MembershipList';

const MembershipListPage = () => {
  
  return (
    <div className="flex">
      <Sidebar />
        <div className="flex-grow p-6">
          <MembershipList />
        </div>
    </div>
  )
};

export default MembershipListPage;
