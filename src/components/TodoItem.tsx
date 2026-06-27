import { Trash2 } from "lucide-react";
import type { Todo } from "./types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-zinc-200/60 group hover:border-zinc-300 transition-all">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.done}                    
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 cursor-pointer accent-zinc-900 rounded-md transition-all"
        />
        <span
          className={`font-medium transition-all ${todo.done ? "line-through text-zinc-400" : "text-zinc-700"}`}  
        >
          {todo.title}                          
        </span>
      </div>
      <button
        className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-zinc-300 hover:text-red-500 transition-all cursor-pointer p-1"
        onClick={() => onDelete(todo.id)}
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}