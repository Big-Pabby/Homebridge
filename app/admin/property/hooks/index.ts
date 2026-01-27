import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { admin } from "@/lib/service";
import { toast } from "@/lib/utils/toast";
import { ApiResponse, ApiPaginatedResponse } from "@/types/api";
import { Property } from "../types";

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      // Axios automatically sets Content-Type with boundary for FormData
      const response = await admin.post("properties", formData);
      return response;
    },
    onSuccess: () => {
      // Invalidate properties query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property created successfully", {
        description: "The property has been added to your listings.",
      });
    },
    onError: (error: any) => {
      toast.error("Failed to create property", {
        description: error?.message || "Please try again later.",
      });
    },
  });
};

interface PropertiesResponse {
  data: Property[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UsePropertiesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
  state?: string;
  city?: string;
  min_price?: number;
  max_price?: number;
  provider?: string;
}

export const useProperties = (params: UsePropertiesParams = {}) => {
  const {
    page = 1,
    limit = 12,
    search = "",
    status = "",
    type = "",
    state = "",
    city = "",
    min_price,
    max_price,
    provider = "",
  } = params;

  const queryFn = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());
    if (search) queryParams.append("search", search);
    if (status) queryParams.append("status", status);
    if (type) queryParams.append("type", type);
    if (state) queryParams.append("state", state);
    if (city) queryParams.append("city", city);
    if (min_price !== undefined && min_price !== null) {
      queryParams.append("min_price", min_price.toString());
    }
    if (max_price !== undefined && max_price !== null) {
      queryParams.append("max_price", max_price.toString());
    }
    if (provider) queryParams.append("provider", provider);

    const response = await admin.get<PropertiesResponse>(
      `properties?${queryParams.toString()}`,
    );
    return response.data;
  };

  return useQuery({
    queryKey: [
      "properties",
      page,
      limit,
      search,
      status,
      type,
      state,
      city,
      min_price,
      max_price,
      provider,
    ],
    queryFn,
  });
};

export const usePropertyDetails = (id: string) => {
  const queryFn = async () => {
    const response = await admin.get<Property>(`properties/${id}`);
    return response.data;
  };
  return useQuery({ queryKey: ["property", id], queryFn });
};
