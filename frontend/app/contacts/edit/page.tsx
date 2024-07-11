'use strict';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import EditContact from '@/components/EditContact';

const AddMembership = () => {
    return (
    <div className="flex">
      <Sidebar />
        <div className="flex-grow p-6">
          <EditContact />;
        </div>
    </div>
  )
};

export default AddMembership;