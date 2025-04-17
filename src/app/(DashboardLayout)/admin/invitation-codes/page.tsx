"use client";

import { useCreateInvitationCodes, useDeleteInvitationCode, useGetAllInvitationCodes } from "@/hooks/invitation";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconCopy, IconTrash } from "@tabler/icons-react";
import { useState } from "react";import { toast } from "react-toastify";

const InvitationCodesPage = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(5);
  const [expirationMinutes, setExpirationMinutes] = useState(15);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Get all invitation codes
  const { data, isLoading, refetch } = useGetAllInvitationCodes({ page, limit });
  
  // Create invitation codes mutation
  const createInvitationCodesMutation = useCreateInvitationCodes();
  
  // Delete invitation code mutation
  const deleteInvitationCodeMutation = useDeleteInvitationCode();

  // Handle dialog open/close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle create invitation codes
  const handleCreateInvitationCodes = async () => {
    try {
      await createInvitationCodesMutation.mutateAsync({
        count,
        expirationMinutes,
      });
      toast.success("Tạo mã mời thành công!");
      handleClose();
      refetch();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tạo mã mời!");
    }
  };

  // Handle delete invitation code
  const handleDeleteInvitationCode = async (id: string) => {
    try {
      await deleteInvitationCodeMutation.mutateAsync(id);
      toast.success("Xóa mã mời thành công!");
      refetch();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa mã mời!");
    }
  };

  // Handle copy to clipboard
  const handleCopyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Đã sao chép mã mời vào clipboard!");
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Get status chip
  const getStatusChip = (code: any) => {
    if (code.status === "used" || code.usedById) {
      return <Chip label="Đã sử dụng" color="success" size="small" />;
    } else if (code.status === "expired" || (code.expiresAt && new Date(code.expiresAt) < new Date())) {
      return <Chip label="Hết hạn" color="error" size="small" />;
    } else {
      return <Chip label="Khả dụng" color="primary" size="small" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Quản lý mã mời</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Tạo mã mời mới
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 2 }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã mời</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Ngày hết hạn</TableCell>
                  <TableCell>Ngày sử dụng</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((code: any) => (
                  <TableRow key={code.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {code.code}
                        <IconButton
                          size="small"
                          onClick={() => handleCopyToClipboard(code.code)}
                          sx={{ ml: 1 }}
                        >
                          <IconCopy size={18} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {getStatusChip(code)}
                    </TableCell>
                    <TableCell>{formatDate(code.createdAt)}</TableCell>
                    <TableCell>
                      {code.expiresAt ? formatDate(code.expiresAt) : "Không hết hạn"}
                    </TableCell>
                    <TableCell>
                      {code.usedAt ? formatDate(code.usedAt) : "Chưa sử dụng"}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Xóa mã mời">
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteInvitationCode(code.id)}
                          disabled={code.status === "used" || !!code.usedById}
                        >
                          <IconTrash size={18} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Create Invitation Code Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tạo mã mời mới</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Số lượng mã mời"
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                fullWidth
                InputProps={{ inputProps: { min: 1, max: 100 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Thời gian hết hạn (phút)"
                type="number"
                value={expirationMinutes}
                onChange={(e) => setExpirationMinutes(Number(e.target.value))}
                fullWidth
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={handleCreateInvitationCodes}
            variant="contained"
            color="primary"
            disabled={createInvitationCodesMutation.isPending}
          >
            {createInvitationCodesMutation.isPending ? "Đang tạo..." : "Tạo mã mời"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvitationCodesPage; 