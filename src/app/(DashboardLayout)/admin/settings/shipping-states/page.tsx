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
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import {
  IconSearch,
  IconFilter,
  IconMap,
  IconChevronRight,
  IconChevronLeft,
  IconEdit,
  IconPlus,
  IconWorld,
  IconMapPin,
} from "@tabler/icons-react"

interface State {
  id: number
  name: string
  country: string
  status: boolean
}

interface Country {
  id: number
  name: string
}

const ShippingStatesPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [newStateName, setNewStateName] = useState<string>("")
  const [newStateCountry, setNewStateCountry] = useState<string>("")
  const [nameError, setNameError] = useState<string>("")

  // Mock data for states
  const [states, setStates] = useState<State[]>([
    { id: 1, name: "Andaman and Nicobar Islands", country: "India", status: false },
    { id: 2, name: "Andhra Pradesh", country: "India", status: false },
    { id: 3, name: "Arunachal Pradesh", country: "India", status: false },
    { id: 4, name: "Assam", country: "India", status: false },
    { id: 5, name: "Bihar", country: "India", status: false },
    { id: 6, name: "Chandigarh", country: "India", status: false },
    { id: 7, name: "Chhattisgarh", country: "India", status: false },
    { id: 8, name: "Dadra and Nagar Haveli", country: "India", status: false },
    { id: 9, name: "Daman and Diu", country: "India", status: false },
    { id: 10, name: "Delhi", country: "India", status: false },
    { id: 11, name: "Goa", country: "India", status: false },
    { id: 12, name: "Gujarat", country: "India", status: false },
    { id: 13, name: "Haryana", country: "India", status: false },
    { id: 14, name: "Himachal Pradesh", country: "India", status: false },
    { id: 15, name: "Jammu and Kashmir", country: "India", status: false },
  ])

  // Mock data for countries
  const countries: Country[] = [
    { id: 1, name: "India" },
    { id: 2, name: "United States" },
    { id: 3, name: "United Kingdom" },
    { id: 4, name: "Canada" },
    { id: 5, name: "Australia" },
  ]

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCountry(event.target.value as string)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleStatusChange = (id: number, checked: boolean) => {
    // Update the status of the state
    setStates((prevStates) => prevStates.map((state) => (state.id === id ? { ...state, status: checked } : state)))
  }

  const handleNewStateNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewStateName(event.target.value)
    if (event.target.value.trim() === "") {
      setNameError("Name is required")
    } else {
      setNameError("")
    }
  }

  const handleNewStateCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewStateCountry(event.target.value as string)
  }

  const handleAddState = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (newStateName.trim() === "") {
      setNameError("Name is required")
      return
    }

    // Reset form
    setNewStateName("")
    setNewStateCountry("")
  }

  return (
    <Box sx={{ px: { xs: "15px", lg: "25px" }, py: 3, maxWidth: "1400px", mx: "auto" }}>
      {/* Title Bar */}
      <Box sx={{ mt: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconMap size={28} color={theme.palette.primary.main} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            All States
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* States List */}
        <Box sx={{ width: { xs: "100%", md: "58.333%" } }}>
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
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                gap: 2,
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
                  States
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  width: { xs: "100%", sm: "auto" },
                  flexDirection: { xs: "column", sm: "row" },
                  flexWrap: { sm: "wrap" },
                }}
              >
                <TextField
                  id="sort_state"
                  name="sort_state"
                  placeholder="Type state name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  size="small"
                  sx={{
                    minWidth: { xs: "100%", sm: 180 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                    },
                  }}
                  InputProps={{
                    startAdornment: <IconSearch size={18} style={{ marginRight: 8, opacity: 0.6 }} />,
                  }}
                />

                <FormControl
                  size="small"
                  sx={{
                    minWidth: { xs: "100%", sm: 180 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                    },
                  }}
                >
                  <InputLabel id="country-select-label">Chọn quốc gia</InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="sort_country"
                    value={selectedCountry}
                    label="Chọn quốc gia"
                    // onChange={handleCountryChange}
                  >
                    <MenuItem value="">Chọn quốc gia</MenuItem>
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id.toString()}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

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
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                      }}
                    >
                      Quốc gia
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: 600,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                      }}
                    >
                      Hiện an
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                      }}
                    >
                      Hoạt động
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {states.map((state) => (
                    <TableRow
                      key={state.id}
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
                        {state.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        }}
                      >
                        <Typography variant="body2" fontWeight={500}>
                          {state.name}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <IconWorld size={16} />
                          <Typography variant="body2">{state.country}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        }}
                      >
                        <Switch
                          checked={state.status}
                          onChange={(e) => handleStatusChange(state.id, e.target.checked)}
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
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        }}
                      >
                        <Tooltip title="Biên tập">
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
                            href={`https://amazonworld.cc/admin/states/${state.id}/edit`}
                          >
                            <IconEdit size={16} />
                          </IconButton>
                        </Tooltip>
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
                count={273}
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

        {/* Add New State */}
        <Box sx={{ width: { xs: "100%", md: "41.667%" } }}>
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
              <IconPlus size={20} color={theme.palette.primary.main} />
              <Typography
                variant="subtitle1"
                component="h5"
                sx={{
                  fontWeight: 600,
                }}
              >
                Add New State
              </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
              <Box component="form" onSubmit={handleAddState}>
                <input type="hidden" name="_token" value="bN0GV6QWZn7MFzBHfczYAjtZNL4dfXjbmFKTD9Jr" />

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel htmlFor="name" error={!!nameError}>
                    Tên
                  </InputLabel>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="Tên"
                    value={newStateName}
                    onChange={handleNewStateNameChange}
                    fullWidth
                    required
                    error={!!nameError}
                    helperText={nameError}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="country-add-label">Quốc gia</InputLabel>
                  <Select
                    labelId="country-add-label"
                    id="country_id"
                    name="country_id"
                    value={newStateCountry}
                    label="Quốc gia"
                    // onChange={handleNewStateCountryChange}
                    sx={{
                      borderRadius: 1.5,
                    }}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id.toString()}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<IconPlus size={18} />}
                    sx={{
                      textTransform: "none",
                      borderRadius: 1.5,
                      px: 3,
                    }}
                  >
                    Tiết kiệm
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default ShippingStatesPage