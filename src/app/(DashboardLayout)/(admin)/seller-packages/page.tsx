"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
  CircularProgress,
  Pagination,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"
import {
  IconSearch,
  IconPlus,
  IconPackage,
  IconEdit,
  IconTrash,
  IconCurrencyDollar,
  IconClock,
} from "@tabler/icons-react"
import { message } from "antd"

import { useDeleteSellerPackage, useGetAllSellerPackages } from "@/hooks/seller-package"

export default function SellerPackagesPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [limit] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [packageToDelete, setPackageToDelete] = useState<string | null>(null)

  const { data, isLoading, error } = useGetAllSellerPackages({ page, limit })
  const deletePackageMutation = useDeleteSellerPackage()

  const handleCreateNew = () => {
    router.push("/seller-packages/create-new")
  }

  const handleEdit = (id: string) => {
    router.push(`/seller-packages/edit?id=${id}`)
  }

  const handleView = (id: string) => {
    router.push(`/seller-packages/${id}`)
  }

  const openDeleteDialog = (id: string) => {
    setPackageToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!packageToDelete) return

    try {
      await deletePackageMutation.mutateAsync(packageToDelete)
      message.success("Seller package deleted successfully!")
      setDeleteDialogOpen(false)
      setPackageToDelete(null)
    } catch (error) {
      message.error("Failed to delete seller package. Please try again.")
      console.error(error)
    }
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const filteredPackages = data?.data.filter((pkg) => pkg.name.toLowerCase().includes(searchTerm.toLowerCase())) || []

  if (error) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Error loading seller packages
        </Typography>
        <Typography className="text-gray-400">{error.message || "Please try again later"}</Typography>
      </Box>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <IconPackage size={28} className="mr-3 text-main-golden-orange" />
          <Typography variant="h5" className="font-bold text-white">
            Seller Packages
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<IconPlus size={18} />}
          onClick={handleCreateNew}
          className="text-black bg-main-golden-orange hover:bg-amber-600"
        >
          Create New Package
        </Button>
      </div>

      <TextField
        placeholder="Search packages..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded bg-main-dark-blue"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch size={20} className="text-gray-400" />
            </InputAdornment>
          ),
          className: "text-white",
        }}
      />

      {isLoading ? (
        <Box className="flex items-center justify-center py-12">
          <CircularProgress className="text-main-golden-orange" />
        </Box>
      ) : filteredPackages.length === 0 ? (
        <Box className="py-12 text-center border border-gray-700 border-dashed rounded-lg">
          <Typography variant="h6" className="mb-2 text-gray-400">
            No seller packages found
          </Typography>
          <Typography className="mb-4 text-gray-500">
            {searchTerm ? "Try a different search term" : "Create your first seller package"}
          </Typography>
          {!searchTerm && (
            <Button
              variant="outlined"
              startIcon={<IconPlus size={18} />}
              onClick={handleCreateNew}
              className="border-main-golden-orange text-main-golden-orange hover:bg-main-golden-orange/10"
            >
              Create New Package
            </Button>
          )}
        </Box>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="flex flex-col h-full border border-gray-700 bg-main-gunmetal-blue">
                <div className="h-48 overflow-hidden">
                  <img
                    src={pkg.image || "/placeholder.svg?height=200&width=400"}
                    alt={pkg.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <Typography variant="h6" component="h2" className="font-bold text-white">
                      {pkg.name}
                    </Typography>
                    <Chip
                      label={pkg.isActive ? "Active" : "Inactive"}
                      size="small"
                      className={pkg.isActive ? "bg-green-700 text-white" : "bg-gray-600 text-gray-300"}
                    />
                  </div>

                  <Typography variant="h5" className="mb-2 font-bold text-main-golden-orange">
                    ${pkg.price}
                  </Typography>

                  <Typography variant="body2" className="mb-4 text-gray-300 line-clamp-3">
                    {pkg.description}
                  </Typography>

                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center text-gray-300">
                      <IconClock size={18} className="mr-2 text-gray-400" />
                      <Typography variant="body2">{pkg.duration} days</Typography>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <IconCurrencyDollar size={18} className="mr-2 text-gray-400" />
                      <Typography variant="body2">{pkg.percentProfit}% profit</Typography>
                    </div>

                    <div className="flex items-center text-gray-300">
                      <IconPackage size={18} className="mr-2 text-gray-400" />
                      <Typography variant="body2">Up to {pkg.maxProducts} products</Typography>
                    </div>
                  </div>
                </CardContent>

                <CardActions className="p-3 border-t border-gray-700">
                  <div className="flex justify-between w-full">
                    <Button size="small" onClick={() => handleView(pkg.id)} className="text-gray-300 hover:text-white">
                      View Details
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        size="small"
                        onClick={() => handleEdit(pkg.id)}
                        className="text-blue-400 hover:text-blue-300"
                        startIcon={<IconEdit size={16} />}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={() => openDeleteDialog(pkg.id)}
                        className="text-red-400 hover:text-red-300"
                        startIcon={<IconTrash size={16} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardActions>
              </Card>
            ))}
          </div>

          {data && data.totalPages > 1 && (
            <Box className="flex justify-center mt-8">
              <Pagination
                count={data.totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                className="text-white"
              />
            </Box>
          )}
        </>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          className: "bg-main-charcoal-blue text-white",
        }}
      >
        <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-300">
            Are you sure you want to delete this seller package? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setDeleteDialogOpen(false)} className="text-gray-300 hover:bg-gray-700">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            className="text-white bg-red-600 hover:bg-red-700"
            disabled={deletePackageMutation.isPending}
          >
            {deletePackageMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

