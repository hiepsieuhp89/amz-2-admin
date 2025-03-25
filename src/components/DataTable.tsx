import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import { IconPlus } from "@tabler/icons-react";
import { ReactNode } from "react";

interface DataTableProps {
  columns: { 
    key: string; 
    label: string; 
    width?: string | number 
  }[];
  data: any[];
  isLoading: boolean;
  pagination: {
    page: number;
    take: number;
    itemCount: number;
  };
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  renderRow: (row: any, index: number) => ReactNode;
  emptyMessage: string;
  createNewButton?: {
    label: string;
    onClick: () => void;
  };
  searchComponent?: ReactNode;
}

export default function DataTable({
  columns,
  data,
  isLoading,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  renderRow,
  emptyMessage,
  createNewButton,
  searchComponent,
}: DataTableProps) {
  return (
    <div className="w-[100vw] p-6 space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        {searchComponent}
        {createNewButton && (
          <Button
            variant="contained"
            startIcon={<IconPlus size={18} />}
            onClick={createNewButton.onClick}
            className="text-white !normal-case !bg-main-charcoal-blue hover:!bg-main-dark-blue transition-all shadow-md"
          >
            {createNewButton.label}
          </Button>
        )}
      </div>

      {isLoading ? (
        <Box className="flex items-center justify-center py-12">
          <CircularProgress className="text-main-golden-orange" />
        </Box>
      ) : data.length === 0 ? (
        <Box className="flex flex-col items-center justify-center gap-4 py-8 text-center border border-gray-700 border-dashed rounded-lg backdrop-blur-sm">
          <Typography fontWeight={400} variant="h6" className="mb-2 text-gray-400">
            {emptyMessage}
          </Typography>
          {createNewButton && (
            <Button
              variant="outlined"
              startIcon={<IconPlus size={18} />}
              onClick={createNewButton.onClick}
              className="transition-all w-fit !normal-case"
            >
              {createNewButton.label}
            </Button>
          )}
        </Box>
      ) : (
        <Box>
          <Box sx={{ 
             overflowX: 'auto',
          }}>
            <Paper sx={{ 
              width: 'max-content', 
              minWidth: '100%', 
              overflow: 'hidden', 
              border: '1px solid #E0E0E0',
              borderRadius: 0
            }}>
              <TableContainer sx={{ 
                maxHeight: 440, 
                overflowX: 'auto',
                width: '100%'
              }}>
                <Table stickyHeader sx={{ 
                  minWidth: 650,
                }}>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell 
                          key={column.key} 
                          sx={{ 
                            fontSize: "14px", 
                            fontWeight: 600,
                            width: column.width,
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, index) => renderRow(row, index))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
          <Paper sx={{ mt: 2, border: '1px solid #E0E0E0' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={pagination.itemCount}
              rowsPerPage={pagination.take}
              page={pagination.page - 1}
              onPageChange={(_, newPage) => onPageChange(newPage + 1)}
              onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
              labelRowsPerPage="Số hàng mỗi trang:"
              labelDisplayedRows={({ from, to, count }) => 
                `${from}-${to} trong ${count}`
              }
              sx={{
                '& .MuiTablePagination-toolbar': {
                  padding: '0 16px'
                }
              }}
            />
          </Paper>
        </Box>
      )}
    </div>
  );
} 