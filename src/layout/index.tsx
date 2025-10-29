import { useState, useCallback } from "react";
import { useItems } from "../hooks/useItems";
import type { Item } from "../types/item";
import Header from "./Header";
import ItemCardSkeleton from "../components/Loadings/ItemCardSkeleton";
import ItemCard from "../components/ItemCard";
import Modal from "../components/Modal/Modal";
import type { ItemFormData } from "../schemas/ItemSchema";
import { toast } from "sonner";

const Layout = () => {
  const { items, isLoading, addItem, editItem, deleteItem } = useItems();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    item: Item | null;
  }>({
    isOpen: false,
    item: null,
  });

  const openCreateModal = useCallback(() => {
    setModalState({ isOpen: true, item: null });
  }, []);

  const openEditModal = useCallback((item: Item) => {
    setModalState({ isOpen: true, item });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, item: null });
  }, []);

  const handleSubmit = useCallback(
    async (data: ItemFormData) => {
      try {
        if (modalState.item) {
          const hasChanges =
            data.title !== modalState.item.title ||
            data.subtitle !== modalState.item.subtitle;
          if (!hasChanges) {
            toast("No changes detected.", { icon: "ℹ️" });
            return;
          }
          await editItem({ id: modalState.item.id, ...data });
          toast.success("Item updated successfully!");
        } else {
          await addItem(data);
          toast.success("Item created successfully!");
        }
        closeModal();
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
    [modalState.item, addItem, editItem, closeModal]
  );

  return (
    <>
      <Header onCreate={openCreateModal} />
      <div className="min-h-screen flex flex-col items-center gap-4 w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 px-2.5 md:px-5 md:py-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ItemCardSkeleton key={i} />
            ))
          ) : items.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              There are no items. Please create one first.
            </div>
          ) : (
            items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={openEditModal}
                onDelete={deleteItem}
              />
            ))
          )}
        </div>

        <Modal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          defaultValues={modalState.item}
        />
      </div>
    </>
  );
};

export default Layout;
