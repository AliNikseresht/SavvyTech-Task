import { Button } from "@headlessui/react";
import type { FC } from "react";
import Spinner from "../Loadings/Spinner";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  title?: string;
}

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
  title = "Are you sure you want to delete this item?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="flex justify-end gap-3">
          <Button
            onClick={onClose}
            disabled={isDeleting}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer duration-200"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            className={`bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer flex items-center gap-2 justify-center duration-200`}
          >
            {isDeleting ? <Spinner size={16} /> : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
