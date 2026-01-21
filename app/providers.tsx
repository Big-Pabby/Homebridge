"use client";
import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>{children}</Suspense>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-950 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-gray-500",
            actionButton: "group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50",
            cancelButton: "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500",
          },
        }}
      />
    </QueryClientProvider>
  );
}
