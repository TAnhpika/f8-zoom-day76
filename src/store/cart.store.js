import { getCartCount } from "@/services/cart.service";
import { create } from "zustand";

export const useCartStore = create((set) => {
    return {
        count: 0,
        setCount: (count) => {
            set({ count });
        },
        fetchCount: async () => {
            try {
                const count = await getCartCount();
                set({ count });
            } catch (error) {
                console.error("Failed to load cart quantity:", error);
            }
        },
    };
});
