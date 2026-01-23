import { useState, useEffect } from "react";
import type { Todo, FilterType } from "./components/types/todo";
import { TodoItem } from "./components/TodoItem";
import { TodoInput } from "./components/TodoInput";
import { Filter } from "./components/Filter";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos-data");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const lastDate = localStorage.getItem("last-app-open");
    if (lastDate && lastDate !== today) {
      setTodos((prev) =>
        prev.map((item) => ({ ...item, concluida: false })),
      );
    }
    localStorage.setItem("last-app-open", today);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos-data", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (text.trim() === "") return;
    if (todos.some((t) => t.texto.toLowerCase() === text.toLowerCase())) return;

    setTodos([...todos, { id: Date.now(), texto: text, concluida: false }]);
    setText("");
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, concluida: !t.concluida } : t,
      ),
    );
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.concluida;
    if (filter === "uncompleted") return !todo.concluida;
    return true;
  });

  const total = todos.length;
  const done = todos.filter((t) => t.concluida).length;

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center p-10 font-sans">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-zinc-200">
        <h1 className="text-3xl font-black text-zinc-800 text-center">
          Daily Routine
        </h1>
        <p className="text-zinc-500 text-sm text-center mb-6">
          {total === 0
            ? "Add your goals"
            : `${done} of ${total} completed today`}
        </p>

        <TodoInput text={text} setText={setText} onAdd={addTodo} />
      </div>

      <div>
        <Filter filter={filter} onChange={setFilter} />
      </div>

      <ul className="w-full max-w-md mt-8 flex flex-col gap-3">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
