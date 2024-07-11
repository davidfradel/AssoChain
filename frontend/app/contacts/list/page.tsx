'use strict';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import MemberList from '@/components/MemberList';

const MembersPage = () => {
    return (
    <div className="flex">
      <Sidebar />
        <div className="flex-grow p-6">
          <MemberList />
        </div>
    </div>
  )
};

export default MembersPage;
