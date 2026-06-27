interface TodoInputProps {
  text: string;
  setText: (value: string) => void;
  onAdd: () => void;
  disabled?: boolean;
}

export function TodoInput({ text, setText, onAdd, disabled }: TodoInputProps) {
  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 transition-all text-zinc-700 disabled:opacity-50"
        type="text"
        placeholder="Ex: Beber água"
        value={text}
        disabled={disabled}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !disabled && onAdd()}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onAdd}
        disabled={disabled}
      >
        Add
      </button>
    </div>
  );
}
