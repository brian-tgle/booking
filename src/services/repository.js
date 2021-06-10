import axios from 'axios';
import databases from 'cache';
import { ROUTES, ERROR_CODE } from 'common/constants';
import { storeKey } from 'stores/authentication/authentication';

const baseURL = 'http://localhost:5000/api/';
const headers = {
  'Content-Type': 'application/json'
};

const axiosInstance = axios.create({
  baseURL,
  headers
});
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const errorData = error?.response?.data;
    if (errorData?.code === ERROR_CODE.UN_AUTHORIZED) {
      await databases.removeItem(storeKey);
      window.location.href = ROUTES.LOGIN;
      return {};
    }
    return {
      success: false,
      message: errorData?.message || error?.message,
      result: errorData,
      code: error?.response?.status
    };
  }
);

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export default axiosInstance;
