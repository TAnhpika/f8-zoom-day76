import { getCurrentUser, requestRefreshToken } from "@/services/auth.service";
import { NextResponse } from "next/server";

// top path
const protectUrls = ["/cart", "/orders", "/accounts"];
const guestUrls = ["/auth/login"];

export const proxy = async (request) => {
    const user = await getCurrentUser();
    const { pathname } = request.nextUrl;

    if (!user) {
        // some() check có ít nhất 1 pt trong mảng thỏa đk hay k
        // protectUrls chứa /cart. pathname là /cart/123 -> includes! -> true
        if (protectUrls.some((url) => pathname.includes(url))) {
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

// matcher: url chịu ảnh hưởng bởi proxy
export const config = {
    matcher: [
        // "/cart/:path*",
        // "/auth/:path*",
        // "/orders/:path*",
        // "/accounts/:path*",
        // match all url
        "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    ],
};
