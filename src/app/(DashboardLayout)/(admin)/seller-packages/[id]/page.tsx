"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconCurrencyDollar,
  IconClock,
  IconPackage,
  IconCheck,
  IconX,
} from "@tabler/icons-react"
import { message } from "antd"

import { useDeleteSellerPackage, useGetSellerPackageById } from "@/hooks/seller-package"

export default function SellerPackageDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const { data: packageData, isLoading, error } = useGetSellerPackageById(id)
  const deletePackageMutation = useDeleteSellerPackage()

  const handleEdit = () => {
    router.push(`/seller-packages/edit?id=${id}`)
  }

  const handleBack = () => {
    router.push("/seller-packages")
  }

  const handleDeleteConfirm = async () => {
    try {
      await deletePackageMutation.mutateAsync(id)
      message.success("Seller package deleted successfully!")
      router.push("/seller-packages")
    } catch (error) {
      message.error("Failed to delete seller package. Please try again.")
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center p-6 py-12">
        <CircularProgress className="text-main-golden-orange" />
      </Box>
    )
  }

  if (error || !packageData) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Error loading seller package
        </Typography>
        <Typography className="mb-4 text-gray-400">
          {error?.message || "Package not found or has been deleted"}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<IconArrowLeft size={18} />}
          onClick={handleBack}
          className="text-gray-300 border-gray-500 hover:bg-gray-700"
        >
          Back to Packages
        </Button>
      </Box>
    )
  }

  const { data: pkg } = packageData

  return (
    <div className="p-6">
      <Box className="flex items-center mb-6">
        <Button
          variant="text"
          startIcon={<IconArrowLeft size={18} />}
          onClick={handleBack}
          className="mr-4 text-gray-300 hover:text-white"
        >
          Back
        </Button>
        <Typography variant="h5" className="flex-grow font-bold text-white">
          Package Details
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            startIcon={<IconEdit size={18} />}
            onClick={handleEdit}
            className="text-blue-400 border-blue-500 hover:bg-blue-900/30"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<IconTrash size={18} />}
            onClick={() => setDeleteDialogOpen(true)}
            className="text-red-400 border-red-500 hover:bg-red-900/30"
          >
            Delete
          </Button>
        </div>
      </Box>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Paper className="overflow-hidden border border-gray-700 bg-main-gunmetal-blue">
            <div className="h-64 overflow-hidden">
              <img
                src={pkg.image || "/placeholder.svg?height=300&width=400"}
                alt={pkg.name}
                className="object-cover w-full h-full"
              />
            </div>
            <Box className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Typography variant="h6" className="font-bold text-white">
                  {pkg.name}
                </Typography>
                <Chip
                  label={pkg.isActive ? "Active" : "Inactive"}
                  size="small"
                  className={pkg.isActive ? "bg-green-700 text-white" : "bg-gray-600 text-gray-300"}
                  icon={pkg.isActive ? <IconCheck size={16} /> : <IconX size={16} />}
                />
              </div>

              <Typography variant="h5" className="mb-4 font-bold text-main-golden-orange">
                ${pkg.price}
              </Typography>

              <Divider className="my-4 bg-gray-700" />

              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <IconClock size={20} className="mr-3 text-gray-400" />
                  <Typography>
                    Duration: <span className="font-medium text-white">{pkg.duration} days</span>
                  </Typography>
                </div>

                <div className="flex items-center text-gray-300">
                  <IconCurrencyDollar size={20} className="mr-3 text-gray-400" />
                  <Typography>
                    Profit: <span className="font-medium text-white">{pkg.percentProfit}%</span>
                  </Typography>
                </div>

                <div className="flex items-center text-gray-300">
                  <IconPackage size={20} className="mr-3 text-gray-400" />
                  <Typography>
                    Max Products: <span className="font-medium text-white">{pkg.maxProducts}</span>
                  </Typography>
                </div>
              </div>
            </Box>
          </Paper>
        </div>

        <div className="lg:col-span-2">
          <Paper className="h-full p-6 border border-gray-700 bg-main-gunmetal-blue">
            <Typography variant="h6" className="mb-4 font-bold text-white">
              Package Description
            </Typography>
            <Typography className="text-gray-300 whitespace-pre-line">{pkg.description}</Typography>

            <Divider className="my-6 bg-gray-700" />

            <Typography variant="h6" className="mb-4 font-bold text-white">
              Package Features
            </Typography>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Paper className="p-4 border border-gray-700 bg-main-dark-blue">
                <div className="flex items-center mb-2">
                  <IconClock size={20} className="mr-2 text-main-golden-orange" />
                  <Typography variant="subtitle1" className="font-medium text-white">
                    Duration
                  </Typography>
                </div>
                <Typography className="text-gray-300">
                  This package is valid for {pkg.duration} days from the date of purchase.
                </Typography>
              </Paper>

              <Paper className="p-4 border border-gray-700 bg-main-dark-blue">
                <div className="flex items-center mb-2">
                  <IconCurrencyDollar size={20} className="mr-2 text-main-golden-orange" />
                  <Typography variant="subtitle1" className="font-medium text-white">
                    Profit Percentage
                  </Typography>
                </div>
                <Typography className="text-gray-300">
                  Sellers earn {pkg.percentProfit}% profit on each sale made through this package.
                </Typography>
              </Paper>

              <Paper className="p-4 border border-gray-700 bg-main-dark-blue">
                <div className="flex items-center mb-2">
                  <IconPackage size={20} className="mr-2 text-main-golden-orange" />
                  <Typography variant="subtitle1" className="font-medium text-white">
                    Product Limit
                  </Typography>
                </div>
                <Typography className="text-gray-300">
                  Sellers can list up to {pkg.maxProducts} products with this package.
                </Typography>
              </Paper>

              <Paper className="p-4 border border-gray-700 bg-main-dark-blue">
                <div className="flex items-center mb-2">
                  <IconCheck size={20} className="mr-2 text-main-golden-orange" />
                  <Typography variant="subtitle1" className="font-medium text-white">
                    Status
                  </Typography>
                </div>
                <Typography className="text-gray-300">
                  This package is currently{" "}
                  {pkg.isActive ? "active and available for purchase" : "inactive and not available for purchase"}.
                </Typography>
              </Paper>
            </div>
          </Paper>
        </div>
      </div>

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
            Are you sure you want to delete the seller package &quot{pkg.name}&quot? This action cannot be undone.
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

