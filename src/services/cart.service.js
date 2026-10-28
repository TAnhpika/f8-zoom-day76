import { axiosInstance } from "@/lib/axios";
import { fetchWrapper } from "@/utils/fetch";

export const addToCart = async (data) => {
    try {
        await axiosInstance.post("/shopping-cart", data);
        return true;
    } catch {
        return false;
    }
};

// get current count
export const getCartCount = async () => {
    try {
        const response = await axiosInstance.get("/shopping-cart");
        const { items } = response.data;
        const count = items.reduce((acc, cur) => acc + cur.quantity, 0);
        return count;
    } catch {
        return false;
    }
};

export const getCartList = async () => {
    const response = await fetchWrapper("/shopping-cart");
    return response.json();
};
