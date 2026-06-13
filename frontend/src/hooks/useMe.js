import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await axios.get("https://grtyourstore.onrender.com/api/me", {
        withCredentials: true, // important if using cookies
      });
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
    retry: false,
  });
}