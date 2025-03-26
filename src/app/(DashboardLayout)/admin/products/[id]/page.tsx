"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Typography,
  Button,
  Box,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material"
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconX,
  IconUpload,
} from "@tabler/icons-react"
import { message } from "antd"

import { useDeleteProduct, useGetProductById, useUpdateProduct } from "@/hooks/product"
import { useUploadImage } from "@/hooks/image"
import { ICreateProduct } from "@/interface/request/product"

function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<ICreateProduct>({
    name: '',
    description: '',
    imageUrl: '',
    categoryId: '',
    salePrice: '',
    price: '',
    stock: 0
  })

  const { data: productData, isLoading, error } = useGetProductById(id)
  const deleteProductMutation = useDeleteProduct()
  const updateProductMutation = useUpdateProduct()
  const uploadImageMutation = useUploadImage()

  useEffect(() => {
    if (productData?.data) {
      const product = productData.data
      setFormData({
        name: product.name,
        description: product.description || "",
        imageUrl: product.imageUrl || "",
        categoryId: product.category?.id || "",
        salePrice: product.salePrice?.toString() || "",
        price: product.price?.toString() || "",
        stock: product.stock || 0
      })
      setImagePreview(product.imageUrl || null)
    }
  }, [productData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
    setFormData(prev => ({
      ...prev,
      imageUrl: ''
    }))
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteProductMutation.mutateAsync(id)
      message.success("Sản phẩm đã được xóa thành công!")
      router.push("/admin/products")
    } catch (error) {
      message.error("Không thể xóa sản phẩm. Vui lòng thử lại.")
      console.error("Delete error:", error)
    }
  }

  const handleBack = () => {
    router.push("/admin/products")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Prepare the payload
      let payload: ICreateProduct = {
        name: formData.name,
        description: formData.description,
        price: formData.price ? parseFloat(formData.price.toString()) : 0,
        salePrice: formData.salePrice ? parseFloat(formData.salePrice.toString()) : 0,
        stock: typeof formData.stock === 'string' ? parseInt(formData.stock, 10) : formData.stock,
        categoryId: formData.categoryId || undefined,
        imageUrl: formData.imageUrl,
      }

      // Upload new image if available
      if (imageFile) {
        message.loading({ content: "Đang tải hình ảnh lên...", key: "uploadImage" })

        try {
          const uploadResult = await uploadImageMutation.mutateAsync({
            file: imageFile,
            isPublic: true,
            description: `Hình ảnh cho sản phẩm: ${formData.name}`
          })

          message.success({ content: "Tải hình ảnh thành công!", key: "uploadImage" })

          // Add the image URL to the payload
          payload.imageUrl = uploadResult.data.url
        } catch (error) {
          message.error({ content: "Lỗi khi tải hình ảnh!", key: "uploadImage" })
          console.error("Image upload error:", error)
          return // Stop if image upload fails
        }
      }

      // Update the product
      message.loading({ content: "Đang cập nhật sản phẩm...", key: "updateProduct" })
      await updateProductMutation.mutateAsync({
        id,
        payload
      })

      message.success({ content: "Sản phẩm đã được cập nhật thành công!", key: "updateProduct" })
      setIsEditing(false)
    } catch (error) {
      message.error({ content: "Không thể cập nhật sản phẩm. Vui lòng thử lại.", key: "updateProduct" })
      console.error("Product update error:", error)
    }
  }

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center p-6 py-12">
        <CircularProgress className="text-main-golden-orange" />
      </Box>
    )
  }

  if (error || !productData) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải thông tin sản phẩm
        </Typography>
        <Typography className="mb-4 text-gray-400">
          {error?.message || "Sản phẩm không tồn tại hoặc đã bị xóa"}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<IconArrowLeft size={18} />}
          onClick={handleBack}
          className="text-gray-300 border-gray-500 hover:bg-gray-700"
        >
          Trở về danh sách sản phẩm
        </Button>
      </Box>
    )
  }

  return (
    <div className="p-6">
      <Box className="flex items-center justify-between mb-4">
        <Button
          variant="text"
          startIcon={<IconArrowLeft size={18} />}
          onClick={handleBack}
          className="mr-4"
        >
          Quay lại
        </Button>
        <Typography
          fontSize={18}
          fontWeight={700}
          variant="h5"
          className="!text-main-golden-orange relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-[50%] after:h-0.5 after:bg-main-golden-orange after:rounded-full"
        >
          Chi tiết sản phẩm
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                size="small"
                label="Tên sản phẩm"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="Giá"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="Giá khuyến mãi"
                name="salePrice"
                type="number"
                value={formData.salePrice}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="Số lượng"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                size="small"
                label="ID Danh mục"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                size="small"
                label="Mô tả chi tiết"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography fontSize={14} variant="subtitle1" className="mb-2">
                Hình ảnh sản phẩm
              </Typography>
              {imagePreview ? (
                <div className="relative flex-1 max-w-lg overflow-hidden border border-gray-600 rounded">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Product preview"
                    className="object-cover w-full h-full"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute p-1 transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                    >
                      <IconX size={16} color="white" />
                    </button>
                  )}
                </div>
              ) : (
                <label className={`flex flex-col items-center justify-center w-full h-32 transition-colors border border-gray-500 border-dashed !rounded-lg ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>
                  <div className="flex flex-col items-center justify-center py-4">
                    <IconUpload size={24} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">Upload hình ảnh</p>
                  </div>
                  {isEditing && <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />}
                </label>
              )}
            </Grid>
          </Grid>

          {isEditing && (
            <Box className="flex justify-end gap-4">
              <Button
                className="!normal-case"
                type="button"
                variant="outlined"
                onClick={() => setIsEditing(false)}
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={updateProductMutation.isPending}
                className="text-black !bg-main-golden-orange hover:bg-amber-600 !normal-case"
              >
                {updateProductMutation.isPending ? (
                  <CircularProgress size={24} className="text-gray-800" />
                ) : (
                  "Cập nhật sản phẩm"
                )}
              </Button>
            </Box>
          )}
        </form>

        {!isEditing && (
          <Box className="flex justify-end gap-2 mt-4">
            <Button
              variant="contained"
              startIcon={<IconTrash size={18} />}
              onClick={() => setDeleteDialogOpen(true)}
              className="!bg-red-500 !text-white !normal-case"
            >
              Xóa
            </Button>
            <Button
              variant="contained"
              startIcon={<IconEdit size={18} />}
              onClick={() => setIsEditing(true)}
              className="!normal-case !bg-main-golden-orange"
            >
              Chỉnh sửa
            </Button>
          </Box>
        )}
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          className: "!rounded-[6px] shadow-xl",
        }}
      >
        <DialogTitle fontSize={18}>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-400">
            Bạn có chắc chắn muốn xóa sản phẩm &quot;{formData.name}&quot;? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!p-4 !pb-6">
          <Button
            variant="outlined"
            onClick={() => setDeleteDialogOpen(false)}
            className="!normal-case"
          >
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            className="text-white transition-colors !bg-red-500 !normal-case"
            disabled={deleteProductMutation.isPending}
          >
            {deleteProductMutation.isPending ? (
              <div className="flex items-center gap-2 text-white">
                <CircularProgress size={16} className="text-white" />
                Đang xóa...
              </div>
            ) : (
              "Xóa"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ProductDetailPage 