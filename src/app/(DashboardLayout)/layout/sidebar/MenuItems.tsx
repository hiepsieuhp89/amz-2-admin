import {
  IconUsers,
  IconTransactionDollar,
  IconBuildingWarehouse,
  IconGift,
  IconPackages,
  IconBrandTelegram,
  IconPhoto,
  IconShoppingCart,
  IconLayoutGridAdd,
  IconPrinter,
  IconLayoutDashboard,
} from "@tabler/icons-react"

const generateUniqueId = (() => {
  const usedIds = new Set()
  return () => {
    let id
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
    title: "Bảng điều khiển",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: generateUniqueId(),
    title: "Quản lý POS",
    icon: IconPrinter,
    href: "/admin/pos",
  },
  {
    id: generateUniqueId(),
    title: "Quản lý người dùng",
    icon: IconUsers,
    href: "/admin/users",
  },
  {
    id: generateUniqueId(),
    title: "Quản lý sản phẩm",
    icon: IconShoppingCart,
    href: "/admin/products",
  },
  {
    id: generateUniqueId(),
    title: "Quản lý danh mục",
    icon: IconLayoutGridAdd,
    href: "/admin/categories",
  },
  // {
  //   id: generateUniqueId(),
  //   title: "Quản lý cửa hàng",
  //   icon: IconBuildingWarehouse,
  //   href: "javascript:void(0)",
  //   children: [
  //     {
  //       id: generateUniqueId(),
  //       title: "Danh sách cửa hàng",
  //       href: "/admin/stores",
  //     },
  //     {
  //       id: generateUniqueId(),
  //       title: "Thêm cửa hàng mới",
  //       href: "/admin/stores/create",
  //     },
  //     {
  //       id: generateUniqueId(),
  //       title: "Phê duyệt cửa hàng",
  //       href: "/admin/stores/approval",
  //     },
  //   ],
  // },
  // {
  //   id: generateUniqueId(),
  //   title: "Quản lý giới thiệu",
  //   icon: IconGift,
  //   href: "javascript:void(0)",
  //   children: [
  //     {
  //       id: generateUniqueId(),
  //       title: "Danh sách giới thiệu",
  //       href: "/referrals",
  //     },
  //     {
  //       id: generateUniqueId(),
  //       title: "Cấu hình hoa hồng",
  //       href: "/referrals/commission",
  //     },
  //     {
  //       id: generateUniqueId(),
  //       title: "Thống kê giới thiệu",
  //       href: "/referrals/statistics",
  //     },
  //   ],
  // },
  {
    id: generateUniqueId(),
    title: "Quản lý nạp/rút",
    icon: IconTransactionDollar,
    href: "/transaction/history",
  },
  {
    id: generateUniqueId(),
    title: "Quản lý gói bán hàng",
    icon: IconPackages,
    href: "/admin/seller-packages",
  },
  {
    id: generateUniqueId(),
    title: "Quản lý gói quảng bá",
    icon: IconBrandTelegram,
    href: "/admin/spread-packages",
  },
]

export default Menuitems

