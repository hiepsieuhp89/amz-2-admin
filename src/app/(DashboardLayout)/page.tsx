import { Box, Typography } from "@mui/material"
import {
  IconUsers,
  IconPackage,
  IconCategory,
  IconTags,
  IconClock,
  IconCheck,
  IconBox,
  IconTruck,
} from "@tabler/icons-react"

// Mock data for the dashboard
const mockData = {
  customers: {
    total: 2,
    topCustomers: [],
  },
  products: {
    total: 21,
    inHouseProducts: 15,
    sellerProducts: 6,
  },
  categories: {
    total: 44,
  },
  brands: {
    total: 23,
    topBrands: [],
  },
  sales: {
    total: 0,
    thisMonth: 0.0,
    inHouseSales: 0.0,
    sellersSales: 0.0,
  },
  sellers: {
    total: 5,
    pending: 1,
    approved: 4,
    top: [],
  },
  orders: {
    total: 0,
    pending: 0,
    placed: 0,
    confirmed: 0,
    processed: 0,
    shipped: 0,
  },
  inHouseStore: {
    totalSales: 0.0,
    products: 15,
    ratings: 0.0,
    totalOrders: 0,
  },
}

const HomePage = () => {
  return (
    <Box className="px-4 py-6 bg-gray-50">
      {/* SMTP Configuration Alert */}
      <Box className="mb-6">
        <Box className="flex items-center p-4 text-blue-800 bg-blue-100 rounded-md">
          <Typography>Vui lòng định cấu hình. Cài đặt SMTP để hoạt động tất cả chức năng gửi email.{" "}</Typography>
          <Typography component="a" href="#" className="pl-1 font-semibold text-blue-800 hover:underline">
            Định cấu hình ngay
          </Typography>
        </Box>
      </Box>

      <Box className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* First Row - Left Column */}
        <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Total Customer */}
          <Box className="flex flex-col justify-between h-56 p-6 bg-white rounded-[4px] !important shadow-sm">
            <Box className="flex justify-between">
              <Box>
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  {mockData.customers.total}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">Total Customer</Typography>
              </Box>
              <Box className="mt-2 text-gray-300">
                <IconUsers size={32} />
              </Box>
            </Box>
            <Box>
              <Box className="flex items-center mb-1">
                <Box className="w-2 h-2 mr-2 bg-red-500 rounded-full"></Box>
                <Typography className="text-sm font-semibold">Top Customers</Typography>
              </Box>
              <Box className="flex">{/* Symbol group would go here */}</Box>
            </Box>
          </Box>

          {/* Total Products */}
          <Box className="flex flex-col justify-between h-56 p-6 bg-white rounded-[4px] !important shadow-sm">
            <Box className="flex justify-between">
              <Box>
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  {mockData.products.total}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">Tổng số sản phẩm</Typography>
              </Box>
              <Box className="mt-2 text-gray-300">
                <IconPackage size={32} />
              </Box>
            </Box>
            <Box>
              {/* In-house Products */}
              <Box className="flex justify-between mb-2">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-green-500 rounded-full"></Box>
                  <Typography className="mr-2 text-sm font-semibold truncate">Sản phẩm nội bộ</Typography>
                </Box>
                <Typography className="text-sm font-semibold">{mockData.products.inHouseProducts}</Typography>
              </Box>
              {/* Sellers Products */}
              <Box className="flex justify-between">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-blue-500 rounded-full"></Box>
                  <Typography className="mr-2 text-sm font-semibold truncate">Sellers Products</Typography>
                </Box>
                <Typography className="text-sm font-semibold">{mockData.products.sellerProducts}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Total Category */}
          <Box className="flex flex-col justify-between h-56 p-6 bg-white rounded-[4px] !important shadow-sm">
            <Box className="flex justify-between">
              <Box>
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  {mockData.categories.total}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">Total Category</Typography>
              </Box>
              <Box className="mt-2 text-gray-300">
                <IconCategory size={32} />
              </Box>
            </Box>
            <Box>{/* Empty space for potential category details */}</Box>
          </Box>

          {/* Total Brands */}
          <Box className="flex flex-col justify-between h-56 p-6 bg-white rounded-[4px] !important shadow-sm">
            <Box className="flex justify-between">
              <Box>
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  {mockData.brands.total}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">Total Brands</Typography>
              </Box>
              <Box className="mt-2 text-gray-300">
                <IconTags size={32} />
              </Box>
            </Box>
            <Box>
              <Typography className="mb-2 text-sm font-semibold text-gray-500">Top Brands</Typography>
              {/* Top brands would go here */}
            </Box>
          </Box>
        </Box>

        {/* First Row - Right Column */}
        <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Total Sales */}
          <Box
            className="flex flex-col justify-between p-6 rounded-[4px] !important shadow-sm bg-blue-50"
            style={{ height: "470px" }}
          >
            <Box>
              <Typography variant="h4" className="mb-1 text-3xl font-semibold text-blue-500">
                {mockData.sales.total}
              </Typography>
              <Typography className="text-sm font-semibold text-blue-500">Total Sales</Typography>
            </Box>

            <Box className="flex items-center justify-between p-3 text-white bg-blue-500 rounded-md">
              <Typography className="text-sm font-semibold">Sales this month</Typography>
              <Typography className="text-sm font-semibold">${mockData.sales.thisMonth.toFixed(2)}</Typography>
            </Box>

            <Box>
              <Typography className="text-sm font-semibold text-blue-500">Sales Stat</Typography>
            </Box>

            <Box className="w-full h-64">
              {/* Chart would go here */}
              <Box className="flex items-center justify-center w-full h-full bg-blue-100 bg-opacity-50 rounded-md">
                <Typography className="text-center text-blue-300">Yearly Sales</Typography>
              </Box>
            </Box>

            <Box>
              {/* In-house Sales */}
              <Box className="flex justify-between mb-1">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-blue-400 rounded-full"></Box>
                  <Typography className="text-sm font-semibold">In-house Sales</Typography>
                </Box>
                <Typography className="text-sm font-semibold">${mockData.sales.inHouseSales.toFixed(2)}</Typography>
              </Box>
              {/* Sellers Sales */}
              <Box className="flex justify-between">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-green-500 rounded-full"></Box>
                  <Typography className="text-sm font-semibold">Sellers Sales</Typography>
                </Box>
                <Typography className="text-sm font-semibold">${mockData.sales.sellersSales.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Box>

          {/* Total Sellers */}
          <Box className="flex flex-col justify-between p-6 bg-white rounded-[4px] !important shadow-sm" style={{ height: "470px" }}>
            <Box>
              <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                {mockData.sellers.total}
              </Typography>
              <Typography className="text-sm font-semibold text-gray-500">Tổng số người bán</Typography>
            </Box>

            <Box>
              {/* Pending Seller */}
              <Box className="flex justify-between mb-1">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-red-500 rounded-full"></Box>
                  <Typography className="text-sm font-semibold">Pending Seller</Typography>
                </Box>
                <Typography className="text-sm font-semibold">{mockData.sellers.pending}</Typography>
              </Box>
              {/* Approved Sellers */}
              <Box className="flex justify-between">
                <Box className="flex items-center">
                  <Box className="w-2 h-2 mr-2 bg-green-500 rounded-full"></Box>
                  <Typography className="text-sm font-semibold">Approved Sellers</Typography>
                </Box>
                <Typography className="text-sm font-semibold">{mockData.sellers.approved}</Typography>
              </Box>
            </Box>

            <Box>
              <Box className="flex items-center mb-1">
                <Box className="w-2 h-2 mr-2 bg-yellow-500 rounded-full"></Box>
                <Typography className="text-sm font-semibold">Top Sellers</Typography>
              </Box>
              <Box className="flex">{/* Symbol group would go here */}</Box>
              <Box className="my-4 border-t border-gray-300 border-dashed"></Box>
            </Box>

            <Box>
              <Box className="p-3 mb-3 text-center text-green-600 transition-colors rounded-md cursor-pointer bg-green-50 hover:bg-green-100">
                <Typography className="text-sm font-semibold">Tất cả người bán</Typography>
              </Box>
              <Box className="p-3 text-center text-red-600 transition-colors rounded-md cursor-pointer bg-red-50 hover:bg-red-100">
                <Typography className="text-sm font-semibold">Pending Sellers</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Second Row - Orders */}
        <Box className="p-6 bg-white rounded-[4px] !important shadow-sm">
          <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Total Orders */}
            <Box>
              <Box className="bg-blue-50 rounded-lg p-6 h-[300px] mb-6 flex flex-col justify-between">
                <Box>
                  <Typography variant="h4" className="mb-1 text-3xl font-semibold text-blue-500">
                    {mockData.orders.total}
                  </Typography>
                  <Typography className="text-sm font-semibold text-gray-500">Total Order</Typography>
                </Box>

                <Box className="p-3 mt-auto text-center text-white transition-colors bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600">
                  <Typography className="text-sm font-semibold">Tất cả các đơn hàng</Typography>
                </Box>
              </Box>

              {/* Pending order */}
              <Box className="bg-red-500 rounded-lg p-4 h-[90px] flex items-center justify-between text-white">
                <Box className="flex items-center">
                  <IconClock size={20} className="mr-3" />
                  <Typography className="text-sm font-semibold">Pending order</Typography>
                </Box>
                <Typography variant="h5" className="text-2xl font-semibold">
                  {mockData.orders.pending}
                </Typography>
              </Box>
            </Box>

            <Box className="flex flex-col gap-3">
              {/* Order Placed */}
              <Box className="bg-blue-50 rounded-lg p-4 h-[90px] flex items-center justify-between text-blue-500">
                <Box className="flex items-center">
                  <IconPackage size={20} className="mr-3" />
                  <Typography className="text-sm font-semibold text-gray-800">Đa đặt hang</Typography>
                </Box>
                <Typography variant="h5" className="text-2xl font-semibold">
                  {mockData.orders.placed}
                </Typography>
              </Box>

              {/* Confirmed Order */}
              <Box className="bg-green-50 rounded-lg p-4 h-[90px] flex items-center justify-between text-green-500">
                <Box className="flex items-center">
                  <IconCheck size={20} className="mr-3" />
                  <Typography className="text-sm font-semibold text-gray-800">Confirmed Order</Typography>
                </Box>
                <Typography variant="h5" className="text-2xl font-semibold">
                  {mockData.orders.confirmed}
                </Typography>
              </Box>

              {/* Processed Order */}
              <Box className="bg-red-50 rounded-lg p-4 h-[90px] flex items-center justify-between text-red-500">
                <Box className="flex items-center">
                  <IconBox size={20} className="mr-3" />
                  <Typography className="text-sm font-semibold text-gray-800">Processed Order</Typography>
                </Box>
                <Typography variant="h5" className="text-2xl font-semibold">
                  {mockData.orders.processed}
                </Typography>
              </Box>

              {/* Order Shipped */}
              <Box className="bg-yellow-50 rounded-lg p-4 h-[90px] flex items-center justify-between text-yellow-500">
                <Box className="flex items-center">
                  <IconTruck size={20} className="mr-3" />
                  <Typography className="text-sm font-semibold text-gray-800">Order Shipped</Typography>
                </Box>
                <Typography variant="h5" className="text-2xl font-semibold">
                  {mockData.orders.shipped}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Second Row - Top Category & Top Brands */}
        <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Top Category */}
          <Box className="overflow-hidden bg-white rounded-[4px] !important shadow-sm" style={{ height: "474px" }}>
            <Box className="p-6">
              <Typography variant="h6" className="mb-1 text-base font-semibold text-blue-500">
                In-house Top Category
              </Typography>
              <Typography className="text-sm font-semibold text-gray-500">By Sales</Typography>
            </Box>

            <Box className="flex px-6 mb-3 space-x-2">
              <Box className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-md cursor-pointer">
                Tất cả
              </Box>
              <Box className="px-3 py-1 text-sm font-semibold text-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
                Today
              </Box>
              <Box className="px-3 py-1 text-sm font-semibold text-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
                Week
              </Box>
              <Box className="px-3 py-1 text-sm font-semibold text-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
                Month
              </Box>
            </Box>

            <Box className="px-6 mt-4 h-[300px] overflow-y-auto">
              {/* Categories would go here */}
              <Box className="flex items-center justify-center h-full text-gray-400">No data available</Box>
            </Box>
          </Box>

          {/* Top Brands */}
          <Box className="overflow-hidden bg-white rounded-[4px] !important shadow-sm" style={{ height: "474px" }}>
            <Box className="p-6">
              <Typography variant="h6" className="mb-1 text-base font-semibold text-red-500">
                In-house Top Brands
              </Typography>
              <Typography className="text-sm font-semibold text-gray-500">By Sales</Typography>
            </Box>

            <Box className="flex px-6 mb-3 space-x-2">
              <Box className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-md cursor-pointer">
                Tất cả
              </Box>
              <Box className="px-3 py-1 text-sm font-semibold text-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
                Today
              </Box>
              <Box className="px-3 py-1 text-sm font-semibold text-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
                Week
              </Box>
              <Box className="px-3 py-1 text-sm font-semibold text-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
                Month
              </Box>
            </Box>

            <Box className="px-6 mt-4 h-[300px] overflow-y-auto">
              {/* Brands would go here */}
              <Box className="flex items-center justify-center h-full text-gray-400">No data available</Box>
            </Box>
          </Box>
        </Box>

        {/* Third Row - In-house Store */}
        <Box className="p-6 bg-white rounded-[4px] !important shadow-sm">
          <Box className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* In-house Store */}
            <Box className="flex flex-col justify-between">
              <Box>
                <Typography variant="h6" className="mb-8 text-base font-semibold text-gray-800">
                  In-house Store
                </Typography>
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  ${mockData.inHouseStore.totalSales.toFixed(2)}
                </Typography>
                <Typography className="text-sm font-semibold text-gray-500">Total Sales</Typography>
              </Box>

              <Box className="h-[200px] w-full">
                {/* Chart would go here */}
                <Box className="flex items-center justify-center w-full h-full bg-gray-100 bg-opacity-50 rounded-md">
                  <Typography className="text-center text-gray-400">Order Graph</Typography>
                </Box>
              </Box>

              <Box className="p-3 mt-4 text-center text-blue-500 transition-colors rounded-md cursor-pointer bg-blue-50 hover:bg-blue-100">
                <Typography className="text-sm font-semibold">All In-house Orders</Typography>
              </Box>
            </Box>

            <Box className="flex flex-col gap-4">
              {/* In-house product */}
              <Box className="bg-gray-100 rounded-lg p-6 flex flex-col justify-center h-[120px]">
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  {mockData.inHouseStore.products}
                </Typography>
                <Typography className="text-sm font-semibold text-blue-500">Sản phẩm nội bộ</Typography>
              </Box>

              {/* Ratings */}
              <Box className="bg-gray-100 rounded-lg p-6 flex flex-col justify-center h-[120px]">
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  {mockData.inHouseStore.ratings.toFixed(2)}
                </Typography>
                <Typography className="text-sm font-semibold text-yellow-500">Ratings</Typography>
              </Box>

              {/* Total Orders */}
              <Box className="bg-gray-100 rounded-lg p-6 flex flex-col justify-center h-[120px]">
                <Typography variant="h4" className="mb-1 text-3xl font-semibold text-gray-800">
                  {mockData.inHouseStore.totalOrders}
                </Typography>
                <Typography className="text-sm font-semibold text-blue-500">Tổng số đơn đặt hàng</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Third Row - Top Seller & Products */}
        <Box className="p-6 bg-white rounded-[4px] !important shadow-sm" style={{ height: "474px" }}>
          <Box className="flex items-center justify-between mb-6">
            <Box>
              <Typography variant="h6" className="mb-2 text-base font-semibold text-gray-800">
                Top Seller & Products
              </Typography>
              <Typography className="text-sm font-semibold text-gray-500">By Sales</Typography>
            </Box>

            <Box className="flex space-x-2">
              <Box className="px-3 py-1 text-sm font-semibold text-white bg-yellow-500 rounded-md cursor-pointer">
                Tất cả
              </Box>
              <Box className="px-3 py-1 text-sm font-semibold text-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
                Today
              </Box>
              <Box className="px-3 py-1 text-sm font-semibold text-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
                Week
              </Box>
              <Box className="px-3 py-1 text-sm font-semibold text-gray-600 rounded-md cursor-pointer hover:bg-gray-100">
                Month
              </Box>
            </Box>
          </Box>

          <Box className="h-[350px] flex items-center justify-center text-gray-400">No data available</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage

