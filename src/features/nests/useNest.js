import { useQuery } from "@tanstack/react-query";
import { getNests } from "../../services/apiNests";

export function useNest() {
  const {
    isLoading,
    data: nests,
    error,
  } = useQuery({
    queryKey: ["nests"],
    queryFn: getNests,
  });

  return { isLoading, error, nests };
}
