import axios from "axios";

const BaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.example.com"
    : "http://localhost:8000";

export const get = async (url: string) => {
  const response = await axios.get(`${BaseUrl}${url}`);
  return response.data;
};