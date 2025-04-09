export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  email?: string;
  username: string;
  fullName?: string;
  phone?: string;
  password?: string;
  rawPassword?: string;
  invitationCode?: string;
  referralCode?: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
  balance: string;
  fedexBalance: string;
  bankName: string | null;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
  bankBranch: string | null;
  bankNumber: string | null;
  bankCode: string | null;
  address: string | null;
  countryId: string | null;
  stateId: string | null;
  cityId: string | null;
  districtId: string | null;
  postalCodeId: string | null;
  city: string | null;
  district: string | null;
  ward: string | null;
  stars: number;
  reputationPoints: number;
  shopName: string | null;
  shopPhone: string | null;
  shopAddress: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  bannerImage: string | null;
  mobileBannerImage: string | null;
  fullBannerImage: string | null;
  halfBannerImage: string | null;
  bannerImage2: string | null;
  sellerPackageExpiry: string | null;
  spreadPackageExpiry: string | null;
  view: number;
  totalProfit: number;
  shopStatus: string | null;
  shopCreatedAt: string | null;
  shopDescription: string | null;
  logoUrl: string | null;
  postalCode: string | null;
  withdrawPassword: string | null;
  idCardType: string | null;
  idCardNumber: string | null;
  idCardFrontImage: string | null;
  idCardBackImage: string | null;
  sellerPackageId: string | null;
  spreadPackageId: string | null;
  [key: string]: any;
  totalProducts?: number;
  totalWithdrawn?: number;
  totalShippingOrders?: number;
  totalDeliveredOrders?: number;
  transactionPassword?: string;
  walletPassword?: string;
}

export interface ICreateUser {
  username: string;
  password: string;
  email?: string;
  fullName?: string;
  phone?: string;
  role?: string;
  invitationCode?: string;
  sellerPackageId?: string;
  spreadPackageId?: string;
  sellerPackageExpiry?: string;
  spreadPackageExpiry?: string;
}

export interface IReferral {
  id: string;
  username: string;
  totalDeposit: number;
  totalWithdraw: number;
  createdAt: string;
}

export interface IPaginationMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IUserListData {
  data: IUser[];
  meta: IPaginationMeta;
}

export interface IApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  errors: null | any;
  timestamp: string;
}

export type IUserResponse = IApiResponse<IUser>;

export type IUserListResponse = IApiResponse<IUserListData>;