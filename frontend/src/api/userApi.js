import { API_URL, axiosInstance } from "./index";

//get users by id
export const GetUsers = async () => {
  try {
    const { data } = await axiosInstance.post(`${API_URL}/api/users`);
    console.log("sindie this", { data });
    console.log("da", data);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

//get all users
export const GetAllUsers = async () => {
  try {
    const {data} = await axiosInstance.get(`${API_URL}/api/allUsers`);
    // console.log("da", res);
    return data;
  } catch (err) {
    console.log("err", err);
  }
};
