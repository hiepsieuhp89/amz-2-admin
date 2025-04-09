"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Link,
  useTheme,
  alpha,
} from "@mui/material"
import { IconTruck, IconCoin, IconBuildingStore, IconMap, IconWeight, IconSend, IconNotes } from "@tabler/icons-react"

const ShippingConfigPage: React.FC = () => {
  const theme = useTheme()
  const [shippingType, setShippingType] = useState<string>("product_wise_shipping")
  const [flatRateShippingCost, setFlatRateShippingCost] = useState<string>("0")
  const [shippingCostAdmin, setShippingCostAdmin] = useState<string>("0")

  const handleShippingTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShippingType(event.target.value)
  }

  const handleFlatRateShippingCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlatRateShippingCost(event.target.value)
  }

  const handleShippingCostAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShippingCostAdmin(event.target.value)
  }

  const handleShippingTypeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleFlatRateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleShippingCostAdminSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  // Custom Card Component
  const ConfigCard = ({
    title,
    icon,
    children,
  }: {
    title: string
    icon: React.ReactNode
    children: React.ReactNode
  }) => (
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
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
        }}
      >
        <Box sx={{ color: theme.palette.primary.main }}>{icon}</Box>
        <Typography
          variant="subtitle1"
          component="h5"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Paper>
  )

  // Notes Card Component
  const NotesCard = ({
    notes,
    links = {},
  }: {
    notes: string[]
    links?: Record<string, string>
  }) => (
    <ConfigCard title="Ghi chú" icon={<IconNotes size={22} />}>
      <List disablePadding>
        {notes.map((note, index) => {
          // Process note text to replace links
          let noteText = note
          Object.entries(links).forEach(([key, url]) => {
            noteText = noteText.replace(key, `[[${key}]]`)
          })

          const parts = noteText.split(/\[\[(.*?)\]\]/)

          return (
            <ListItem
              key={index}
              sx={{
                py: 1.5,
                px: 2,
                backgroundColor: index % 2 === 0 ? alpha(theme.palette.background.default, 0.5) : "transparent",
                borderRadius: 1,
                mb: 1,
                "&:last-child": { mb: 0 },
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {parts.map((part, i) => {
                      // Check if this part is a link key
                      if (i % 2 === 1 && links[part]) {
                        return (
                          <Link
                            key={i}
                            href={links[part]}
                            sx={{
                              fontWeight: 500,
                              color: theme.palette.primary.main,
                              textDecoration: "none",
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {part}
                          </Link>
                        )
                      }
                      return part
                    })}
                  </Typography>
                }
              />
            </ListItem>
          )
        })}
      </List>
    </ConfigCard>
  )

  return (
    <Box sx={{ px: { xs: "15px", lg: "25px" }, py: 3, maxWidth: "1400px", mx: "auto" }}>
      {/* Shipping Method Selection */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 4,
          "& > *": {
            width: { xs: "100%", md: "calc(50% - 12px)" },
          },
        }}
      >
        <ConfigCard title="Chọn phương thức vận chuyển" icon={<IconTruck size={22} />}>
          <Box component="form" onSubmit={handleShippingTypeSubmit}>
            <input type="hidden" name="_token" value="bN0GV6QWZn7MFzBHfczYAjtZNL4dfXjbmFKTD9Jr" />
            <input type="hidden" name="type" value="shipping_type" />

            <RadioGroup name="shipping_type" value={shippingType} onChange={handleShippingTypeChange}>
              <FormControlLabel
                value="product_wise_shipping"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconCoin size={18} />
                    <Typography variant="body2">Chi phí vận chuyển sản phẩm khôn ngoan</Typography>
                  </Box>
                }
                sx={{ mb: 1.5 }}
              />

              <FormControlLabel
                value="flat_rate"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconCoin size={18} />
                    <Typography variant="body2">Phí vận chuyển cố định</Typography>
                  </Box>
                }
                sx={{ mb: 1.5 }}
              />

              <FormControlLabel
                value="seller_wise_shipping"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconBuildingStore size={18} />
                    <Typography variant="body2">Người bán khôn ngoan Chi phí vận chuyển cố định</Typography>
                  </Box>
                }
                sx={{ mb: 1.5 }}
              />

              <FormControlLabel
                value="area_wise_shipping"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconMap size={18} />
                    <Typography variant="body2">Area Wise Flat Shipping Cost</Typography>
                  </Box>
                }
                sx={{ mb: 1.5 }}
              />

              <FormControlLabel
                value="carrier_wise_shipping"
                control={
                  <Radio
                    sx={{
                      color: theme.palette.primary.main,
                      "&.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconWeight size={18} />
                    <Typography variant="body2">Carrier Wise Shipping Cost</Typography>
                  </Box>
                }
              />
            </RadioGroup>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                startIcon={<IconSend size={16} />}
                sx={{
                  textTransform: "none",
                  borderRadius: 1.5,
                  px: 2,
                }}
              >
                Tiết kiệm
              </Button>
            </Box>
          </Box>
        </ConfigCard>

        <NotesCard
          notes={[
            "1. Product Wise Shipping Cost calculation: Shipping cost is calculate by addition of each product shipping cost.",
            "2. Flat Rate Shipping Cost calculation: How many products a customer purchase, doesn't matter. Shipping cost is fixed.",
            "3. Seller Wise Flat Shipping Cost calculation: Fixed rate for each seller. If customers purchase 2 product from two seller shipping cost is calculated by addition of each seller flat shipping cost.",
            "4. Area Wise Flat Shipping Cost calculation: Fixed rate for each area. If customers purchase multiple products from one seller shipping cost is calculated by the customer shipping area. To configure area wise shipping cost go to Thành phố vận chuyển.",
            "5. Carrier Based Shipping Cost calculation: Shipping cost calculate in addition with carrier. In each carrier you can set free shipping cost or can set weight range or price range shipping cost. To configure carrier based shipping cost go to Shipping Carriers.",
          ]}
          links={{
            "Thành phố vận chuyển": "https://amazonworld.cc/admin/cities",
            "Shipping Carriers": "https://amazonworld.cc/admin/carriers",
          }}
        />
      </Box>

      {/* Flat Rate Shipping Cost */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 4,
          "& > *": {
            width: { xs: "100%", md: "calc(50% - 12px)" },
          },
        }}
      >
        <ConfigCard title="Chi phí cố định" icon={<IconCoin size={22} />}>
          <Box component="form" onSubmit={handleFlatRateSubmit}>
            <input type="hidden" name="_token" value="bN0GV6QWZn7MFzBHfczYAjtZNL4dfXjbmFKTD9Jr" />
            <input type="hidden" name="type" value="flat_rate_shipping_cost" />

            <TextField
              fullWidth
              name="flat_rate_shipping_cost"
              value={flatRateShippingCost}
              onChange={handleFlatRateShippingCostChange}
              variant="outlined"
              size="small"
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                startIcon={<IconSend size={16} />}
                sx={{
                  textTransform: "none",
                  borderRadius: 1.5,
                  px: 2,
                }}
              >
                Tiết kiệm
              </Button>
            </Box>
          </Box>
        </ConfigCard>

        <NotesCard notes={["1. Flat rate shipping cost is applicable if Flat rate shipping is enabled."]} />
      </Box>

      {/* Shipping Cost for Admin Products */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          "& > *": {
            width: { xs: "100%", md: "calc(50% - 12px)" },
          },
        }}
      >
        <ConfigCard title="Chi phí vận chuyển cho các sản phẩm quản trị" icon={<IconBuildingStore size={22} />}>
          <Box component="form" onSubmit={handleShippingCostAdminSubmit}>
            <input type="hidden" name="_token" value="bN0GV6QWZn7MFzBHfczYAjtZNL4dfXjbmFKTD9Jr" />
            <input type="hidden" name="type" value="shipping_cost_admin" />

            <TextField
              fullWidth
              name="shipping_cost_admin"
              value={shippingCostAdmin}
              onChange={handleShippingCostAdminChange}
              variant="outlined"
              size="small"
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                startIcon={<IconSend size={16} />}
                sx={{
                  textTransform: "none",
                  borderRadius: 1.5,
                  px: 2,
                }}
              >
                Tiết kiệm
              </Button>
            </Box>
          </Box>
        </ConfigCard>

        <NotesCard notes={["1. Shipping cost for admin is applicable if Seller wise shipping cost is enabled."]} />
      </Box>
    </Box>
  )
}

export default ShippingConfigPage

