import { getCurrentUser, requestRefreshToken } from "@/services/auth.service";
import { NextResponse } from "next/server";

const protectUrls = ["/cart"];
const guestUrls = ["/auth/login"];

export const proxy = async (request) => {
    const user = await getCurrentUser();
    const { pathname } = request.nextUrl;

    if (!user) {
        if (protectUrls.includes(pathname)) {
            // Refresh token
            const refreshToken = request.cookies.get("refreshToken")?.value;
            const newToken = await requestRefreshToken(refreshToken);

            if (!newToken) {
                // xử lý khi refresh fail
                const response = NextResponse.redirect(
                    new URL("/auth/login", request.nextUrl.origin),
                );
                response.cookies.delete("accessToken");
                response.cookies.delete("refreshToken");
                return response;
            }

            // xử lý khi refresh thành công
            const response = NextResponse.next();

            response.cookies.set("accessToken", newToken.accessToken, {
                httpOnly: true,
                maxAge: 3600,
            });

            response.cookies.set("refreshToken", newToken.refreshToken, {
                httpOnly: true,
                maxAge: 86400 * 7,
            });
            return response;
        }
    } else {
        if (guestUrls.includes(pathname)) {
            return NextResponse.redirect(new URL("/", request.nextUrl.origin));
        }
    }
};

// url chịu ảnh hưởng bởi proxy
export const config = {
    matcher: ["/cart/:path*", "/auth/:path*"],
};
