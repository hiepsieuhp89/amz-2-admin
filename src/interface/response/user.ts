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
  balance: string;
  fedexBalance: string;
  bankName: string | null;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
  bankBranch: string | null;
  bankNumber: string | null;
  bankCode: string | null;
  address: string | null;
  city: string | null;
  district: string | null;
  ward: string | null;
  stars: number;
  reputationPoints: number;
  shopName: string | null;
  shopAddress: string | null;
  sellerPackageExpiry: string | null;
  spreadPackageExpiry: string | null;
  sellerPackageId: string | null;
  spreadPackageId: string | null;
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