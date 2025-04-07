import { sendGet, sendPut } from "../apiClient";
import { ConfigMaintenanceModeEndPoint, ConfigSettingsEndPoint } from "./contants";

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