import  { sendGet, sendPost } from "../apiClient";
import {
  ConfigAuthEndPoint
} from "./contants";
import { ISignIn } from "@/interface/request/authentication";
import { IAuthResponse } from "@/interface/response/authentication";

export const signIn: (
  payload: ISignIn
) => Promise<IAuthResponse> = async (payload: ISignIn) => {
  const res = await sendPost(ConfigAuthEndPoint.LOGIN, payload);
  return res;
};

export const getProfile = async (): Promise<any> => {
  const res = await sendGet(ConfigAuthEndPoint.PROFILE);
  return res;
};