import { CONFIG } from "@/constants/config.constant";

export const login = async (loginData) => {
    const response = await fetch(`${CONFIG.SERVER_API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });
    if (!response.ok) {
        return false;
    }

    return response.json();
};

export const requestRefreshToken = async (token) => {
    const response = await fetch(`${CONFIG.SERVER_API}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            refreshToken: token,
        }),
    });
    if (!response.ok) {
        return false;
    }

    return response.json();
};
