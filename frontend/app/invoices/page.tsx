'use strict';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import InvoiceList from '@/components/Invoice';

const InvoiceListPage = () => {
  
  return (
    <div className="flex">
      <Sidebar />
        <div className="flex-grow p-6">
          <InvoiceList />
        </div>
    </div>
  )
};

export default InvoiceListPage;
