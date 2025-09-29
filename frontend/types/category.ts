// types/category.ts
export interface ChildCategory {
    id: string | number;
    name: string;
    slug?: string;
}

export interface Category {
    id: string | number;
    name: string;
    slug?: string;
    subcategories?: ChildCategory[]; 
}
