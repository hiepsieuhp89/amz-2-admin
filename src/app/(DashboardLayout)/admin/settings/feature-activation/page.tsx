"use client"

import type React from "react"
import { useState } from "react"
import { Box, Typography, Paper, Switch, Alert, Link, useTheme, alpha } from "@mui/material"
import {
  IconShieldLock,
  IconTools,
  IconPhoto,
  IconUsers,
  IconTags,
  IconWallet,
  IconTicket,
  IconMapPin,
  IconMessage,
  IconPackage,
  IconClipboardCheck,
  IconMail,
  IconSearch,
  IconExternalLink,
  IconFloatLeft,
  IconHistory,
  IconCreditCard,
  IconUserCheck,
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandTwitter,
  IconBrandApple,
  IconNews,
} from "@tabler/icons-react"

interface SettingCardProps {
  title: string
  settingKey: string
  defaultChecked?: boolean
  icon: React.ReactNode
  alertMessage?: string
  alertLink?: {
    text: string
    url: string
  }
}

const FeatureActivationPage = () => {
  const theme = useTheme()

  // State to track settings
  const [settings, setSettings] = useState({
    FORCE_HTTPS: true,
    maintenance_mode: false,
    disable_image_optimization: false,
    vendor_system_activation: true,
    classified_product: true,
    wallet_system: true,
    coupon_system: false,
    pickup_point: true,
    conversation_system: true,
    product_manage_by_admin: false,
    product_approve_by_admin: true,
    email_verification: false,
    product_query_activation: false,
    product_external_link_for_seller: true,
    use_floating_buttons: true,
    last_viewed_product_activation: true,
    newsletter_activation: false,
    guest_checkout_activation: true,
    seller_registration_verify: true,
    customer_registration_verify: true,
    facebook_login: false,
    google_login: false,
    twitter_login: false,
    apple_login: false,
  })

  // Function to update settings
  const updateSettings = (key: string, value: boolean) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }))

    // In a real app, this would make an API call to update the setting
    console.log(`Setting ${key} updated to ${value}`)
  }

  // Custom styled Switch component
  const StyledSwitch = (props: any) => (
    <Switch
      {...props}
      sx={{
        "& .MuiSwitch-switchBase.Mui-checked": {
          color: "#10b981",
          "&:hover": {
            backgroundColor: alpha("#10b981", 0.1),
          },
        },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
          backgroundColor: "#10b981",
        },
        "& .MuiSwitch-track": {
          borderRadius: 26 / 2,
        },
        "& .MuiSwitch-thumb": {
          boxShadow: "0 2px 4px 0 rgba(0, 35, 11, 0.2)",
        },
      }}
    />
  )

  // Setting Card Component
  const SettingCard: React.FC<SettingCardProps> = ({
    title,
    settingKey,
    defaultChecked = false,
    icon,
    alertMessage,
    alertLink,
  }) => {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
          height: "100%",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Box sx={{ color: theme.palette.primary.main, display: "flex", alignItems: "center" }}>{icon}</Box>
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 600,
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StyledSwitch
            checked={settings[settingKey as keyof typeof settings]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSettings(settingKey, e.target.checked)}
          />

          {alertMessage && (
            <Alert
              severity="info"
              sx={{
                mt: 2,
                fontSize: "0.8rem",
                width: "100%",
                "& .MuiAlert-message": {
                  width: "100%",
                },
              }}
            >
              {alertMessage}
              {alertLink && (
                <Link
                  href={alertLink.url}
                  sx={{
                    display: "block",
                    mt: 0.5,
                    fontWeight: 500,
                  }}
                >
                  {alertLink.text}
                </Link>
              )}
            </Alert>
          )}
        </Box>
      </Paper>
    )
  }

  // Section Header
  const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <Box sx={{ mt: 4, mb: 3 }}>
      <Typography
        variant="h5"
        component="h4"
        sx={{
          textAlign: "center",
          color: alpha(theme.palette.text.primary, 0.7),
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: 3,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1,
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  )

  return (
    <Box sx={{ px: { xs: "15px", lg: "25px" }, py: 3, maxWidth: "1400px", mx: "auto" }}>
      {/* System Settings */}
      <SectionHeader title="Hệ thống" />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          "& > *": {
            width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
          },
        }}
      >
        <SettingCard
          title="Kích hoạt HTTPS"
          settingKey="FORCE_HTTPS"
          defaultChecked={true}
          icon={<IconShieldLock size={20} />}
        />

        <SettingCard title="Kích hoạt chế độ bảo trì" settingKey="maintenance_mode" icon={<IconTools size={20} />} />

        <SettingCard
          title="Disable image encoding?"
          settingKey="disable_image_optimization"
          icon={<IconPhoto size={20} />}
        />
      </Box>

      {/* Business Related Settings */}
      <SectionHeader title="Liên quan đến Doanh nghiệp" />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          "& > *": {
            width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
          },
        }}
      >
        <SettingCard
          title="Kích hoạt hệ thống nhà cung cấp"
          settingKey="vendor_system_activation"
          defaultChecked={true}
          icon={<IconUsers size={20} />}
        />

        <SettingCard
          title="Sản phẩm được phân loại"
          settingKey="classified_product"
          defaultChecked={true}
          icon={<IconTags size={20} />}
        />

        <SettingCard
          title="Kích hoạt hệ thống ví"
          settingKey="wallet_system"
          defaultChecked={true}
          icon={<IconWallet size={20} />}
        />

        <SettingCard
          title="Kích hoạt hệ thống phiếu thưởng"
          settingKey="coupon_system"
          icon={<IconTicket size={20} />}
        />

        <SettingCard
          title="Kích hoạt điểm đón"
          settingKey="pickup_point"
          defaultChecked={true}
          icon={<IconMapPin size={20} />}
        />

        <SettingCard
          title="Kích hoạt cuộc trò chuyện"
          settingKey="conversation_system"
          defaultChecked={true}
          icon={<IconMessage size={20} />}
        />

        <SettingCard
          title="Seller Product Manage By Admin"
          settingKey="product_manage_by_admin"
          icon={<IconPackage size={20} />}
          alertMessage="After activate this option Cash On Delivery of Seller product will be managed by Admin."
        />

        <SettingCard
          title="Admin Approval On Seller Product"
          settingKey="product_approve_by_admin"
          defaultChecked={true}
          icon={<IconClipboardCheck size={20} />}
          alertMessage="After activate this option, Admin approval need to seller product."
        />

        <SettingCard
          title="Email xác thực"
          settingKey="email_verification"
          icon={<IconMail size={20} />}
          alertMessage="You need to configure SMTP correctly to enable this feature."
          alertLink={{
            text: "Định cấu hình ngay",
            url: "https://amazonworld.cc/admin/smtp-settings",
          }}
        />

        <SettingCard
          title="Product Query Activation"
          settingKey="product_query_activation"
          icon={<IconSearch size={20} />}
        />

        <SettingCard
          title="Product External Link for Seller"
          settingKey="product_external_link_for_seller"
          defaultChecked={true}
          icon={<IconExternalLink size={20} />}
        />

        <SettingCard
          title="Use Floating Buttons In Website"
          settingKey="use_floating_buttons"
          defaultChecked={true}
          icon={<IconFloatLeft size={20} />}
        />

        <SettingCard
          title="Last Viewed Products Activation"
          settingKey="last_viewed_product_activation"
          defaultChecked={true}
          icon={<IconHistory size={20} />}
        />

        <SettingCard
          title="Newsletter Activation"
          settingKey="newsletter_activation"
          icon={<IconNews size={20} />}
        />

        <SettingCard
          title="Kích hoạt thanh toán của khách"
          settingKey="guest_checkout_activation"
          defaultChecked={true}
          icon={<IconCreditCard size={20} />}
          alertMessage="You need to configure SMTP correctly to enable this feature."
          alertLink={{
            text: "Định cấu hình ngay",
            url: "https://amazonworld.cc/admin/smtp-settings",
          }}
        />

        <SettingCard
          title="Seller Registration Verification"
          settingKey="seller_registration_verify"
          defaultChecked={true}
          icon={<IconUserCheck size={20} />}
        />

        <SettingCard
          title="Customer Registration Verification"
          settingKey="customer_registration_verify"
          defaultChecked={true}
          icon={<IconUserCheck size={20} />}
        />
      </Box>

      {/* Social Login Settings */}
      <SectionHeader title="Đăng nhập mạng xã hội" />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          "& > *": {
            width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
          },
        }}
      >
        <SettingCard
          title="đăng nhập Facebook"
          settingKey="facebook_login"
          icon={<IconBrandFacebook size={20} />}
          alertMessage="Bạn cần định cấu hình Facebook Client chính xác để bật tính năng này."
          alertLink={{
            text: "Định cấu hình ngay",
            url: "https://amazonworld.cc/admin/social-login",
          }}
        />

        <SettingCard
          title="Đăng nhập Google"
          settingKey="google_login"
          icon={<IconBrandGoogle size={20} />}
          alertMessage="Bạn cần định cấu hình Google Client chính xác để bật tính năng này."
          alertLink={{
            text: "Định cấu hình ngay",
            url: "https://amazonworld.cc/admin/social-login",
          }}
        />

        <SettingCard
          title="Đăng nhập Twitter"
          settingKey="twitter_login"
          icon={<IconBrandTwitter size={20} />}
          alertMessage="Bạn cần định cấu hình Ứng dụng khách Twitter một cách chính xác để bật tính năng này."
          alertLink={{
            text: "Định cấu hình ngay",
            url: "https://amazonworld.cc/admin/social-login",
          }}
        />

        <SettingCard
          title="Apple login"
          settingKey="apple_login"
          icon={<IconBrandApple size={20} />}
          alertMessage="You need to configure Apple Client correctly to enable this feature."
          alertLink={{
            text: "Định cấu hình ngay",
            url: "https://amazonworld.cc/admin/social-login",
          }}
        />
      </Box>
    </Box>
  )
}

export default FeatureActivationPage

