"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import BreadcrumbChevron from "@/public/icons/breadcrumb-chevron.svg";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateProperty } from "../hooks";
import { toast } from "@/lib/utils/toast";
import { Property } from "../types";
import { NIGERIAN_STATES, getCitiesByState } from "@/lib/constants/nigeria";
import { MapComponent } from "@/components/MapComponent";

type Step = {
  id: string;
  label: string;
  icon: any;
};

const steps: Step[] = [
  {
    id: "basic-info",
    label: "Basic Info",
    icon: <Icon icon="mingcute:location-line" width="20" height="20" />,
  },
  {
    id: "location",
    label: "Location & Details",
    icon: <Icon icon="mingcute:location-line" width="20" height="20" />,
  },
  {
    id: "pricing",
    label: "Pricing & Timeline",
    icon: <Icon icon="mynaui:users-group" width="20" height="20" />,
  },
  {
    id: "property-details",
    label: "Property Details",
    icon: <Icon icon="hugeicons:house-03" width="20" height="20" />,
  },
  {
    id: "documents",
    label: "Documents",
    icon: <Icon icon="basil:document-outline" width="20" height="20" />,
  },
];

type PaymentPlan = {
  id: string;
  name: string;
  duration: string;
  totalPrice: string;
  initialDeposit: string;
  installmentAmount: string;
};

export default function AddPropertyPage() {
  const router = useRouter();
  const createPropertyMutation = useCreateProperty();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "",
    developer: "",
    description: "",
    state: "",
    city: "",
    fullAddress: "",
    latitude: null as number | null,
    longitude: null as number | null,
    totalUnit: "",
    paymentPlans: [] as PaymentPlan[],
    isVerified: "",
    isInsured: "",
    isInstallmentAvailable: "no",
    bedroom: "",
    bathroom: "",
    squareFootage: "",
    amenities: [] as string[],
    coverImage: null as File | null,
    galleryImages: [] as File[],
    documents: [] as File[],
  });
  const [newPaymentPlan, setNewPaymentPlan] = useState({
    planType: "one-time", // one-time, six-months, twelve-months, custom
    totalPrice: "",
    initialDeposit: "",
    customDuration: "", // For custom plans
    installmentAmount: "",
  });

  // Helper function to check if property type requires residential details
  const isResidentialProperty = () => {
    const residentialTypes = [
      "APARTMENT",
      "FLAT",
      "DUPLEX",
      "VILLA",
      "PENTHOUSE",
      "BUNGALOW",
      "TOWNHOUSE",
      "TERRACE",
      "STUDIO",
      "DETACHED_HOUSE",
      "SEMI_DETACHED",
      "CONDOMINIUM",
    ];
    return residentialTypes.includes(formData.propertyType);
  };

  const isLandProperty = () => {
    return formData.propertyType === "LAND" || formData.propertyType === "PLOT";
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Basic Info
        if (!formData.propertyName.trim()) {
          toast.error("Property name is required");
          return false;
        }
        if (!formData.propertyType) {
          toast.error("Please select a property type");
          return false;
        }
        if (!formData.developer) {
          toast.error("Please select a developer");
          return false;
        }
        if (!formData.description.trim()) {
          toast.error("Description is required");
          return false;
        }
        return true;
      case 1: // Location
        if (!formData.state) {
          toast.error("Please select a state");
          return false;
        }
        if (!formData.city) {
          toast.error("Please select a city");
          return false;
        }
        if (!formData.fullAddress.trim()) {
          toast.error("Full address is required");
          return false;
        }
        return true;
      case 2: // Pricing
        if (!formData.totalUnit) {
          toast.error("Please select total units");
          return false;
        }
        // Check for at least one one-time payment plan
        const hasOneTimePlan = formData.paymentPlans.some(
          (plan) => plan.duration === "0",
        );
        if (!hasOneTimePlan) {
          toast.error("One Time Payment plan is required");
          return false;
        }
        return true;
      case 3: // Property Details
        if (!formData.isVerified) {
          toast.error("Please specify if property is verified");
          return false;
        }
        if (!formData.isInsured) {
          toast.error("Please specify if property is insured");
          return false;
        }
        // Only require bed/bath/sqm for residential properties
        if (isResidentialProperty()) {
          if (!formData.bedroom.trim()) {
            toast.error("Number of bedrooms is required");
            return false;
          }
          if (!formData.bathroom.trim()) {
            toast.error("Number of bathrooms is required");
            return false;
          }
          if (!formData.squareFootage.trim()) {
            toast.error("Square footage is required");
            return false;
          }
        }
        if (!formData.coverImage) {
          toast.error("Cover image is required");
          return false;
        }
        return true;
      case 4: // Documents
        // Documents are optional, but we can validate if needed
        return true;
      default:
        return true;
    }
  };

  const handleContinue = async () => {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - submit the form
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      // Basic Info
      formDataToSend.append("title", formData.propertyName);
      formDataToSend.append("type", formData.propertyType);
      //   formDataToSend.append("developer", formData.developer);
      formDataToSend.append("description", formData.description);

      // Location
      formDataToSend.append("state", formData.state);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("location", formData.fullAddress);
      if (formData.latitude !== null) {
        formDataToSend.append("latitude", formData.latitude.toString());
      }
      if (formData.longitude !== null) {
        formDataToSend.append("longitude", formData.longitude.toString());
      }

      // Pricing
      // Convert total_units to number - handle ranges by taking the first number
      const totalUnitsValue = formData.totalUnit.includes("-")
        ? formData.totalUnit.split("-")[0] // For "2-5", take "2"
        : formData.totalUnit.includes("+")
          ? formData.totalUnit.replace("+", "") // For "10+", take "10"
          : formData.totalUnit; // For "1", keep as is
      formDataToSend.append("total_units", totalUnitsValue);
      // Convert payment plans to JSON array
      const paymentPlansData = formData.paymentPlans.map((plan) => ({
        plan_name: plan.name,
        duration_months: Number(plan.duration) ,
        price: getNumericValue(plan.totalPrice),
        // initial_deposit: getNumericValue(plan.initialDeposit),
        installment_amount: getNumericValue(plan.installmentAmount),
      }));
      formDataToSend.append("payment_plans", JSON.stringify(paymentPlansData));

      // Property Details
      formDataToSend.append(
        "is_provider_verified",
        formData.isVerified === "yes" ? "true" : "false",
      );
      formDataToSend.append(
        "is_insured",
        formData.isInsured === "yes" ? "true" : "false",
      );

      // Only send residential-specific fields for non-LAND properties
      if (isResidentialProperty()) {
        formDataToSend.append("bedrooms", getNumericValue(formData.bedroom));
        formDataToSend.append("bathrooms", getNumericValue(formData.bathroom));
        formDataToSend.append(
          "square_footage",
          getNumericValue(formData.squareFootage),
        );
        // Amenities - append each one individually
        formData.amenities.forEach((amenity) => {
          formDataToSend.append("amenities[]", amenity);
        });
      }

      // Add LAND-specific field
      if (isLandProperty()) {
        formDataToSend.append(
          "is_installment_available",
          formData.isInstallmentAvailable === "yes" ? "true" : "false",
        );
      }

      // Cover Image
      if (formData.coverImage) {
        formDataToSend.append("featured_image", formData.coverImage);
      }

      // Gallery Images
      formData.galleryImages.forEach((image, index) => {
        formDataToSend.append(`files`, image);
      });

      // Documents
      formData.documents.forEach((doc, index) => {
        if (doc) {
          formDataToSend.append(`documents`, doc);
        }
      });

      await createPropertyMutation.mutateAsync(formDataToSend);

      // Success toast is handled in the mutation hook
      // Navigate to properties list on success
      router.push("/admin/property");
    } catch (error) {
      console.error("Error creating property:", error);
      // Error toast is handled in the mutation hook
    }
  };

  const handleCancel = () => {
    // Navigate back or reset form
    window.history.back();
  };

  // Format number with thousand separators
  const formatNumber = (value: string): string => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    // Add thousand separators
    return Number(numericValue).toLocaleString("en-US");
  };

  // Format currency (Nigerian Naira)
  const formatCurrency = (value: string): string => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    // Add thousand separators
    return Number(numericValue).toLocaleString("en-US");
  };

  // Get numeric value from formatted string
  const getNumericValue = (value: string): string => {
    return value.replace(/\D/g, "");
  };

  // Handle number input change
  const handleNumberChange = (
    field: "bedroom" | "bathroom" | "squareFootage",
    value: string,
  ) => {
    const numericValue = getNumericValue(value);
    setFormData({ ...formData, [field]: numericValue });
  };

  // Handle currency input change
  const handleCurrencyChange = (
    field: "totalPrice" | "initialDeposit",
    value: string,
  ) => {
    const numericValue = getNumericValue(value);
    setFormData({ ...formData, [field]: numericValue });
  };

  // Calculate installment amount based on base price, deposit, and duration
  const calculateInstallmentAmount = (
    basePrice: string,
    deposit: string,
    months: number,
  ): string => {
    const base = parseInt(getNumericValue(basePrice)) || 0;
    const dep = parseInt(getNumericValue(deposit)) || 0;

    if (base <= 0 || months <= 0) return "";

    const amount = (base - dep) / months;
    return Math.round(amount).toString();
  };

  // Get plan name and duration based on type
  const getPlanNameAndDuration = (
    planType: string,
  ): { name: string; duration: string } => {
    switch (planType) {
      case "one-time":
        return { name: "One-Time Payment", duration: "0" };
      case "six-months":
        return { name: "6 Months Plan", duration: "6" };
      case "twelve-months":
        return { name: "12 Months Plan", duration: "12" };
      case "custom":
        return {
          name: `${newPaymentPlan.customDuration} Months Plan`,
          duration: newPaymentPlan.customDuration,
        };
      default:
        return { name: "", duration: "" };
    }
  };

  // Add new payment plan
  const handleAddPaymentPlan = () => {
    const { name, duration } = getPlanNameAndDuration(newPaymentPlan.planType);

    if (!newPaymentPlan.totalPrice.trim()) {
      toast.error("Please enter total price for this plan");
      return;
    }
    if (!newPaymentPlan.initialDeposit.trim()) {
      toast.error("Please enter initial deposit for this plan");
      return;
    }
    if (
      newPaymentPlan.planType === "custom" &&
      !newPaymentPlan.customDuration.trim()
    ) {
      toast.error("Please enter duration in months for custom plan");
      return;
    }

    const plan: PaymentPlan = {
      id: Date.now().toString(),
      name,
      duration,
      totalPrice: newPaymentPlan.totalPrice,
      initialDeposit: newPaymentPlan.initialDeposit,
      installmentAmount: newPaymentPlan.installmentAmount,
    };

    setFormData({
      ...formData,
      paymentPlans: [...formData.paymentPlans, plan],
    });

    setNewPaymentPlan({
      planType: "one-time",
      totalPrice: "",
      initialDeposit: "",
      customDuration: "",
      installmentAmount: "",
    });

    toast.success("Payment plan added successfully");
  };

  // Remove payment plan
  const handleRemovePaymentPlan = (id: string) => {
    setFormData({
      ...formData,
      paymentPlans: formData.paymentPlans.filter((plan) => plan.id !== id),
    });
    toast.success("Payment plan removed");
  };

  // Auto-calculate installment amount
  const handlePlanDetailsChange = () => {
    let months = 0;

    if (newPaymentPlan.planType === "custom") {
      months = parseInt(newPaymentPlan.customDuration) || 0;
    } else {
      const { duration } = getPlanNameAndDuration(newPaymentPlan.planType);
      months = parseInt(duration) || 0;
    }

    if (months > 0) {
      const calculated = calculateInstallmentAmount(
        newPaymentPlan.totalPrice,
        newPaymentPlan.initialDeposit,
        months,
      );
      if (calculated) {
        setNewPaymentPlan((prev) => ({
          ...prev,
          installmentAmount: calculated,
        }));
      }
    } else {
      // For one-time payment, installment = total price - deposit
      const base = parseInt(getNumericValue(newPaymentPlan.totalPrice)) || 0;
      const dep = parseInt(getNumericValue(newPaymentPlan.initialDeposit)) || 0;
      setNewPaymentPlan((prev) => ({
        ...prev,
        installmentAmount: Math.max(0, base - dep).toString(),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-8 pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 pt-4 pb-10">
        <Link href="/admin/property" className="label-sm text-[#969ba6]">
          Properties
        </Link>
        <BreadcrumbChevron
          className="w-[5px] h-[9px]"
          style={{ color: "#6b7280" }}
        />
        <span className="label-sm text-[#0e0e0f]">Add Property</span>
      </div>
      <div className="max-w-[650px] w-full mx-auto">
        {/* Page Header */}
        <div className="flex w-full flex-col items-center gap-1 mb-10">
          <h1 className="heading-sm font-semibold text-[#0e0e0f]">
            Add New Property
          </h1>
          <p className="body-sm text-[#6b7280]">
            Fill in the details to list a new property on HomeBridge
          </p>
        </div>

        {/* Step Indicator */}
        <div className="relative mb-6 w-full">
          {/* Progress Bar Background */}
          <div className="absolute top-[13px] left-4 right-4 h-1.5 bg-[#e7e8ea] rounded-full">
            {/* Active Progress Bar */}
            <div
              className="h-full bg-[#7d00ff] rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="flex items-start justify-between w-full px-4">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={step.id}
                  className={`${
                    index === 0
                      ? "-ml-6"
                      : index === steps.length - 1
                        ? "-mr-6"
                        : ""
                  } flex flex-col items-center  gap-2.5 relative`}
                >
                  {/* Step Circle */}
                  <div
                    className={`w-[32px] h-[32px] flex items-center justify-center rounded-full z-10 transition-colors duration-200 ${
                      isActive || isCompleted
                        ? "bg-[#7d00ff] text-white"
                        : "bg-white text-[#6b7280] border-2 border-[#e7e8ea]"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Label */}
                  <span
                    className={`label-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-[#7d00ff]"
                        : isCompleted
                          ? "text-[#6b7280]"
                          : "text-[#9ca3af]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 w-full">
          <h2
            className="text-lg font-semibold text-[#0d0d12] mb-6"
            style={{ letterSpacing: "-0.36px" }}
          >
            {currentStep === 0
              ? "Basic Information"
              : currentStep === 1
                ? "Location"
                : currentStep === 2
                  ? "Pricing"
                  : "Property Details"}
          </h2>

          {/* Step 1: Basic Information */}
          {currentStep === 0 && (
            <div className="flex flex-col gap-4">
              {/* Property Name */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="propertyName"
                  className="label-sm font-semibold text-[#36393f]"
                >
                  Property Name
                </Label>
                <Input
                  id="propertyName"
                  type="text"
                  placeholder="e.g Lekki Villa, Ashluxe duplex"
                  value={formData.propertyName}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyName: e.target.value })
                  }
                  className="h-10 rounded-lg px-4 py-2.5 border-none bg-[#f5f5f5] text-[#0e0e0f] placeholder:text-[#6B7280] body-sm"
                />
              </div>

              {/* Property Type */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="propertyType"
                  className="label-sm font-semibold text-[#36393f]"
                >
                  Property Type
                </Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, propertyType: value })
                  }
                >
                  <SelectTrigger
                    id="propertyType"
                    className="h-10! rounded-lg px-4! py-2.5! border-none bg-[#f5f5f5] text-[#0e0e0f] placeholder:text-[#6B7280] body-sm w-full"
                  >
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APARTMENT">Apartment</SelectItem>
                    <SelectItem value="FLAT">Flat</SelectItem>
                    <SelectItem value="DUPLEX">Duplex</SelectItem>
                    <SelectItem value="LAND">Land</SelectItem>
                    <SelectItem value="VILLA">Villa</SelectItem>
                    <SelectItem value="PENTHOUSE">Penthouse</SelectItem>

                    <SelectItem value="BUNGALOW">Bungalow</SelectItem>
                    <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
                    <SelectItem value="TERRACE">Terrace</SelectItem>
                    <SelectItem value="STUDIO">Studio</SelectItem>
                    <SelectItem value="DETACHED_HOUSE">
                      Detached House
                    </SelectItem>
                    <SelectItem value="SEMI_DETACHED">Semi-Detached</SelectItem>
                    <SelectItem value="CONDOMINIUM">Condominium</SelectItem>
                    <SelectItem value="PLOT">Plot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Developer */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="developer"
                  className="label-sm font-semibold text-[#36393f]"
                >
                  Developer
                </Label>
                <Select
                  value={formData.developer}
                  onValueChange={(value) =>
                    setFormData({ ...formData, developer: value })
                  }
                >
                  <SelectTrigger
                    id="developer"
                    className="h-10! rounded-lg px-4! py-2.5! border-none bg-[#f5f5f5] text-[#a3a3d4] placeholder:text-[#6B7280] body-sm w-full"
                  >
                    <SelectValue placeholder="Select Developer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev1">ABC Developers</SelectItem>
                    <SelectItem value="dev2">XYZ Properties</SelectItem>
                    <SelectItem value="dev3">Prime Estate</SelectItem>
                    <SelectItem value="dev4">Urban Living</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2.5">
                <Label
                  htmlFor="description"
                  className="label-sm font-semibold text-[#36393f]"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Novarick Home"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-[120px] rounded-lg border-none bg-[#f5f5f5] text-[#0e0e0f] placeholder:text-[#cfd2d6] body-sm resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: Property Details */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-4">
              {/* Is Property Verified and Is Property Insured */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="isVerified"
                    className="label-sm font-semibold text-[#36393f]"
                  >
                    Is Property Verified?
                  </Label>
                  <Select
                    value={formData.isVerified}
                    onValueChange={(value) =>
                      setFormData({ ...formData, isVerified: value })
                    }
                  >
                    <SelectTrigger
                      id="isVerified"
                      className="h-10! rounded-lg px-4! py-2.5! border-none bg-[#f5f5f5] text-[#6B7280] placeholder:text-[#6B7280] body-sm w-full"
                    >
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="isInsured"
                    className="label-sm font-semibold text-[#36393f]"
                  >
                    Is Property Insured?
                  </Label>
                  <Select
                    value={formData.isInsured}
                    onValueChange={(value) =>
                      setFormData({ ...formData, isInsured: value })
                    }
                  >
                    <SelectTrigger
                      id="isInsured"
                      className="h-10! rounded-lg px-4! py-2.5! border-none bg-[#f5f5f5] text-[#6B7280] placeholder:text-[#6B7280] body-sm w-full"
                    >
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Bedroom and Bathroom - Only for residential properties */}
              {isResidentialProperty() && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="bedroom"
                      className="label-sm font-semibold text-[#36393f]"
                    >
                      Bedroom
                    </Label>
                    <Input
                      id="bedroom"
                      type="text"
                      inputMode="numeric"
                      placeholder="Input number"
                      value={
                        formData.bedroom ? formatNumber(formData.bedroom) : ""
                      }
                      onChange={(e) =>
                        handleNumberChange("bedroom", e.target.value)
                      }
                      className="h-10 rounded-lg px-4 py-2.5 border-none bg-[#f5f5f5] text-[#0e0e0f] placeholder:text-[#6B7280] body-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="bathroom"
                      className="label-sm font-semibold text-[#36393f]"
                    >
                      Bathroom
                    </Label>
                    <Input
                      id="bathroom"
                      type="text"
                      inputMode="numeric"
                      placeholder="Input number"
                      value={
                        formData.bathroom ? formatNumber(formData.bathroom) : ""
                      }
                      onChange={(e) =>
                        handleNumberChange("bathroom", e.target.value)
                      }
                      className="h-10 rounded-lg px-4 py-2.5 border-none bg-[#f5f5f5] text-[#0e0e0f] placeholder:text-[#6B7280] body-sm"
                    />
                  </div>
                </div>
              )}

              {/* Square Footage - Only for residential properties */}
              {isResidentialProperty() && (
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="squareFootage"
                    className="label-sm font-semibold text-[#36393f]"
                  >
                    Square footage
                  </Label>
                  <Input
                    id="squareFootage"
                    type="text"
                    inputMode="numeric"
                    placeholder="Input number (e.g., 1,500)"
                    value={
                      formData.squareFootage
                        ? formatNumber(formData.squareFootage)
                        : ""
                    }
                    onChange={(e) =>
                      handleNumberChange("squareFootage", e.target.value)
                    }
                    className="h-10 rounded-lg px-4 py-2.5 border-none bg-[#f5f5f5] text-[#0e0e0f] placeholder:text-[#6B7280] body-sm"
                  />
                </div>
              )}

              {/* Features and Amenities - Only for residential properties */}
              {isResidentialProperty() && (
                <div className="flex flex-col gap-6">
                  <Label className="label-sm font-semibold text-[#36393f]">
                    Features and Amenities
                  </Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Swimming Pool", value: "swimming-pool" },
                      { label: "Gym", value: "gym" },
                      { label: "24/7 Security", value: "security" },
                      { label: "Generator", value: "generator" },
                      { label: "Parking Space", value: "parking" },
                      { label: "Playground", value: "playground" },
                      { label: "Solar Panels", value: "solar" },
                      { label: "CCTV", value: "cctv" },
                    ].map((amenity) => (
                      <label
                        key={amenity.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={formData.amenities.includes(amenity.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                amenities: [
                                  ...formData.amenities,
                                  amenity.value,
                                ],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                amenities: formData.amenities.filter(
                                  (a) => a !== amenity.value,
                                ),
                              });
                            }
                          }}
                          className="w-4 h-4 rounded border-[#d1d5db] text-[#7d00ff] focus:ring-[#7d00ff]"
                        />

                        <span className="body-sm text-[#36393f]">
                          {amenity.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Installment Available - Only for LAND properties */}
              {isLandProperty() && (
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="isInstallmentAvailable"
                    className="label-sm font-semibold text-[#36393f]"
                  >
                    Is Installment Available?
                  </Label>
                  <Select
                    value={formData.isInstallmentAvailable}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        isInstallmentAvailable: value,
                      })
                    }
                  >
                    <SelectTrigger
                      id="isInstallmentAvailable"
                      className="h-10! rounded-lg px-4! py-2.5! border-none bg-[#f5f5f5] text-[#6B7280] placeholder:text-[#6B7280] body-sm w-full"
                    >
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Media Upload */}
              <div className="flex flex-col gap-4">
                <Label className="label-sm font-semibold text-[#36393f]">
                  Media Upload
                </Label>

                {/* Cover Image */}
                <div className="flex flex-col gap-2">
                  <span className="body-sm text-[#6B7280]">Cover Image</span>
                  <div className="relative w-[180px] h-[95px] rounded-lg bg-[#f5f5f5] overflow-hidden">
                    {formData.coverImage ? (
                      <img
                        src={URL.createObjectURL(formData.coverImage)}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <label className="flex items-center justify-center w-full h-full cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFormData({ ...formData, coverImage: file });
                            }
                          }}
                        />
                        <Icon
                          icon="ic:baseline-plus"
                          width="24"
                          height="24"
                          className="text-[#6B7280]"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Gallery Upload */}
                <div className="flex flex-col gap-2">
                  <span className="body-sm text-[#6B7280]">Gallery Upload</span>
                  <div className="grid grid-cols-5 gap-3">
                    {formData.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-full h-[90px] rounded-lg overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {formData.galleryImages.length < 5 && (
                      <label className="flex items-center justify-center w-full h-[90px] rounded-lg bg-[#f5f5f5] cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && formData.galleryImages.length < 5) {
                              setFormData({
                                ...formData,
                                galleryImages: [
                                  ...formData.galleryImages,
                                  file,
                                ],
                              });
                            }
                          }}
                        />
                        <Icon
                          icon="ic:baseline-plus"
                          width="20"
                          height="20"
                          className="text-[#6B7280]"
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Details */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-4">
              {/* State and City */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="state"
                    className="label-sm font-semibold text-[#36393f]"
                  >
                    State
                  </Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) => {
                      setFormData({ ...formData, state: value, city: "" });
                    }}
                  >
                    <SelectTrigger
                      id="state"
                      className="h-10! rounded-lg px-4! py-2.5! border-none bg-[#f5f5f5] text-[#6B7280] placeholder:text-[#6B7280] body-sm w-full"
                    >
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {NIGERIAN_STATES.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="city"
                    className="label-sm font-semibold text-[#36393f]"
                  >
                    City
                  </Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) =>
                      setFormData({ ...formData, city: value })
                    }
                    disabled={!formData.state}
                  >
                    <SelectTrigger
                      id="city"
                      className="h-10! rounded-lg px-4! py-2.5! border-none bg-[#f5f5f5] text-[#6B7280] placeholder:text-[#6B7280] body-sm w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.state &&
                        getCitiesByState(formData.state).map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Full Address */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="fullAddress"
                  className="label-sm font-semibold text-[#36393f]"
                >
                  Full Address
                </Label>
                <Input
                  id="fullAddress"
                  type="text"
                  placeholder="Enter full address"
                  value={formData.fullAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, fullAddress: e.target.value })
                  }
                  className="h-10 rounded-lg px-4 py-2.5 border-none bg-[#f5f5f5] text-[#0e0e0f] placeholder:text-[#6B7280] body-sm"
                />
              </div>

              {/* Map Component */}
              {typeof window !== "undefined" &&
              document.querySelector('script[src*="maps.googleapis.com"]') ? (
                <MapComponent
                  address={formData.fullAddress}
                  onLocationChange={(coords) => {
                    setFormData({
                      ...formData,
                      latitude: coords.latitude,
                      longitude: coords.longitude,
                      fullAddress: coords.address,
                    });
                  }}
                />
              ) : (
                <div className="flex flex-col gap-2">
                  <Label className="label-sm font-semibold text-[#36393f]">
                    Map Pin
                  </Label>
                  <div className="w-full h-[300px] rounded-lg bg-[#f5f5f5] flex items-center justify-center border border-[#e7e8ea]">
                    <div className="text-center flex flex-col gap-2 items-center">
                      <Icon
                        icon="mdi:map-marker"
                        width="40"
                        height="40"
                        className="text-[#6B7280]"
                      />
                      <span className="text-[#6B7280] body-sm">
                        Loading map...
                      </span>
                      <p className="text-xs text-[#9ca3af]">
                        Make sure Google Maps API is configured
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Pricing & Timeline */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-4">
              {/* Total Unit */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="totalUnit"
                  className="label-sm font-semibold text-[#36393f]"
                >
                  Total Unit
                </Label>
                <Select
                  value={formData.totalUnit}
                  onValueChange={(value) =>
                    setFormData({ ...formData, totalUnit: value })
                  }
                >
                  <SelectTrigger
                    id="totalUnit"
                    className="h-10! rounded-lg px-4! py-2.5! border-none bg-[#f5f5f5] text-[#6B7280] placeholder:text-[#6B7280] body-sm w-full"
                  >
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Unit</SelectItem>
                    <SelectItem value="2-5">2-5 Units</SelectItem>
                    <SelectItem value="6-10">6-10 Units</SelectItem>
                    <SelectItem value="10+">10+ Units</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Plans Section */}
              <div className="flex flex-col gap-4">
                <Label className="label-sm font-semibold text-[#36393f]">
                  Payment Plans
                </Label>

                {/* Plan Type Selection */}
                <div className="flex flex-col gap-3 p-4 bg-[#f9f9fb] rounded-lg border border-[#e7e8ea]">
                  <h3 className="text-sm font-semibold text-[#0e0e0f]">
                    Select Payment Plan Type
                  </h3>

                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { value: "one-time", label: "One Time" },
                      { value: "six-months", label: "6 Months" },
                      { value: "twelve-months", label: "12 Months" },
                      { value: "custom", label: "Custom" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setNewPaymentPlan({
                            ...newPaymentPlan,
                            planType: option.value,
                          })
                        }
                        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          newPaymentPlan.planType === option.value
                            ? "bg-[#7d00ff] text-white"
                            : "bg-white text-[#6B7280] border border-[#e7e8ea] hover:bg-[#f5f5f5]"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {/* Hide form if one-time plan already exists and not editing one-time */}
                  {
                    <div className="grid grid-cols-2 gap-3">
                      {/* Total Price */}
                      <div className="flex flex-col gap-2">
                        <Label className="label-sm font-semibold text-[#36393f]">
                          Total Price (₦)
                        </Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] body-sm">
                            ₦
                          </span>
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="e.g 770,000,000"
                            value={
                              newPaymentPlan.totalPrice
                                ? formatCurrency(newPaymentPlan.totalPrice)
                                : ""
                            }
                            onChange={(e) => {
                              const value = getNumericValue(e.target.value);
                              setNewPaymentPlan({
                                ...newPaymentPlan,
                                totalPrice: value,
                              });
                              setTimeout(handlePlanDetailsChange, 0);
                            }}
                            className="h-10 rounded-lg pl-8 pr-4 py-2.5 border-none bg-white text-[#0e0e0f] placeholder:text-[#6B7280] body-sm"
                          />
                        </div>
                      </div>

                      {/* Initial Deposit */}
                      <div className="flex flex-col gap-2">
                        <Label className="label-sm font-semibold text-[#36393f]">
                          Initial Deposit (₦)
                        </Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] body-sm">
                            ₦
                          </span>
                          <Input
                            type="text"
                            inputMode="numeric"
                            placeholder="e.g 50,000,000"
                            value={
                              newPaymentPlan.initialDeposit
                                ? formatCurrency(newPaymentPlan.initialDeposit)
                                : ""
                            }
                            onChange={(e) => {
                              const value = getNumericValue(e.target.value);
                              setNewPaymentPlan({
                                ...newPaymentPlan,
                                initialDeposit: value,
                              });
                              setTimeout(handlePlanDetailsChange, 0);
                            }}
                            className="h-10 rounded-lg pl-8 pr-4 py-2.5 border-none bg-white text-[#0e0e0f] placeholder:text-[#6B7280] body-sm"
                          />
                        </div>
                      </div>
                    </div>
                  }

                  {/* Custom Duration - Only for custom plans */}
                  {newPaymentPlan.planType === "custom" && (
                    <div className="flex flex-col gap-2">
                      <Label className="label-sm font-semibold text-[#36393f]">
                        Duration (months)
                      </Label>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="e.g., 3, 9, 15"
                        value={newPaymentPlan.customDuration}
                        onChange={(e) => {
                          const value = getNumericValue(e.target.value);
                          setNewPaymentPlan({
                            ...newPaymentPlan,
                            customDuration: value,
                          });
                          setTimeout(handlePlanDetailsChange, 0);
                        }}
                        className="h-10 rounded-lg px-4 py-2.5 border-none bg-white text-[#0e0e0f] placeholder:text-[#6B7280] body-sm"
                      />
                    </div>
                  )}

                  {/* Installment Amount Display */}
                  {newPaymentPlan.installmentAmount && (
                    <div className="flex flex-col gap-2">
                      <Label className="label-sm font-semibold text-[#36393f]">
                        Amount per{" "}
                        {newPaymentPlan.planType === "one-time"
                          ? "Payment"
                          : "Month"}
                        (₦)
                      </Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] body-sm">
                          ₦
                        </span>
                        <Input
                          type="text"
                          disabled
                          value={formatCurrency(
                            newPaymentPlan.installmentAmount,
                          )}
                          className="h-10 rounded-lg pl-8 pr-4 py-2.5 border-none bg-[#f5f5f5] text-[#0e0e0f] body-sm"
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    type="button"
                    onClick={handleAddPaymentPlan}
                    disabled={
                      !newPaymentPlan.totalPrice ||
                      !newPaymentPlan.initialDeposit
                    }
                    className="bg-[#7d00ff] hover:bg-[#6b00d9] text-white label-sm rounded-lg font-medium px-4 py-2 h-10 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon
                      icon="ic:baseline-plus"
                      width="16"
                      height="16"
                      className="mr-2"
                    />
                    Add This Plan
                  </Button>
                </div>

                {/* Display Added Payment Plans */}
                {formData.paymentPlans.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <Label className="label-sm font-semibold text-[#36393f]">
                      Added Plans ({formData.paymentPlans.length})
                    </Label>
                    <div className="space-y-2">
                      {formData.paymentPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg border border-[#e7e8ea]"
                        >
                          <div className="flex-1">
                            <p className="body-sm font-semibold text-[#0e0e0f]">
                              {plan.name}
                            </p>
                            <div className="flex gap-4 mt-1">
                              <span className="text-xs text-[#6B7280]">
                                ₦{formatCurrency(plan.totalPrice)}
                              </span>
                              <span className="text-xs text-[#6B7280]">
                                Deposit: ₦{formatCurrency(plan.initialDeposit)}
                              </span>
                              {parseInt(plan.duration) > 0 && (
                                <span className="text-xs text-[#6B7280]">
                                  ₦{formatCurrency(plan.installmentAmount)}
                                  /month
                                </span>
                              )}
                            </div>
                          </div>
                          <Button
                            type="button"
                            onClick={() => handleRemovePaymentPlan(plan.id)}
                            variant="ghost"
                            size="sm"
                            className="text-[#dc2626] hover:text-[#b91c1c] hover:bg-[#fee2e2]"
                          >
                            <Icon
                              icon="ic:baseline-delete"
                              width="18"
                              height="18"
                            />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Step 5: Documents */}
          {currentStep === 4 && (
            <div className="flex flex-col gap-4">
              {/* Document Upload Fields */}
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex flex-col gap-2">
                  <Label className="text-sm font-semibold text-[#36393f]">
                    Certificate of Occupancy (C of O) *
                  </Label>
                  <div
                    className="relative w-full min-h-[80px] rounded-lg bg-[#f5f5f5] flex items-center justify-center cursor-pointer hover:bg-[#ebebeb] transition-colors"
                    onClick={() => {
                      const input = document.getElementById(
                        `doc-upload-${num}`,
                      );
                      input?.click();
                    }}
                  >
                    <input
                      id={`doc-upload-${num}`}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && file.size <= 5 * 1024 * 1024) {
                          const newDocs = [...formData.documents];
                          newDocs[num - 1] = file;
                          setFormData({ ...formData, documents: newDocs });
                        } else if (file) {
                          alert("File size must be less than 5MB");
                        }
                      }}
                    />
                    {formData.documents[num - 1] ? (
                      <div className="flex flex-col items-center gap-2 py-4">
                        <Icon
                          icon="ic:baseline-insert-drive-file"
                          width="32"
                          height="32"
                          className="text-[#7d00ff]"
                        />
                        <span className="text-sm text-[#36393f] font-medium">
                          {formData.documents[num - 1].name}
                        </span>
                        <span className="text-xs text-[#6B7280]">
                          {(formData.documents[num - 1].size / 1024).toFixed(1)}{" "}
                          KB
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-4">
                        <Icon
                          icon="ic:baseline-description"
                          width="32"
                          height="32"
                          className="text-[#6B7280]"
                        />
                        <div className="text-center">
                          <p className="text-sm text-[#36393f] font-medium">
                            Upload document here
                          </p>
                          <p className="text-xs text-[#6B7280] mt-1">
                            PDF, JPG, PNG (Max 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Footer Buttons */}
          <div className="flex items-center justify-between gap-3.5 mt-8">
            <div className="flex items-center gap-3.5">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={createPropertyMutation.isPending}
                  className="text-[#0e0e0f] bg-[#F5F5F5] hover:bg-[#e7e8ea] font-medium label-md rounded-full px-8 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ letterSpacing: "-0.64px" }}
                >
                  Back
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={handleCancel}
                disabled={createPropertyMutation.isPending}
                className="text-[#0e0e0f] bg-[#F5F5F5] hover:bg-transparent font-medium label-md rounded-full px-8 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ letterSpacing: "-0.64px" }}
              >
                Cancel
              </Button>
            </div>
            <Button
              onClick={handleContinue}
              disabled={createPropertyMutation.isPending}
              className="bg-[#7d00ff] hover:bg-[#6b00d9] text-white label-md rounded-full font-medium px-8 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ letterSpacing: "-0.16px" }}
            >
              {createPropertyMutation.isPending
                ? "Submitting..."
                : currentStep === steps.length - 1
                  ? "Submit"
                  : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
