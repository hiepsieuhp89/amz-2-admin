"use client"

import { useState, useEffect } from "react"
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material"
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconSearch,
  IconSettings,
  IconRefresh,
} from "@tabler/icons-react"
import { 
  useGetAllConfigs, 
  useCreateConfig, 
  useUpdateConfig, 
  useDeleteConfig 
} from "@/hooks/config"

interface ConfigItem {
  key: string
  value: string
  description: string
  isActive: boolean
}

const SystemConfigPage = () => {
  const theme = useTheme()
  
  // State for configs
  const [configs, setConfigs] = useState<ConfigItem[]>([])
  const [filteredConfigs, setFilteredConfigs] = useState<ConfigItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  
  // State for dialog controls
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [currentConfig, setCurrentConfig] = useState<ConfigItem | null>(null)
  
  // State for form input
  const [formInput, setFormInput] = useState<{
    key: string
    value: string
    description: string
    isActive: boolean
  }>({
    key: "",
    value: "",
    description: "",
    isActive: true,
  })
  
  // State for notifications
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })
  
  // Get all configs
  const { data: configsData, isLoading: isLoadingConfigs, error: configsError, refetch } = useGetAllConfigs()
  
  // Mutations
  const createConfigMutation = useCreateConfig()
  const updateConfigMutation = useUpdateConfig()
  const deleteConfigMutation = useDeleteConfig()
  
  // Set configs when data is loaded
  useEffect(() => {
    if (configsData) {
      setConfigs(configsData.data)
      setFilteredConfigs(configsData.data)
    }
  }, [configsData])
  
  // Filter configs when search term changes
  useEffect(() => {
    if (configs.length > 0) {
      const filtered = configs.filter(
        (config) =>
          config.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          config.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredConfigs(filtered)
    }
  }, [searchTerm, configs])
  
  // Handle search term change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  
  // Handle form input change
  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    setFormInput((prev) => ({
      ...prev,
      [name]: name === "isActive" ? checked : value,
    }))
  }
  
  // Open create dialog
  const handleOpenCreateDialog = () => {
    setFormInput({
      key: "",
      value: "",
      description: "",
      isActive: true,
    })
    setOpenCreateDialog(true)
  }
  
  // Close create dialog
  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false)
  }
  
  // Open edit dialog
  const handleOpenEditDialog = (config: ConfigItem) => {
    setCurrentConfig(config)
    setFormInput({
      key: config.key,
      value: config.value,
      description: config.description,
      isActive: config.isActive,
    })
    setOpenEditDialog(true)
  }
  
  // Close edit dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false)
  }
  
  // Open delete dialog
  const handleOpenDeleteDialog = (config: ConfigItem) => {
    setCurrentConfig(config)
    setOpenDeleteDialog(true)
  }
  
  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }
  
  // Create config
  const handleCreateConfig = async () => {
    createConfigMutation.mutate(formInput, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Cấu hình đã được tạo thành công",
          severity: "success",
        })
        handleCloseCreateDialog()
        refetch()
      },
      onError: (error) => {
        setNotification({
          open: true,
          message: `Lỗi khi tạo cấu hình: ${error.message}`,
          severity: "error",
        })
      },
    })
  }
  
  // Update config
  const handleUpdateConfig = async () => {
    if (!currentConfig) return
    
    updateConfigMutation.mutate(
      {
        key: currentConfig.key,
        payload: {
          value: formInput.value,
          description: formInput.description,
          isActive: formInput.isActive,
        },
      },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: "Cấu hình đã được cập nhật thành công",
            severity: "success",
          })
          handleCloseEditDialog()
          refetch()
        },
        onError: (error) => {
          setNotification({
            open: true,
            message: `Lỗi khi cập nhật cấu hình: ${error.message}`,
            severity: "error",
          })
        },
      }
    )
  }
  
  // Delete config
  const handleDeleteConfig = async () => {
    if (!currentConfig) return
    
    deleteConfigMutation.mutate(currentConfig.key, {
      onSuccess: () => {
        setNotification({
          open: true,
          message: "Cấu hình đã được xóa thành công",
          severity: "success",
        })
        handleCloseDeleteDialog()
        refetch()
      },
      onError: (error) => {
        setNotification({
          open: true,
          message: `Lỗi khi xóa cấu hình: ${error.message}`,
          severity: "error",
        })
      },
    })
  }
  
  // Handle close notification
  const handleCloseNotification = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }))
  }
  
  // Handle toggle active state
  const handleToggleActive = (config: ConfigItem) => {
    updateConfigMutation.mutate(
      {
        key: config.key,
        payload: {
          value: config.value,
          description: config.description,
          isActive: !config.isActive,
        },
      },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: `Cấu hình ${!config.isActive ? "đã được kích hoạt" : "đã bị vô hiệu hóa"}`,
            severity: "success",
          })
          refetch()
        },
        onError: (error) => {
          setNotification({
            open: true,
            message: `Lỗi khi cập nhật trạng thái: ${error.message}`,
            severity: "error",
          })
        },
      }
    )
  }

  // Section Header
  const SectionHeader = ({ title }: { title: string }) => (
    <Box sx={{ mt: 2, mb: 3 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: 0,
            width: 40,
            height: 3,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1,
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  )

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconSettings size={24} stroke={1.5} color={theme.palette.primary.main} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Quản lý cấu hình hệ thống
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<IconRefresh size={18} />}
            onClick={() => refetch()}
          >
            Làm mới
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconPlus size={18} />}
            onClick={handleOpenCreateDialog}
          >
            Thêm cấu hình
          </Button>
        </Box>
      </Box>

      {/* Search and filter */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
        }}
      >
        <Box  alignItems="center">
          <Box  >
            <TextField
              fullWidth
              placeholder="Tìm kiếm theo key hoặc mô tả..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <IconSearch size={18} style={{ marginRight: 8 }} />,
              }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Configs table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
        }}
      >
        <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    fontWeight: 600,
                  }}
                >
                  Key
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    fontWeight: 600,
                  }}
                >
                  Giá trị
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    fontWeight: 600,
                  }}
                >
                  Mô tả
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    fontWeight: 600,
                  }}
                >
                  Trạng thái
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    fontWeight: 600,
                  }}
                >
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoadingConfigs ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <CircularProgress size={24} />
                    <Typography sx={{ ml: 2 }}>Đang tải dữ liệu...</Typography>
                  </TableCell>
                </TableRow>
              ) : configsError ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Alert severity="error">
                      Lỗi khi tải dữ liệu: {(configsError as Error).message}
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : filteredConfigs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">
                      {searchTerm
                        ? "Không tìm thấy cấu hình phù hợp"
                        : "Chưa có cấu hình nào"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredConfigs.map((config) => (
                  <TableRow key={config.key} hover>
                    <TableCell
                      sx={{
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        color: theme.palette.primary.main,
                      }}
                    >
                      {config.key}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>
                      {config.value}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>{config.description}</TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={config.isActive}
                        onChange={() => handleToggleActive(config)}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenEditDialog(config)}
                        >
                          <IconEdit size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleOpenDeleteDialog(config)}
                        >
                          <IconTrash size={18} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Create Config Dialog */}
      <Dialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Thêm cấu hình mới</DialogTitle>
        <DialogContent dividers>
          <Box >
            <Box >
              <TextField
                fullWidth
                label="Key"
                name="key"
                value={formInput.key}
                onChange={handleFormInputChange}
                margin="normal"
                variant="outlined"
                required
                helperText="Key phải là duy nhất và không thể thay đổi sau khi tạo"
              />
            </Box>
            <Box >
              <TextField
                fullWidth
                label="Giá trị"
                name="value"
                value={formInput.value}
                onChange={handleFormInputChange}
                margin="normal"
                variant="outlined"
                required
                multiline
                rows={4}
              />
            </Box>
            <Box >
              <TextField
                fullWidth
                label="Mô tả"
                name="description"
                value={formInput.description}
                onChange={handleFormInputChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
              />
            </Box>
            <Box >
              <FormControl component="fieldset">
                <Typography component="legend">Trạng thái</Typography>
                <Switch
                  name="isActive"
                  checked={formInput.isActive}
                  onChange={handleFormInputChange}
                  color="primary"
                />
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseCreateDialog} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleCreateConfig}
            variant="contained"
            color="primary"
            disabled={!formInput.key || !formInput.value || createConfigMutation.isPending}
          >
            {createConfigMutation.isPending ? (
              <>
                <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                Đang xử lý...
              </>
            ) : (
              "Tạo cấu hình"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Config Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Chỉnh sửa cấu hình</DialogTitle>
        <DialogContent dividers>
          <Box >
            <Box >
              <TextField
                fullWidth
                label="Key"
                value={formInput.key}
                margin="normal"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                disabled
              />
            </Box>
            <Box >
              <TextField
                fullWidth
                label="Giá trị"
                name="value"
                value={formInput.value}
                onChange={handleFormInputChange}
                margin="normal"
                variant="outlined"
                required
                multiline
                rows={4}
              />
            </Box>
            <Box >
              <TextField
                fullWidth
                label="Mô tả"
                name="description"
                value={formInput.description}
                onChange={handleFormInputChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
              />
            </Box>
            <Box >
              <FormControl component="fieldset">
                <Typography component="legend">Trạng thái</Typography>
                <Switch
                  name="isActive"
                  checked={formInput.isActive}
                  onChange={handleFormInputChange}
                  color="primary"
                />
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseEditDialog} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleUpdateConfig}
            variant="contained"
            color="primary"
            disabled={!formInput.value || updateConfigMutation.isPending}
          >
            {updateConfigMutation.isPending ? (
              <>
                <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                Đang xử lý...
              </>
            ) : (
              "Cập nhật"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Config Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa cấu hình <strong>{currentConfig?.key}</strong>? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDeleteDialog} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleDeleteConfig}
            variant="contained"
            color="error"
            disabled={deleteConfigMutation.isPending}
          >
            {deleteConfigMutation.isPending ? (
              <>
                <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                Đang xử lý...
              </>
            ) : (
              "Xóa"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default SystemConfigPage 