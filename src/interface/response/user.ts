export interface IUserResponse {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  fullName?: string;
  role?: string;
  referralCode?: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  balance?: number;
}

export interface ICreateUser {
  username: string;
  password: string;
  email?: string;
  role?: string;
}

export interface IReferral {
  id: string;
  username: string;
  totalDeposit: number;
  totalWithdraw: number;
  createdAt: string;
} 

export interface IUserListResponse {
  data: IUserResponse[]
  total: number
  page: number
  limit: number
}