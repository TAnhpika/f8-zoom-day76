import { axiosInstance } from "@/lib/axios";

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
