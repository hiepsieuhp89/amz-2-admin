import {
  getNotifications,
  createNotification,
  deleteNotification,
  markNotificationAsRead,
} from "@/api/services/notification.service";
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";

// Query keys
const NOTIFICATIONS_KEY = "notifications";
const NOTIFICATION_KEY = "notification";

export const useGetNotifications = (params?: {
  page?: number;
  take?: number;
  search?: string;
  order?: string;
  status?: string;
}): UseQueryResult<any> => {
  return useQuery({
    queryKey: [NOTIFICATIONS_KEY, params],
    queryFn: () => getNotifications(params),
  });
};

export const useCreateNotification = (): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createNotification(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
    },
  });
};

export const useDeleteNotification = (): UseMutationResult<any, Error, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
    },
  });
};

export const useMarkNotificationAsRead = (): UseMutationResult<any, Error, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_KEY] });
    },
  });
}; 