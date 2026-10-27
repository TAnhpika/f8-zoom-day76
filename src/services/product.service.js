import { CONFIG } from "../constants/config.constant";

export const getProductList = async () => {
    const response = await fetch(`${CONFIG.SERVER_API}/products`);
    const { products } = await response.json();
    return products;
};
