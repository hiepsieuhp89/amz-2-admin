'use client';
import { styled, Container, Box } from '@mui/material';
import React, { useState } from 'react';
import Header from '@/app/(DashboardLayout)/layout/header/Header';
import Sidebar from '@/app/(DashboardLayout)/layout/sidebar/Sidebar';
import { inter } from '@/fonts';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  fontFamily: inter.style.fontFamily,
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <MainWrapper className='mainwrapper !bg-[#F5F5F5]'>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper className='overflow-hidden !bg-[#F5F5F5] h-fit !pb-0 !mb-0'>
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Box className='pt-[64px] !bg-[#F5F5F5] h-full'>{children}</Box>
      </PageWrapper>
    </MainWrapper>
  );
}
export default RootLayout;
