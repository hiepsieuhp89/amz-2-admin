'use client'
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Typography } from '@mui/material';
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
  const hasUnreadNotifications = notifications?.some((n: any) => n.status === "UNREAD");

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

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Vừa xong';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    } else {
      return date.toLocaleDateString('vi-VN', { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
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
          <IconMenu2 width="24" height="24" color='#ffffff' className='text-white ' />
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
          <Link href={'https://amazon-cms-zi2z.vercel.app/'} target='_blank' className='flex items-center !bg-[#0876d7] text-white px-2 py-[4px] rounded-[4px]'>
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
              <Badge badgeContent={notifications?.filter((n: any) => n.status === "UNREAD").length || 0} color="error">
                <div className="relative">
                  <IconBellRinging />
                  {hasUnreadNotifications && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  )}
                  {hasUnreadNotifications && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
              </Badge>
            </IconButton>

            {showNotifications && (
              <div className="absolute right-0 z-50 mt-2 bg-white rounded shadow-lg w-96 max-w-[calc(100vw-20px)]">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold">Thông báo</h3>
                  {hasUnreadNotifications && (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                      {notifications?.filter((n: any) => n.status === "UNREAD").length} chưa đọc
                    </span>
                  )}
                </div>
                <div className="overflow-y-auto max-h-[70vh]">
                  {notifications?.length > 0 ? (
                    notifications.map((notification: any) => (
                      <div key={notification.id} className={`p-4 border-b last:border-b-0 hover:bg-gray-50 ${notification.status === "UNREAD" ? 'bg-blue-50' : ''}`}>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{formatDate(notification.createdAt)}</span>
                          </div>
                          <p className="text-sm text-gray-700">{notification.content}</p>
                          <div className="flex justify-end gap-2 mt-2">
                            {notification.status === "UNREAD" && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-xs px-2 py-1 text-blue-500 hover:bg-blue-100 rounded transition-colors"
                              >
                                Đánh dấu đã đọc
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="text-xs px-2 py-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Không có thông báo nào
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
