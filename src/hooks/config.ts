import { getMaintenanceMode, getSettings, updateMaintenanceMode, updateSettings } from "@/api/services/config.service";
import {
  useMutation,
  type UseMutationResult,
  useQuery,
  type UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";

// Query keys
const MAINTENANCE_MODE_KEY = "maintenanceMode";
const SETTINGS_KEY = "settings";

// Get maintenance mode status
export const useGetMaintenanceMode = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: [MAINTENANCE_MODE_KEY],
    queryFn: () => getMaintenanceMode(),
  });
};

// Update maintenance mode status
export const useUpdateMaintenanceMode = (): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (payload: any) => updateMaintenanceMode(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MAINTENANCE_MODE_KEY],
      });
    },
  });
};

// Get all settings
export const useGetSettings = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: [SETTINGS_KEY],
    queryFn: () => getSettings(),
  });
};

// Update settings
export const useUpdateSettings = (): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (payload: any) => updateSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SETTINGS_KEY],
      });
    },
  });
}; 