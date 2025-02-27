'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import SportResults from '@/components/SportResults';

const ResultsPage = () => {
    return (
    <div className="flex">
      <Sidebar />
        <div className="flex-grow p-6">
          <SportResults />
        </div>
    </div>
  )
};

export default ResultsPage;
