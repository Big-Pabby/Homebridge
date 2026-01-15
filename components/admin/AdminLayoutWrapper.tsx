"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import TopNav from "./TopNav";

export function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Routes where sidebar should NOT be shown
  const noSidebarRoutes = [
    "/admin",
    "/admin/otp-verification",
    "/admin/sign-up",
    "/admin/create-password",
  ];
  
  const shouldShowSidebar = !noSidebarRoutes.includes(pathname);

  return (
    <div>
      {shouldShowSidebar && <Sidebar />}
      <div className={shouldShowSidebar ? "ml-[272px] bg-[#F5F5F5]" : ""}>{shouldShowSidebar && <TopNav />}{children}</div>
    </div>
  );
}

