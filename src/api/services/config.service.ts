import { sendGet, sendPost, sendPut, sendDelete } from "../apiClient";
import { ConfigMaintenanceModeEndPoint, ConfigSettingsEndPoint, ConfigEndPoint } from "./contants";

// Get maintenance mode status
export const getMaintenanceMode = async (): Promise<any> => {
  const res = await sendGet(ConfigMaintenanceModeEndPoint.BASE);
  return res.data;
};

// Update maintenance mode status
export const updateMaintenanceMode = async (payload: { isMaintenance: boolean, message?: string | null }): Promise<any> => {
  const res = await sendPut(ConfigMaintenanceModeEndPoint.BASE, payload);
  return res.data;
};

// Get all settings
export const getSettings = async (): Promise<any> => {
  const res = await sendGet(ConfigSettingsEndPoint.GET_SETTINGS);
  return res.data;
};

// Update settings
export const updateSettings = async (payload: any): Promise<any> => {
  const res = await sendPut(ConfigSettingsEndPoint.UPDATE_SETTINGS, payload);
  return res.data;
};

// Get all configs
export const getAllConfigs = async (): Promise<any> => {
  const res = await sendGet(ConfigEndPoint.BASE);
  return res;
};

// Get config by key
export const getConfigByKey = async (key: string): Promise<any> => {
  const res = await sendGet(ConfigEndPoint.GET_BY_KEY(key));
  return res;
};

// Create new config
export const createConfig = async (payload: any): Promise<any> => {
  const res = await sendPost(ConfigEndPoint.BASE, payload);
  return res;
};

// Update config
export const updateConfig = async (key: string, payload: any): Promise<any> => {
  const res = await sendPut(ConfigEndPoint.UPDATE(key), payload);
  return res;
};

// Delete config
export const deleteConfig = async (key: string): Promise<any> => {
  const res = await sendDelete(ConfigEndPoint.DELETE(key));
  return res;
}; 