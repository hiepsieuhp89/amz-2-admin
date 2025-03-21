'use client'
import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import cookies from 'js-cookie';
// components
import Profile from './Profile';
import { IconBellRinging, IconExternalLink, IconHome, IconMenu2, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const router = useRouter()

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '50px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));
  const deleteCache = () => {
    window.location.reload();
  };
  return (
    <AppBarStyled position="fixed" color="default" className='!bg-[#263238] '>
      <ToolbarStyled>
        <IconButton
          className='text-white'

          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              xl: "none",
              lg: "inline",
            },
            color: "white"
          }}
        >
          <IconMenu2 width="24" height="24" color='#ffffff' className=' text-white' />
        </IconButton>


        <Box flexGrow={1} />
        <div className='flex gap-2'>
          <Link href={'/'} className='flex items-center !bg-[#0876d7] text-white px-2 py-[4px] rounded-[4px]'>
            <IconHome size={18} />
            Trang chủ
          </Link>
          <button onClick={deleteCache} className='flex items-center !bg-[#B83442] text-white px-2 py-[4px] rounded-[4px]' >
            <IconTrash size={18} />
            Xoá Cache
          </button>
          <Link href={'https://xosodinh.net/'} target='_blank' className='flex items-center !bg-[#0876d7] text-white px-2 py-[4px] rounded-[4px]'>
            <IconExternalLink size={18} />
            Xem website
          </Link>
        </div>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">

          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
