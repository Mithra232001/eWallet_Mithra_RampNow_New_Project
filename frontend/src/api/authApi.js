import {API_URL, axiosInstance} from './index';


//register method
export const register = async (formData) => {
  try {
    const res = await axiosInstance.post(`${API_URL}/api/register`, formData);
    return res.data;
  } catch (err) {
    console.log("err", err);
  }
};

//login method
export const login = async (data) => {
  try {
    const res = await axiosInstance.post(`${API_URL}/api/login`, data);
    return res;
  } catch (err) {
    console.log("err", err);
  }
};
