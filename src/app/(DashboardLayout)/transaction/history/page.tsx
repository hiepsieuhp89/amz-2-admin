"use client"
import { useState } from "react"
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { IconSearch, IconCash, IconFilter } from "@tabler/icons-react"

import { useGetTransactionHistory } from "@/hooks/transaction"
import { TransactionStatus, TransactionType } from "@/interface/request/transaction"

function formatMoney(money: string): string {
  return parseFloat(money).toLocaleString("vi-VN") + " VND"
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getTransactionTypeLabel(type: string): string {
  switch (type) {
    case TransactionType.PACKAGE_PURCHASE:
      return "Mua gói"
    case TransactionType.PACKAGE_SPREAD:
      return "Quảng bá gói"
    case TransactionType.PACKAGE_REFUND:
      return "Hoàn tiền gói"
    case TransactionType.ORDER_PAYMENT:
      return "Thanh toán đơn hàng"
    case TransactionType.ORDER_PROFIT:
      return "Lợi nhuận đơn hàng"
    case TransactionType.RECHARGE:
      return "Nạp tiền"
    case TransactionType.WITHDRAW:
      return "Rút tiền"
    default:
      return "Không xác định"
  }
}

function getStatusChipProps(status: string) {
  switch (status) {
    case TransactionStatus.COMPLETED:
      return { label: "Hoàn thành", color: "success" as const }
    case TransactionStatus.PENDING:
      return { label: "Đang xử lý", color: "warning" as const }
    case TransactionStatus.REJECTED:
      return { label: "Từ chối", color: "error" as const }
    default:
      return { label: "Không xác định", color: "default" as const }
  }
}

function TransactionHistoryPage() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "">("")
  const [typeFilter, setTypeFilter] = useState<TransactionType | "">("")

  const { data: transactionsData, isLoading, error } = useGetTransactionHistory({
    page,
    limit,
    status: statusFilter || undefined,
    type: typeFilter || undefined,
  })

  const transactions = (transactionsData?.data?.data as any)?.data || []
  const filteredTransactions = searchTerm
    ? transactions.filter(
        (transaction: any) =>
          transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : transactions

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value, 10))
    setPage(1)
  }

  const handleResetFilters = () => {
    setStatusFilter("")
    setTypeFilter("")
  }

  if (error) {
    return (
      <Box className="p-8 text-center">
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải lịch sử giao dịch
        </Typography>
        <Typography className="text-gray-400">{error.message || "Vui lòng thử lại sau"}</Typography>
      </Box>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center">
          <IconCash size={28} className="mr-3 text-main-golden-orange" />
          <Typography
            fontSize={18}
            fontWeight={700}
            variant="h5"
            className="!text-main-golden-orange relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-[50%] after:h-0.5 after:bg-main-golden-orange after:rounded-full"
          >
            Lịch sử giao dịch
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <TextField
            size="small"
            placeholder="Tìm kiếm giao dịch..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded shadow-sm"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={20} className="text-main-golden-orange" />
                </InputAdornment>
              ),
              className: "text-white rounded-lg hover:shadow-md transition-shadow",
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <FormControl size="small" style={{ minWidth: 200 }}>
          <InputLabel>Loại giao dịch</InputLabel>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TransactionType | "")}
            label="Loại giao dịch"
          >
            <MenuItem value="">Tất cả</MenuItem>
            {Object.values(TransactionType).map((type) => (
              <MenuItem key={type} value={type}>
                {getTransactionTypeLabel(type)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" style={{ minWidth: 200 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | "")}
            label="Trạng thái"
          >
            <MenuItem value="">Tất cả</MenuItem>
            {Object.values(TransactionStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {getStatusChipProps(status).label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {(statusFilter || typeFilter) && (
          <Button
            variant="outlined"
            startIcon={<IconFilter size={18} />}
            onClick={handleResetFilters}
            size="small"
          >
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {isLoading ? (
        <Box className="flex items-center justify-center py-12">
          <CircularProgress className="text-main-golden-orange" />
        </Box>
      ) : filteredTransactions.length === 0 ? (
        <Box className="flex flex-col items-center justify-center gap-4 py-8 text-center border border-gray-700 border-dashed rounded-lg backdrop-blur-sm">
          <Typography fontWeight={400} variant="h6" className="mb-2 text-gray-400">
            Không tìm thấy giao dịch nào.{" "}
            {searchTerm || statusFilter || typeFilter ? "Thử tìm kiếm với điều kiện khác" : "Chưa có giao dịch nào"}
          </Typography>
        </Box>
      ) : (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden", border: "1px solid #E0E0E0" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader sx={{ minWidth: 650 }} aria-label="transaction table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>ID giao dịch</TableCell>
                    <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Ngày tạo</TableCell>
                    <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Số tiền</TableCell>
                    <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Loại giao dịch</TableCell>
                    <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Trạng thái</TableCell>
                    <TableCell sx={{ fontSize: "14px", fontWeight: 600 }}>Mô tả</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions.map((transaction: any) => (
                    <TableRow
                      key={transaction.id}
                      sx={{
                        "&:first-child td, &:first-child th": { borderTop: "1px solid #E0E0E0" },
                        "& td": { borderBottom: "1px solid #E0E0E0" },
                      }}
                    >
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                      <TableCell>{formatMoney(transaction.money)}</TableCell>
                      <TableCell>
                        <Chip
                          label={getTransactionTypeLabel(transaction.type)}
                          color={transaction.type === TransactionType.WITHDRAW ? "error" : "primary"}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusChipProps(transaction.status).label}
                          color={getStatusChipProps(transaction.status).color}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          className="max-w-[300px] truncate"
                          title={transaction.description}
                        >
                          {transaction.description}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              rowsPerPageOptions={[5, 8, 10, 25]}
              component="div"
              count={data?.data?.total || 0}
              rowsPerPage={limit}
              page={page - 1}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Dòng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
            /> */}
          </Paper>
        </>
      )}
    </div>
  )
}

export default TransactionHistoryPage 