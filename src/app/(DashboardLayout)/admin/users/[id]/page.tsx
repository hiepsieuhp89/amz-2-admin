"use client";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { IconArrowLeft, IconEdit, IconMessage, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useUploadImage } from "@/hooks/image";
import { useGetAllSellerPackages } from "@/hooks/seller-package";
import { useGetAllSpreadPackages } from "@/hooks/spread-package";
import { useDeleteUser, useGetUserById, useUpdateUser } from "@/hooks/user";
import { ISellerPackage } from "@/interface/response/seller-package";
import { ISpreadPackage } from "@/interface/response/spread-package";

const formatDateForInput = (dateString: string) => {
  if (!dateString) return "";
  // Add T00:00 to match datetime-local format
  return `${dateString}T00:00`;
};
function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    phone: "",
    role: "user",
    isActive: false,
    balance: 0,
    fedexBalance: 0,
    bankName: "",
    bankAccountNumber: "",
    bankAccountName: "",
    bankBranch: "",
    bankNumber: "",
    bankCode: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    stars: 0,
    reputationPoints: 0,
    shopName: "",
    shopAddress: "",
    sellerPackageExpiry: "",
    spreadPackageExpiry: "",
    invitationCode: "",
    referralCode: "",
    sellerPackageId: "",
    spreadPackageId: "",
    withdrawPassword: "",
    view: 0,
    totalProfit: 0,
    shopStatus: "",
    idCardType: "",
    idCardNumber: "",
    idCardFrontImage: "",
    idCardBackImage: "",
    productCount: 0,
    totalWithdrawn: 0,
    pendingOrdersValue: 0,
    completedOrdersValue: 0,
    loginPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  const [sellerPackages, setSellerPackages] = useState<ISellerPackage[]>([]);
  const [spreadPackages, setSpreadPackages] = useState<ISpreadPackage[]>([]);
  const [idCardFrontImageFile, setIdCardFrontImageFile] = useState<File | null>(null);
  const [idCardBackImageFile, setIdCardBackImageFile] = useState<File | null>(null);
  const [showLoginPasswordReset, setShowLoginPasswordReset] = useState(false);
  const [showWithdrawPasswordReset, setShowWithdrawPasswordReset] = useState(false);
  const [newLoginPassword, setNewLoginPassword] = useState("");
  const [newWithdrawPassword, setNewWithdrawPassword] = useState("");

  const { data: userData, isLoading, error } = useGetUserById(id);
  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();
  const { data: sellerPackageData } = useGetAllSellerPackages();
  const { data: spreadPackageData } = useGetAllSpreadPackages();
  const uploadImageMutation = useUploadImage();

  useEffect(() => {
    if (userData?.data) {
      setFormData({
        email: userData?.data.email || "",
        username: userData.data.username,
        fullName: userData.data.fullName || "",
        phone: userData.data.phone || "",
        role: userData.data.role || "user",
        isActive: userData.data.isActive || false,
        balance: Number(userData.data.balance),
        fedexBalance: Number(userData.data.fedexBalance),
        bankName: userData.data.bankName || "",
        bankAccountNumber: userData.data.bankAccountNumber || "",
        bankAccountName: userData.data.bankAccountName || "",
        bankBranch: userData.data.bankBranch || "",
        bankNumber: userData.data.bankNumber || "",
        bankCode: userData.data.bankCode || "",
        address: userData.data.address || "",
        city: userData.data.city || "",
        district: userData.data.district || "",
        ward: userData.data.ward || "",
        stars: Number(userData.data.stars),
        reputationPoints: Number(userData.data.reputationPoints),
        shopName: userData.data.shopName || "",
        shopAddress: userData.data.shopAddress || "",
        sellerPackageExpiry: formatDateForInput(
          userData.data.sellerPackageExpiry || ""
        ),
        spreadPackageExpiry: formatDateForInput(
          userData.data.spreadPackageExpiry || ""
        ),
        invitationCode: userData.data.invitationCode || "",
        referralCode: userData.data.referralCode || "",
        sellerPackageId: userData.data.sellerPackageId || "",
        spreadPackageId: userData.data.spreadPackageId || "",
        withdrawPassword: userData.data.withdrawPassword || "",
        view: Number(userData.data.view) || 0,
        totalProfit: Number(userData.data.totalProfit) || 0,
        shopStatus: userData.data.shopStatus || "",
        idCardType: userData.data.idCardType || "",
        idCardNumber: userData.data.idCardNumber || "",
        idCardFrontImage: userData.data.idCardFrontImage || "",
        idCardBackImage: userData.data.idCardBackImage || "",
        productCount: userData.data.metadata?.productCount ? Number(userData.data.metadata.productCount) : 0,
        totalWithdrawn: userData.data.metadata?.totalWithdrawn ? Number(userData.data.metadata.totalWithdrawn) : 0,
        pendingOrdersValue: userData.data.metadata?.pendingOrdersValue ? Number(userData.data.metadata.pendingOrdersValue) : 0,
        completedOrdersValue: userData.data.metadata?.completedOrdersValue ? Number(userData.data.metadata.completedOrdersValue) : 0,
        loginPassword: userData.data.metadata?.loginPassword || "",
      });
    }
    if (sellerPackageData?.data) {
      setSellerPackages(sellerPackageData.data);
    }
    if (spreadPackageData?.data) {
      setSpreadPackages(spreadPackageData.data);
    }
  }, [userData, sellerPackageData, spreadPackageData]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      phone: "",
    };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (10-11 số)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBack = () => {
    router.push("/admin/users");
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUserMutation.mutateAsync(id);
      message.success("Người dùng đã được xóa thành công!");
      router.push("/admin/users");
    } catch (error) {
      message.error("Không thể xóa người dùng. Vui lòng thử lại.");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | { name?: string; value: unknown }
      | SelectChangeEvent<string>
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name) {
      setFormData({
        ...formData,
        [name]:
          type === "checkbox"
            ? checked
            : type === "number"
            ? Number(value)
            : value,
      });
    }
  };

  const handleIdCardFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIdCardFrontImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          idCardFrontImage: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdCardBackImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIdCardBackImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          idCardBackImage: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeIdCardFrontImage = () => {
    setIdCardFrontImageFile(null);
    setFormData(prev => ({
      ...prev,
      idCardFrontImage: "",
    }));
  };

  const removeIdCardBackImage = () => {
    setIdCardBackImageFile(null);
    setFormData(prev => ({
      ...prev,
      idCardBackImage: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      message.error("Vui lòng kiểm tra lại thông tin nhập");
      return;
    }

    try {
      // Create a payload with only defined values
      const payload: Record<string, any> = {};
      
      // Add fields to payload only if they have values
      if (formData.username) payload.username = formData.username;
      if (formData.email) payload.email = formData.email;
      if (formData.phone) payload.phone = formData.phone;
      if (formData.fullName) payload.fullName = formData.fullName;
      if (formData.role) payload.role = formData.role;
      if (formData.shopName) payload.shopName = formData.shopName;
      if (formData.shopAddress) payload.shopAddress = formData.shopAddress;
      if (formData.balance) payload.balance = formData.balance.toString();
      if (formData.fedexBalance) payload.fedexBalance = formData.fedexBalance.toString();
      if (formData.invitationCode) payload.invitationCode = formData.invitationCode;
      if (formData.sellerPackageId) payload.sellerPackageId = formData.sellerPackageId;
      if (formData.sellerPackageExpiry) payload.sellerPackageExpiry = formData.sellerPackageExpiry;
      if (formData.spreadPackageId) payload.spreadPackageId = formData.spreadPackageId;
      if (formData.spreadPackageExpiry) payload.spreadPackageExpiry = formData.spreadPackageExpiry;
      if (formData.stars) payload.stars = formData.stars;
      if (formData.reputationPoints) payload.reputationPoints = formData.reputationPoints;
      if (formData.view) payload.view = formData.view;
      if (formData.withdrawPassword) payload.withdrawPassword = formData.withdrawPassword;
      if (formData.idCardType) payload.idCardType = formData.idCardType;
      if (formData.idCardNumber) payload.idCardNumber = formData.idCardNumber;
      
      // Upload ID card front image if changed
      if (idCardFrontImageFile) {
        message.loading({ content: "Đang tải ảnh mặt trước...", key: "uploadFrontImage" });
        
        const uploadResult = await uploadImageMutation.mutateAsync({
          file: idCardFrontImageFile,
          isPublic: true,
          description: `Ảnh mặt trước giấy tờ của người dùng: ${formData.fullName || formData.username}`
        });
        
        message.success({ content: "Tải ảnh mặt trước thành công!", key: "uploadFrontImage" });
        
        // Update image URL from upload result
        payload.idCardFrontImage = uploadResult.data.url;
      } else if (formData.idCardFrontImage) {
        payload.idCardFrontImage = formData.idCardFrontImage;
      }
      
      // Upload ID card back image if changed
      if (idCardBackImageFile) {
        message.loading({ content: "Đang tải ảnh mặt sau...", key: "uploadBackImage" });
        
        const uploadResult = await uploadImageMutation.mutateAsync({
          file: idCardBackImageFile,
          isPublic: true,
          description: `Ảnh mặt sau giấy tờ của người dùng: ${formData.fullName || formData.username}`
        });
        
        message.success({ content: "Tải ảnh mặt sau thành công!", key: "uploadBackImage" });
        
        // Update image URL from upload result
        payload.idCardBackImage = uploadResult.data.url;
      } else if (formData.idCardBackImage) {
        payload.idCardBackImage = formData.idCardBackImage;
      }
      
      // Metadata fields
      const metadata: Record<string, any> = {};
      if (formData.productCount) metadata.productCount = formData.productCount.toString();
      if (formData.totalWithdrawn) metadata.totalWithdrawn = formData.totalWithdrawn.toString();
      if (formData.pendingOrdersValue) metadata.pendingOrdersValue = formData.pendingOrdersValue.toString();
      if (formData.completedOrdersValue) metadata.completedOrdersValue = formData.completedOrdersValue.toString();
      if (formData.loginPassword) metadata.loginPassword = formData.loginPassword;
      
      // Only add metadata if there are values
      if (Object.keys(metadata).length > 0) {
        payload.metadata = metadata;
      }

      await updateUserMutation.mutateAsync({
        id,
        payload,
      });
      message.success("Thông tin người dùng đã được cập nhật!");
      setIsEditing(false);
    } catch (error) {
      message.error(
        "Không thể cập nhật thông tin người dùng. Vui lòng thử lại."
      );
      console.error(error);
    }
  };

  const handleResetLoginPassword = () => {
    if (newLoginPassword.trim()) {
      setFormData(prev => ({
        ...prev,
        loginPassword: newLoginPassword
      }));
      setShowLoginPasswordReset(false);
      setNewLoginPassword("");
      message.success("Mật khẩu đăng nhập đã được cập nhật. Lưu để áp dụng thay đổi.");
    } else {
      message.error("Vui lòng nhập mật khẩu mới");
    }
  };

  const handleResetWithdrawPassword = () => {
    if (newWithdrawPassword.trim()) {
      setFormData(prev => ({
        ...prev,
        withdrawPassword: newWithdrawPassword
      }));
      setShowWithdrawPasswordReset(false);
      setNewWithdrawPassword("");
      message.success("Mật khẩu giao dịch đã được cập nhật. Lưu để áp dụng thay đổi.");
    } else {
      message.error("Vui lòng nhập mật khẩu mới");
    }
  };

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center p-6 py-12">
        <CircularProgress className="text-main-golden-orange" />
      </Box>
    );
  }

  if (error || !userData) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải thông tin người dùng
        </Typography>
        <Typography className="mb-4 text-gray-400">
          {error?.message || "Không tìm thấy người dùng hoặc đã bị xóa"}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<IconArrowLeft size={18} />}
          onClick={handleBack}
          className="text-gray-300 border-gray-500 hover:bg-gray-700"
        >
          Quay lại danh sách
        </Button>
      </Box>
    );
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
          Chi tiết người dùng
        </Typography>
      </Box>

      <Paper className="p-6 border">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <TextField
                size="small"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Tên đăng nhập"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={true} // Không cho phép thay đổi username
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <TextField
                size="small"
                label="Họ tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <FormControl fullWidth size="small" disabled={!isEditing}>
                <InputLabel id="role-label">Vai trò</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={formData.role}
                  label="Vai trò"
                  onChange={(e) =>
                    handleChange(
                      e as React.ChangeEvent<
                        HTMLInputElement | { name?: string; value: unknown }
                      >
                    )
                  }
                >
                  <MenuItem value="user">Người dùng</MenuItem>
                  <MenuItem value="shop">Người bán</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                size="small"
                label="Số dư"
                name="balance"
                type="number"
                value={formData.balance}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Typography fontSize={14} variant="subtitle1">
              Trạng thái tài khoản
            </Typography>
            <FormControlLabel
              label={formData.isActive ? "Đang hoạt động" : "Đã khóa"}
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={handleChange}
                  name="isActive"
                  color="primary"
                  disabled={!isEditing}
                />
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <TextField
                size="small"
                label="Fedex Balance"
                name="fedexBalance"
                type="number"
                value={formData.fedexBalance}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Bank Account Number"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <TextField
                size="small"
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <FormControl fullWidth size="small" disabled={!isEditing}>
                <InputLabel>Gói Seller</InputLabel>
                <Select
                  name="sellerPackageId"
                  value={formData.sellerPackageId || ""}
                  label="Gói Seller"
                  onChange={(e) => handleChange(e as any)}
                >
                  {sellerPackages.map((pkg) => (
                    <MenuItem key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                size="small"
                label="Ngày hết hạn Seller Package"
                name="sellerPackageExpiry"
                type="datetime-local"
                value={formData.sellerPackageExpiry}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <FormControl fullWidth size="small" disabled={!isEditing}>
                <InputLabel>Gói Spread</InputLabel>
                <Select
                  name="spreadPackageId"
                  value={formData.spreadPackageId || ""}
                  label="Gói Spread"
                  onChange={(e) => handleChange(e as any)}
                >
                  {spreadPackages.map((pkg) => (
                    <MenuItem key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                size="small"
                label="Ngày hết hạn Spread Package"
                name="spreadPackageExpiry"
                type="datetime-local"
                value={formData.spreadPackageExpiry}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>

          {/* Shop Information Section */}
          <Typography variant="h6" className="!text-main-golden-orange font-semibold mt-6 mb-4">
            Thông tin cửa hàng
          </Typography>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <TextField
                size="small"
                label="Tên cửa hàng"
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Địa chỉ cửa hàng"
                name="shopAddress"
                value={formData.shopAddress}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <TextField
                size="small"
                label="Số sao (1-5)"
                name="stars"
                type="number"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                value={formData.stars}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Điểm uy tín"
                name="reputationPoints"
                type="number"
                value={formData.reputationPoints}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Lượt xem cửa hàng"
                name="view"
                type="number"
                value={formData.view}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={true}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <TextField
                size="small"
                label="Số lượng sản phẩm"
                name="productCount"
                type="number"
                value={formData.productCount}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={true}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Tổng lợi nhuận"
                name="totalProfit"
                type="number"
                value={formData.totalProfit}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={true}
              />
            </div>
            <div>
              <FormControl fullWidth size="small" disabled={!isEditing}>
                <InputLabel>Trạng thái cửa hàng</InputLabel>
                <Select
                  name="shopStatus"
                  value={formData.shopStatus || ""}
                  label="Trạng thái cửa hàng"
                  onChange={(e) => handleChange(e as any)}
                >
                  <MenuItem value="PENDING">Đang chờ duyệt</MenuItem>
                  <MenuItem value="ACTIVE">Hoạt động</MenuItem>
                  <MenuItem value="SUSPENDED">Đóng băng</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          
          {/* Financial Information Section */}
          <Typography variant="h6" className="!text-main-golden-orange font-semibold mt-6 mb-4">
            Thông tin tài chính
          </Typography>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <TextField
                size="small"
                label="Số dư ví cửa hàng"
                name="balance"
                type="number"
                value={formData.balance}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Số dư ví Fedex"
                name="fedexBalance"
                type="number"
                value={formData.fedexBalance}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Tổng tiền đã rút"
                name="totalWithdrawn"
                type="number"
                value={formData.totalWithdrawn}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <TextField
                size="small"
                label="Tổng tiền hàng đang giao"
                name="pendingOrdersValue"
                type="number"
                value={formData.pendingOrdersValue}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={true}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Tổng tiền hàng đã giao"
                name="completedOrdersValue"
                type="number"
                value={formData.completedOrdersValue}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={true}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Tổng tiền hàng đã rút"
                name="totalWithdrawn"
                type="number"
                value={formData.totalWithdrawn}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
          </div>
          
          {/* Password Section */}
          <Typography variant="h6" className="!text-main-golden-orange font-semibold mt-6 mb-4">
            Thông tin mật khẩu
          </Typography>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="flex flex-col space-y-2">
                <Typography fontSize={14} variant="subtitle1">
                  Mật khẩu đăng nhập
                </Typography>
                
                {!showLoginPasswordReset ? (
                  <div className="flex items-center space-x-2">
                    <TextField
                      size="small"
                      type="password"
                      value="••••••••"
                      disabled
                      fullWidth
                      variant="outlined"
                      className="rounded"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {isEditing && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setShowLoginPasswordReset(true)}
                        className="whitespace-nowrap"
                      >
                        Đặt lại
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <TextField
                      size="small"
                      placeholder="Nhập mật khẩu mới"
                      type="password"
                      value={newLoginPassword}
                      onChange={(e) => setNewLoginPassword(e.target.value)}
                      fullWidth
                      variant="outlined"
                      className="rounded"
                    />
                    <div className="flex space-x-2">
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => {
                          setShowLoginPasswordReset(false);
                          setNewLoginPassword("");
                        }}
                      >
                        Hủy
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleResetLoginPassword}
                        className="!bg-main-golden-orange text-black"
                      >
                        Xác nhận
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="flex flex-col space-y-2">
                <Typography fontSize={14} variant="subtitle1">
                  Mật khẩu giao dịch
                </Typography>
                
                {!showWithdrawPasswordReset ? (
                  <div className="flex items-center space-x-2">
                    <TextField
                      size="small"
                      type="password"
                      value="••••••••"
                      disabled
                      fullWidth
                      variant="outlined"
                      className="rounded"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {isEditing && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setShowWithdrawPasswordReset(true)}
                        className="whitespace-nowrap"
                      >
                        Đặt lại
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <TextField
                      size="small"
                      placeholder="Nhập mật khẩu mới"
                      type="password"
                      value={newWithdrawPassword}
                      onChange={(e) => setNewWithdrawPassword(e.target.value)}
                      fullWidth
                      variant="outlined"
                      className="rounded"
                    />
                    <div className="flex space-x-2">
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => {
                          setShowWithdrawPasswordReset(false);
                          setNewWithdrawPassword("");
                        }}
                      >
                        Hủy
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleResetWithdrawPassword}
                        className="!bg-main-golden-orange text-black"
                      >
                        Xác nhận
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* ID Card Information */}
          <Typography variant="h6" className="!text-main-golden-orange font-semibold mt-6 mb-4">
            Thông tin giấy tờ
          </Typography>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <TextField
                size="small"
                label="Loại giấy tờ"
                name="idCardType"
                value={formData.idCardType}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
            <div>
              <TextField
                size="small"
                label="Số giấy tờ"
                name="idCardNumber"
                value={formData.idCardNumber}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Typography fontSize={14} variant="subtitle1" className="!mb-2">
                Ảnh mặt trước giấy tờ
              </Typography>
              {formData.idCardFrontImage ? (
                <div className="relative flex-1 w-full h-40 overflow-hidden border border-gray-300 rounded">
                  <img
                    src={formData.idCardFrontImage}
                    alt="ID Card Front"
                    className="object-contain w-full h-full"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={removeIdCardFrontImage}
                      className="absolute p-1 transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                    >
                      <IconX size={16} color="white" />
                    </button>
                  )}
                </div>
              ) : isEditing ? (
                <label className="flex flex-col items-center justify-center w-full h-40 transition-colors border border-gray-300 border-dashed !rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center py-4">
                    <IconUpload size={24} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">Upload ảnh mặt trước</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleIdCardFrontImageChange} 
                  />
                </label>
              ) : (
                <div className="flex items-center justify-center h-40 border border-gray-200 rounded bg-gray-50">
                  <Typography className="text-gray-400">Chưa có ảnh</Typography>
                </div>
              )}
            </div>
            <div>
              <Typography fontSize={14} variant="subtitle1" className="!mb-2">
                Ảnh mặt sau giấy tờ
              </Typography>
              {formData.idCardBackImage ? (
                <div className="relative flex-1 w-full h-40 overflow-hidden border border-gray-300 rounded">
                  <img
                    src={formData.idCardBackImage}
                    alt="ID Card Back"
                    className="object-contain w-full h-full"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={removeIdCardBackImage}
                      className="absolute p-1 transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                    >
                      <IconX size={16} color="white" />
                    </button>
                  )}
                </div>
              ) : isEditing ? (
                <label className="flex flex-col items-center justify-center w-full h-40 transition-colors border border-gray-300 border-dashed !rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center py-4">
                    <IconUpload size={24} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">Upload ảnh mặt sau</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleIdCardBackImageChange} 
                  />
                </label>
              ) : (
                <div className="flex items-center justify-center h-40 border border-gray-200 rounded bg-gray-50">
                  <Typography className="text-gray-400">Chưa có ảnh</Typography>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <Box className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outlined"
                onClick={() => setIsEditing(false)}
              >
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={updateUserMutation.isPending}
                className="text-black !bg-main-golden-orange hover:bg-amber-600"
              >
                {updateUserMutation.isPending ? (
                  <CircularProgress size={16} className="text-white" />
                ) : (
                  "Cập nhật"
                )}
              </Button>
            </Box>
          )}
        </form>
        <Box className="flex justify-end gap-2 mt-4 mb-4">
          {!isEditing ? (
            <>
              <Button
                variant="contained"
                startIcon={<IconMessage size={18} />}
                onClick={() => {
                  // Open chat with this user
                  router.push(`/admin/users?chat=${id}`)
                }}
                className="!bg-blue-500 !text-white"
              >
                Chat
              </Button>
              <Button
                variant="contained"
                startIcon={<IconTrash size={18} />}
                onClick={() => setDeleteDialogOpen(true)}
                className="!bg-red-500 !text-white"
              >
                Xóa
              </Button>
              <Button
                variant="contained"
                startIcon={<IconEdit size={18} />}
                onClick={() => setIsEditing(true)}
                className="!normal-case !bg-main-golden-orange"
              >
                Cập nhật
              </Button>
            </>
          ) : null}
        </Box>
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          className: "!rounded-[6px] shadow-xl",
        }}
      >
        <DialogTitle fontSize={18}>
          Xác nhận xóa
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-gray-400">
            Bạn có chắc chắn muốn xóa người dùng &quot;
            {formData.fullName || formData.username}&quot;? Hành động này không
            thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="!p-4 !pb-6">
          <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>
            Hủy bỏ
          </Button>
          <Button
            variant="outlined"
            onClick={handleDeleteConfirm}
            className="text-white transition-colors !bg-red-500"
            disabled={deleteUserMutation.isPending}
          >
            {deleteUserMutation.isPending ? (
              <div className="flex items-center gap-2 text-white">
                <CircularProgress size={16} className="text-white" />
                Đang xóa...
              </div>
            ) : (
              <span className="!text-white">Xóa</span>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserDetailPage;
