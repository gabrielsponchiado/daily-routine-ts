import { Trash2 } from "lucide-react";
import type { Todo } from "./types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-zinc-100 group text-zinc-700">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.done}                    
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 cursor-pointer accent-blue-600"
        />
        <span
          className={`font-medium transition-all ${todo.done ? "line-through text-zinc-300" : ""}`}  
        >
          {todo.title}                          
        </span>
      </div>
      <button
        className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all cursor-pointer"
        onClick={() => onDelete(todo.id)}
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
}