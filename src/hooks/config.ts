import { 
  getMaintenanceMode, 
  getSettings, 
  updateMaintenanceMode, 
  updateSettings,
  getAllConfigs,
  getConfigByKey,
  createConfig,
  updateConfig,
  deleteConfig
} from "@/api/services/config.service";
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
const CONFIGS_KEY = "configs";

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

// Get all configs
export const useGetAllConfigs = (): UseQueryResult<any> => {
  return useQuery({
    queryKey: [CONFIGS_KEY],
    queryFn: () => getAllConfigs(),
  });
};

// Get config by key
export const useGetConfigByKey = (key: string): UseQueryResult<any> => {
  return useQuery({
    queryKey: [CONFIGS_KEY, key],
    queryFn: () => getConfigByKey(key),
    enabled: !!key,
  });
};

// Create config
export const useCreateConfig = (): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: (payload: any) => createConfig(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIGS_KEY],
      });
    },
  });
};

// Update config
export const useUpdateConfig = (): UseMutationResult<any, Error, any> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>({
    mutationFn: ({ key, payload }: { key: string; payload: any }) => updateConfig(key, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIGS_KEY],
      });
    },
  });
};

// Delete config
export const useDeleteConfig = (): UseMutationResult<any, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: (key: string) => deleteConfig(key),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CONFIGS_KEY],
      });
    },
  });
}; 