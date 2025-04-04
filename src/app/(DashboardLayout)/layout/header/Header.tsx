'use client'
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import cookies from 'js-cookie';
// components
import Profile from './Profile';
import { IconBellRinging, IconExternalLink, IconHome, IconMenu2, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetNotifications, useMarkNotificationAsRead, useDeleteNotification } from "@/hooks/notification";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: notificationsResponse } = useGetNotifications();
  const markAsRead = useMarkNotificationAsRead();
  const deleteNotification = useDeleteNotification();

  const notifications = notificationsResponse?.data?.data;
  // Check if there are unread notifications
  const hasUnreadNotifications = notifications?.some((n: any) => !n.isRead);

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

  const handleMarkAsRead = (id: string) => {
    markAsRead.mutate(id);
  };

  const handleDeleteNotification = (id: string) => {
    deleteNotification.mutate(id);
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
          <div className="relative">
            <IconButton
              color="inherit"
              aria-label="notifications"
              sx={{ color: 'white' }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Badge badgeContent={notifications?.length} color="error">
                <div className="relative">
                  <IconBellRinging />
                  {/* {hasUnreadNotifications && ( */}
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  {/* )}
                  {hasUnreadNotifications && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )} */}
                </div>
              </Badge>
            </IconButton>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Thông báo</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.length > 0 ? (
                    notifications.map((notification: any) => (
                      <div key={notification.id} className={`p-4 border-b last:border-b-0 hover:bg-gray-50 ${!notification.isRead ? 'bg-gray-100' : ''}`}>
                        <div className="flex justify-between items-center">
                          <p>{notification.message}</p>
                          <div className="flex gap-2">
                            {!notification.isRead && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-blue-500 hover:text-blue-700 text-sm"
                              >
                                Đã đọc
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Không có thông báo mới
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

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
