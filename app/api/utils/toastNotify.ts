import { toast } from "react-toastify";

export const toastNotify = async (response, message: string) => {
  if (response.hasOwnProperty("error")) {
    toast(response.error.message, { autoClose: 2000, type: "error" });
    return response;
  }
  toast(message, { autoClose: 2000, type: "success" });
  return response;
};
