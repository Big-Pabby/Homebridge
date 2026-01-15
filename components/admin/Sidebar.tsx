"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, LayoutGrid } from "lucide-react"
import HomebridgeLogo from "@/public/icons/homebridge-logo.svg"
import DashboardIcon from "@/public/icons/dashboard-icon.svg"
import UsersIcon from "@/public/icons/users-icon.svg"
import PropertyIcon from "@/public/icons/property-icon.svg"
import ResaleIcon from "@/public/icons/resale-icon.svg"
import TransactionsIcon from "@/public/icons/transactions-icon.svg"
import ReferralIcon from "@/public/icons/referral-icon.svg"
import CommunicationIcon from "@/public/icons/communication-icon.svg"
import SupportIcon from "@/public/icons/support-icon.svg"
import SettingsIcon from "@/public/icons/settings-icon.svg"
import HelpDeskIcon from "@/public/icons/help-desk-icon.svg"

const navigationItems = [
  { name: "Dashboard", icon: DashboardIcon, href: "/admin/dashboard" },
  { name: "Users", icon: UsersIcon, href: "/admin/users", hasDropdown: true },
  { name: "Property", icon: PropertyIcon, href: "/admin/propertyf" },
  { name: "Resale Marketplace", icon: ResaleIcon, href: "/admin/resale", hasDropdown: true },
  { name: "Transactions", icon: TransactionsIcon, href: "/admin/transactions", hasDropdown: true },
  { name: "Referral", icon: ReferralIcon, href: "/admin/referral", hasDropdown: true },
  { name: "Communication", icon: CommunicationIcon, href: "/admin/communication" },
  { name: "Support", icon: SupportIcon, href: "/admin/support" },
]

const bottomItems = [
  { name: "Settings", icon: SettingsIcon, href: "/admin/settings" },
  { name: "Help Desk", icon: HelpDeskIcon, href: "/admin/help" },
]

export function Sidebar() {
  const pathname = usePathname()
  
  return (
    <aside className="w-[272px] fixed z-[100] top-0 h-screen left-0 overflow-y-auto bg-white border-r border-[#e7e8ea] flex flex-col">
      {/* Header */}
      <div className="px-7 py-6 border-b border-[#e7e8ea]">
        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <HomebridgeLogo className="w-[33px] h-[37px]" style={{ color: '#7d00ff' }} />
            <span className="text-xl font-medium text-[#0e0e0f]" style={{ letterSpacing: '-0.20px' }}>
              Homebridge
            </span>
          </Link>
          <button className="text-[#6b7280] hover:text-[#0e0e0f]">
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-5 py-8 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex h-11 items-center justify-between px-3 py-2 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-[#f5f3f7]' 
                    : 'hover:bg-[#f5f3f7]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    className="w-[18px] h-[18px]" 
                    style={{ color: isActive ? '#7d00ff' : '#6b7280' }} 
                  />
                  <span 
                    className={`text-sm flex-1 font-medium ${isActive ? 'text-[#7d00ff]' : 'text-[#6b7280]'}`}
                    style={{ letterSpacing: '-0.14px' }}
                  >
                    {item.name}
                  </span>
                </div>
                {item.hasDropdown && (
                  <ChevronDown className="w-3 h-2 text-[#36393f]" strokeWidth={1.5} />
                )}
              </Link>
            )
          })}
        </div>

        {/* Bottom section */}
        <div className="mt-auto flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            {bottomItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-[#f5f3f7] transition-all"
                >
                  <Icon className="w-[17px] h-[17px]" style={{ color: '#6b7280' }} />
                  <span className="text-sm font-medium text-[#6b7280]" style={{ letterSpacing: '-0.14px' }}>
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* User Profile */}
          <div className="pt-6 border-t border-[#e7e8ea]">
            <button className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-[#f5f3f7] transition-all">
              <div className="flex items-center gap-3">
                <Image
                  src="/admin-avatar.png"
                  alt="Hephra Stan"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="text-left">
                  <div className="text-sm font-medium text-[#0e0e0f]" style={{ letterSpacing: '-0.14px' }}>
                    Hephra Stan
                  </div>
                  <div className="text-xs font-normal text-[#6b7280]" style={{ letterSpacing: '-0.12px' }}>
                    Admin
                  </div>
                </div>
              </div>
              <ChevronDown className="w-3 h-2 text-[#6b7280]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  )
}