import { useQuery } from "@tanstack/react-query";
import { medusaClient } from "../services/medusa";

export const useProducts = (params = {}) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: async () => {
            const { products, count } = await medusaClient.products.list(params);
            return { products, count };
        },
    });
};

export const useCategories = (params = {}) => {
    return useQuery({
        queryKey: ["product_categories", params],
        queryFn: async () => {
            const { product_categories, count } = await medusaClient.productCategories.list(params);
            return { product_categories, count };
        },
    });
};

export const useProduct = (idOrHandle: string) => {
    return useQuery({
        queryKey: ["product", idOrHandle],
        queryFn: async () => {
            try {
                // Medusa IDs typically start with 'prod_'
                if (idOrHandle.startsWith("prod_")) {
                    const { product } = await medusaClient.products.retrieve(idOrHandle);
                    return product;
                } else {
                    // For handles, we use list to find by handle since retrieveByHandle isn't working as expected
                    const { products } = await medusaClient.products.list({ handle: idOrHandle });
                    if (products && products.length > 0) {
                        return products[0];
                    }
                    throw new Error(`Product with handle ${idOrHandle} not found`);
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                throw err;
            }
        },
        enabled: !!idOrHandle,
    });
};
