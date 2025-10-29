import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchItems,
  addItem,
  editItem,
  deleteItem,
} from "../services/itemsService";
import { toast } from "sonner";

export function useItems() {
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const addMutation = useMutation({
    mutationFn: ({ title, subtitle }: { title: string; subtitle: string }) =>
      addItem(title, subtitle),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
    onError: (error) => toast.error(error.message),
  });

  const editMutation = useMutation({
    mutationFn: ({
      id,
      title,
      subtitle,
    }: {
      id: string;
      title: string;
      subtitle: string;
    }) => editItem(id, title, subtitle),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
    onError: (error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
    onError: (error) => toast.error(error.message),
  });

  return {
    items,
    isLoading,
    addItem: addMutation.mutateAsync,
    editItem: editMutation.mutateAsync,
    deleteItem: deleteMutation.mutateAsync,
  };
}
