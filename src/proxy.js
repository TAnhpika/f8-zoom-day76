import { getCurrentUser, requestRefreshToken } from "@/services/auth.service";
import { NextResponse } from "next/server";

export const proxy = async (request) => {
    const user = await getCurrentUser();
    const response = NextResponse.next();

    if (!user) {
        const refreshToken = request.cookies.get("refreshToken")?.value;
        const newToken = refreshToken
            ? await requestRefreshToken(refreshToken)
            : false;

        if (!newToken) {
            const redirectResponse = NextResponse.redirect(
                new URL("/auth/login", request.nextUrl.origin),
            );
            redirectResponse.cookies.delete("accessToken");
            redirectResponse.cookies.delete("refreshToken");
            return redirectResponse;
        }

        response.cookies.set("accessToken", newToken.accessToken, {
            httpOnly: true,
            maxAge: 3600,
        });

        response.cookies.set("refreshToken", newToken.refreshToken, {
            httpOnly: true,
            maxAge: 86400 * 7,
        });
    }

    return response;
};

// url chịu ảnh hưởng bởi proxy
export const config = {
    matcher: ["/cart/:path*"],
};
