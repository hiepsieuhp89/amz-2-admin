"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Pagination,
  useTheme,
  alpha,
  useMediaQuery,
  IconButton,
  Tooltip,
  Chip,
  TextField,
  InputAdornment,
  Avatar,
} from "@mui/material"
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconTruck,
  IconClock,
  IconChevronRight,
  IconChevronLeft,
  IconPackage,
} from "@tabler/icons-react"

interface Carrier {
  id: number
  name: string
  logo: string
  transitTime: number
  status: boolean
}

const ShippingCarriersPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [page, setPage] = useState<number>(1)

  // Mock data for carriers
  const [carriers, setCarriers] = useState<Carrier[]>([
    {
      id: 1,
      name: "FedEx",
      logo: "https://amazonworld.cc/public/uploads/all/Ww3tlahxagxsXHSpIze1rncY0Fa5T6jQehWlglFE.webp",
      transitTime: 24,
      status: true,
    },
    {
      id: 2,
      name: "UPS",
      logo: "/placeholder.svg?height=100&width=100",
      transitTime: 48,
      status: true,
    },
    {
      id: 3,
      name: "DHL",
      logo: "/placeholder.svg?height=100&width=100",
      transitTime: 72,
      status: false,
    },
    {
      id: 4,
      name: "USPS",
      logo: "/placeholder.svg?height=100&width=100",
      transitTime: 96,
      status: true,
    },
  ])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleStatusChange = (id: number, checked: boolean) => {
    // Update the status of the carrier
    setCarriers((prevCarriers) =>
      prevCarriers.map((carrier) => (carrier.id === id ? { ...carrier, status: checked } : carrier)),
    )
  }

  const filteredCarriers = carriers.filter((carrier) => carrier.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Format transit time to display in a more user-friendly way
  const formatTransitTime = (hours: number) => {
    if (hours < 24) {
      return `${hours} hours`
    } else {
      const days = Math.floor(hours / 24)
      const remainingHours = hours % 24
      if (remainingHours === 0) {
        return `${days} day${days > 1 ? "s" : ""}`
      } else {
        return `${days} day${days > 1 ? "s" : ""} ${remainingHours} hour${remainingHours > 1 ? "s" : ""}`
      }
    }
  }

  return (
    <Box sx={{ px: { xs: "15px", lg: "25px" }, py: 3, maxWidth: "1400px", mx: "auto" }}>
      {/* Title Bar */}
      <Box
        sx={{
          mt: 2,
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconTruck size={28} color={theme.palette.primary.main} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            All Carriers
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          href="https://amazonworld.cc/admin/carriers/create"
          startIcon={<IconPlus size={18} />}
          sx={{
            textTransform: "none",
            borderRadius: 8,
            px: 2,
            py: 1,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
            },
          }}
        >
          Add New Carrier
        </Button>
      </Box>

      {/* Main Content */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
          },
        }}
      >
        {/* Card Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: 2,
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1 }}>
            <IconPackage size={20} color={theme.palette.primary.main} />
            <Typography
              variant="subtitle1"
              component="h5"
              sx={{
                fontWeight: 600,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Carriers
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <TextField
              placeholder="Search carriers..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              sx={{
                minWidth: { xs: "100%", sm: 220 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch size={18} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                <TableCell
                  width="10%"
                  sx={{
                    fontWeight: 600,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  width="15%"
                  sx={{
                    fontWeight: 600,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                  }}
                >
                  Logo
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                  }}
                >
                  Tên
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  Transit Time
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                  }}
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 600,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                  }}
                >
                  Tùy chọn
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCarriers.length > 0 ? (
                filteredCarriers.map((carrier) => (
                  <TableRow
                    key={carrier.id}
                    hover
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: alpha(theme.palette.background.default, 0.5),
                      },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      {carrier.id}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      <Avatar
                        src={carrier.logo}
                        alt={carrier.name}
                        variant="rounded"
                        sx={{
                          width: 50,
                          height: 50,
                          border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                          backgroundColor: "white",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      <Typography variant="body1" fontWeight={500}>
                        {carrier.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: { xs: "block", md: "none" },
                          mt: 0.5,
                        }}
                      >
                        <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                          <IconClock size={14} />
                          {formatTransitTime(carrier.transitTime)}
                        </Box>
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        display: { xs: "none", md: "table-cell" },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconClock size={16} />
                        <Typography variant="body2">{formatTransitTime(carrier.transitTime)}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Switch
                          checked={carrier.status}
                          onChange={(e) => handleStatusChange(carrier.id, e.target.checked)}
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
                          }}
                        />
                        <Chip
                          label={carrier.status ? "Active" : "Inactive"}
                          size="small"
                          color={carrier.status ? "success" : "default"}
                          sx={{
                            ml: 1,
                            fontWeight: 500,
                            fontSize: "0.75rem",
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            sx={{
                              color: alpha(theme.palette.primary.main, 0.7),
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              "&:hover": {
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                              },
                              borderRadius: "50%",
                              width: 32,
                              height: 32,
                            }}
                            href={`https://amazonworld.cc/admin/carriers/${carrier.id}/edit`}
                          >
                            <IconEdit size={16} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            sx={{
                              color: alpha(theme.palette.error.main, 0.7),
                              backgroundColor: alpha(theme.palette.error.main, 0.1),
                              "&:hover": {
                                backgroundColor: alpha(theme.palette.error.main, 0.2),
                              },
                              borderRadius: "50%",
                              width: 32,
                              height: 32,
                            }}
                          >
                            <IconTrash size={16} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      <IconTruck size={48} color={alpha(theme.palette.text.secondary, 0.5)} />
                      <Typography variant="body1" color="text.secondary">
                        No carriers found
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, textAlign: "center" }}>
                        No carriers match your search criteria. Try adjusting your search or add a new carrier.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination - only show if there are items */}
        {filteredCarriers.length > 0 && (
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
            }}
          >
            <Pagination
              count={1}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              siblingCount={isMobile ? 0 : 1}
              boundaryCount={isMobile ? 1 : 2}
              renderItem={(item) => {
                if (item.type === "previous") {
                  return (
                    <IconButton
                      disabled={item.disabled}
                      onClick={item.onClick}
                      size="small"
                      sx={{
                        mx: 0.5,
                        color: item.disabled ? "text.disabled" : "primary.main",
                      }}
                    >
                      <IconChevronLeft size={18} />
                    </IconButton>
                  )
                }
                if (item.type === "next") {
                  return (
                    <IconButton
                      disabled={item.disabled}
                      onClick={item.onClick}
                      size="small"
                      sx={{
                        mx: 0.5,
                        color: item.disabled ? "text.disabled" : "primary.main",
                      }}
                    >
                      <IconChevronRight size={18} />
                    </IconButton>
                  )
                }
                return (
                  <Button
                    variant={item.selected ? "contained" : "outlined"}
                    color="primary"
                    onClick={item.onClick}
                    disabled={item.disabled}
                    sx={{
                      minWidth: 32,
                      height: 32,
                      mx: 0.5,
                      p: 0,
                      borderRadius: "50%",
                      fontSize: "0.875rem",
                    }}
                  >
                    {item.page}
                  </Button>
                )
              }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default ShippingCarriersPage

