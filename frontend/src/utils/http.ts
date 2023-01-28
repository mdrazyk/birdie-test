import axios from "axios";

const BaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:8000";

export const get = async (url: string) => {
  const response = await axios.get(`${BaseUrl}${url}`);
  return response.data;
};