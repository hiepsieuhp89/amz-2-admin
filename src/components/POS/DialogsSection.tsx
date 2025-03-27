"use client"

import type React from "react"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  type SelectChangeEvent,
} from "@mui/material"
import { geographicData } from "@/helper/nations"

interface DialogsSectionProps {
  // Address Dialog Props
  openDialog: boolean
  handleCloseDialog: () => void
  selectedUserId: string
  setSelectedUserId: (value: string) => void
  selectedCountry: string
  setSelectedCountry: (value: string) => void
  selectedState: string
  setSelectedState: (value: string) => void
  selectedCity: string
  setSelectedCity: (value: string) => void
  selectedDistrict: string
  setSelectedDistrict: (value: string) => void
  selectedPostalCode: string
  setSelectedPostalCode: (value: string) => void
  address: string
  setAddress: (value: string) => void
  handleSaveAddress: () => Promise<boolean>
  shopsData: any

  // Confirm Order Dialog Props
  confirmOpen: boolean
  setConfirmOpen: (value: boolean) => void
  selectedUser: any
  selectedProducts: any[]
  quantities: { [key: string]: number }
  handleConfirmOrder: () => boolean
}

const DialogsSection = ({
  openDialog,
  handleCloseDialog,
  selectedUserId,
  setSelectedUserId,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  selectedDistrict,
  setSelectedDistrict,
  selectedPostalCode,
  setSelectedPostalCode,
  address,
  setAddress,
  handleSaveAddress,
  shopsData,
  confirmOpen,
  setConfirmOpen,
  selectedUser,
  selectedProducts,
  quantities,
  handleConfirmOrder,
}: DialogsSectionProps) => {
  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    setSelectedCountry(e.target.value)
    setSelectedState("")
    setSelectedCity("")
    setSelectedDistrict("")
    setSelectedPostalCode("")
  }

  const handleStateChange = (e: SelectChangeEvent<string>) => {
    setSelectedState(e.target.value)
    setSelectedCity("")
    setSelectedDistrict("")
    setSelectedPostalCode("")
  }

  const handleCityChange = (e: SelectChangeEvent<string>) => {
    setSelectedCity(e.target.value)
    setSelectedDistrict("")
    setSelectedPostalCode("")
  }

  const handleDistrictChange = (e: SelectChangeEvent<string>) => {
    setSelectedDistrict(e.target.value)
    setSelectedPostalCode("")
  }

  const handlePostalCodeChange = (e: SelectChangeEvent<string>) => {
    setSelectedPostalCode(e.target.value)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  return (
    <>
      {/* Address Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "60vw",
            maxWidth: "none",
          },
        }}
      >
        <DialogTitle fontSize={18}>Thêm địa chỉ mới</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Chọn người dùng</InputLabel>
                    <Select
                      value={selectedUserId}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      label="Chọn người dùng"
                      size="small"
                    >
                      {shopsData?.data?.data.map((user: any) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.fullName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Quốc gia</InputLabel>
                    <Select value={selectedCountry} onChange={handleCountryChange} label="Quốc gia">
                      {Object.keys(geographicData).map((country) => (
                        <MenuItem key={country} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Tỉnh/Thành phố</InputLabel>
                    <Select
                      value={selectedState}
                      onChange={handleStateChange}
                      label="Tỉnh/Thành phố"
                      disabled={!selectedCountry}
                    >
                      {selectedCountry &&
                        (geographicData[selectedCountry as keyof typeof geographicData] as any).provinces.map(
                          (province: any) => (
                            <MenuItem key={province.code} value={province.code}>
                              {province.name}
                            </MenuItem>
                          ),
                        )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Thành phố/Quận</InputLabel>
                    <Select
                      value={selectedCity}
                      onChange={handleCityChange}
                      label="Thành phố/Quận"
                      disabled={!selectedState}
                    >
                      {selectedState &&
                        (geographicData[selectedCountry as keyof typeof geographicData] as any).city[
                          selectedState
                        ]?.map((city: any) => (
                          <MenuItem key={city.code} value={city.code}>
                            {city.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Quận/Huyện</InputLabel>
                    <Select
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                      label="Quận/Huyện"
                      disabled={!selectedCity}
                    >
                      {selectedCity &&
                        (geographicData[selectedCountry as keyof typeof geographicData] as any).ward[selectedCity]?.map(
                          (ward: any) => (
                            <MenuItem key={ward.code} value={ward.code}>
                              {ward.name}
                            </MenuItem>
                          ),
                        )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Mã bưu điện</InputLabel>
                    <Select
                      value={selectedPostalCode}
                      onChange={handlePostalCodeChange}
                      label="Mã bưu điện"
                      disabled={!selectedDistrict}
                    >
                      {selectedDistrict &&
                        (geographicData[selectedCountry as keyof typeof geographicData] as any).city[
                          selectedState
                        ]?.find((city: any) => city.code === selectedCity)?.postalCodeId && (
                          <MenuItem value={selectedPostalCode}>{selectedPostalCode}</MenuItem>
                        )}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa chỉ chi tiết"
                    value={address}
                    onChange={handleAddressChange}
                    margin="normal"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="mx-4 mb-4">
          <Button className="!normal-case" variant="outlined" onClick={handleCloseDialog}>
            Huỷ bỏ
          </Button>
          <Button className="!normal-case" onClick={handleSaveAddress} variant="contained">
            Lưu địa chỉ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Order Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle fontSize={18}>Xác nhận đơn hàng</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Chi tiết đơn hàng
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography>
                <strong>Khách hàng:</strong> {selectedUser?.fullName}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedUser?.email}
              </Typography>
              <Typography>
                <strong>Số điện thoại:</strong> {selectedUser?.phone}
              </Typography>
              <Typography>
                <strong>Địa chỉ:</strong> {selectedUser?.address}
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sản phẩm đã chọn
              </Typography>
              <List>
                {selectedProducts.map((product) => (
                  <ListItem key={product.id} sx={{ py: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      <Typography>{product.name}</Typography>
                      <Typography>
                        {quantities[product.id] || 1} x ${Number(product.salePrice).toFixed(2)}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #e0e0e0" }}>
              <Typography variant="h6">
                Tổng cộng: $
                {(
                  selectedProducts.reduce((sum, p) => sum + Number(p.salePrice) * (quantities[p.id] || 1), 0) * 1.08 +
                  5
                ).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button onClick={handleConfirmOrder} variant="contained" color="primary">
            Xác nhận đặt hàng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogsSection

