import type { FilterType } from "./types/todo";

interface FilterProps {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
}

export function Filter({ filter, onChange }: FilterProps) {
  const options: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "completed", label: "Done" },
    { value: "uncompleted", label: "Pending" },
  ];

  return (
    <div className="flex p-1 bg-zinc-100/80 rounded-xl gap-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
            filter === opt.value
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
