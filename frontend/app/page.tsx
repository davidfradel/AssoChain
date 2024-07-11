'use client';
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from "wagmi";
import Sidebar from '@/components/Sidebar';
import HomePage from '@/components/Homepage';
import UserProfile from '@/components/UserProfile';
import '../styles/globals.css';

export default function Home() {
  const { isConnected, address: currentAddress } = useAccount();
  console.log('isConnected', isConnected)
    console.log('currentAddress', currentAddress)

   if (isConnected) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6">
          <UserProfile
            avatar="https://i.pravatar.cc/?img=12"
            name="Jean Dupont"
            role="Secrétaire"
            location="Lyon"
            email="max@kt.com"
            fbbCommunityToken={4500}
            documentsInProgress={80}
            documentsOnChain={60}
            profileCompletion={50}
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <HomePage />
      </>
    );
  }
}