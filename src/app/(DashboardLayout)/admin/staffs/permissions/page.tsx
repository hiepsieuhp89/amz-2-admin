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
  useTheme,
  alpha,
  useMediaQuery,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Chip,
  Pagination,
} from "@mui/material"
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconShield,
  IconUserShield,
  IconChevronRight,
  IconChevronLeft,
  IconEye,
  IconLock,
} from "@tabler/icons-react"

interface Role {
  id: number
  name: string
  permissions: number
  color?: string
}

const StaffsPermissions = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [page, setPage] = useState<number>(1)

  // Mock data for roles - initially empty to match the HTML
  const [roles, setRoles] = useState<Role[]>([])

  // For demonstration, let's add a function to toggle between empty and sample data
  const toggleSampleData = () => {
    if (roles.length === 0) {
      setRoles([
        { id: 1, name: "Super Admin", permissions: 25, color: "#ef4444" },
        { id: 2, name: "Admin", permissions: 20, color: "#3b82f6" },
        { id: 3, name: "Manager", permissions: 15, color: "#10b981" },
        { id: 4, name: "Staff", permissions: 10, color: "#f59e0b" },
        { id: 5, name: "Customer Support", permissions: 8, color: "#8b5cf6" },
        { id: 6, name: "Content Editor", permissions: 5, color: "#ec4899" },
      ])
    } else {
      setRoles([])
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const filteredRoles = roles.filter((role) => role.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
          <IconShield size={28} color={theme.palette.primary.main} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Tất cả các vai trò
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
            {roles.length === 0 ? "Load Sample Data" : "Clear Data"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href="https://amazonworld.cc/admin/roles/create"
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
            Thêm vai trò mới
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
            <IconUserShield size={20} color={theme.palette.primary.main} />
            <Typography
              variant="subtitle1"
              component="h5"
              sx={{
                fontWeight: 600,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Vai trò
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
              placeholder="Tìm kiếm vai trò..."
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
                  align="right"
                  width="10%"
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
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
                  <TableRow
                    key={role.id}
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
                      {role.id}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: role.color || theme.palette.primary.main,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconLock size={20} color="white" />
                        </Box>
                        <Box>
                          <Typography variant="body1" fontWeight={500}>
                            {role.name}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                            <Chip
                              label={`${role.permissions} permissions`}
                              size="small"
                              sx={{
                                backgroundColor: alpha(role.color || theme.palette.primary.main, 0.1),
                                color: role.color || theme.palette.primary.main,
                                fontWeight: 500,
                                fontSize: "0.75rem",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        <Tooltip title="View">
                          <IconButton
                            size="small"
                            sx={{
                              color: alpha(theme.palette.info.main, 0.7),
                              backgroundColor: alpha(theme.palette.info.main, 0.1),
                              "&:hover": {
                                backgroundColor: alpha(theme.palette.info.main, 0.2),
                              },
                              borderRadius: "50%",
                              width: 32,
                              height: 32,
                            }}
                            href={`https://amazonworld.cc/admin/roles/${role.id}`}
                          >
                            <IconEye size={16} />
                          </IconButton>
                        </Tooltip>
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
                            href={`https://amazonworld.cc/admin/roles/${role.id}/edit`}
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
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                      <IconShield size={48} color={alpha(theme.palette.text.secondary, 0.5)} />
                      <Typography variant="body1" color="text.secondary">
                        Không kết quả
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, textAlign: "center" }}>
                        Không tìm thấy vai trò nào. Bạn có thể thêm vai trò mới bằng cách nhấn vào nút "Thêm vai trò
                        mới".
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination - only show if there are items */}
        {filteredRoles.length > 0 && (
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

export default StaffsPermissions

