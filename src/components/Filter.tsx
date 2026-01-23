import type { FilterType } from "./types/todo";

interface FilterProps {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
}

export function Filter({ filter, onChange }: FilterProps) {
  return (
    <select
      value={filter}
      onChange={(e) => onChange(e.target.value as FilterType)}
      className="w-full mt-5 px-3 py-2 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-700 font-medium outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 hover:border-zinc-400 cursor-pointer"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="uncompleted">Uncompleted</option>
    </select>
  );
}
