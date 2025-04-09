"use client"

import React, { useState } from "react"
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
  FormHelperText,
  InputAdornment,
} from "@mui/material"
import {
  IconSearch,
  IconFilter,
  IconBuilding,
  IconChevronRight,
  IconChevronLeft,
  IconEdit,
  IconTrash,
  IconPlus,
  IconMapPin,
  IconCoin,
  IconMap,
} from "@tabler/icons-react"

interface City {
  id: number
  name: string
  state: string
  cost: string
  status: boolean
}

interface State {
  id: number
  name: string
}

const ShippingCitiesPage: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedState, setSelectedState] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [newCityName, setNewCityName] = useState<string>("")
  const [newCityState, setNewCityState] = useState<string>("")
  const [newCityCost, setNewCityCost] = useState<string>("0.00")
  const [nameError, setNameError] = useState<string>("")
  const [costError, setCostError] = useState<string>("")
  const [stateError, setStateError] = useState<string>("")
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  // Mock data for cities
  const [cities, setCities] = useState<City[]>([
    { id: 1, name: "Zarzal", state: "Valle del Cauca", cost: "$0.00", status: false },
    { id: 2, name: "Amalapuram", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 3, name: "Alampur", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 4, name: "Akkireddipalem", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 5, name: "Akkayapalle", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 6, name: "Akkarampalle", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 7, name: "Akividu", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 8, name: "Ajjaram", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 9, name: "Aganampudi", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 10, name: "Adoni", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 11, name: "Adivivaram", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 12, name: "Addanki", state: "Andhra Pradesh", cost: "$0.00", status: false },
    { id: 13, name: "Rangat", state: "Andaman and Nicobar Islands", cost: "$0.00", status: false },
    { id: 14, name: "Port Blair", state: "Andaman and Nicobar Islands", cost: "$0.00", status: false },
    { id: 15, name: "Garacharma", state: "Andaman and Nicobar Islands", cost: "$0.00", status: false },
  ])

  // Mock data for states
  const states: State[] = [
    { id: 1, name: "Andhra Pradesh" },
    { id: 2, name: "Andaman and Nicobar Islands" },
    { id: 3, name: "Valle del Cauca" },
    { id: 4, name: "Karnataka" },
    { id: 5, name: "Tamil Nadu" },
  ]

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedState(event.target.value as string)
  }

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleStatusChange = (id: number, checked: boolean) => {
    // Update the status of the city
    setCities((prevCities) => prevCities.map((city) => (city.id === id ? { ...city, status: checked } : city)))
  }

  const handleNewCityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCityName(event.target.value)
    if (event.target.value.trim() === "") {
      setNameError("Name is required")
    } else {
      setNameError("")
    }
  }

  const handleNewCityStateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNewCityState(event.target.value as string)
    setStateError("")
  }

  const handleNewCityCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setNewCityCost(value)

    if (value.trim() === "") {
      setCostError("Cost is required")
    } else if (Number.parseFloat(value) < 0) {
      setCostError("Cost must be a positive number")
    } else {
      setCostError("")
    }
  }

  const handleAddCity = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let hasError = false

    if (newCityName.trim() === "") {
      setNameError("Name is required")
      hasError = true
    }

    if (newCityState === "") {
      setStateError("State is required")
      hasError = true
    }

    if (newCityCost.trim() === "") {
      setCostError("Cost is required")
      hasError = true
    } else if (Number.parseFloat(newCityCost) < 0) {
      setCostError("Cost must be a positive number")
      hasError = true
    }

    if (hasError) {
      return
    }

    // Reset form
    setNewCityName("")
    setNewCityState("")
    setNewCityCost("0.00")
  }

  const toggleExpandRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  return (
    <Box sx={{ px: { xs: "15px", lg: "25px" }, py: 3, maxWidth: "1400px", mx: "auto" }}>
      {/* Title Bar */}
      <Box sx={{ mt: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconBuilding size={28} color={theme.palette.primary.main} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            All cities
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
        {/* Cities List */}
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
                  Cities
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
                  id="sort_city"
                  name="sort_city"
                  placeholder="Type city name & Enter"
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
                  <InputLabel id="state-select-label">Select State</InputLabel>
                  <Select
                    labelId="state-select-label"
                    id="sort_state"
                    value={selectedState}
                    label="Select State"
                    // onChange={handleStateChange}
                  >
                    <MenuItem value="">Select State</MenuItem>
                    {states.map((state) => (
                      <MenuItem key={state.id} value={state.id.toString()}>
                        {state.name}
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
                      sx={{
                        fontWeight: 600,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                        display: { xs: "table-cell", lg: "none" },
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
                      State
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
                      }}
                    >
                      Area Wise Shipping Cost
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
                        display: { xs: "none", lg: "table-cell" },
                      }}
                    >
                      Tùy chọn
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cities.map((city) => (
                    <React.Fragment key={city.id}>
                      <TableRow
                        hover
                        sx={{
                          "&:nth-of-type(odd)": {
                            backgroundColor: alpha(theme.palette.background.default, 0.5),
                          },
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                        }}
                        onClick={() => toggleExpandRow(city.id)}
                      >
                        <TableCell
                          sx={{
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                            display: { xs: "table-cell", lg: "none" },
                          }}
                        >
                          {city.id}
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleExpandRow(city.id)
                              }}
                              sx={{
                                p: 0.5,
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {expandedRow === city.id ? <IconMinus size={16} /> : <IconPlus size={16} />}
                            </IconButton>
                            <Typography variant="body2" fontWeight={500}>
                              {city.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconMap size={16} />
                            <Typography variant="body2">{city.state}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <IconCoin size={16} />
                            <Typography variant="body2">{city.cost}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                          }}
                        >
                          <Switch
                            checked={city.status}
                            onChange={(e) => {
                              e.stopPropagation()
                              handleStatusChange(city.id, e.target.checked)
                            }}
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
                            display: { xs: "none", lg: "table-cell" },
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
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
                                href={`https://amazonworld.cc/admin/cities/edit/${city.id}?lang=vn`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <IconEdit size={16} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa bỏ">
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
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                              >
                                <IconTrash size={16} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                      {expandedRow === city.id && (
                        <TableRow
                          sx={{
                            backgroundColor: alpha(theme.palette.background.paper, 0.5),
                            display: { xs: "table-row", lg: "none" },
                          }}
                        >
                          <TableCell colSpan={6} sx={{ py: 2, px: 3 }}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
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
                                  href={`https://amazonworld.cc/admin/cities/edit/${city.id}?lang=vn`}
                                >
                                  <IconEdit size={16} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xóa bỏ">
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
                      )}
                    </React.Fragment>
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
                count={3196}
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

        {/* Add New City */}
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
                Add New city
              </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
              <Box component="form" onSubmit={handleAddCity}>
                <input type="hidden" name="_token" value="bN0GV6QWZn7MFzBHfczYAjtZNL4dfXjbmFKTD9Jr" />

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel htmlFor="name" error={!!nameError}>
                    Tên
                  </InputLabel>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="Tên"
                    value={newCityName}
                    onChange={handleNewCityNameChange}
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

                <FormControl fullWidth sx={{ mb: 3 }} error={!!stateError}>
                  <InputLabel id="state-add-label">State</InputLabel>
                  <Select
                    labelId="state-add-label"
                    id="state_id"
                    name="state_id"
                    value={newCityState}
                    label="State"
                    // onChange={handleNewCityStateChange}
                    required
                    sx={{
                      borderRadius: 1.5,
                    }}
                  >
                    {states.map((state) => (
                      <MenuItem key={state.id} value={state.id.toString()}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {stateError && <FormHelperText>{stateError}</FormHelperText>}
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel htmlFor="cost" error={!!costError}>
                    Cost
                  </InputLabel>
                  <TextField
                    id="cost"
                    name="cost"
                    placeholder="Cost"
                    type="number"
                    inputProps={{ min: 0, step: 0.01 }}
                    value={newCityCost}
                    onChange={handleNewCityCostChange}
                    fullWidth
                    required
                    error={!!costError}
                    helperText={costError}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 1.5,
                      },
                    }}
                  />
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

// This component is needed for the IconPlus/IconMinus toggle in the table
const IconMinus = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default ShippingCitiesPage

