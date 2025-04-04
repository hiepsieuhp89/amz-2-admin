"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material"
import { IconPlus, IconEdit, IconTrash, IconStar, IconStarFilled, IconSearch } from "@tabler/icons-react"

interface Seller {
  id: number
  name: string
}

interface Review {
  id: number
  productName: string
  productOwner: string
  rating: number
  comment: string
  isCustom: boolean
}

const ProductReviewsPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [sellerId, setSellerId] = useState<string>("all")
  const [rating, setRating] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const sellers: Seller[] = [
    { id: 9, name: "In House" },
    { id: 3, name: "Mr. Seller" },
    { id: 11, name: "Samuel Hoffman" },
    { id: 12, name: "Gareth Gilbert" },
    { id: 13, name: "Rahim Underwood" },
    { id: 14, name: "Deanna Velez" },
  ]

  // Mock function to fetch reviews
  const fetchReviews = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // No results for now, as per the original HTML
    }, 500)
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleSellerChange = (event: SelectChangeEvent) => {
    setSellerId(event.target.value)
    sortReviewedProducts()
  }

  const handleRatingChange = (event: SelectChangeEvent) => {
    setRating(event.target.value)
    sortReviewedProducts()
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      sortReviewedProducts()
    }
  }

  const sortReviewedProducts = () => {
    // This would typically make an API call with the filter parameters
    fetchReviews()
  }

  const renderRatingStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<IconStarFilled key={i} size={16} color="#FFD700" />)
      } else {
        stars.push(<IconStar key={i} size={16} color="#C0C0C0" />)
      }
    }
    return <Box display="flex">{stars}</Box>
  }

  return (
    <Box sx={{ px: { xs: "15px", lg: "25px" } }}>
      {/* Title Bar */}
      <Box sx={{ mt: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            All Rating & Reviews
          </Typography>
          <Button
            variant="outlined"
            startIcon={<IconPlus size={18} />}
            href="https://amazonworld.cc/admin/custom-review/create"
            sx={{
              backgroundColor: "#299395",
              color: "white",
              "&:hover": {
                backgroundColor: "#1e7577",
              },
              borderRadius: "8px",
              textTransform: "none",
              px: 2,
              py: 0.75,
            }}
          >
            Add Custom Reviews
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Main Card */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        {/* Card Header */}
        <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
              gap: 2,
              width: "100%",
            }}
          >
            <Typography variant="h6" component="h5" sx={{ mb: { xs: 2, md: 0 }, flexGrow: 1, fontWeight: "medium" }}>
              Product Review & Ratings
            </Typography>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="seller-select-label">Seller</InputLabel>
              <Select
                labelId="seller-select-label"
                id="seller_id"
                value={sellerId}
                label="Seller"
                onChange={handleSellerChange}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                {sellers.map((seller) => (
                  <MenuItem key={seller.id} value={seller.id.toString()}>
                    {seller.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel id="rating-select-label">Filter by Rating</InputLabel>
              <Select
                labelId="rating-select-label"
                id="rating"
                value={rating}
                label="Filter by Rating"
                onChange={handleRatingChange}
              >
                <MenuItem value="">Lọc theo xếp hạng</MenuItem>
                <MenuItem value="desc">Xếp hạng (Cao &gt; Thấp)</MenuItem>
                <MenuItem value="asc">Xếp hạng (Thấp &gt; Cao)</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="search"
              size="small"
              placeholder="Type Product Name & Hit Enter"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              InputProps={{
                startAdornment: <IconSearch size={18} style={{ marginRight: 8, opacity: 0.6 }} />,
              }}
              sx={{ minWidth: { xs: "100%", md: 220 } }}
            />
          </Box>
        </Box>

        {/* Card Body */}
        <Box sx={{ p: 0 }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                  <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>#</TableCell>
                  <TableCell sx={{ width: "40%" }}>tên sản phẩm</TableCell>
                  <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>Chủ sở hữu sản phẩm</TableCell>
                  <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>Xếp hạng</TableCell>
                  <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>Nhận xét</TableCell>
                  <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>Custom Reviews</TableCell>
                  <TableCell align="right">Tùy chọn</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Loading...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <TableRow key={review.id} hover>
                      <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>{index + 1}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {review.productName}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>{review.productOwner}</TableCell>
                      <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                        {renderRatingStars(review.rating)}
                      </TableCell>
                      <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>{review.comment}</TableCell>
                      <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                        {review.isCustom ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                          <Tooltip title="Edit">
                            <IconButton size="small" color="primary">
                              <IconEdit size={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error">
                              <IconTrash size={18} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Không kết quả
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>{/* Pagination would go here */}</Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default ProductReviewsPage

