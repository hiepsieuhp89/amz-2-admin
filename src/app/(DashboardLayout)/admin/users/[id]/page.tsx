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
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { IconArrowLeft, IconEdit, IconTrash, IconMessage, IconUpload, IconX, IconStar, IconEye, IconEyeOff } from "@tabler/icons-react";
import { message } from "antd";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useUploadImage } from "@/hooks/image";
import { useGetAllSellerPackages } from "@/hooks/seller-package";
import { useGetAllSpreadPackages } from "@/hooks/spread-package";
import { useDeleteUser, useGetUserById, useUpdateUser } from "@/hooks/user";
import { ISellerPackage } from "@/interface/response/seller-package";
import { ISpreadPackage } from "@/interface/response/spread-package";

function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTransactionPassword, setShowTransactionPassword] = useState(false);
  const [showWalletPassword, setShowWalletPassword] = useState(false);
  const [showWithdrawPassword, setShowWithdrawPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    // Thông tin người dùng
    username: "",
    fullName: "",
    // Thông tin cửa hàng
    shopName: "",
    shopAddress: "",
    view: 0,
    stars: 0,
    reputationPoints: 0,
    logoUrl: "",
    // Thông tin tài chính
    balance: 0,
    fedexBalance: 0,
    totalWithdrawn: 0,
    totalShippingOrders: 0,
    totalDeliveredOrders: 0,
    totalProfit: 0,
    totalProducts: 0,
    // Thông tin ngân hàng
    bankName: "",
    bankAccountNumber: "",
    bankAccountName: "",
    // Thông tin mật khẩu
    password: "",
    transactionPassword: "",
    walletPassword: "",
    withdrawPassword: "",
    // Thông tin xác thực
    idCardType: "",
    idCardNumber: "",
    idCardFrontImage: "",
    idCardBackImage: "",
    // Thông tin vai trò
    role: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });
  const [sellerPackages, setSellerPackages] = useState<ISellerPackage[]>([]);
  const [spreadPackages, setSpreadPackages] = useState<ISpreadPackage[]>([]);
  const [imagePreviewFront, setImagePreviewFront] = useState<string | null>(null);
  const [imagePreviewBack, setImagePreviewBack] = useState<string | null>(null);
  const [imageFileFront, setImageFileFront] = useState<File | null>(null);
  const [imageFileBack, setImageFileBack] = useState<File | null>(null);
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
        phone: userData.data.phone || "",
        address: userData.data.address || "",
        username: userData.data.username || "",
        fullName: userData.data.fullName || "",
        shopName: userData.data.shopName || "",
        shopAddress: userData.data.shopAddress || "",
        view: Number(userData.data.view),
        stars: Number(userData.data.stars),
        reputationPoints: Number(userData.data.reputationPoints),
        logoUrl: userData.data.logoUrl || "",
        balance: Number(userData.data.balance),
        fedexBalance: Number(userData.data.fedexBalance),
        totalWithdrawn: Number(userData.data.totalWithdrawn || 0),
        totalShippingOrders: Number(userData.data.totalShippingOrders || 0),
        totalDeliveredOrders: Number(userData.data.totalDeliveredOrders || 0),
        totalProfit: Number(userData.data.totalProfit),
        totalProducts: Number(userData.data.totalProducts || 0),
        bankName: userData.data.bankName || "",
        bankAccountNumber: userData.data.bankAccountNumber || "",
        bankAccountName: userData.data.bankAccountName || "",
        password: "",
        transactionPassword: "",
        withdrawPassword: userData.data.withdrawPassword || "",
        walletPassword: "",
        idCardType: userData.data.idCardType || "",
        idCardNumber: userData.data.idCardNumber || "",
        idCardFrontImage: userData.data.idCardFrontImage || "",
        idCardBackImage: userData.data.idCardBackImage || "",
        role: userData.data.role || "",
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (type === 'front') {
        setImageFileFront(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreviewFront(event.target?.result as string);
        };
        reader.readAsDataURL(file);

        setFormData((prev) => ({
          ...prev,
          idCardFrontImage: "image-url-placeholder",
        }));
      } else {
        setImageFileBack(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreviewBack(event.target?.result as string);
        };
        reader.readAsDataURL(file);

        setFormData((prev) => ({
          ...prev,
          idCardBackImage: "image-url-placeholder",
        }));
      }
    }
  };

  const removeImage = (type: 'front' | 'back') => {
    if (type === 'front') {
      setImagePreviewFront(null);
      setImageFileFront(null);
      setFormData((prev) => ({
        ...prev,
        idCardFrontImage: "",
      }));
    } else {
      setImagePreviewBack(null);
      setImageFileBack(null);
      setFormData((prev) => ({
        ...prev,
        idCardBackImage: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      message.error("Vui lòng kiểm tra lại thông tin nhập");
      return;
    }

    try {
      let updatedFormData = { ...formData };

      // Upload ảnh mặt trước nếu có
      if (imageFileFront) {
        message.loading({ content: "Đang tải ảnh mặt trước lên...", key: "uploadImageFront" });

        const uploadResultFront = await uploadImageMutation.mutateAsync({
          file: imageFileFront,
          isPublic: true,
          description: `Ảnh mặt trước giấy tờ của người dùng: ${updatedFormData.email}`
        });

        message.success({ content: "Tải ảnh mặt trước thành công!", key: "uploadImageFront" });

        updatedFormData = {
          ...updatedFormData,
          idCardFrontImage: uploadResultFront.data.url
        };
      }

      // Upload ảnh mặt sau nếu có
      if (imageFileBack) {
        message.loading({ content: "Đang tải ảnh mặt sau lên...", key: "uploadImageBack" });

        const uploadResultBack = await uploadImageMutation.mutateAsync({
          file: imageFileBack,
          isPublic: true,
          description: `Ảnh mặt sau giấy tờ của người dùng: ${updatedFormData.email}`
        });

        message.success({ content: "Tải ảnh mặt sau thành công!", key: "uploadImageBack" });

        updatedFormData = {
          ...updatedFormData,
          idCardBackImage: uploadResultBack.data.url
        };
      }

      await updateUserMutation.mutateAsync({
        id,
        payload: {
          email: updatedFormData.email,
          phone: updatedFormData.phone,
          address: updatedFormData.address,
          shopName: updatedFormData.shopName,
          view: updatedFormData.view,
          stars: updatedFormData.stars,
          reputationPoints: updatedFormData.reputationPoints,
          logoUrl: updatedFormData.logoUrl,
          balance: updatedFormData.balance.toString(),
          fedexBalance: updatedFormData.fedexBalance.toString(),
          totalProfit: updatedFormData.totalProfit,
          password: updatedFormData.password,
          idCardType: updatedFormData.idCardType,
          idCardNumber: updatedFormData.idCardNumber,
          idCardFrontImage: updatedFormData.idCardFrontImage,
          idCardBackImage: updatedFormData.idCardBackImage,
          role: updatedFormData.role,
          username: updatedFormData.username,
          fullName: updatedFormData.fullName,
          bankName: updatedFormData.bankName,
          bankAccountNumber: updatedFormData.bankAccountNumber,
          bankAccountName: updatedFormData.bankAccountName,
        },
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

  const generateRating = (value: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <IconStar
            key={index}
            size={16}
            fill={index < value ? "#FFD700" : "#e5e7eb"}
            className={index < value ? "text-[#FFD700]" : "text-gray-200"}
          />
        ))}
        <span className="ml-1">{value} sao</span>
      </div>
    );
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
          {/* Thông tin cơ bản */}
          <Typography variant="h6" className="font-medium">Thông tin cơ bản</Typography>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField
              size="small"
              label="Địa chỉ"
              name="address"
              value={formData.address || formData.shopAddress}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
            />
            <FormControl fullWidth size="small" disabled={!isEditing}>
              <InputLabel>Vai trò</InputLabel>
              <Select
                name="role"
                value={formData.role}
                label="Vai trò"
                onChange={(e) => handleChange(e as any)}
              >
                <MenuItem value="user">Người dùng</MenuItem>
                <MenuItem value="shop">Cửa hàng</MenuItem>
                <MenuItem value="admin">Quản trị viên</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Thông tin người dùng (chỉ hiển thị cho user và admin) */}
          {(userData?.data.role === "user" || userData?.data.role === "admin") && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextField
                size="small"
                label="Tên người dùng"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
              <TextField
                size="small"
                label="Tên đầy đủ"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </div>
          )}

          {/* Thông tin cửa hàng */}
          {userData?.data.role === "shop" && <Typography variant="h6" className="mt-6 font-medium">Thông tin cửa hàng</Typography>}
          {userData?.data.role === "shop" && <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField
              size="small"
              label={userData?.data.role === "shop" ? "Tên cửa hàng" : "Tên người dùng"}
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
            />
            <TextField
              size="small"
              label="Lượt xem"
              name="view"
              type="number"
              value={formData.view}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
            />
          </div>}
          {userData?.data.role === "shop" && <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormControl fullWidth size="small" disabled={!isEditing}>
              <InputLabel>Đánh giá sao</InputLabel>
              <Select
                name="stars"
                value={formData.stars}
                label="Đánh giá sao"
                onChange={(e) => handleChange(e as any)}
              >
                <MenuItem value={0}>{generateRating(0)}</MenuItem>
                <MenuItem value={1}>{generateRating(1)}</MenuItem>
                <MenuItem value={2}>{generateRating(2)}</MenuItem>
                <MenuItem value={3}>{generateRating(3)}</MenuItem>
                <MenuItem value={4}>{generateRating(4)}</MenuItem>
                <MenuItem value={5}>{generateRating(5)}</MenuItem>
              </Select>
            </FormControl>
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
          </div>}

          {userData?.data.role === "shop" && <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <TextField
                size="small"
                label="Số lượng sản phẩm"
                name="totalProducts"
                type="number"
                value={formData.totalProducts}
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
          </div>}
          {userData?.data.role === "shop" && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Typography variant="subtitle1" className="mb-2">Logo cửa hàng</Typography>
                {formData.logoUrl ? (
                  <div className="relative w-32 h-32">
                    <Image
                      src={formData.logoUrl}
                      alt="Logo cửa hàng"
                      fill
                      sizes="(max-width: 128px) 100vw, 128px"
                      className="object-contain rounded"
                    />
                  </div>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Chưa có logo
                  </Typography>
                )}
              </div>
            </div>
          )}
          {/* Thông tin tài chính */}
          {userData?.data.role === "shop" && <Typography variant="h6" className="mt-6 font-medium">Thông tin tài chính</Typography>}
          {userData?.data.role === "shop" && <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          </div>}
          {userData?.data.role === "shop" && <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField
              size="small"
              label="Số tiền đã rút"
              name="totalWithdrawn"
              type="number"
              value={formData.totalWithdrawn}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
            />
            <TextField
              size="small"
              label="Tổng lợi nhuận"
              name="totalProfit"
              type="number"
              value={formData.totalProfit}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
            />
          </div>}
          {userData?.data.role === "shop" && <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField
              size="small"
              label="Tổng tiền hàng đang giao"
              name="totalShippingOrders"
              type="number"
              value={formData.totalShippingOrders}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
            />
            <TextField
              size="small"
              label="Tổng tiền hàng đã giao"
              name="totalDeliveredOrders"
              type="number"
              value={formData.totalDeliveredOrders}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
            />
          </div>}
          {userData?.data.role === "shop" && <TextField
            size="small"
            label="Số lượng sản phẩm"
            name="totalProducts"
            type="number"
            value={formData.totalProducts}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="rounded"
            disabled={!isEditing}
          />}

          {/* Thông tin ngân hàng (chỉ hiển thị cho user và admin) */}
          {(userData?.data.role === "user" || userData?.data.role === "admin") && (
            <>
              <Typography variant="h6" className="mt-6 font-medium">Thông tin ngân hàng</Typography>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <TextField
                  size="small"
                  label="Tên ngân hàng"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  className="rounded"
                  disabled={!isEditing}
                />
                <TextField
                  size="small"
                  label="Số tài khoản"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  className="rounded"
                  disabled={!isEditing}
                />
              </div>
              <TextField
                size="small"
                label="Tên tài khoản"
                name="bankAccountName"
                value={formData.bankAccountName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                className="rounded"
                disabled={!isEditing}
              />
            </>
          )}

          {/* Thông tin mật khẩu */}
          <Typography variant="h6" className="mt-6 font-medium">Thông tin mật khẩu</Typography>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextField
              size="small"
              label="Mật khẩu đăng nhập"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
              InputProps={formData.password ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              } : undefined}
            />
            <TextField
              size="small"
              label="Mật khẩu giao dịch cửa hàng"
              name="transactionPassword"
              type={showTransactionPassword ? "text" : "password"}
              value={formData.transactionPassword}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              className="rounded"
              disabled={!isEditing}
              InputProps={formData.transactionPassword ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                      edge="end"
                    >
                      {showTransactionPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              } : undefined}
            />
          </div>
          <TextField
            size="small"
            label="Mật khẩu giao dịch ví"
            name="walletPassword"
            type={showWalletPassword ? "text" : "password"}
            value={formData.walletPassword}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="rounded"
            disabled={!isEditing}
            InputProps={formData.walletPassword ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowWalletPassword(!showWalletPassword)}
                    edge="end"
                  >
                    {showWalletPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            } : undefined}
          />
          <TextField
            size="small"
            label="Mật khẩu rút tiền"
            name="withdrawPassword"
            type={showWithdrawPassword ? "text" : "password"}
            value={formData.withdrawPassword}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            className="rounded"
            disabled={!isEditing}
            InputProps={formData.withdrawPassword ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowWithdrawPassword(!showWithdrawPassword)}
                    edge="end"
                  >
                    {showWithdrawPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            } : undefined}
          />

          {/* Thông tin xác thực */}
          <Typography variant="h6" className="mt-6 font-medium">Thông tin xác thực</Typography>
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
              <Typography variant="subtitle1" className="!mb-2">Ảnh mặt sau</Typography>
              {imagePreviewBack || formData.idCardBackImage ? (
                <div className="relative flex-1 w-full h-48 overflow-hidden border border-gray-600 rounded">
                  <img
                    src={imagePreviewBack || formData.idCardBackImage}
                    alt="Ảnh mặt sau"
                    className="object-cover w-full h-full"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeImage('back')}
                      className="absolute p-1 transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                    >
                      <IconX size={16} color="white" />
                    </button>
                  )}
                </div>
              ) : (
                isEditing ? (
                  <label className="flex flex-col items-center justify-center w-full h-48 transition-colors border border-gray-500 border-dashed !rounded-lg cursor-pointer">
                    <div className="flex flex-col items-center justify-center py-4">
                      <IconUpload size={24} className="mb-2 text-gray-400" />
                      <p className="text-sm text-gray-400">Upload ảnh mặt sau</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'back')} />
                  </label>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Chưa có ảnh
                  </Typography>
                )
              )}
            </div>
            <div>
            <Typography variant="subtitle1" className="!mb-2">Ảnh mặt trước</Typography>
            {imagePreviewFront || formData.idCardFrontImage ? (
              <div className="relative flex-1 w-full h-48 overflow-hidden border border-gray-600 rounded">
                <img
                  src={imagePreviewFront || formData.idCardFrontImage}
                  alt="Ảnh mặt trước"
                  className="object-cover w-full h-full"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeImage('front')}
                    className="absolute p-1 transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                  >
                    <IconX size={16} color="white" />
                  </button>
                )}
              </div>
            ) : (
              isEditing ? (
                <label className="flex flex-col items-center justify-center w-full h-48 transition-colors border border-gray-500 border-dashed !rounded-lg cursor-pointer">
                  <div className="flex flex-col items-center justify-center py-4">
                    <IconUpload size={24} className="mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400">Upload ảnh mặt trước</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'front')} />
                </label>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Chưa có ảnh
                </Typography>
              )
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
        <Box className={`flex justify-end gap-2 ${isEditing ? 'mt-0' : 'mt-6'}`}>
          {!isEditing ? (
            <>
              <Button
                variant="contained"
                startIcon={<IconMessage size={18} />}
                onClick={() => {
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
            {userData?.data.fullName || userData?.data.username}&quot;? Hành động này không
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
