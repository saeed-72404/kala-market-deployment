"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { useSearch } from "@/hooks/use-search"
import { cn } from "@/lib/utils"

interface AdvancedSearchProps {
  className?: string
  onResultsChange?: (results: any[]) => void
}

export default function AdvancedSearch({ className, onResultsChange }: AdvancedSearchProps) {
  const {
    query,
    results,
    facets,
    filters,
    options,
    loading,
    error,
    suggestions,
    hasFilters,
    setQuery,
    setFilters,
    setOptions,
    clearFilters,
    getSuggestions,
  } = useSearch()

  const [showFilters, setShowFilters] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Update parent component when results change
  useEffect(() => {
    if (onResultsChange) {
      onResultsChange(results)
    }
  }, [results, onResultsChange])

  // Update price range when facets change
  useEffect(() => {
    if (facets?.priceRange) {
      setPriceRange([
        filters.minPrice || facets.priceRange.min || 0,
        filters.maxPrice || facets.priceRange.max || 100000000,
      ])
    }
  }, [facets, filters.minPrice, filters.maxPrice])

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleQueryChange = (value: string) => {
    setQuery(value)
    if (value.length >= 2) {
      setShowSuggestions(true)
      getSuggestions(value)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    searchInputRef.current?.blur()
  }

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]])
  }

  const handlePriceRangeCommit = (values: number[]) => {
    setFilters({
      minPrice: values[0] > (facets?.priceRange?.min || 0) ? values[0] : undefined,
      maxPrice: values[1] < (facets?.priceRange?.max || 100000000) ? values[1] : undefined,
    })
  }

  const handleCategoryFilter = (categoryId: string, checked: boolean) => {
    setFilters({
      categoryId: checked ? categoryId : undefined,
    })
  }

  const handleBrandFilter = (brandId: string, checked: boolean) => {
    setFilters({
      brandId: checked ? brandId : undefined,
    })
  }

  const handleAttributeFilter = (attributeName: string, attributeValue: string, checked: boolean) => {
    const currentAttributes = filters.attributes || []

    if (checked) {
      const newAttributes = [...currentAttributes, { name: attributeName, value: attributeValue }]
      setFilters({ attributes: newAttributes })
    } else {
      const newAttributes = currentAttributes.filter(
        (attr) => !(attr.name === attributeName && attr.value === attributeValue),
      )
      setFilters({ attributes: newAttributes.length > 0 ? newAttributes : undefined })
    }
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.categoryId) count++
    if (filters.brandId) count++
    if (filters.minPrice || filters.maxPrice) count++
    if (filters.inStock) count++
    if (filters.onSale) count++
    if (filters.rating) count++
    if (filters.attributes?.length) count += filters.attributes.length
    return count
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="جستجو در محصولات..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) {
                setShowSuggestions(true)
              }
            }}
            className="pl-10 pr-4 h-12 text-lg"
            dir="rtl"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 text-right hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 space-x-reverse"
        >
          <Filter className="h-4 w-4" />
          <span>فیلترها</span>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="ml-2">
              {getActiveFiltersCount()}
            </Badge>
          )}
          {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 ml-1" />
            پاک کردن فیلترها
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Categories Filter */}
              {facets?.categories && facets.categories.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">دسته‌بندی</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {facets.categories.map((category: any) => (
                      <div key={category.id} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`cat-${category.id}`}
                          checked={filters.categoryId === category.id}
                          onCheckedChange={(checked) => handleCategoryFilter(category.id, checked as boolean)}
                        />
                        <Label htmlFor={`cat-${category.id}`} className="text-sm flex-1">
                          {category.name}
                        </Label>
                        <span className="text-xs text-gray-500">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Brands Filter */}
              {facets?.brands && facets.brands.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">برند</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {facets.brands.map((brand: any) => (
                      <div key={brand.id} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={`brand-${brand.id}`}
                          checked={filters.brandId === brand.id}
                          onCheckedChange={(checked) => handleBrandFilter(brand.id, checked as boolean)}
                        />
                        <Label htmlFor={`brand-${brand.id}`} className="text-sm flex-1">
                          {brand.name}
                        </Label>
                        <span className="text-xs text-gray-500">({brand.count})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Filters */}
              <div>
                <h4 className="font-medium mb-3">سایر فیلترها</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="in-stock"
                      checked={filters.inStock || false}
                      onCheckedChange={(checked) => setFilters({ inStock: checked as boolean })}
                    />
                    <Label htmlFor="in-stock" className="text-sm">
                      فقط کالاهای موجود
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="on-sale"
                      checked={filters.onSale || false}
                      onCheckedChange={(checked) => setFilters({ onSale: checked as boolean })}
                    />
                    <Label htmlFor="on-sale" className="text-sm">
                      فقط کالاهای تخفیف‌دار
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Range Filter */}
            {facets?.priceRange && (
              <div>
                <Separator className="my-4" />
                <h4 className="font-medium mb-3">محدوده قیمت</h4>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    onValueCommit={handlePriceRangeCommit}
                    min={facets.priceRange.min || 0}
                    max={facets.priceRange.max || 100000000}
                    step={100000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{new Intl.NumberFormat("fa-IR").format(priceRange[0])} تومان</span>
                    <span>{new Intl.NumberFormat("fa-IR").format(priceRange[1])} تومان</span>
                  </div>
                </div>
              </div>
            )}

            {/* Attributes Filter */}
            {facets?.attributes && Object.keys(facets.attributes).length > 0 && (
              <div>
                <Separator className="my-4" />
                <h4 className="font-medium mb-3">ویژگی‌ها</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(facets.attributes).map(([attributeName, attributeValues]: [string, any]) => (
                    <div key={attributeName}>
                      <h5 className="font-medium text-sm mb-2">{attributeName}</h5>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {attributeValues.map((attr: any) => {
                          const isChecked =
                            filters.attributes?.some(
                              (filterAttr) => filterAttr.name === attributeName && filterAttr.value === attr.value,
                            ) || false

                          return (
                            <div key={attr.value} className="flex items-center space-x-2 space-x-reverse">
                              <Checkbox
                                id={`attr-${attributeName}-${attr.value}`}
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                  handleAttributeFilter(attributeName, attr.value, checked as boolean)
                                }
                              />
                              <Label htmlFor={`attr-${attributeName}-${attr.value}`} className="text-sm flex-1">
                                {attr.value}
                              </Label>
                              <span className="text-xs text-gray-500">({attr.count})</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <span className="text-sm text-gray-600">مرتب‌سازی:</span>
          <Select value={options.sortBy} onValueChange={(value) => setOptions({ sortBy: value })}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">مرتبط‌ترین</SelectItem>
              <SelectItem value="newest">جدیدترین</SelectItem>
              <SelectItem value="popularity">پرفروش‌ترین</SelectItem>
              <SelectItem value="price">قیمت (کم به زیاد)</SelectItem>
              <SelectItem value="price-desc">قیمت (زیاد به کم)</SelectItem>
              <SelectItem value="rating">بیشترین امتیاز</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <span className="text-sm text-gray-600">تعداد در صفحه:</span>
          <Select
            value={options.limit?.toString()}
            onValueChange={(value) => setOptions({ limit: Number.parseInt(value) })}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
              <SelectItem value="96">96</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}
