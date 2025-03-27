export interface IFakeOrderResponse {
  id: string
}

export interface IValidUser {
  id: string
  username: string
  email: string
  fullName: string
  balance: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  phone: string
  invitationCode: string
  referralCode: string
  role: string
  isActive: boolean
  fedexBalance: string
  bankName: string | null
  bankAccountNumber: string | null
  bankAccountName: string | null
  bankBranch: string | null
  bankNumber: string | null
  bankCode: string | null
  address: string | null
  countryId: string | null
  stateId: string | null
  cityId: string | null
  districtId: string | null
  postalCodeId: string | null
  stars: number
  reputationPoints: number
  shopName: string | null
  shopAddress: string | null
  sellerPackageExpiry: string | null
  spreadPackageExpiry: string | null
  view: number
  country: string | null
  state: string | null
  city: string | null
  district: string | null
  postalCode: string | null
}

export interface IValidUserListResponse {
  status: boolean
  message: string
  data: {
    data: IValidUser[]
    meta: {
      page: number
      take: number
      itemCount: number
      pageCount: number
      hasPreviousPage: boolean
      hasNextPage: boolean
    }
  }
  errors: null
  timestamp: string
} 