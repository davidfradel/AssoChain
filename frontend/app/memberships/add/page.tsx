'use strict';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import AddMembership from '@/components/AddMembership';

const AddMembershipPage = () => {
  
  return (
    <div className="flex">
      <Sidebar />
        <div className="flex-grow p-6">
          <AddMembership />
        </div>
    </div>
  )
};

export default AddMembershipPage;
