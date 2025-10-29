
  import { type FC, useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Button } from "@headlessui/react";
  import { toast } from "sonner";
  import { itemSchema, type ItemFormData } from "../../schemas/ItemSchema";
  import type { Item } from "../../types/item";
  import Spinner from "../Loadings/Spinner";

  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ItemFormData) => Promise<void>;
    defaultValues?: Item | null;
  }

  const Modal: FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    defaultValues,
  }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<ItemFormData>({
      resolver: zodResolver(itemSchema),
      defaultValues: { title: "", subtitle: "" },
    });

    useEffect(() => {
      if (defaultValues) {
        reset({ title: defaultValues.title, subtitle: defaultValues.subtitle });
      } else {
        reset({ title: "", subtitle: "" });
      }
    }, [defaultValues, reset]);

    if (!isOpen) return null;

    const submitHandler = async (data: ItemFormData) => {
      const isEdited =
        !defaultValues ||
        data.title !== defaultValues.title ||
        data.subtitle !== defaultValues.subtitle;

      if (!isEdited) {
        toast("No changes detected.", { icon: "ℹ️" });
        return;
      }

      try {
        await onSubmit(data);
        toast.success(
          defaultValues
            ? "Item updated successfully!"
            : "Item created successfully!"
        );
        reset({ title: "", subtitle: "" });
        onClose();
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        console.error(error);
      }
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
          <h2 className="text-lg font-bold mb-4">
            {defaultValues ? "Edit Item" : "Create New Item"}
          </h2>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-3"
          >
            <input
              {...register("title")}
              placeholder="Title"
              className="w-full border border-gray-400 p-2 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}

            <input
              {...register("subtitle")}
              placeholder="Subtitle"
              className="w-full border border-gray-400 p-2 rounded"
            />
            {errors.subtitle && (
              <p className="text-red-500 text-sm">{errors.subtitle.message}</p>
            )}

            <div className="flex justify-end gap-2 mt-3">
              <Button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 duration-200 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center gap-2 duration-200 cursor-pointer"
              >
                {isSubmitting ? (
                  <Spinner size={16} color="white" />
                ) : defaultValues ? (
                  "Update"
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  export default Modal;
