'use client';
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from "wagmi";
import Sidebar from '@/components/Sidebar';
import HomePage from '@/components/Homepage';
import UserAdminProfile from '@/components/UserAdminProfile';
import UserProfile from '@/components/UserProfile';
import '../styles/globals.css';

export default function Home() {
  const { isConnected, address: currentAddress } = useAccount();
  console.log('isConnected', isConnected)
    console.log('currentAddress', currentAddress)

   if (isConnected && currentAddress === '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266') {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6">
          <UserAdminProfile
            avatar="https://i.pravatar.cc/?img=12"
            name="Jean Dupont"
            role="Secrétaire"
            location="Lyon"
            email="max@kt.com"
            fbbCommunityToken={0}
            documentsInProgress={80}
            documentsOnChain={60}
            profileCompletion={60}
          />
        </div>
      </div>
    );
  } else if(isConnected && currentAddress !== '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266') {
      return (
          <div className="flex">
            <div className="flex-grow p-6">
              <UserProfile
                avatar="https://i.pravatar.cc/?img=26"
                name="Claire Martin"
                role="Adhérent(e)"
                location="Villefranche-sur-Saône"
                email="claire.martin@hotmail.com"
                fbbCommunityToken={3423243}
                nftImageUrl="https://i.pravatar.cc/150?img=3"
              />
        </div>
      </div>
    );
    } else if(isConnected && currentAddress !== '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC') {
      return (
          <div className="flex">
            <div className="flex-grow p-6">
              <UserProfile
                avatar="https://i.pravatar.cc/?img=60"
                name="Pierre Durand"
                role="Adhérent(e)"
                location="Lyon"
                email="pierre.durand@gmail.com"
                fbbCommunityToken={3423243}
                nftImageUrl="https://i.pravatar.cc/60?img=3"
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