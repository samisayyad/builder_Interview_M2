import { QueryClient } from "@tanstack/react-query";

interface ApiErrorResponse {
  message: string;
  details?: unknown;
}

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const data = (await response.json()) as ApiErrorResponse;
    throw new ApiError(response.status, data.message, data.details);
  }

  return response.json();
};

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse(response);
  },

  post: async <T>(endpoint: string, payload?: unknown): Promise<T> => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return handleResponse(response);
  },

  patch: async <T>(endpoint: string, payload?: unknown): Promise<T> => {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return handleResponse(response);
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return handleResponse(response);
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});
