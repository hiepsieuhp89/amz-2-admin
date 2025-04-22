import { getAllActionLogs, getUserActionLogs } from "@/api/services/action-log.service"
import {
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query"

// Query keys
const ACTION_LOGS_KEY = "action-logs"
const USER_ACTION_LOGS_KEY = "user-action-logs"

// Get user action logs
export const useGetUserActionLogs = (
  userId: string, 
  params?: any
): UseQueryResult<any> => {
  return useQuery({
    queryKey: [USER_ACTION_LOGS_KEY, userId, params],
    queryFn: () => getUserActionLogs(userId, params),
    enabled: !!userId,
  })
}

// Get all action logs (admin only)
export const useGetAllActionLogs = (params?: any): UseQueryResult<any> => {
  return useQuery({
    queryKey: [ACTION_LOGS_KEY, params],
    queryFn: () => getAllActionLogs(params),
  })
} 