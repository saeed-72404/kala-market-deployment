// lib/api.ts
export const api = {
    searchProducts: async (params: Record<string, any>) => {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`/api/products?${query}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    },

    getSearchSuggestions: async (query: string, limit = 10) => {
        const res = await fetch(`/api/suggestions?q=${query}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch suggestions");
        return res.json();
    },
};
