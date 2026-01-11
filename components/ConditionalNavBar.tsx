"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";

export function ConditionalNavBar() {
  const pathname = usePathname();
  
  // Hide NavBar on admin routes
  const isAdminRoute = pathname?.startsWith("/admin");
  
  if (isAdminRoute) {
    return null;
  }
  
  return <NavBar />;
}

