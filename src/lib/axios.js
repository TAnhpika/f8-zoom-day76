import { getAccessToken, makeRefreshToken } from "@/actions/auth.action";
import { CONFIG } from "@/constants/config.constant";
import axios from "axios";
import { redirect } from "next/navigation";

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

// cờ
let refreshTokenPromise = null;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // refresh
            if (!refreshTokenPromise) {
                refreshTokenPromise = makeRefreshToken();
            }
        }

        const refreshStatus = await refreshTokenPromise;
        refreshTokenPromise = null;

        if (refreshStatus) {
            return axiosInstance(error.config);
        } else if (
            window.location.pathname !== "/auth/login" &&
            window.location.pathname !== "/profile/me" &&
            window.location.pathname !== "/shopping-cart"
        ) {
            window.location.href("/auth/login");
        }
        return Promise.reject(error);
    },
);
