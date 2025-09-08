import axios from "axios";

export const API = axios.create({
  baseURL: "https://abitus-api.geia.vip/v1",
});