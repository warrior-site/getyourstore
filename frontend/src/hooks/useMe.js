import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api.js";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/api/me"),
    staleTime: 1000 * 60 * 5, // 5 min cache
    retry: false,
  });
}