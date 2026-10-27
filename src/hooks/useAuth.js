import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth.action";

export const useAuth = () => {
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(false);

    // khi chuyển trang sẽ fetch lại
    const pathname = usePathname();

    const logout = async () => {
        await logoutAction();
    };

    useEffect(() => {
        const refetchUser = async () => {
            try {
                const response = await axiosInstance.get(`/profile/me`);
                setUser(response.data.user);
                setAuthenticated(true);
            } catch (error) {
                setUser({});
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        refetchUser();
    }, [pathname]);

    return { user, isLoading, isAuthenticated, logout };
};
