'use client';
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import Sidebar from '@/components/Sidebar';
import HomePage from '@/components/Homepage';
import UserAdminProfile from '@/components/UserAdminProfile';
import UserProfile from '@/components/UserProfile';
import { contractAddress, contractAbi } from '@/constants/index';
import '@/styles/globals.css';
import { Address, parseEther, formatUnits } from 'viem';
import { Oval } from 'react-loader-spinner';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const contractConfig = {
  address: contractAddress as Address,
  abi: contractAbi
};

interface UserData {
    isActive: boolean,
    isRegistered: boolean,
    membershipExpiry: string,
    userAddress: string
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  tokenActivated: boolean;
  subscriptionPeriods: Array<any>;
}

export default function Home() {
 const { isConnected, address: currentAddress } = useAccount();
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState(false);

  const { data : hash, error: writeError, writeContract } = useWriteContract();

  const { data: userDataResponse } = useReadContract({
    ...contractConfig,
    functionName: 'getUser',
    args: [currentAddress],
  });

  const { data: tokenBalanceData } = useReadContract({
    ...contractConfig,
    functionName: 'getCommunityTokenBalance',
    args: [currentAddress],
  });

  const { data: userNFT } = useReadContract({
    ...contractConfig,
    functionName: 'getMetadata',
    args: [currentAddress],
  });

  const userData = userDataResponse as UserData;
  const nftMetadata = userNFT as NFTMetadata;
  if (nftMetadata?.image){
    nftMetadata.image = nftMetadata?.image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  }

  const adminAddresses = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0x7cfB5Cc283F5535cd2345357350D231c0224A426'];
  const group1Addresses = ['0xBcd4042DE499D14e55001CcbB24a551F3b954096', '0x5a66Ea46499203e729a6E88B92839dE59f6bCFb9'];

  useEffect(() => {
    if (userData) {
      setIsRegistered(userData.isRegistered);
      setIsVerified(userData.isActive);
    }
    if (tokenBalanceData) {
      const balanceInBigInt = BigInt(Number(tokenBalanceData));
      const balanceInEther = formatUnits(balanceInBigInt, 18);
      setTokenBalance(Number(balanceInEther));
    }
    setIsLoading(false);
  }, [userData, tokenBalanceData, isLoading]);

  const handleRegister = async () => {
    try {

        await writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'registerUser',
        value: parseEther('0.001')
      });

      setIsLoading(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err);
    }
  };

 if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Oval
          height={80}
          width={80}
          color="#1F2937"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#1F2937"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isConnected) {
    return <HomePage />;
  }

  if (adminAddresses.includes(currentAddress ?? "")) {
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
            fbbCommunityToken={Number(tokenBalance) || 0}
            documentsInProgress={80}
            documentsOnChain={60}
            profileCompletion={60}
          />
        </div>
      </div>
    );
  }

  if (!isRegistered) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <h2 className="mb-12">Bienvenue ! 🥊</h2>
        <p className="mb-12">Vous n&apos;êtes pas adhérent(e), faites votre demande ci-dessous.</p>
           <StyledButton onClick={handleRegister}>Faire ma demande</StyledButton>
      </div>
    );
  }

  if(group1Addresses.includes(currentAddress ?? "")) {
      return (
        <div className="flex">
          <div className="flex-grow p-6">
            <UserProfile
              avatar="https://i.pravatar.cc/?img=26"
              name="Claire Martin"
              role="Adhérent(e)"
              location="Villefranche-sur-Saône"
              email="claire.martin@hotmail.com"
              fbbCommunityToken={tokenBalance || 0}
              nftMetadata={nftMetadata}
              isVerified={isVerified}
            />
          </div>
        </div>
      );
   }

  return (
    <div className="flex">
      <div className="flex-grow p-6">
        <UserProfile
          avatar="https://i.pravatar.cc/?img=60"
          name="Pierre Durand"
          role="Adhérent(e)"
          location="Lyon"
          email="pierre.durand@gmail.com"
          fbbCommunityToken={tokenBalance || 0}
          nftMetadata={nftMetadata}
          isVerified={isVerified}
        />
      </div>
    </div>
  );
}