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
    const response = await fetchWrapper("/shopping-cart");
    if (!response.ok) {
        throw new Error(`Failed to load cart count: ${response.status}`);
    }

    const { items } = await response.json();
    return items.reduce((acc, item) => acc + item.quantity, 0);
};

export const getCartList = async () => {
    const response = await fetchWrapper("/shopping-cart");
    return response.json();
};
