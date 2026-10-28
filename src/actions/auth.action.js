"use server";

import { axiosInstance } from "@/lib/axios";
import { login, requestRefreshToken } from "@/services/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export const logoutAction = async () => {
    const cookieStore = await cookies();
    axiosInstance.post("/auth/logout");
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    redirect("/auth/login");
};

export const getAccessToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value;
};

export const makeRefreshToken = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken) {
        return false;
    }

    const newToken = await requestRefreshToken(refreshToken);
    if (!newToken) {
        return false;
    }

    cookieStore.set("accessToken", newToken.accessToken, {
        httpOnly: true,
        maxAge: 3600,
    });

    cookieStore.set("refreshToken", newToken.refreshToken, {
        httpOnly: true,
        maxAge: 86400 * 7,
    });

    return true;
};
