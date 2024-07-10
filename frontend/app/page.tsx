'use client';
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from "wagmi";

import '../styles/globals.css';


export default function Home() {
  const { isConnected, address: currentAddress } = useAccount();
  console.log('isConnected', isConnected)

  if(isConnected) { 
      return (
    <>
      main content if connected
    </>
  );
  } else {
    return (
    <>
      main content if not connected
    </>
  );
  }

}