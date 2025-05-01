import {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
  getShopUsers,
} from "@/api/services/admin-chat.service"
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query"

// Query keys
const ADMIN_CHAT_KEY = "admin-chat"

// Define message payload interface
interface SendMessagePayload {
  userId: string;
  shopId: string;
  message: string;
  imageUrls?: string[];
  shopProductId?: string;
}
// Lấy danh sách tin nhắn
export const useGetMessages = (
  userId: string,
  shopId: string
): UseQueryResult<any> => {
  return useQuery({
    queryKey: [ADMIN_CHAT_KEY, userId, shopId],
    queryFn: () => getMessages(userId, shopId),
    enabled: !!userId && !!shopId,
  })
}

export const useGetShopUsers = (
  shopId: string,
  params?: {
    order?: "ASC" | "DESC";
    page?: number;
    take?: number;
    search?: string;
    sortBy?: string;
  }
): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["shopUsers", shopId, params],
    queryFn: () => getShopUsers(shopId, params),
  });
};


// Gửi tin nhắn
export const useSendMessage = (): UseMutationResult<
  void,
  Error,
  SendMessagePayload
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, shopId, message, imageUrls, shopProductId }) =>
      sendMessage(userId, shopId, message, imageUrls, shopProductId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_CHAT_KEY, variables.userId, variables.shopId],
      })
    },
  })
}

// Đánh dấu đã đọc
export const useMarkAsRead = (): UseMutationResult<void, Error, string> => {
  return useMutation({
    mutationFn: (messageId: string) => markAsRead(messageId),
  })
}

// Xóa tin nhắn
export const useDeleteMessage = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId),
    onSuccess: (_, messageId) => {
      queryClient.invalidateQueries({
        queryKey: [ADMIN_CHAT_KEY],
      })
    },
  })
} 