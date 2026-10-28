import { CONFIG } from "@/constants/config.constant";
import { getAccessToken } from "@/actions/auth.action";

// gắn accessToken vào headers
export const fetchWrapper = async (url, options = {}) => {
    url = `${CONFIG.SERVER_API}${url}`;
    const allHeaders = new Headers(options.headers || {});
    const accessToken = await getAccessToken();
    if (accessToken) {
        allHeaders.set("Authorization", `Bearer ${accessToken}`);
    }
    return fetch(url, {
        ...options,
        headers: allHeaders,
    });
};
