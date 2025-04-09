"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  TextField,
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
} from "@mui/material"
import {
  IconSearch,
  IconFilter,
  IconWorld,
  IconChevronRight,
  IconChevronLeft,
  IconPlus,
  IconMinus,
} from "@tabler/icons-react"

interface Country {
  id: number
  name: string
  code: string
  status: boolean
}

const ShippingCountriesPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  // Mock data for countries
  const [countries, setCountries] = useState<Country[]>([
    { id: 1, name: "Zimbabwe", code: "ZW", status: false },
    { id: 2, name: "Azerbaijan", code: "AZ", status: false },
    { id: 3, name: "Austria", code: "AT", status: false },
    { id: 4, name: "Australia", code: "AU", status: false },
    { id: 5, name: "Aruba", code: "AW", status: false },
    { id: 6, name: "Armenia", code: "AM", status: false },
    { id: 7, name: "Argentina", code: "AR", status: false },
    { id: 8, name: "Antigua And Barbuda", code: "AG", status: false },
    { id: 9, name: "Antarctica", code: "AQ", status: false },
    { id: 10, name: "Anguilla", code: "AI", status: false },
    { id: 11, name: "Angola", code: "AO", status: false },
    { id: 12, name: "Andorra", code: "AD", status: false },
    { id: 13, name: "American Samoa", code: "AS", status: false },
    { id: 14, name: "Algeria", code: "DZ", status: false },
    { id: 15, name: "Albania", code: "AL", status: false },
  ])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleStatusChange = (id: number, checked: boolean) => {
    // Update the status of the country
    setCountries((prevCountries) =>
      prevCountries.map((country) => (country.id === id ? { ...country, status: checked } : country)),
    )
  }

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <Box sx={{ px: { xs: "15px", lg: "25px" }, py: 3, maxWidth: "1400px", mx: "auto" }}>
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
        {/* Card Header with Search */}
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            p: 2,
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1 }}>
            <IconWorld size={24} color={theme.palette.primary.main} />
            <Typography
              variant="h6"
              component="h5"
              sx={{
                fontWeight: 600,
                textAlign: { xs: "center", md: "left" },
                flexGrow: 1,
              }}
            >
              Quốc gia
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: { xs: "100%", md: "auto" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              id="sort_country"
              name="sort_country"
              placeholder="Type country name"
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
                startAdornment: <IconSearch size={18} style={{ marginRight: 8, opacity: 0.6 }} />,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<IconFilter size={18} />}
              sx={{
                textTransform: "none",
                borderRadius: 1.5,
                px: 2,
                minWidth: { xs: "100%", sm: "auto" },
              }}
            >
              Bộ lọc
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer sx={{ overflowX: "auto" }}>
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
                {!isTablet && (
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                    }}
                  >
                    Mã
                  </TableCell>
                )}
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                  }}
                >
                  Hiện an
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countries.map((country) => (
                <TableRow
                  key={country.id}
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
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton size="small" onClick={() => toggleExpand(country.id)} sx={{ mr: 1 }}>
                        {expanded[country.id] ? <IconMinus size={16} /> : <IconPlus size={16} />}
                      </IconButton>
                      {country.id}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {country.name}
                    </Typography>
                    {expanded[country.id] && (
                      <Box
                        sx={{
                          mt: 1,
                          ml: 2,
                          p: 1.5,
                          backgroundColor: alpha(theme.palette.background.paper, 0.7),
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                          <strong>Code:</strong> {country.code}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>Status:</strong> {country.status ? "Active" : "Inactive"}
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  {!isTablet && (
                    <TableCell
                      sx={{
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      }}
                    >
                      {country.code}
                    </TableCell>
                  )}
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                    }}
                  >
                    <Switch
                      checked={country.status}
                      onChange={(e) => handleStatusChange(country.id, e.target.checked)}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
          }}
        >
          <Pagination
            count={17}
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
      </Paper>
    </Box>
  )
}

export default ShippingCountriesPage

