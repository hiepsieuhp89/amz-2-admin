export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    PENDING = "pending",
}

export interface IAddress {
    street?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
    isDefault?: boolean
}

export interface ICreateUser {
    email: string
    username: string
    password: string
    fullName: string
    phone?: string
    role?: string
    status?: UserStatus
    balance?: number
    addresses?: IAddress[]
    dateOfBirth?: string
    gender?: "male" | "female" | "other"
    isActive?: boolean
    isPhoneVerified?: boolean
    notes?: string
    metadata?: Record<string, any>
}

export interface IUpdateUser {
    email?: string
    username?: string
    password?: string
    fullName?: string
    phone?: string
    role?: string
    status?: UserStatus
    balance?: number
    fedexBalance?: number
    bankName?: string
    bankAccountNumber?: string
    bankAccountName?: string
    bankBranch?: string
    bankNumber?: string
    bankCode?: string
    address?: string
    city?: string
    district?: string
    ward?: string
    stars?: number
    addresses?: IAddress[]
    dateOfBirth?: string
    gender?: "male" | "female" | "other"
    isEmailVerified?: boolean
    isPhoneVerified?: boolean
    notes?: string
    metadata?: Record<string, any>
    shopName?: string
    shopAddress?: string
    sellerPackageExpiry?: string
    spreadPackageExpiry?: string
    invitationCode?: string
    referralCode?: string
}

