import axios from "axios";

const BaseApi = {
  axiosInstance: axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  }),
};

export default BaseApi.axiosInstance;
