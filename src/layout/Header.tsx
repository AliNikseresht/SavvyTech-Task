import { Button } from "@headlessui/react";
import { ListTodo } from "lucide-react";

interface HeaderProps {
  onCreate: () => void;
}

const Header = ({ onCreate }: HeaderProps) => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between w-full bg-white p-2.5 md:p-5 shadow">
      <h1 className="text-xs md:text-2xl font-bold flex items-center gap-1">
        <ListTodo className="text-indigo-500 w-6 h-6 md:w-9 md:h-9" /> Savvy Task Manager
      </h1>

      <Button
        onClick={onCreate}
        className="inline-flex items-center gap-2 rounded-md bg-indigo-700 px-2 py-1.5 md:px-7 md:py-2 text-xs md:text-base font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-indigo-800 data-open:bg-indigo-800 cursor-pointer duration-150"
      >
        + Create New Task
      </Button>
    </div>
  );
};

export default Header;
