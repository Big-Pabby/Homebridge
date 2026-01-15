"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import SearchIcon from "@/public/icons/search-icon.svg";
import FilterIcon from "@/public/icons/filter-icon.svg";
import ExportCSVIcon from "@/public/icons/export-csv-icon.svg";
import AddPropertyIcon from "@/public/icons/add-property-icon.svg";
import FullyInsuredBadge from "@/public/icons/fully-insured-badge.svg";
import VerifiedCheck from "@/public/icons/verified-check.svg";
import LocationPin from "@/public/icons/location-pin.svg";
import BedIcon from "@/public/icons/bed.svg";
import BathIcon from "@/public/icons/bath.svg";
import SqmIcon from "@/public/icons/sqm.svg";

type PropertyStatus = "Completed" | "In Progress" | "Sold Out";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqm: number;
  units: number;
  status: PropertyStatus;
  image: string;
  fullyInsured: boolean;
  verified: boolean;
}

const properties: Property[] = [
  {
    id: "1",
    title: "4-Bedroom Terrace Duplex",
    location: "193 Ligali Ayorinde, Eti-Osa, Lagos",
    price: "₦ 2,047,206.94",
    beds: 6,
    baths: 8,
    sqm: 2467,
    units: 1,
    status: "Completed",
    image: "/properties/property-1.jpg",
    fullyInsured: true,
    verified: true,
  },
  {
    id: "2",
    title: "4-Bedroom Terrace Duplex",
    location: "12 Akin Adesola, Apapa, Lagos",
    price: "₦ 3,311,813.12",
    beds: 6,
    baths: 8,
    sqm: 2467,
    units: 1,
    status: "Completed",
    image: "/properties/property-2.jpg",
    fullyInsured: true,
    verified: true,
  },
  {
    id: "3",
    title: "4-Bedroom Terrace Duplex",
    location: "91 Kofo Abayomi, Kosofe, Port Harcourt",
    price: "₦ 5,546,705.38",
    beds: 6,
    baths: 8,
    sqm: 2467,
    units: 1,
    status: "Completed",
    image: "/properties/property-3.jpg",
    fullyInsured: true,
    verified: true,
  },
  {
    id: "4",
    title: "4-Bedroom Terrace Duplex",
    location: "82 Ademola Adetokunbo, Surulere, Lagos",
    price: "₦ 1,489,042.15",
    beds: 6,
    baths: 8,
    sqm: 2467,
    units: 1,
    status: "Completed",
    image: "/properties/land.jpg",
    fullyInsured: true,
    verified: true,
  },
  {
    id: "5",
    title: "4-Bedroom Terrace Duplex",
    location: "102 Awolowo Road, Kosofe, Lagos",
    price: "₦ 3,433,601.40",
    beds: 6,
    baths: 8,
    sqm: 2467,
    units: 1,
    status: "Completed",
    image: "/properties/property-1.jpg",
    fullyInsured: true,
    verified: true,
  },
  {
    id: "6",
    title: "4-Bedroom Terrace Duplex",
    location: "133 Adeola Odeku, Ojodu, Jos",
    price: "₦ 9,095,173.81",
    beds: 6,
    baths: 8,
    sqm: 2467,
    units: 1,
    status: "Completed",
    image: "/properties/property-2.jpg",
    fullyInsured: true,
    verified: true,
  },
];

export default function PropertyPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "sold">("all");

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-[#0e0e0f]" style={{ letterSpacing: '-0.48px' }}>
              Properties
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-11 px-4 rounded-[48px] bg-white border border-[#e7e8ea] hover:bg-[#f5f5f5]"
              >
                <ExportCSVIcon className="w-3.5 h-4" style={{ color: '#36393f' }} />
                <span className="text-sm font-medium text-[#36393f]" style={{ letterSpacing: '-0.14px' }}>
                  Export CSV
                </span>
              </Button>
              <Button
                className="h-11 px-4 rounded-[48px] border-none text-white"
                style={{
                  background: 'linear-gradient(180deg, rgba(150,51,253,1) 0%, rgba(125,0,255,1) 100%)',
                  boxShadow: '0px 0px 0px 1px #7d00ff',
                }}
              >
                <AddPropertyIcon className="w-3 h-3" style={{ color: '#ffffff' }} />
                <span className="text-sm font-medium" style={{ letterSpacing: '-0.14px' }}>
                  Add Property
                </span>
              </Button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white border border-[#e7e8ea] rounded-lg px-4 py-2 w-full max-w-md">
                <SearchIcon className="w-4 h-4" style={{ color: '#6b7280' }} />
                <Input
                  placeholder="Search users..."
                  className="border-0 shadow-none h-auto p-0 text-sm font-medium text-[#6b7280] placeholder:text-[#6b7280] focus-visible:ring-0"
                  style={{ letterSpacing: '-0.14px' }}
                />
              </div>
              <Button
                variant="ghost"
                className="h-9 px-3 rounded-lg hover:bg-white gap-2"
              >
                <FilterIcon className="w-3 h-1.5" style={{ color: '#36393f' }} />
                <span className="text-sm font-normal text-[#36393f]" style={{ letterSpacing: '-0.06px' }}>
                  Filter
                </span>
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-[#e7e8ea] pb-6">
              <button
                onClick={() => setActiveTab("all")}
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  activeTab === "all"
                    ? "border-[#7d00ff] text-[#7d00ff]"
                    : "border-transparent text-[#36393f]"
                }`}
                style={{ letterSpacing: '-0.14px' }}
              >
                All Properties
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  activeTab === "active"
                    ? "border-[#7d00ff] text-[#7d00ff]"
                    : "border-transparent text-[#36393f]"
                }`}
                style={{ letterSpacing: '-0.14px' }}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab("sold")}
                className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                  activeTab === "sold"
                    ? "border-[#7d00ff] text-[#7d00ff]"
                    : "border-transparent text-[#36393f]"
                }`}
                style={{ letterSpacing: '-0.14px' }}
              >
                Sold Out
              </button>
            </div>

            {/* Property Grid */}
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                {properties.slice(0, 3).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-6">
                {properties.slice(3, 6).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden ">
      {/* Image with Badge */}
      <div className="relative h-[230px] w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
        {property.fullyInsured && (
          <div className="absolute top-4 right-4">
            <FullyInsuredBadge className="w-[100px] h-7" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-5">
        {/* Title and Status */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-[#0e0e0f]" style={{ letterSpacing: '-0.16px' }}>
                {property.title}
              </h3>
              {property.verified && (
                <VerifiedCheck className="w-[18px] h-[17px]" style={{ color: '#30b066' }} />
              )}
            </div>
            <Badge
              variant="outline"
              className="text-xs font-medium text-[#158348] bg-transparent border-0 px-0"
              style={{ letterSpacing: '-0.12px' }}
            >
              {property.status}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <LocationPin className="w-4 h-4" style={{ color: '#6b7280' }} />
            <span className="text-xs font-normal text-[#6b7280]" style={{ letterSpacing: '-0.12px' }}>
              {property.location}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-2xl font-medium text-[#0e0e0f]" style={{ letterSpacing: '-0.48px' }}>
          {property.price}
        </div>

        {/* Details and Units */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-1.5">
              <BedIcon className="w-3 h-3" style={{ color: '#6b7280' }} />
              <span className="text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                {property.beds}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <BathIcon className="w-3 h-3" style={{ color: '#6b7280' }} />
              <span className="text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                {property.baths}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <SqmIcon className="w-3 h-3" style={{ color: '#6b7280' }} />
              <span className="text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                {property.sqm.toLocaleString()} sqm
              </span>
            </div>
          </div>
          <span className="text-sm font-medium text-[#6b7280]" style={{ letterSpacing: '-0.12px' }}>
            {property.units} Unit
          </span>
        </div>
      </div>
    </div>
  );
}