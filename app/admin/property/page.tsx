"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Icon } from "@iconify/react";
import SearchIcon from "@/public/icons/search-icon.svg";

import ExportCSVIcon from "@/public/icons/export-csv-icon.svg";
import AddPropertyIcon from "@/public/icons/add-property-icon.svg";
import FullyInsuredBadge from "@/public/icons/fully-insured-badge.svg";
import VerifiedCheck from "@/public/icons/verified-check.svg";
import LocationPin from "@/public/icons/location-pin.svg";
import BedIcon from "@/public/icons/bed.svg";
import BathIcon from "@/public/icons/bath.svg";
import SqmIcon from "@/public/icons/sqm.svg";
import { useProperties } from "./hooks";
import { Property } from "./types";



export default function PropertyPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "sold">("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [providerFilter, setProviderFilter] = useState<string>("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page on new search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Determine status filter based on active tab
  const statusFilter = useMemo(() => {
    if (activeTab === "active") return "ACTIVE";
    if (activeTab === "sold") return "SOLD_OUT";
    return "";
  }, [activeTab]);

  // Parse price values
  const minPriceNum = useMemo(() => {
    const parsed = parseFloat(minPrice.replace(/,/g, ""));
    return isNaN(parsed) ? undefined : parsed;
  }, [minPrice]);

  const maxPriceNum = useMemo(() => {
    const parsed = parseFloat(maxPrice.replace(/,/g, ""));
    return isNaN(parsed) ? undefined : parsed;
  }, [maxPrice]);

  const { data, isLoading, error } = useProperties({
    page,
    limit: 12,
    search: debouncedSearch,
    status: statusFilter,
    type: typeFilter === "all" ? "" : typeFilter,
    state: stateFilter,
    city: cityFilter,
    min_price: minPriceNum,
    max_price: maxPriceNum,
    provider: providerFilter,
  });

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [typeFilter, stateFilter, cityFilter, minPrice, maxPrice, providerFilter]);

  // Clear all filters
  const clearFilters = () => {
    setTypeFilter("");
    setStateFilter("");
    setCityFilter("");
    setMinPrice("");
    setMaxPrice("");
    setProviderFilter("");
  };

  const hasActiveFilters =
    typeFilter ||
    stateFilter ||
    cityFilter ||
    minPrice ||
    maxPrice ||
    providerFilter;

  const properties = data?.data || [];
  const pagination = {
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || 12,
    totalPages: data?.totalPages || 0,
  };

  const handleTabChange = (tab: "all" | "active" | "sold") => {
    setActiveTab(tab);
    setPage(1); // Reset to first page when changing tabs
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#0e0e0f]">
              Properties
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-11 px-4 rounded-[48px] shadow-none bg-white! border-none hover:bg-[#f5f5f5]"
              >
                <ExportCSVIcon style={{ color: "#36393f" }} />
                <span className="text-sm font-medium text-[#36393f]">
                  Export CSV
                </span>
              </Button>
              <Link href="/admin/property/add">
                <Button
                  className="h-11 px-4 rounded-full border-none text-white"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(150,51,253,1) 0%, rgba(125,0,255,1) 100%)",
                    boxShadow: "0px 0px 0px 1px #7d00ff",
                  }}
                >
                  <AddPropertyIcon style={{ color: "#ffffff" }} />
                  <span className="text-sm font-medium">Add Property</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white border border-[#e7e8ea] rounded-full px-4 py-3 w-full max-w-md">
                <SearchIcon className="w-4 h-4" style={{ color: "#6b7280" }} />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 shadow-none h-auto p-0 bg-transparent! rounded-none bg-none! text-sm font-medium text-[#6b7280] placeholder:text-[#6b7280] focus-visible:ring-0"
                  style={{ letterSpacing: "-0.14px" }}
                />
              </div>
              <Dialog open={showFilters} onOpenChange={setShowFilters}>
                <Button
                  variant="ghost"
                  className="h-9 px-3 py-4! bg-white! rounded-lg gap-2"
                  onClick={() => setShowFilters(true)}
                >
                  <Icon
                    icon="majesticons:chevron-down-line"
                    width="24"
                    height="24"
                    style={{ color: "#36393f" }}
                  />

                  <span className="text-sm font-medium text-[#36393f]">
                    Filter
                  </span>
                  {hasActiveFilters && (
                    <span className="ml-1 w-6 h-6 flex items-center justify-center text-xs bg-[#7d00ff] text-white rounded-full">
                      {
                        [
                          typeFilter,
                          stateFilter,
                          cityFilter,
                          minPrice,
                          maxPrice,
                          providerFilter,
                        ].filter(Boolean).length
                      }
                    </span>
                  )}
                </Button>

                {/* Filter Dialog */}
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Property Type */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#0e0e0f]">
                        Property Type
                      </Label>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full bg-white">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="BUNGALOW">Bungalow</SelectItem>
                          <SelectItem value="VILLA">Villa</SelectItem>
                          <SelectItem value="DUPLEX">Duplex</SelectItem>
                          <SelectItem value="APARTMENT">Apartment</SelectItem>
                          <SelectItem value="TERRACE">Terrace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#0e0e0f]">
                        State
                      </Label>
                      <Input
                        placeholder="e.g., Lagos"
                        value={stateFilter}
                        onChange={(e) => setStateFilter(e.target.value)}
                        className="bg-white"
                      />
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#0e0e0f]">
                        City
                      </Label>
                      <Input
                        placeholder="e.g., Ikeja"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        className="bg-white"
                      />
                    </div>

                    {/* Min Price */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#0e0e0f]">
                        Min Price (₦)
                      </Label>
                      <Input
                        type="text"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9,]/g, "");
                          setMinPrice(value);
                        }}
                        className="bg-white"
                      />
                    </div>

                    {/* Max Price */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#0e0e0f]">
                        Max Price (₦)
                      </Label>
                      <Input
                        type="text"
                        placeholder="0"
                        value={maxPrice}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9,]/g, "");
                          setMaxPrice(value);
                        }}
                        className="bg-white"
                      />
                    </div>

                    {/* Provider */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-[#0e0e0f]">
                        Provider
                      </Label>
                      <Input
                        placeholder="e.g., CityEdge Realtors"
                        value={providerFilter}
                        onChange={(e) => setProviderFilter(e.target.value)}
                        className="bg-white"
                      />
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between gap-2 pt-4 border-t border-[#e7e8ea]">
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-sm text-[#6b7280] hover:text-[#0e0e0f]"
                      >
                        Clear all
                      </Button>
                    )}
                    <div className="flex-1" />
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="bg-white border-[#e7e8ea]"
                      >
                        Close
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-[#e7e8ea]">
              <button
                onClick={() => handleTabChange("all")}
                className={`text-sm font-medium cursor-pointer pb-1 border-b-2 transition-colors ${
                  activeTab === "all"
                    ? "border-[#7d00ff] font-semibold text-[#7d00ff]"
                    : "border-transparent text-[#36393f]"
                }`}
              >
                All Properties
              </button>
              <button
                onClick={() => handleTabChange("active")}
                className={`text-sm font-medium cursor-pointer pb-1 border-b-2 transition-colors ${
                  activeTab === "active"
                    ? "border-[#7d00ff] font-semibold text-[#7d00ff]"
                    : "border-transparent text-[#36393f]"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => handleTabChange("sold")}
                className={`text-sm  font-medium cursor-pointer pb-1 border-b-2 transition-colors ${
                  activeTab === "sold"
                    ? "border-[#7d00ff] font-semibold text-[#7d00ff]"
                    : "border-transparent text-[#36393f]"
                }`}
              >
                Sold Out
              </button>
            </div>

            {/* Property Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-sm text-[#6b7280]">
                  Loading properties...
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-sm text-red-600">
                  Error loading properties. Please try again.
                </div>
              </div>
            ) : properties.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-sm text-[#6b7280]">
                  No properties found.
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between pt-6">
                    <div className="text-sm text-[#6b7280]">
                      Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                      {Math.min(
                        pagination.page * pagination.limit,
                        pagination.total,
                      )}{" "}
                      of {pagination.total} properties
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={pagination.page === 1 || isLoading}
                        className="h-9 px-3 rounded-lg"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.min(5, pagination.totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (pagination.totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (pagination.page <= 3) {
                              pageNum = i + 1;
                            } else if (
                              pagination.page >=
                              pagination.totalPages - 2
                            ) {
                              pageNum = pagination.totalPages - 4 + i;
                            } else {
                              pageNum = pagination.page - 2 + i;
                            }
                            return (
                              <Button
                                key={pageNum}
                                variant={
                                  pagination.page === pageNum
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setPage(pageNum)}
                                disabled={isLoading}
                                className={`h-9 w-9 rounded-lg ${
                                  pagination.page === pageNum
                                    ? "bg-[#7d00ff] text-white hover:bg-[#6b00d9]"
                                    : ""
                                }`}
                              >
                                {pageNum}
                              </Button>
                            );
                          },
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setPage((p) => Math.min(pagination.totalPages, p + 1))
                        }
                        disabled={
                          pagination.page === pagination.totalPages || isLoading
                        }
                        className="h-9 px-3 rounded-lg"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: Property }) {
  const formatPrice = (price: number | string | undefined) => {
    if (!price && price !== 0) return "₦ 0";
    return `₦ ${Math.floor(Number(price)).toLocaleString("en-US")}`;
  };
  const oneTimePlan = property.payment_plans?.find(
    (plan) => plan.duration_months === 0,
  );
  const formatStatus = (status: string) => {
    if (status === "ACTIVE") return "Completed";
    if (status === "SOLD_OUT") return "Sold Out";
    return status;
  };

  const getStatusColor = (status: string) => {
    if (status === "ACTIVE") return "text-[#158348] bg-[#EAF7ED]";
    if (status === "SOLD_OUT") return "text-[#df1c41]";
    return "text-[#6b7280]";
  };

  const availableUnits = property.total_units - property.sold_units;

  return (
    <Link href={`/admin/property/${property.id}`} className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow p-4 space-y-4">
      {/* Image with Badge */}
      <div className="relative h-[190px] rounded-lg overflow-hidden w-full">
        <Image
          src={property.featured_image || "/properties/property-1.jpg"}
          alt={property.title}
          fill
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/properties/property-1.jpg";
          }}
        />
        {property.is_insured && (
          <div className="absolute top-4 right-4">
            <FullyInsuredBadge className="w-[100px] h-7" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-5">
        {/* Title and Status */}
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <h3
                className="text-lg capitalize font-semibold text-[#0e0e0f] truncate"
                style={{ letterSpacing: "-0.16px" }}
              >
                {property.title}
              </h3>
              {property.is_provider_verified && (
                <VerifiedCheck
                  className="w-[18px] h-[17px] shrink-0"
                  style={{ color: "#30b066" }}
                />
              )}
            </div>
            <Badge
              variant="outline"
              className={`text-xs font-semibold py-1 px-3 rounded-full border-0 shrink-0 ${getStatusColor(
                property.status,
              )}`}
            >
              {formatStatus(property.status)}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <LocationPin
              className="w-4 h-4 shrink-0"
              style={{ color: "#6b7280" }}
            />
            <span className="text-xs capitalize font-medium text-[#6b7280] truncate">
              {property.location}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-2xl font-medium text-[#0e0e0f]">
          {formatPrice(oneTimePlan?.price)}
        </div>

        {/* Details and Units */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {property.bedrooms !== null && (
              <div className="flex items-center gap-1.5">
                <BedIcon className="w-3 h-3" style={{ color: "#6b7280" }} />
                <span
                  className="text-sm font-normal text-[#6b7280]"
                  style={{ letterSpacing: "-0.06px" }}
                >
                  {property.bedrooms}
                </span>
              </div>
            )}
            {property.bathrooms !== null && (
              <div className="flex items-center gap-1.5">
                <BathIcon className="w-3 h-3" style={{ color: "#6b7280" }} />
                <span
                  className="text-sm font-normal text-[#6b7280]"
                  style={{ letterSpacing: "-0.06px" }}
                >
                  {property.bathrooms}
                </span>
              </div>
            )}
            {property.square_footage !== null && (
              <div className="flex items-center gap-1.5">
                <SqmIcon className="w-3 h-3" style={{ color: "#6b7280" }} />
                <span
                  className="text-sm font-normal text-[#6b7280]"
                  style={{ letterSpacing: "-0.06px" }}
                >
                  {Number(property.square_footage).toLocaleString()} sqm
                </span>
              </div>
            )}
          </div>
          <span
            className="text-sm font-medium text-[#6b7280] shrink-0"
            style={{ letterSpacing: "-0.12px" }}
          >
            {availableUnits > 0 ? `${availableUnits} Units` : "Sold Out"}
          </span>
        </div>
      </div>
    </Link>
  );
}
