"use client";
import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  TablePagination,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import PageContainer from "@/component/container/PageContainer";
import DashboardCard from "@/component/shared/DashboardCard";
import { useGetAllEmailTemplates } from "@/hooks/emailTemplate";
import { useRouter } from "next/navigation";

const EmailTemplatesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [templateType, setTemplateType] = useState("");
  const router = useRouter();

  const { data: response, isLoading, refetch } = useGetAllEmailTemplates({
    page: page + 1,
    take: rowsPerPage,
    search: searchTerm,
    type: templateType,
  });

  const emailTemplates = response?.data?.data || [];
  const total = response?.data?.meta?.itemCount || 0;

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0);
    refetch();
  };

  const handleEdit = (type: string) => {
    router.push(`/admin/settings/email-templates/${type}`);
  };

  return (
    <PageContainer
      title="Quản lý Template Email"
      description="Quản lý các template email trong hệ thống"
    >
      <DashboardCard title="Quản lý Template Email">
        <>
          <Box sx={{ mb: 3 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              <TextField
                size="small"
                placeholder="Tìm kiếm theo tên hoặc mô tả"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 200 }}
              />
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>Loại Template</InputLabel>
                <Select
                  value={templateType}
                  label="Loại Template"
                  onChange={(e) => setTemplateType(e.target.value)}
                >
                  <MenuItem value="">Tất cả</MenuItem>
                  <MenuItem value="VERIFY_EMAIL_REGISTER_USER">VERIFY_EMAIL_REGISTER_USER</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<IconSearch size="18" />}
                onClick={handleSearch}
              >
                Tìm kiếm
              </Button>
            </Stack>
          </Box>

          <TableContainer>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên Template</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Đang tải...
                    </TableCell>
                  </TableRow>
                ) : emailTemplates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                ) : (
                  emailTemplates.map((template: any, index: number) => (
                    <TableRow key={template.id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.type}</TableCell>
                      <TableCell>{template.description}</TableCell>
                      <TableCell>
                        <Chip
                          sx={{
                            backgroundColor: template.deletedAt === null
                              ? "success.light"
                              : "error.light",
                            color: "white",
                          }}
                          size="small"
                          label={template.deletedAt === null ? "Đang hoạt động" : "Không hoạt động"}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEdit(template.type)}
                        >
                          Chỉnh sửa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số hàng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} của ${count !== -1 ? count : `hơn ${to}`}`
            }
          />
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default EmailTemplatesPage; 