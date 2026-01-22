interface TodoInputProps {
  text: string;
  setText: (value: string) => void;
  onAdd: () => void;
}

export function TodoInput({ text, setText, onAdd }: TodoInputProps) {
  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border border-zinc-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400 transition-all text-zinc-700"
        type="text"
        placeholder="Ex: Beber água"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition-all"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
}
