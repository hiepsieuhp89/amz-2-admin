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
} from "@mui/material"
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconMapPin,
  IconMap,
  IconChevronRight,
  IconChevronLeft,
} from "@tabler/icons-react"

interface Zone {
  id: number
  name: string
  status: boolean
}

const ShippingZonesPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [page, setPage] = useState<number>(1)

  // Mock data for zones - initially empty to match the HTML
  const [zones, setZones] = useState<Zone[]>([])

  // For demonstration, let's add a function to toggle between empty and sample data
  const toggleSampleData = () => {
    if (zones.length === 0) {
      setZones([
        { id: 1, name: "North America", status: true },
        { id: 2, name: "Europe", status: true },
        { id: 3, name: "Asia Pacific", status: false },
        { id: 4, name: "South America", status: true },
        { id: 5, name: "Africa", status: false },
        { id: 6, name: "Middle East", status: true },
      ])
    } else {
      setZones([])
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleStatusChange = (id: number, checked: boolean) => {
    // Update the status of the zone
    setZones((prevZones) => prevZones.map((zone) => (zone.id === id ? { ...zone, status: checked } : zone)))
  }

  const filteredZones = zones.filter((zone) => zone.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
          <IconMap size={28} color={theme.palette.primary.main} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            All Zones
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleSampleData}
            startIcon={<IconPlus size={18} />}
            sx={{
              textTransform: "none",
              borderRadius: 8,
              px: 2,
              py: 1,
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            {zones.length === 0 ? "Load Sample Data" : "Clear Data"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href="https://amazonworld.cc/admin/zones/create"
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
            Add New Zone
          </Button>
        </Box>
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
            <IconMapPin size={20} color={theme.palette.primary.main} />
            <Typography
              variant="subtitle1"
              component="h5"
              sx={{
                fontWeight: 600,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Zones
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
              placeholder="Search zones..."
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
              {filteredZones.length > 0 ? (
                filteredZones.map((zone) => (
                  <TableRow
                    key={zone.id}
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
                      {zone.id}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconMapPin size={18} color={theme.palette.primary.main} />
                        <Typography variant="body2" fontWeight={500}>
                          {zone.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Switch
                          checked={zone.status}
                          onChange={(e) => handleStatusChange(zone.id, e.target.checked)}
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
                          label={zone.status ? "Active" : "Inactive"}
                          size="small"
                          color={zone.status ? "success" : "default"}
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
                            href={`https://amazonworld.cc/admin/zones/edit/${zone.id}`}
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
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      <IconMap size={48} color={alpha(theme.palette.text.secondary, 0.5)} />
                      <Typography variant="body1" color="text.secondary">
                        Không kết quả
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, textAlign: "center" }}>
                        No zones found. You can add a new zone by clicking the "Add New Zone" button above.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination - only show if there are items */}
        {filteredZones.length > 0 && (
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

export default ShippingZonesPage

