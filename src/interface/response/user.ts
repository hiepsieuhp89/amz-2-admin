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
  sellerPackageExpiry: string | null;
  spreadPackageExpiry: string | null;
}

export interface ICreateUser {
  username: string;
  password: string;
  email?: string;
  fullName?: string;
  phone?: string;
  role?: string;
  invitationCode?: string;
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