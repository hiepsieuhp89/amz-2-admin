import { UserRole, UserStatus, DeviceType } from "@/interface/enum";

// Add metadata interface
export interface UserMetadata {
  isExpert?: boolean;
  // Add other metadata fields as needed
}

// Add form-specific interface that extends User
export interface UserFormData extends User {
  isMarketing?: boolean;
  isExpert?: boolean;
}

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  agencyId: number | null;
  name: string;
  username: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  balance: number;
  authBalance: number;
  point: number;
  verify: boolean;
  code: string;
  referral: string;
  isPlay: boolean;
  isPartner: boolean;
  autoCreate: boolean;
  metadata: string | null; // Changed from any to string since we store as JSON string
  phone: string | null;
  email: string | null;
  withdrawPassword: string | null;
  rawPassword: string | null;
  teleChatId: string | null;
  deviceType: DeviceType;
  geo: any | null;
  userAgent: string;
  dateOfBirth: string; // ISO 8601 format
  identityCardFront: string | null;
  identityCardBack: string | null;
  lastIpLogin: string | null;
  plainPassword?: string; // Added field for non-hashed password
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ResetPasswordCredentials {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    // thêm các trường khác nếu cần
  };
}

export interface MatchResult {
  id: number;
  team1: string;
  team2: string;
  match_id: string;
  team1_result: number;
  team2_result: number;
  tournament_id: string;
}

export interface EsportsMatch {
  id: string;
  tournament_id: string;
  tournament_name: string;
  team1: string;
  team2: string;
  format: string;
  status: string;
  match_results: MatchResult[];
}

export interface BetRequest {
  match_id: string;
  amount: number;
  selected_team: string;
}

export interface BetResponse {
  match_id: string;
  amount: number;
  selected_team: string;
}


