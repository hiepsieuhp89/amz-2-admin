'use client'
import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useGetProfileData } from "@/hooks/authentication";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const router = useRouter()
  const logout = () => {
    cookies.remove('accessToken');
    router.push('/sign-in');
  };
  const { profileData } = useGetProfileData()

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "white",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
        <span className="pl-1 text-xs text-white ">{profileData?.data?.username}</span>
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <Link href={'/user_infor'}>
          <MenuItem>
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>Hồ sơ</ListItemText>
          </MenuItem>
        </Link>
        <Box mt={1} py={1} px={2}>
          <Button
            onClick={logout}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Đăng xuất
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
