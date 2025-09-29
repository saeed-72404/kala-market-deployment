"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { debounce } from "@/lib/utils";

interface SearchFilters {
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  rating?: number;
  attributes?: Array<{ name: string; value: string }>;
  tags?: string[];
}

interface SearchOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface UseSearchReturn {
  // State
  query: string;
  results: any[];
  facets: any;
  pagination: any;
  filters: SearchFilters;
  options: SearchOptions;
  loading: boolean;
  error: string | null;
  suggestions: string[];

  // Actions
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setOptions: (options: Partial<SearchOptions>) => void;
  clearFilters: () => void;
  search: () => Promise<void>;
  getSuggestions: (query: string) => Promise<void>;

  // Computed
  hasFilters: boolean;
  totalResults: number;
  currentPage: number;
  totalPages: number;
}

export function useSearch(initialQuery = ""): UseSearchReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [query, setQueryState] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [facets, setFacets] = useState(null);
  // قبلا: const [pagination, setPagination] = useState(null)
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [filters, setFiltersState] = useState<SearchFilters>({});
  const [options, setOptionsState] = useState<SearchOptions>({
    page: 1,
    limit: 20,
    sortBy: "relevance",
    sortOrder: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  interface Pagination {
    total: number;
    page: number;
    pages: number;
  }
  // Initialize from URL params
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    const urlPage = Number.parseInt(searchParams.get("page") || "1");
    const urlLimit = Number.parseInt(searchParams.get("limit") || "20");
    const urlSortBy = searchParams.get("sortBy") || "relevance";
    const urlSortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

    const urlFilters: SearchFilters = {
      categoryId: searchParams.get("categoryId") || undefined,
      brandId: searchParams.get("brandId") || undefined,
      minPrice: searchParams.get("minPrice")
        ? Number.parseFloat(searchParams.get("minPrice")!)
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number.parseFloat(searchParams.get("maxPrice")!)
        : undefined,
      inStock: searchParams.get("inStock") === "true",
      onSale: searchParams.get("onSale") === "true",
      rating: searchParams.get("rating")
        ? Number.parseFloat(searchParams.get("rating")!)
        : undefined,
    };

    setQueryState(urlQuery);
    setOptionsState({
      page: urlPage,
      limit: urlLimit,
      sortBy: urlSortBy,
      sortOrder: urlSortOrder,
    });
    setFiltersState(urlFilters);

    // Perform initial search if there's a query
    if (urlQuery) {
      performSearch(urlQuery, urlFilters, {
        page: urlPage,
        limit: urlLimit,
        sortBy: urlSortBy,
        sortOrder: urlSortOrder,
      });
    }
  }, [searchParams]);

  // Update URL when search parameters change
  const updateURL = useCallback(
    (
      newQuery: string,
      newFilters: SearchFilters,
      newOptions: SearchOptions
    ) => {
      const params = new URLSearchParams();

      if (newQuery) params.set("q", newQuery);
      if (newOptions.page && newOptions.page > 1)
        params.set("page", newOptions.page.toString());
      if (newOptions.limit && newOptions.limit !== 20)
        params.set("limit", newOptions.limit.toString());
      if (newOptions.sortBy && newOptions.sortBy !== "relevance")
        params.set("sortBy", newOptions.sortBy);
      if (newOptions.sortOrder && newOptions.sortOrder !== "desc")
        params.set("sortOrder", newOptions.sortOrder);

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (typeof value === "boolean" && value) {
            params.set(key, "true");
          } else if (typeof value !== "boolean") {
            params.set(key, value.toString());
          }
        }
      });

      const newURL = params.toString() ? `?${params.toString()}` : "";
      router.push(`/products${newURL}`, { scroll: false });
    },
    [router]
  );

  // Perform search
  const performSearch = useCallback(
    async (
      searchQuery: string,
      searchFilters: SearchFilters,
      searchOptions: SearchOptions
    ) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.searchProducts({
          q: searchQuery,
          ...searchFilters,
          ...searchOptions,
        });

        setResults(response.products || []);
        setFacets(response.facets || null);
        setPagination(response.pagination || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
        setResults([]);
        setFacets(null);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce(
        (
          searchQuery: string,
          searchFilters: SearchFilters,
          searchOptions: SearchOptions
        ) => {
          performSearch(searchQuery, searchFilters, searchOptions);
          updateURL(searchQuery, searchFilters, searchOptions);
        },
        300
      ),
    [performSearch, updateURL]
  );

  // Public methods
  const setQuery = useCallback(
    (newQuery: string) => {
      setQueryState(newQuery);
      const newOptions = { ...options, page: 1 }; // Reset to first page
      setOptionsState(newOptions);
      debouncedSearch(newQuery, filters, newOptions);
    },
    [filters, options, debouncedSearch]
  );

  const setFilters = useCallback(
    (newFilters: Partial<SearchFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      const newOptions = { ...options, page: 1 }; // Reset to first page
      setFiltersState(updatedFilters);
      setOptionsState(newOptions);
      debouncedSearch(query, updatedFilters, newOptions);
    },
    [query, filters, options, debouncedSearch]
  );

  const setOptions = useCallback(
    (newOptions: Partial<SearchOptions>) => {
      const updatedOptions = { ...options, ...newOptions };
      setOptionsState(updatedOptions);
      debouncedSearch(query, filters, updatedOptions);
    },
    [query, filters, options, debouncedSearch]
  );

  const clearFilters = useCallback(() => {
    const clearedFilters: SearchFilters = {};
    const newOptions = { ...options, page: 1 };
    setFiltersState(clearedFilters);
    setOptionsState(newOptions);
    debouncedSearch(query, clearedFilters, newOptions);
  }, [query, options, debouncedSearch]);

  const search = useCallback(async () => {
    await performSearch(query, filters, options);
    updateURL(query, filters, options);
  }, [query, filters, options, performSearch, updateURL]);

  const getSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await api.getSearchSuggestions(searchQuery, 10);
      setSuggestions(response || []);
    } catch (err) {
      console.error("Failed to get suggestions:", err);
      setSuggestions([]);
    }
  }, []);

  // Debounced suggestions
  const debouncedGetSuggestions = useMemo(
    () => debounce(getSuggestions, 200),
    [getSuggestions]
  );

  // Auto-get suggestions when query changes
  useEffect(() => {
    debouncedGetSuggestions(query);
  }, [query, debouncedGetSuggestions]);

  // Computed values
  const hasFilters = useMemo(() => {
    return Object.values(filters).some(
      (value) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        (typeof value !== "boolean" || value === true)
    );
  }, [filters]);

  const totalResults = pagination?.total ?? 0;
  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.pages ?? 0;
  return {
    // State
    query,
    results,
    facets,
    pagination,
    filters,
    options,
    loading,
    error,
    suggestions,

    // Actions
    setQuery,
    setFilters,
    setOptions,
    clearFilters,
    search,
    getSuggestions,

    // Computed
    hasFilters,
    totalResults,
    currentPage,
    totalPages,
  };
}
