import axios from "axios";
import { layDuLieuLocal } from "../util/localStorage";

// const BASE_URL = "https://airbnbnew.cybersoft.edu.vn";
const BASE_URL = "http://localhost:8080";

const tokenAdmin = layDuLieuLocal("user");

const configHeaderAxios = () => {
  return {
    token: tokenAdmin?.token,
    Authorization: "Bearer " + tokenAdmin?.token,
  };
};
// console.log(configHeaderAxios());
export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
  // header: handleFormData(),
});
