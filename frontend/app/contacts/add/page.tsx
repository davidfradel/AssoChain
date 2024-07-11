'use strict';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import AddContact from '@/components/AddContact';

const AddContactPage = () => {
  
  return (
    <div className="flex">
      <Sidebar />
        <div className="flex-grow p-6">
          <AddContact />
        </div>
    </div>
  )
};

export default AddContactPage;
