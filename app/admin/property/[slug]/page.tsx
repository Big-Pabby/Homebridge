"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";
import { usePropertyDetails } from "../hooks";
import VerifiedCheck from "@/public/icons/verified-check.svg";

const PropertyDetailsPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const { data: response, isLoading, error } = usePropertyDetails(slug);

  const property = response;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-purple-600" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Failed to load property</p>
          <p className="text-gray-600 text-sm mt-2">
            {error?.message || "Property not found"}
          </p>
        </div>
      </div>
    );
  }

  const propertyImages =
    property.media && property.media.length > 0 ? property.media : [];

  const amenities = property.amenities;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + propertyImages.length) % propertyImages.length,
    );
  };

  const formatPrice = (price?: number | string) => {
    if (!price) return "0";
    const numPrice = typeof price === "string" ? parseInt(price) : price;
    return numPrice
      .toLocaleString("en-NG", { style: "currency", currency: "NGN" })
      .replace("₦", "₦");
  };

  // Extract one-time payment plan
  const oneTimePlan = property.payment_plans?.find(
    (plan) => plan.duration_months === 0,
  );

  // Format payment plans for display
  const paymentPlans = property.payment_plans || [];

  return (
    <div className="min-h-screen px-4">
      {/* Header Navigation */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>Property</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold">
              Property details
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold mb-8">Property Details</h1>

        <div className="flex items-start  gap-8">
          {/* Left Column - Property Info */}
          <div className="lg:w-4/12 bg-white rounded-lg p-4 space-y-6">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden h-[255px]">
              <img
                src={
                  property.featured_image ||
                  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
                }
                alt="Property"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-4 flex gap-2">
                {property.is_provider_verified && (
                  <div className="bg-white px-3 py-2 rounded-full text-sm font-medium flex items-center text-[#158348] gap-1">
                    <Icon
                      icon="material-symbols:verified-outline-rounded"
                      width="20"
                      height="20"
                    />
                    {property.status === "SOLD_OUT"
                      ? "SOLD OUT"
                      : "REDAN Verified"}
                  </div>
                )}

                {property.is_insured && (
                  <div className="bg-white px-3 py-2 rounded-full text-sm font-medium flex items-center text-[#D38C20] gap-1">
                    <Icon icon="line-md:security" width="20" height="20" />
                    Fully Insured
                  </div>
                )}
              </div>
            </div>

            {/* Property Title and Details */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold line-clamp-1">
                  {property.title}
                </h2>
                {property.is_provider_verified && (
                  <VerifiedCheck
                    className="w-[18px] h-[17px] shrink-0"
                    style={{ color: "#30b066" }}
                  />
                )}
              </div>

              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>

              <div className="text-sm text-gray-500 mb-6 line-clamp-1">
                Property ID: {property.id}
              </div>

              <div className="mb-6 bg-[#F5F5F5] p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">
                  Total Property Value
                </div>
                <div className="text-3xl font-bold">
                  {formatPrice(
                    oneTimePlan
                      ? typeof oneTimePlan.price === "string"
                        ? parseInt(oneTimePlan.price)
                        : oneTimePlan.price
                      : 0,
                  )}
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 pb-6 border-b">
                {property.bedrooms !== null && (
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                )}
                {property.bathrooms !== null && (
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                )}
                {property.square_footage && (
                  <div className="flex items-center gap-2">
                    <Maximize className="w-5 h-5" />
                    <span>{property.square_footage} sqm</span>
                  </div>
                )}
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="pt-6">
                  <h3 className="font-bold mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="w-4 h-4 bg-[#7D00FF] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </span>
                        <span className="text-sm capitalize text-[#6B7280] flex-1">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Plans */}
            

              {/* Property Documents */}
              <div className="mt-6 pt-6 border-t">
                <button className="flex w-full border border-[#E7E8EA] py-3 px-3.5 rounded-[8px] justify-center items-center gap-2 text-sm text-[#0E0E0F] font-medium">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="#7D00FF"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Property Documents
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Description, Gallery, Location */}
          <div className="flex-1 bg-white rounded-lg p-4 space-y-6">
            {/* Description */}
            <div className="">
              <h3 className="font-bold text-lg mb-4">Description</h3>
              <p
                className={`text-[#6B7280] leading-relaxed transition-all duration-300 ${
                  isDescriptionExpanded ? "" : "line-clamp-3"
                }`}
              >
                {property.description ||
                  "No description available for this property."}
              </p>
              {property.description && property.description.length > 200 && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-purple-600 text-sm font-semibold mt-3 hover:text-purple-700 transition-colors"
                >
                  {isDescriptionExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>
              
            {/* Gallery */}
            {propertyImages.length !==0 && (
              <div >
                <h3 className="font-bold text-lg mb-4">Gallery</h3>
                <div className="grid grid-cols-3 gap-4">
                  {propertyImages.slice(0, 4).map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <img
                        src={img.media_url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 2 && propertyImages.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            +{propertyImages.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

              {paymentPlans.length > 0 && (
                <div className="pt-6 border-t">
                  <h3 className="font-bold mb-4">Payment Plans</h3>
                  <div className="space-y-3 grid grid-cols-1 md:grid-cols-2  gap-4">
                    {paymentPlans.map((plan, index: number) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {plan.plan_name}
                            </h4>
                            { plan.duration_months !== 0 && (
                              <p className="text-xs text-gray-600 mt-1">
                                Duration: {plan.duration_months} months
                              </p>
                            )}
                          </div>
                          {plan.duration_months === 0 && (
                            <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
                              Recommended
                            </span>
                          )}
                        </div>

                        <div className="space-y-2 mt-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Total Price:</span>
                            <span className="font-semibold">
                              {formatPrice(plan.price)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">
                              Initial Deposit:
                            </span>
                            <span className="font-semibold">
                              {formatPrice(plan.installment_amount)}
                            </span>
                          </div>
                          {plan.duration_months !== 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-700">Per Month:</span>
                              <span className="font-semibold text-purple-600">
                                {formatPrice(plan.installment_amount)}
                              </span>
                            </div>
                          )}
                          {plan.duration_months === 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-700">Amount Due:</span>
                              <span className="font-semibold text-purple-600">
                                {formatPrice(plan.installment_amount)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Location */}
            <div >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Location</h3>
                <button className="text-purple-600 text-sm font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  View on map
                </button>
              </div>

              <div className="flex items-center text-sm gap-2 mb-4">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">{property.location}</span>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-gray-200 rounded-lg relative overflow-hidden">
                <img
                  src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/3.3792,6.4474,12,0/800x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                  alt="Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded shadow-lg text-sm font-medium">
                  {property.location.split(",")[0] || "Location"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
