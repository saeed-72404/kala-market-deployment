// hooks/useCategoryHierarchy.ts
import useSWR from "swr";
import { Category } from "@/types/category";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useCategoryHierarchy() {
    const { data, error, isLoading } = useSWR<Category[]>(
        // "http://localhost:3001/api/v1/categories", // Nest API endpoint
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/hierarchy`, // Nest API endpoint

        fetcher
    );
    console.log("dataCategory => ", data );
    
    return {
        categories: data || [],
        isLoading,
        isError: error
    };
}
