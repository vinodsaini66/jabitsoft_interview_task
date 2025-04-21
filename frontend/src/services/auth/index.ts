import API from '../../lib/axios';
import { AUTH_ENDPOINTS } from './endpoints';
import { ApiResponse } from '../../types/common'; // adjust the path as needed

export const login = async (email: string, password: string): Promise<ApiResponse<any>> => {
  try {
    const res = await API.post(AUTH_ENDPOINTS.LOGIN, { email, password });
    return { data: res.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data?.message || error.message };
  }
};

export const register = async (
  email: string,
  password: string,
  name = ""
): Promise<ApiResponse<any>> => {
  try {
    const res = await API.post(AUTH_ENDPOINTS.REGISTER, { email, password, name });
    return { data: res.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data?.message || error.message };
  }
};

export const getUser = async (): Promise<ApiResponse<any>> => {
  try {
    const res = await API.get(AUTH_ENDPOINTS.USER);
    return { data: res.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data?.message || error.message };
  }
};


export const logout = async (): Promise<ApiResponse<any>> => {
  try {
    const res = await API.get(AUTH_ENDPOINTS.LOGOUT);
    return { data: res.data, error: null };
  } catch (error: any) {
    return { data: null, error: error?.response?.data?.message || error.message };
  }
};


