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
  IconButton,
} from "@mui/material"
import { IconCopy, IconMoodSadDizzy, IconTransactionDollar } from "@tabler/icons-react"
import { message } from "antd"

import { useGetTransactionHistory } from "@/hooks/transaction"
import { TransactionStatus, TransactionType } from "@/interface/request/transaction"

function formatMoney(money: string): string {
  return parseFloat(money).toLocaleString("en-US") + " USD"
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getTransactionTypeLabel(type: string): string {
  switch (type) {
    case "package_purchase":
      return "Mua gói tiếp thị"
    case "package_spread":
      return "Mua gói quảng bá"
    case "fedex_payment":
      return "Thanh toán đơn hàng"
    case "order_profit":
      return "Lợi nhuận đơn hàng"
    case "recharge":
      return "Nạp tiền"
    case "withdraw":
      return "Rút tiền"
    case "manual_fedex_amount":
      return "Điều chỉnh số dư Fedex"
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
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "">("")
  const [typeFilter, setTypeFilter] = useState<TransactionType | "">("")

  const { data: transactionsData, isLoading, error } = useGetTransactionHistory({
    page,
    take: limit,
    status: statusFilter ? (statusFilter as TransactionStatus) : undefined,
    type: typeFilter ? (typeFilter as TransactionType) : undefined,
  })

  const transactions = (transactionsData?.data?.data as any) || []

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

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      message.success("Đã sao chép ID giao dịch vào clipboard!")
    } catch (err) {
      message.error("Không thể sao chép. Vui lòng thử lại!")
    }
  }

  if (error) {
    return (
      <Box className="flex flex-col items-center justify-center min-h-screen gap-2 p-8 text-center">
        <IconMoodSadDizzy size={48} className="text-gray-400" />
        <Typography variant="h6" className="mb-2 text-red-400">
          Lỗi khi tải lịch sử giao dịch
        </Typography>
        <Typography className="text-gray-400">{error.message || "Vui lòng thử lại sau"}</Typography>
      </Box>
    )
  }

  return (
    <>
     <Box className="relative flex flex-col items-center justify-center py-8">
        <Box className="absolute" />
        <Box className="relative flex flex-col items-center gap-2">
          <Box className="p-4 mb-3 rounded-full shadow-lg bg-gradient-to-r from-amber-100 to-orange-100">
            <IconTransactionDollar size={36} className="text-main-golden-orange" />
          </Box>
          <Typography variant="h3" className="font-semibold tracking-wide text-center uppercase text-main-charcoal-blue">
            Lịch sử giao dịch
          </Typography>
        </Box>
      </Box>
    <div className="p-6 pt-0 space-y-6">
      <div className="flex flex-col items-start justify-end gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-4">
          <TextField
            size="small"
            placeholder="Tìm kiếm giao dịch..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white rounded shadow-sm"
          />
          <FormControl size="small" style={{ minWidth: 200 }}>
            <InputLabel>Loại giao dịch</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TransactionType | "")}
              label="Loại giao dịch"
              className="bg-white"
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="package_purchase">Mua gói tiếp thị</MenuItem>
              <MenuItem value="package_upgrade">Mua gói nâng cấp</MenuItem>
              <MenuItem value="fedex_payment">Thanh toán đơn hàng</MenuItem>
              <MenuItem value="order_profit">Lợi nhuận đơn hàng</MenuItem>
              <MenuItem value="recharge">Nạp tiền</MenuItem>
              <MenuItem value="withdraw">Rút tiền</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" style={{ minWidth: 200 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | "")}
              label="Trạng thái"
              className="bg-white"
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="completed">Hoàn thành</MenuItem>
              <MenuItem value="pending">Đang xử lý</MenuItem>
              <MenuItem value="rejected">Từ chối</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {isLoading ? (
        <Box className="flex items-center justify-center py-12">
          <CircularProgress className="text-main-golden-orange" />
        </Box>
      ) : filteredTransactions.length === 0 ? (
        <Paper className="flex flex-col items-center justify-center gap-4 py-8 text-center">
          <IconMoodSadDizzy size={48} className="text-gray-400" />
          <Typography fontWeight={400} variant="h6" className="mb-2 text-gray-400">
            Không tìm thấy giao dịch nào.{" "}
            {searchTerm || statusFilter || typeFilter ? "Thử tìm kiếm với điều kiện khác" : "Chưa có giao dịch nào"}
          </Typography>
        </Paper>
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
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{transaction.id}</span>
                          <IconButton
                            onClick={() => handleCopy(transaction.id, "id")}
                            size="small"
                          >
                            <IconCopy
                              size={16}
                              className="text-blue-500"
                            />
                          </IconButton>
                        </div>
                      </TableCell>
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
                        <div className="flex items-center gap-2 group">
                          <Typography
                            variant="body2"
                            className="max-w-[300px] truncate"
                            title={transaction.description}
                          >
                            {transaction.description}
                          </Typography>
                          <IconCopy
                            size={16}
                            className="text-gray-500 transition-opacity opacity-0 cursor-pointer hover:text-gray-700 group-hover:opacity-100"
                            onClick={() => handleCopy(transaction.description, "description")}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 8, 10, 25]}
              component="div"
              count={transactionsData?.data?.meta?.itemCount || 0}
              rowsPerPage={limit}
              page={page - 1}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Dòng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} của ${count}`}
            />
          </Paper>
        </>
      )}
    </div>
    </>
  )
}

export default TransactionHistoryPage 