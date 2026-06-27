interface TodoInputProps {
  text: string;
  setText: (value: string) => void;
  onAdd: () => void;
  disabled?: boolean;
}

export function TodoInput({ text, setText, onAdd, disabled }: TodoInputProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400 text-zinc-700 disabled:opacity-50"
        type="text"
        placeholder="Add a new task..."
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !disabled && onAdd()}
      />
      <button
        className="bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onAdd}
        disabled={disabled}
      >
        Add
      </button>
    </div>
  );
}
