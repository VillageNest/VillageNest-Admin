import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteNest as deleteNestApi } from "../../services/apiNests";

export function useDeleteNest() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteNest } = useMutation({
    mutationFn: deleteNestApi,
    onSuccess: () => {
      toast.success("Nest successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["nests"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteNest };
}
