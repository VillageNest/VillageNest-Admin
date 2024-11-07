import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditNest } from "../../services/apiNests";
import { toast } from "react-hot-toast";

export function useEditNest() {
  const queryClient = useQueryClient();

  const { mutate: editNest, isLoading: isEditing } = useMutation({
    mutationFn: ({ newNestData, id }) => createEditNest(newNestData, id),
    onSuccess: () => {
      toast.success("Nest successfully edited");
      queryClient.invalidateQueries({ queryKey: ["nests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editNest };
}
