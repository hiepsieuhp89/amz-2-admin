import { createUser, deleteUser, getAllUsers, getUserById, updateUser, getUserIpHistory } from "@/api/services/user.service"
import type { ICreateUser, IUpdateUser } from "@/interface/request/user"
import type { IUserListResponse, IUserResponse } from "@/interface/response/user"
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query"

// Query keys
const USERS_KEY = "users"
const USER_KEY = "user"

// Get all users
export const useGetAllUsers = (params?: {
  order?: "ASC" | "DESC"
  page?: number
  take?: number
  search?: string
  status?: string
  role?: "shop" | "admin" | "user",
  hasShop?: boolean
}): UseQueryResult<IUserListResponse> => {
  return useQuery({
    queryKey: [USERS_KEY, params],
    queryFn: () => getAllUsers(params),
  })
}

// Get user by ID
export const useGetUserById = (id: string): UseQueryResult<IUserResponse> => {
  return useQuery({
    queryKey: [USER_KEY, id],
    queryFn: () => getUserById(id),
    enabled: !!id, 
  })
}

// Create user
export const useCreateUser = (): UseMutationResult<IUserResponse, Error, ICreateUser> => {
  const queryClient = useQueryClient()

  return useMutation<IUserResponse, Error, ICreateUser>({
    mutationFn: (payload: ICreateUser) => createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_KEY],
      })
    },
  })
}

// Update user
export const useUpdateUser = (): UseMutationResult<IUserResponse, Error, { id: string; payload: IUpdateUser }> => {
  const queryClient = useQueryClient()

  return useMutation<IUserResponse, Error, { id: string; payload: IUpdateUser }>({
    mutationFn: ({ id, payload }) => updateUser(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [USER_KEY, variables.id] })
      queryClient.invalidateQueries({
        queryKey: [USERS_KEY],
      })
    },
  })
}

// Delete user
export const useDeleteUser = (): UseMutationResult<{ success: boolean }, Error, string> => {
  const queryClient = useQueryClient()
  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [USER_KEY, id] })
      queryClient.invalidateQueries({
        queryKey: [USERS_KEY],
      })
    },
  })
}

// Get user IP history
export const useGetUserIpHistory = (params: {
  userId: string;
  page?: number;
  take?: number;
  order?: "ASC" | "DESC";
  search?: string;
  status?: string;
  ip?: string;
  action?: string;
}): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["userIpHistory", params],
    queryFn: () => getUserIpHistory(params),
    enabled: !!params.userId,
  })
}

