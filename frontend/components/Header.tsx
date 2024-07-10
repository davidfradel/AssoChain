'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ConnectButton } from '@rainbow-me/rainbowkit';


const Header = () => {


 return (
   <header className="container mx-auto flex my-1 justify-between items-center">
      <Link href="/">
        <Image src="/logo.png" alt="AssoChai Logo" width={120} height={78} />
      </Link>
      <ConnectButton />
  </header>
  );
};

export default Header;
