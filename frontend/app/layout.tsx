import React from 'react';
import CustomRainbowKitProvider from './CustomRainbowKitProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'AssoChain',
  description: 'AssoChain is a decentralized application for managing associations and their members',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/ico" />
      </head>
      <body className="flex flex-col min-h-screen">
        <CustomRainbowKitProvider>
          <Header />
          <main className="flex-grow flex flex-col bg-slate-100">
            {children}
          </main>
          <Footer />
        </CustomRainbowKitProvider>
      </body>
    </html>
  );
}
