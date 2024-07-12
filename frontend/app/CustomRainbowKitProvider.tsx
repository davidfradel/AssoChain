'use client';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider 
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  hardhat,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'AssoChain',
    projectId: 'aac33d9edae39208cc75c3e675d78fed',
    chains: [hardhat,sepolia],
    ssr: true, 
});

const queryClient = new QueryClient();

const CustomProviderKitProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
}>) => {
  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
                {children}
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}

export default CustomProviderKitProvider;