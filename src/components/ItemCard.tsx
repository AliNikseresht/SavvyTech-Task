import { format } from "date-fns";
import type { Item } from "../types/item";
import Dropdown from "./Dropdown";

interface Props {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export default function ItemCard({ item, onEdit, onDelete }: Props) {
  return (
    <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-3 gap-0.5 border border-gray-300">
      <div className="flex-1">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.subtitle}</p>
        <span className="text-xs text-gray-400">
          {format(new Date(item.date_created), "dd MMM yyyy 'at' HH:mm")}{" "}
        </span>
      </div>

      <Dropdown
        onEdit={() => onEdit(item)}
        onDelete={async () => {
          await onDelete(item.id);
        }}
      />
    </div>
  );
}
