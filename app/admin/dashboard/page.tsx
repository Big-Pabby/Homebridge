"use client";

import { ChevronDown, MoreVertical } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ActivityPurchaseIcon from "@/public/icons/activity-purchase.svg";
import ActivityReferralIcon from "@/public/icons/activity-referral.svg";
import ActivityUserIcon from "@/public/icons/activity-user.svg";
import { Icon } from "@iconify/react";
import Dashboard from "./components/RevenueChart";
import PropertyListingTable from "./components/PropertyListingTable";

const metricCards = [
  {
    title: "Total Transactions",
    value: "3045",
    change: "+12%",
    changeLabel: "From last month",
    icon: (
      <Icon
        icon="hugeicons:money-02"
        width="20"
        height="20"
        style={{ color: "#7D00FF" }}
      />
    ),
    iconBg: "#F5F5F5",
  },
  {
    title: "Total Properties",
    value: "167",
    change: "+12%",
    changeLabel: "From last month",
    icon: (
      <Icon
        icon="hugeicons:city-01"
        width="20"
        height="20"
        style={{ color: "#4767E7" }}
      />
    ),
    iconBg: "#F3F2FE",
  },
  {
    title: "Total Transactions",
    value: "₦200B",
    change: "+12%",
    changeLabel: "From last month",
    icon: (
      <Icon
        icon="hugeicons:money-02"
        width="20"
        height="20"
        style={{ color: "#30B066" }}
      />
    ),
    iconBg: "#EAF7ED",
  },
  {
    title: "Active Escrow",
    value: "₦892M",
    change: "+12%",
    changeLabel: "From last month",
    icon: (
      <Icon
        icon="hugeicons:security"
        width="20"
        height="20"
        style={{ color: "#DF1C41" }}
      />
    ),
    iconBg: "#FFF0EF",
  },
];

const recentActivities = [
  {
    icon: ActivityPurchaseIcon,
    iconBg: "#d4f4e2",
    text: 'Chidinma Okonkwo purchased "4 Bedroom Duplex, Lekki Phase 1" for ₦28,500,000.',
    time: "2 min ago",
  },
  {
    icon: ActivityReferralIcon,
    iconBg: "#ffd9d9",
    text: "Referral commission ₦100,000 paid to Sarah Williams.",
    time: "2 min ago",
  },
  {
    icon: ActivityUserIcon,
    iconBg: "#dce5ff",
    text: 'Chidinma Okonkwo purchased "4 Bedroom Duplex, Lekki Phase 1" for ₦28,500,000.',
    time: "2 min ago",
  },
];

const activeListings = [
  {
    property: "Orchid Villa",
    location: "Lekki, Lagos",
    type: "Land",
    price: "₦85M",
    paymentType: "Full Payment",
    views: "123",
    date: "20 Nov, 2025",
    status: "Active",
  },
  {
    property: "Orchid Villa",
    location: "Lekki, Lagos",
    type: "House",
    price: "₦85M",
    paymentType: "Instalment",
    views: "123",
    date: "20 Nov, 2025",
    status: "Active",
  },
  {
    property: "Orchid Villa",
    location: "Lekki, Lagos",
    type: "House",
    price: "₦85M",
    paymentType: "Instalment",
    views: "123",
    date: "20 Nov, 2025",
    status: "Active",
  },
  {
    property: "Orchid Villa",
    location: "Lekki, Lagos",
    type: "House",
    price: "₦85M",
    paymentType: "Full Payment",
    views: "123",
    date: "20 Nov, 2025",
    status: "Sold out",
  },
];

const revenueBreakdown = [
  { label: "Property Sales", percentage: "60%", color: "#7d00ff" },
  { label: "Premium Subscription", percentage: "20%", color: "#ffc551" },
  { label: "Transaction Fees", percentage: "15%", color: "#fe6f41" },
  { label: "Resale Commission", percentage: "5%", color: "#dccdff" },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-4 gap-6">
              {metricCards.map((card, index) => (
                <Card
                  key={index}
                  className="p-4 bg-white border-none rounded-2xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-normal text-[#6B7280]" style={{ letterSpacing: '-0.06px' }}>
                      {card.title}
                    </span>
                    <div
                      className={`h-9 w-9 rounded-[8px] flex items-center justify-center`}
                      style={{ backgroundColor: card.iconBg }}
                    >
                      {card.icon}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="text-xl font-semibold text-[#0e0e0f]"
                      style={{ letterSpacing: "-0.20px" }}
                    >
                      {card.value}
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="text-sm font-normal py-0.5 px-2 rounded-full bg-[#EAF7ED] flex items-center justify-center text-[#30b066]"
                        style={{ letterSpacing: "-0.12px" }}
                      >
                        {card.change}
                      </div>
                      <div
                        className="text-base font-normal text-[#6b7280]"
                        style={{ letterSpacing: "-0.06px" }}
                      >
                        {card.changeLabel}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-[1fr_auto] gap-6">
              {/* Revenue Performance */}
             <Dashboard />
              {/* Revenue Breakdown */}
              <Card className="p-6 bg-white border-none rounded-3xl shadow-md w-[402px]">
                <div className="flex items-center justify-between mb-5">
                  <h2
                    className="text-lg font-semibold text-gray-800"
                    style={{ letterSpacing: "-0.18px" }}
                  >
                    Revenue Breakdown
                  </h2>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50  border border-[#E7E8EA]">
                    <MoreVertical className="w-4 text-[#141B34]" />
                  </button>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div
                      className="text-sm font-normal text-[#6b7280]"
                      style={{ letterSpacing: "-0.06px" }}
                    >
                      Total Revenue
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-lg font-semibold text-[#0e0e0f]"
                        style={{ letterSpacing: "-0.36px" }}
                      >
                        ₦900,467M
                      </span>
                      <span
                        className="text-xs font-normal py-0.5 px-2 rounded-full bg-[#EAF7ED] flex items-center justify-center text-[#30b066]"
                        style={{ letterSpacing: "-0.12px" }}
                      >
                        +12%
                      </span>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="flex gap-[2px] h-[46px]">
                    {/* Purple bars */}
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div
                        key={`purple-${i}`}
                        className="flex-1 bg-[#7d00ff] rounded-sm"
                      />
                    ))}
                    {/* Yellow bars */}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={`yellow-${i}`}
                        className="flex-1 bg-[#ffc551] rounded-sm"
                      />
                    ))}
                    {/* Orange bars */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={`orange-${i}`}
                        className="flex-1 bg-[#fe6f41] rounded-sm"
                      />
                    ))}
                    {/* Light purple bars */}
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={`light-${i}`}
                        className="flex-1 bg-[#dccdff] rounded-sm"
                      />
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="space-y-6">
                    {revenueBreakdown.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-[3px] h-5 rounded"
                            style={{ backgroundColor: item.color }}
                          />
                          <span
                            className="text-sm font-normal text-[#6b7280]"
                            style={{ letterSpacing: "-0.06px" }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span
                          className="text-sm font-normal text-[#6b7280]"
                          style={{ letterSpacing: "-0.06px" }}
                        >
                          {item.percentage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Bottom Row */}
            <div className="flex gap-6">
              {/* Recent Activity */}
              <Card className="p-6 max-w-[400px] w-full bg-white border-none rounded-2xl shadow-none">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-lg font-semibold text-gray-800"
                    style={{ letterSpacing: "-0.18px" }}
                  >
                    Recent Activity
                  </h2>
                  <button
                    className="text-sm font-normal text-[#36393f]"
                    style={{ letterSpacing: "-0.06px" }}
                  >
                    See all
                  </button>
                </div>

                <div className="space-y-6">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className="w-9 h-9 mt-1 flex items-center justify-center rounded-full"
                          style={{ backgroundColor: activity.iconBg }}
                        >
                          <Icon className="w-4" />
                        </div>
                        <div className="flex-1">
                          <p
                            className="text-sm font-normal text-[#36393F] leading-5"
                            style={{ letterSpacing: "-0.06px" }}
                          >
                            {activity.text}
                          </p>
                          <p
                            className="text-xs font-normal text-[#969ba6] mt-1"
                            style={{ letterSpacing: "-0.12px" }}
                          >
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Active Listing */}
             <PropertyListingTable/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
