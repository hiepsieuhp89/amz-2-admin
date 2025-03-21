import {
  IconSettings,
  IconUsers,
  IconTransactionDollar,
  IconBuildingWarehouse,
  IconGift,
  IconPackages,
  IconBrandTelegram,
  IconPhoto,
  IconShoppingCart,
  IconLayoutGridAdd,
} from "@tabler/icons-react"

const generateUniqueId = (() => {
  const usedIds = new Set()
  return () => {
    let id
    // Generate a random ID until it's unique
    do {
      id = Math.floor(Math.random() * 1000000) // Generate a random number
    } while (usedIds.has(id))
    usedIds.add(id)
    return id
  }
})()

const Menuitems = [
  {
    navlabel: true,
    subheader: "Menu",
  },
  {
    id: generateUniqueId(),
    title: "Quản lý người dùng",
    icon: IconUsers,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Danh sách người dùng",
        href: "/admin/users",
      },
      {
        id: generateUniqueId(),
        title: "Thêm người dùng mới",
        href: "/admin/users/create",
      },
      {
        id: generateUniqueId(),
        title: "Phân quyền người dùng",
        href: "/admin/users/roles",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Quản lý sản phẩm",
    icon: IconShoppingCart,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Danh sách sản phẩm",
        href: "/admin/products",
      },
      {
        id: generateUniqueId(),
        title: "Thêm sản phẩm mới",
        href: "/admin/products/create",
      },
      {
        id: generateUniqueId(),
        title: "Sản phẩm nổi bật",
        href: "/admin/products/featured",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Quản lý danh mục",
    icon: IconLayoutGridAdd,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Danh sách danh mục",
        href: "/admin/categories",
      },
      {
        id: generateUniqueId(),
        title: "Thêm danh mục mới",
        href: "/admin/categories/create",
      },
      {
        id: generateUniqueId(),
        title: "Sắp xếp danh mục",
        href: "/admin/categories/sort",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Quản lý cửa hàng",
    icon: IconBuildingWarehouse,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Danh sách cửa hàng",
        href: "/admin/stores",
      },
      {
        id: generateUniqueId(),
        title: "Thêm cửa hàng mới",
        href: "/admin/stores/create",
      },
      {
        id: generateUniqueId(),
        title: "Phê duyệt cửa hàng",
        href: "/admin/stores/approval",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Quản lý hình ảnh",
    icon: IconPhoto,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Thư viện hình ảnh",
        href: "/images",
      },
      {
        id: generateUniqueId(),
        title: "Tải lên hình ảnh",
        href: "/images/upload",
      },
      {
        id: generateUniqueId(),
        title: "Quản lý thư mục",
        href: "/images/folders",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Quản lý giới thiệu",
    icon: IconGift,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Danh sách giới thiệu",
        href: "/referrals",
      },
      {
        id: generateUniqueId(),
        title: "Cấu hình hoa hồng",
        href: "/referrals/commission",
      },
      {
        id: generateUniqueId(),
        title: "Thống kê giới thiệu",
        href: "/referrals/statistics",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Quản lý nạp/rút",
    icon: IconTransactionDollar,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Lịch sử giao dịch",
        href: "/transaction",
      },
      {
        id: generateUniqueId(),
        title: "Yêu cầu nạp tiền",
        href: "/transaction/deposits",
      },
      {
        id: generateUniqueId(),
        title: "Yêu cầu rút tiền",
        href: "/transaction/withdrawals",
      },
    ],
  },
  {
    id: generateUniqueId(),
    title: "Quản lý gói bán hàng",
    icon: IconPackages,
    href: "/admin/seller-packages",
  },
  {
    id: generateUniqueId(),
    title: "Quản lý gói phân phối",
    icon: IconBrandTelegram,
    href: "javascript:void(0)",
    children: [
      {
        id: generateUniqueId(),
        title: "Danh sách gói phân phối",
        href: "/admin/spread-packages",
      },
      {
        id: generateUniqueId(),
        title: "Thêm gói phân phối",
        href: "/admin/spread-packages/create",
      },
      {
        id: generateUniqueId(),
        title: "Thống kê phân phối",
        href: "/admin/spread-packages/statistics",
      },
    ],
  },
]

export default Menuitems

