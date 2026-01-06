"use client"

import { Bell, Calendar, ChevronDown, MoreVertical, Search } from "lucide-react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/admin/Sidebar"
import ActivityPurchaseIcon from "@/public/icons/activity-purchase.svg"
import ActivityReferralIcon from "@/public/icons/activity-referral.svg"
import ActivityUserIcon from "@/public/icons/activity-user.svg"

const metricCards = [
  {
    title: "Total Transactions",
    value: "3045",
    change: "+12%",
    changeLabel: "From last month",
    icon: "📊",
    iconBg: "#f5f3f7",
  },
  {
    title: "Total Properties",
    value: "167",
    change: "+12%",
    changeLabel: "From last month",
    icon: "🏘️",
    iconBg: "#f5f3f7",
  },
  {
    title: "Total Transactions",
    value: "₦200B",
    change: "+12%",
    changeLabel: "From last month",
    icon: "💰",
    iconBg: "#f5f3f7",
  },
  {
    title: "Active Escrow",
    value: "₦892M",
    change: "+12%",
    changeLabel: "From last month",
    icon: "🔒",
    iconBg: "#f5f3f7",
  },
]

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
]

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
]

const revenueBreakdown = [
  { label: "Property Sales", percentage: "60%", color: "#7d00ff" },
  { label: "Premium Subscription", percentage: "20%", color: "#ffc551" },
  { label: "Transaction Fees", percentage: "15%", color: "#fe6f41" },
  { label: "Resale Commission", percentage: "5%", color: "#dccdff" },
]

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Top Nav */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-medium text-[#0e0e0f]" style={{ letterSpacing: '-0.48px' }}>
              ☀️ Hello, Hephra Stan!
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-[#e7e8ea] rounded-xl px-3 py-2">
                <Search className="w-[17px] h-[17px] text-[#6b7280]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="text-sm font-medium text-[#6b7280] bg-transparent outline-none"
                  style={{ letterSpacing: '-0.14px' }}
                />
              </div>
              <button className="w-4 h-4 text-[#6b7280]">
                <Calendar className="w-4 h-4" />
              </button>
              <button className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-4 gap-6">
              {metricCards.map((card, index) => (
                <Card key={index} className="p-4 bg-white border-none rounded-2xl shadow-md">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                      {card.title}
                    </span>
                    <span className="text-xl">{card.icon}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xl font-semibold text-[#0e0e0f]" style={{ letterSpacing: '-0.20px' }}>
                      {card.value}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-normal text-[#30b066]" style={{ letterSpacing: '-0.12px' }}>
                        {card.change}
                      </span>
                      <span className="text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                        {card.changeLabel}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-[1fr_auto] gap-6">
              {/* Revenue Performance */}
              <Card className="p-6 bg-white border-none rounded-3xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-black" style={{ letterSpacing: '-0.18px' }}>
                    Revenue Performance
                  </h2>
                  <button className="flex items-center gap-2 px-3 py-2 border border-[#e7e8ea] rounded-lg">
                    <span className="text-sm font-normal text-[#36393f]" style={{ letterSpacing: '-0.06px' }}>
                      Monthly
                    </span>
                    <ChevronDown className="w-3 h-2 text-[#36393f]" strokeWidth={1.25} />
                  </button>
                </div>
                
                {/* Chart Placeholder */}
                <div className="relative h-[280px]">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                    <span>₦500M</span>
                    <span>₦400M</span>
                    <span>₦300M</span>
                    <span>₦200M</span>
                    <span>₦100M</span>
                    <span>₦0</span>
                  </div>
                  
                  {/* Chart area */}
                  <div className="ml-16 h-full flex items-end justify-between pb-8 bg-gradient-to-b from-[#f5f3f7] to-transparent rounded-lg relative">
                    {/* Simple line visualization */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d="M 0,60 L 10,55 L 20,50 L 30,45 L 40,42 L 50,42 L 60,40 L 70,25 L 80,28 L 90,23 L 100,20"
                        fill="none"
                        stroke="#7d00ff"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M 0,60 L 10,55 L 20,50 L 30,45 L 40,42 L 50,42 L 60,40 L 70,25 L 80,28 L 90,23 L 100,20 L 100,100 L 0,100 Z"
                        fill="url(#gradient)"
                        opacity="0.1"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#7d00ff" />
                          <stop offset="100%" stopColor="#7d00ff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Tooltip */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white border border-[#f5f5f5] rounded-lg px-3 py-2 shadow-md z-10">
                      <div className="text-xs font-normal text-[#6b7280]" style={{ letterSpacing: '-0.22px' }}>
                        August Revenue
                      </div>
                      <div className="text-sm font-medium text-[#0e0e0f]" style={{ letterSpacing: '-0.14px' }}>
                        ₦800,345M
                      </div>
                    </div>
                  </div>
                  
                  {/* X-axis labels */}
                  <div className="ml-16 mt-2 flex justify-between text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
              </Card>

              {/* Revenue Breakdown */}
              <Card className="p-6 bg-white border-none rounded-3xl shadow-md w-[402px]">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-medium text-black" style={{ letterSpacing: '-0.18px' }}>
                    Revenue Breakdown
                  </h2>
                  <button>
                    <MoreVertical className="w-[1px] h-[11px] text-[#36393f]" />
                  </button>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                      Total Revenue
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-[#0e0e0f]" style={{ letterSpacing: '-0.36px' }}>
                        ₦900,467M
                      </span>
                      <span className="text-xs font-normal text-[#30b066]" style={{ letterSpacing: '-0.12px' }}>
                        +12%
                      </span>
                    </div>
                  </div>
                  
                  {/* Bar Chart */}
                  <div className="flex gap-[2px] h-[46px]">
                    {/* Purple bars */}
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={`purple-${i}`} className="flex-1 bg-[#7d00ff] rounded-sm" />
                    ))}
                    {/* Yellow bars */}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={`yellow-${i}`} className="flex-1 bg-[#ffc551] rounded-sm" />
                    ))}
                    {/* Orange bars */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={`orange-${i}`} className="flex-1 bg-[#fe6f41] rounded-sm" />
                    ))}
                    {/* Light purple bars */}
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={`light-${i}`} className="flex-1 bg-[#dccdff] rounded-sm" />
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="space-y-6">
                    {revenueBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-[3px] h-5 rounded" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                            {item.label}
                          </span>
                        </div>
                        <span className="text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                          {item.percentage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-[1fr_auto] gap-6">
              {/* Recent Activity */}
              <Card className="p-6 bg-white border-none rounded-3xl shadow-md">
                <div className="flex items-center justify-between mb-9">
                  <h2 className="text-lg font-medium text-black" style={{ letterSpacing: '-0.18px' }}>
                    Recent Activity
                  </h2>
                  <button className="text-sm font-normal text-[#36393f]" style={{ letterSpacing: '-0.06px' }}>
                    See all
                  </button>
                </div>
                
                <div className="space-y-6">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-[13px] h-[13px] mt-1 flex items-center justify-center rounded-sm" style={{ backgroundColor: activity.iconBg }}>
                          <Icon className="w-[13px] h-[13px]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-normal text-[#36393f] leading-5" style={{ letterSpacing: '-0.06px' }}>
                            {activity.text}
                          </p>
                          <p className="text-xs font-normal text-[#969ba6] mt-1" style={{ letterSpacing: '-0.12px' }}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>

              {/* Active Listing */}
              <Card className="p-6 bg-white border-none rounded-2xl shadow-md w-[731px]">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-medium text-black" style={{ letterSpacing: '-0.18px' }}>
                    Active Listing
                  </h2>
                  <button className="flex items-center gap-2 px-3 py-2 border border-[#e7e8ea] rounded-lg">
                    <span className="text-sm font-normal text-[#36393f]" style={{ letterSpacing: '-0.06px' }}>
                      Monthly
                    </span>
                    <ChevronDown className="w-3 h-2 text-[#36393f]" strokeWidth={1.25} />
                  </button>
                </div>
                
                {/* Table */}
                <div className="overflow-hidden">
                  <div className="flex text-sm font-normal text-[#6b7280]" style={{ letterSpacing: '-0.06px' }}>
                    <div className="w-[184px] bg-[#fafafa] rounded-l-lg px-4 py-3 flex items-center gap-3">
                      <input type="checkbox" className="w-5 h-5 rounded border border-[#d1d5db]" />
                      <span>Property</span>
                    </div>
                    <div className="w-[80px] px-3 py-3">Type</div>
                    <div className="w-[120px] px-3 py-3">Price</div>
                    <div className="w-[60px] px-3 py-3">Views</div>
                    <div className="w-[100px] px-3 py-3">Date Listed</div>
                    <div className="flex-1 px-3 py-3">Status</div>
                  </div>
                  
                  {activeListings.map((listing, index) => (
                    <div key={index} className="flex items-center text-xs" style={{ letterSpacing: '-0.12px' }}>
                      <div className="w-[184px] px-4 py-3 flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 rounded border border-[#e7e8ea]" />
                        <Image
                          src="/properties/orchid-villa.jpg"
                          alt={listing.property}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <div className="font-medium text-[#0e0e0f]">{listing.property}</div>
                          <div className="font-normal text-[#6b7280]">{listing.location}</div>
                        </div>
                      </div>
                      <div className="w-[80px] px-3 py-3 font-normal text-[#6b7280]">{listing.type}</div>
                      <div className="w-[120px] px-3 py-3">
                        <div className="font-medium text-[#0e0e0f]">{listing.price}</div>
                        <div className="font-normal text-[#6b7280]">{listing.paymentType}</div>
                      </div>
                      <div className="w-[60px] px-3 py-3 font-normal text-[#6b7280]">{listing.views}</div>
                      <div className="w-[100px] px-3 py-3 font-normal text-[#6b7280]">{listing.date}</div>
                      <div className="flex-1 px-3 py-3">
                        <span className={`font-medium ${listing.status === 'Active' ? 'text-[#158348]' : 'text-[#df1c41]'}`}>
                          {listing.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}