import { useState, type FC } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDownIcon, PencilIcon, Trash2 } from "lucide-react";
import ConfirmDeleteModal from "./Alert/ConfirmDeleteModal";
import { toast } from "sonner";

interface DropdownProps {
  onEdit: () => void;
  onDelete: () => Promise<void>;
}

const Dropdown: FC<DropdownProps> = ({ onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      toast.success("Item successfully deleted!");
    } catch {
      toast.error("Failed to delete item!");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white shadow-inner shadow-white/10 cursor-pointer">
          Options
          <ChevronDownIcon className="w-4 h-4" />
        </MenuButton>

        <MenuItems className="absolute right-0 mt-2 w-40 z-10 origin-top-right rounded-xl shadow-md border border-gray-300 bg-white p-1 text-sm transition duration-100 ease-out focus:outline-none">
          <MenuItem>
            {({ active }) => (
              <Button
                onClick={onEdit}
                className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 cursor-pointer ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                <PencilIcon className="w-4 h-4 text-blue-600" />
                Edit
              </Button>
            )}
          </MenuItem>

          <div className="my-1 h-px bg-gray-300" />

          <MenuItem>
            {({ active }) => (
              <Button
                onClick={() => setIsModalOpen(true)}
                className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 cursor-pointer ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
                Delete
              </Button>
            )}
          </MenuItem>
        </MenuItems>
      </Menu>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default Dropdown;
