import { API_URL, axiosInstance } from "./index";

//create transaction
export const CreateTransactionData = async(data) => {
    try {
        const res = await axiosInstance.post(`${API_URL}/api/transaction`, data);
        return res;
      } catch (err) {
        console.log("err", err);
      }
}

//get transaction details
export const GetTransactionData = async() => {
    try {
        const res = await axiosInstance.get(`${API_URL}/api/transaction`);
        return res;
      } catch (err) {
        console.log("err", err);
      }
}