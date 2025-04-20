'use client';
import PageContainer from '@/component/container/PageContainer';
import DashboardCard from '@/component/shared/DashboardCard';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
  IconButton,
  Tooltip,
  Card,
  CardHeader,
  CardContent,
  Stack,
  LinearProgress,
} from '@mui/material';
import { sendGet } from '@/api/apiClient';
import { useGetDeliveryStages } from '@/hooks/order';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { IconArrowLeft, IconUser, IconBuildingStore, IconTruckDelivery, IconInfoCircle, IconHistory, IconCircleFilled, IconPackage } from '@tabler/icons-react';

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Get delivery stages if order is in SHIPPING status
  const { data: deliveryStagesData } = useGetDeliveryStages(order?.status === 'SHIPPING' ? 'SHIPPING' : undefined);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await sendGet(`/admin/orders/${id}`);
        if (response.status) {
          setOrder(response.data);
        } else {
          setError(response.message || 'Không thể tải thông tin đơn hàng');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Đã xảy ra lỗi khi tải thông tin đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrderDetail();
    }
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'shipping':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getDelayStatusText = (delayStatus: string) => {
    switch (delayStatus) {
      case 'NORMAL':
        return 'Bình thường';
      case 'DELAY_24H':
        return 'Trễ 24h';
      case 'DELAY_48H':
        return 'Trễ 48h';
      default:
        return delayStatus;
    }
  };

  const getDelayStatusColor = (delayStatus: string) => {
    switch (delayStatus) {
      case 'NORMAL':
        return 'success';
      case 'DELAY_24H':
        return 'warning';
      case 'DELAY_48H':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    } catch (error) {
      return 'N/A';
    }
  };

  const formatCurrency = (amount: string | number) => {
    return parseFloat(amount as string || '0').toLocaleString('vi-VN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Icon components for card headers
  const InfoIcon = () => <IconInfoCircle size={20} />;
  const UserIcon = () => <IconUser size={20} />;
  const ShopIcon = () => <IconBuildingStore size={20} />;
  const DeliveryIcon = () => <IconTruckDelivery size={20} />;
  const HistoryIcon = () => <IconHistory size={20} />;
  const StagesIcon = () => <IconPackage size={20} />;

  // Get timeline dot color based on stage
  const getTimelineDotColor = (index: number, total: number) => {
    if (index === 0) return 'success';
    if (index === total - 1) return 'primary';
    return 'info';
  };

  // Calculate delivery progress
  const calculateDeliveryProgress = () => {
    if (!order || !order.stageDelivery || !deliveryStagesData?.data || deliveryStagesData.data.length === 0) return 0;
    
    const stageValues = deliveryStagesData.data.map((stage: any) => parseFloat(stage.value));
    const maxStage = Math.max(...stageValues);
    const currentStage = parseFloat(order.stageDelivery);
    
    return (currentStage / maxStage) * 100;
  };

  return (
    <PageContainer title="Chi tiết đơn hàng" description="Xem chi tiết đơn hàng">
      <Box sx={{ mb: 2 }}>
        <Button 
          variant="outlined" 
          startIcon={<IconArrowLeft size={18} />}
          onClick={() => router.push('/admin/orders')}
        >
          Quay lại danh sách
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      ) : order ? (
        <Grid container spacing={3}>
          {/* Order Status Summary */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'start', md: 'center' }, gap: 2 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Đơn hàng #{order.id.substring(0, 8)}...
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Chip 
                    label={order.status} 
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                  <Chip 
                    label={getDelayStatusText(order.delayStatus)}
                    color={getDelayStatusColor(order.delayStatus)}
                    size="small"
                    variant="outlined"
                  />
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    Đặt ngày: {formatDate(order.orderTime || order.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="textSecondary">Tổng giá trị</Typography>
                  <Typography variant="h6" color="primary.main">${formatCurrency(order.totalAmount)}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" color="textSecondary">Lợi nhuận</Typography>
                  <Typography variant="h6" color="success.main">${formatCurrency(order.totalProfit)}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <DashboardCard 
              title="Thông tin đơn hàng"
              action={<InfoIcon />}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>ID: <Typography component="span" fontWeight="medium">{order.id}</Typography></Typography>
                
                <Grid container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Ngày đặt hàng:</Typography>
                    <Typography variant="body2" fontWeight="medium">{formatDate(order.orderTime || order.createdAt)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Trạng thái thanh toán:</Typography>
                    <Chip 
                      label={order.paymentStatus || 'PENDING'} 
                      color={order.paymentStatus === 'PAID' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Trạng thái đơn hàng:</Typography>
                    <Chip 
                      label={order.status} 
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Tiến độ:</Typography>
                    <Chip 
                      label={getDelayStatusText(order.delayStatus)}
                      color={getDelayStatusColor(order.delayStatus)}
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 1 }}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">Giai đoạn giao hàng:</Typography>
                    <Typography variant="body2" fontWeight="medium">{order.stageDelivery || 'N/A'}</Typography>
                  </Grid>
                </Grid>

                {order.confirmedAt && (
                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">Ngày xác nhận:</Typography>
                      <Typography variant="body2" fontWeight="medium">{formatDate(order.confirmedAt)}</Typography>
                    </Grid>
                  </Grid>
                )}

                {order.deliveredAt && (
                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">Ngày giao hàng:</Typography>
                      <Typography variant="body2" fontWeight="medium">{formatDate(order.deliveredAt)}</Typography>
                    </Grid>
                  </Grid>
                )}

                {order.cancelledAt && (
                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="textSecondary">Ngày hủy:</Typography>
                      <Typography variant="body2" fontWeight="medium">{formatDate(order.cancelledAt)}</Typography>
                    </Grid>
                  </Grid>
                )}

                <Divider sx={{ my: 2 }} />

                <Typography variant="body2" color="textSecondary">Địa chỉ giao hàng:</Typography>
                <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>{order.address || 'N/A'}</Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Email:</Typography>
                    <Typography variant="body2" fontWeight="medium">{order.email || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">Số điện thoại:</Typography>
                    <Typography variant="body2" fontWeight="medium">{order.phone || 'N/A'}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </DashboardCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DashboardCard 
                  title="Thông tin khách hàng"
                  action={<UserIcon />}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                      {order.user?.fullName || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">Email:</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{order.email || order.user?.email || 'N/A'}</Typography>
                    
                    <Typography variant="body2" color="textSecondary">Số điện thoại:</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{order.phone || order.user?.phone || 'N/A'}</Typography>
                    
                    <Typography variant="body2" color="textSecondary">Mã khách hàng:</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{order.user?.id || 'N/A'}</Typography>

                    <Typography variant="body2" color="textSecondary">Địa chỉ:</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{order.user?.address || 'N/A'}</Typography>

                    <Typography variant="body2" color="textSecondary">Mã bưu điện:</Typography>
                    <Typography variant="body2">{order.user?.postalCode || 'N/A'}</Typography>
                  </Box>
                </DashboardCard>
              </Grid>
              <Grid item xs={12}>
                <DashboardCard 
                  title="Thông tin cửa hàng"
                  action={<ShopIcon />}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                      {order.shop?.shopName || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">Email:</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{order.shop?.email || 'N/A'}</Typography>
                    
                    <Typography variant="body2" color="textSecondary">Số điện thoại:</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{order.shop?.phone || 'N/A'}</Typography>
                    
                    <Typography variant="body2" color="textSecondary">Địa chỉ:</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{order.shop?.shopAddress || order.shop?.address || 'N/A'}</Typography>

                    <Typography variant="body2" color="textSecondary">Trạng thái cửa hàng:</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <Chip 
                        label={order.shop?.shopStatus || 'N/A'} 
                        color={order.shop?.shopStatus === 'ACTIVE' ? 'success' : 'default'}
                        size="small"
                      />
                    </Typography>

                    <Typography variant="body2" color="textSecondary">Đánh giá:</Typography>
                    <Typography variant="body2">{order.shop?.stars || 0} sao ({order.shop?.reputationPoints || 0} điểm)</Typography>
                  </Box>
                </DashboardCard>
              </Grid>
            </Grid>
          </Grid>

          {/* Delivery Stages - Show only for SHIPPING orders */}
          {order.status === 'SHIPPING' && deliveryStagesData?.data && deliveryStagesData.data.length > 0 && (
            <Grid item xs={12}>
              <DashboardCard 
                title="Tiến trình giao hàng"
                action={<StagesIcon />}
              >
                <Box sx={{ p: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Tiến độ giao hàng
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={calculateDeliveryProgress()} 
                      sx={{ height: 10, borderRadius: 5, mb: 1 }}
                    />
                    <Typography variant="caption" align="right" display="block">
                      Giai đoạn hiện tại: {order.stageDelivery}
                    </Typography>
                  </Box>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Các giai đoạn giao hàng
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {deliveryStagesData.data.map((stage: any) => {
                      const isCurrentStage = parseFloat(stage.value) <= parseFloat(order.stageDelivery);
                      return (
                        <Grid item xs={12} sm={6} md={4} key={stage.id}>
                          <Card 
                            variant="outlined"
                            sx={{ 
                              bgcolor: isCurrentStage ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                              borderColor: isCurrentStage ? 'primary.main' : 'divider'
                            }}
                          >
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Chip 
                                  label={stage.value} 
                                  color={isCurrentStage ? 'primary' : 'default'} 
                                  size="small" 
                                  sx={{ mr: 1 }}
                                />
                                <Typography variant="subtitle2">
                                  {stage.name}
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="textSecondary">
                                {stage.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </DashboardCard>
            </Grid>
          )}

          {/* Order Status History */}
          <Grid item xs={12}>
            <DashboardCard 
              title="Lịch sử trạng thái đơn hàng"
              action={<HistoryIcon />}
            >
              {order.statusHistory && order.statusHistory.length > 0 ? (
                <Box sx={{ p: 2 }}>
                  {order.statusHistory.map((status: any, index: number) => (
                    <Box key={status.id} sx={{ mb: index !== order.statusHistory.length - 1 ? 2 : 0 }}>
                      <Card variant="outlined" sx={{ mb: 1 }}>
                        <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <IconCircleFilled 
                              size={16} 
                              style={{ 
                                marginTop: 4, 
                                marginRight: 8,
                                color: index === 0 ? '#4caf50' : 
                                       index === order.statusHistory.length - 1 ? '#1976d2' : '#03a9f4'
                              }} 
                            />
                            <Box>
                              <Typography variant="subtitle2" component="span">
                                Giai đoạn: {status.stageDelivery}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {formatDate(status.time)}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {status.description}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                      {index !== order.statusHistory.length - 1 && (
                        <Box sx={{ display: 'flex', ml: 0.7, pl: 0.1, height: 20 }}>
                          <Divider orientation="vertical" sx={{ height: '100%' }} />
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body1">Chưa có lịch sử trạng thái</Typography>
                </Box>
              )}
            </DashboardCard>
          </Grid>

          <Grid item xs={12}>
            <DashboardCard 
              title="Chi tiết đơn hàng"
              action={<DeliveryIcon />}
            >
              <Box>
              {order.items && order.items.length > 0 ? (
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Sản phẩm</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="center">Số lượng</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Đơn giá</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} align="right">Thành tiền</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.items.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {item.shopProduct?.name || `Sản phẩm #${item.shopProductId.substring(0, 8)}...`}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              ID: {item.shopProductId}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={item.quantity} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            ${formatCurrency(item.price)}
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontWeight="medium">
                              ${formatCurrency(item.totalAmount)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} align="right">
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Tổng cộng:
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            ${formatCurrency(order.totalAmount)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} align="right">
                          <Typography variant="body2">
                            Lợi nhuận:
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 'medium' }}>
                            ${formatCurrency(order.totalProfit)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body1">Không có sản phẩm nào</Typography>
                </Box>
              )}
              </Box>
            </DashboardCard>
          </Grid>
        </Grid>
      ) : (
        <DashboardCard>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1">Không tìm thấy đơn hàng</Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 2 }}
              onClick={() => router.push('/admin/orders')}
            >
              Quay lại danh sách đơn hàng
            </Button>
          </Box>
        </DashboardCard>
      )}
    </PageContainer>
  );
};

export default OrderDetailPage; 