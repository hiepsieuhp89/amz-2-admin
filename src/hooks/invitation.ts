import { 
  createInvitationCodes, 
  getMyInvitationCodes, 
  getInvitationCodeById, 
  getAllInvitationCodes, 
  deleteInvitationCode,
  deactivateInvitationCode
} from "@/api/services/invitation.service"
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query"

// Query keys
const INVITATION_CODES_KEY = "invitation-codes"
const MY_INVITATION_CODES_KEY = "my-invitation-codes"
const ADMIN_INVITATION_CODES_KEY = "invitation-codes-all"

// Tạo mã mời mới
export const useCreateInvitationCodes = (): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, any>({
    mutationFn: (payload: any) => createInvitationCodes(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_INVITATION_CODES_KEY],
      })
      queryClient.invalidateQueries({
        queryKey: [MY_INVITATION_CODES_KEY],
      })
    },
  })
}

// Lấy danh sách mã mời của người dùng hiện tại
export const useGetMyInvitationCodes = (params?: any): UseQueryResult<any> => {
  return useQuery({
    queryKey: [MY_INVITATION_CODES_KEY, params],
    queryFn: () => getMyInvitationCodes(params),
  })
}

// Lấy thông tin mã mời theo ID
export const useGetInvitationCodeById = (id: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: [INVITATION_CODES_KEY, id],
    queryFn: () => getInvitationCodeById(id),
    enabled: !!id, // Only fetch when ID is available
  })
}

// Lấy tất cả mã mời (Admin only)
export const useGetAllInvitationCodes = (params?: any): UseQueryResult<any> => {
  return useQuery({
    queryKey: [ADMIN_INVITATION_CODES_KEY, params],
    queryFn: () => getAllInvitationCodes(params),
  })
}

// Xóa mã mời
export const useDeleteInvitationCode = (): UseMutationResult<any, Error, string> => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, string>({
    mutationFn: (id: string) => deleteInvitationCode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_INVITATION_CODES_KEY],
      })
      queryClient.invalidateQueries({
        queryKey: [MY_INVITATION_CODES_KEY],
      })
    },
  })
}

// Hủy kích hoạt mã mời
export const useDeactivateInvitationCode = (): UseMutationResult<any, Error, string> => {
  const queryClient = useQueryClient()

  return useMutation<any, Error, string>({
    mutationFn: (code: string) => deactivateInvitationCode(code),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_INVITATION_CODES_KEY],
      })
      queryClient.invalidateQueries({
        queryKey: [MY_INVITATION_CODES_KEY],
      })
    },
  })
} 