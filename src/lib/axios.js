import { getAccessToken } from "@/actions/auth.action";
import { CONFIG } from "@/constants/config.constant";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: CONFIG.SERVER_API,
});

axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});
