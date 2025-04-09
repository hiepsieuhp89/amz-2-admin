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
  Avatar,
  Pagination,
} from "@mui/material"
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconUsers,
  IconUser,
  IconMail,
  IconPhone,
  IconBriefcase,
  IconChevronRight,
  IconChevronLeft,
  IconEye,
} from "@tabler/icons-react"

interface Staff {
  id: number
  name: string
  email: string
  phone: string
  role: string
  avatar?: string
}

const StaffPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [page, setPage] = useState<number>(1)

  // Mock data for staff - initially empty to match the HTML
  const [staffList, setStaffList] = useState<Staff[]>([])

  // For demonstration, let's add a function to toggle between empty and sample data
  const toggleSampleData = () => {
    if (staffList.length === 0) {
      setStaffList([
        {
          id: 1,
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0901234567",
          role: "Admin",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 2,
          name: "Trần Thị B",
          email: "tranthib@example.com",
          phone: "0912345678",
          role: "Manager",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 3,
          name: "Lê Văn C",
          email: "levanc@example.com",
          phone: "0923456789",
          role: "Staff",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 4,
          name: "Phạm Thị D",
          email: "phamthid@example.com",
          phone: "0934567890",
          role: "Support",
          avatar: "/placeholder.svg?height=100&width=100",
        },
      ])
    } else {
      setStaffList([])
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get role color based on role name
  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return theme.palette.error.main
      case "manager":
        return theme.palette.primary.main
      case "staff":
        return theme.palette.success.main
      case "support":
        return theme.palette.warning.main
      default:
        return theme.palette.info.main
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
          <IconUsers size={28} color={theme.palette.primary.main} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Tất cả nhân viên
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
            {staffList.length === 0 ? "Load Sample Data" : "Clear Data"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href="https://amazonworld.cc/admin/staffs/create"
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
            Thêm nhân viên mới
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
            <IconUser size={20} color={theme.palette.primary.main} />
            <Typography
              variant="subtitle1"
              component="h5"
              sx={{
                fontWeight: 600,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Nhân viên
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
              placeholder="Tìm kiếm nhân viên..."
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
                    display: { xs: "none", lg: "table-cell" },
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
                    display: { xs: "none", lg: "table-cell" },
                  }}
                >
                  E-mail
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                    display: { xs: "none", lg: "table-cell" },
                  }}
                >
                  Điện thoại
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                    display: { xs: "none", lg: "table-cell" },
                  }}
                >
                  Vai trò
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
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => (
                  <TableRow
                    key={staff.id}
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
                        display: { xs: "none", lg: "table-cell" },
                      }}
                    >
                      {staff.id}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                          src={staff.avatar}
                          alt={staff.name}
                          sx={{
                            width: 40,
                            height: 40,
                            border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                          }}
                        />
                        <Box>
                          <Typography variant="body1" fontWeight={500}>
                            {staff.name}
                          </Typography>
                          <Box sx={{ display: { xs: "block", lg: "none" } }}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                mt: 0.5,
                              }}
                            >
                              <IconMail size={14} />
                              {staff.email}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                mt: 0.5,
                              }}
                            >
                              <IconPhone size={14} />
                              {staff.phone}
                            </Typography>
                            <Chip
                              label={staff.role}
                              size="small"
                              sx={{
                                mt: 0.5,
                                backgroundColor: alpha(getRoleColor(staff.role), 0.1),
                                color: getRoleColor(staff.role),
                                fontWeight: 500,
                                fontSize: "0.75rem",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        display: { xs: "none", lg: "table-cell" },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconMail size={16} />
                        <Typography variant="body2">{staff.email}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        display: { xs: "none", lg: "table-cell" },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconPhone size={16} />
                        <Typography variant="body2">{staff.phone}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        display: { xs: "none", lg: "table-cell" },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconBriefcase size={16} />
                        <Chip
                          label={staff.role}
                          size="small"
                          sx={{
                            backgroundColor: alpha(getRoleColor(staff.role), 0.1),
                            color: getRoleColor(staff.role),
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
                            href={`https://amazonworld.cc/admin/staffs/${staff.id}`}
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
                            href={`https://amazonworld.cc/admin/staffs/${staff.id}/edit`}
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
                      <IconUsers size={48} color={alpha(theme.palette.text.secondary, 0.5)} />
                      <Typography variant="body1" color="text.secondary">
                        Không kết quả
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, textAlign: "center" }}>
                        Không tìm thấy nhân viên nào. Bạn có thể thêm nhân viên mới bằng cách nhấn vào nút "Thêm nhân
                        viên mới".
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination - only show if there are items */}
        {filteredStaff.length > 0 && (
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

export default StaffPage

