import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditNest } from "../../services/apiNests";

export function useCreateNest() {
  const queryClient = useQueryClient();

  const { mutate: createNest, isLoading: isCreating } = useMutation({
    mutationFn: createEditNest,
    onSuccess: () => {
      toast.success("New nest successfully created");
      queryClient.invalidateQueries({ queryKey: ["nests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createNest };
}
