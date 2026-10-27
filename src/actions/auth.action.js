"use server";

import { login } from "@/services/auth.service";
import { cookies } from "next/headers";

export const loginAction = async (prevState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const data = await login({ email, password });

    if (!data) {
        return {
            success: false,
            message: "Login failed",
        };
    }
    const cookieStore = await cookies();
    cookieStore.set("accessToken", data.accessToken, {
        httpOnly: true,
        maxAge: 3600,
    });

    cookieStore.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 86400 * 7,
    });

    return {
        success: true,
        message: "Login success",
    };
};

export const getAccessToken = async (params) => {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value;
};
