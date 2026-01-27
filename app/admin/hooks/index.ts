import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { admin } from "@/lib/service";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants";
import { useUserStore } from "@/lib/store/user-store";
import { toast } from "@/lib/utils/toast";

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    created_at: string;
    updated_at: string;
    full_name: string;
    email: string;
    is_active: boolean;
    role: string;
    last_login_at: string;
    access: {
      token: string;
      expires_in: string;
    };
    refresh: {
      token: string;
      expires_in: string;
    };
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAdminLogin = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (
      credentials: LoginCredentials
    ): Promise<LoginResponse> => {
      const response = await admin.post<LoginResponse>(
        "auth/login",
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Store tokens in localStorage
      if (data.data?.access?.token) {
        localStorage.setItem(ACCESS_TOKEN, data.data.access.token);
      }
      if (data.data?.refresh?.token) {
        localStorage.setItem(REFRESH_TOKEN, data.data.refresh.token);
      }

      // Store user data in Zustand store
      if (data.data) {
        const { access, refresh, ...userData } = data.data;
        setUser(userData);
      }

      toast.success("Login successful", {
        description: `Welcome back, ${data.data?.full_name || "Admin"}!`,
      });
    },
    onError: (error: any) => {
      toast.error("Login failed", {
        description:
          error?.message || "Please check your credentials and try again.",
      });
    },
  });
};

export const useAdminLogout = () => {
  const clearUser = useUserStore((state) => state.clearUser);

  return () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    clearUser();
    toast.success("Logged out successfully");
    if (typeof window !== "undefined") {
      window.location.href = "/admin";
    }
  };
};
