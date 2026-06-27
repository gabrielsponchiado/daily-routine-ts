import { useState, useEffect } from "react";
import type { Todo, FilterType } from "./components/types/todo";
import { TodoItem } from "./components/TodoItem";
import { TodoInput } from "./components/TodoInput";
import { Filter } from "./components/Filter";
import { tasks } from "./api/tasks";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [text, setText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await tasks.getAll();
        setTodos(data);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  async function addTodo() {
    const title = text.trim();
    if (title === "" || submitting) return;

    setSubmitting(true);

    try {
      const newTodo = await tasks.create(title);
      setTodos((prev) => [...prev, newTodo]);
      setText("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleTodo(id: number) {
    try {
      const todoAtual = todos.find(t => t.id === id);
      if (!todoAtual) return;
  
      const novoEstado = !todoAtual.done;
  
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id === id ? { ...todo, done: novoEstado } : todo
        )
      );

      await tasks.update(id, novoEstado);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  }

  async function deleteTodo(id: number) {
    try {
      await tasks.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.done;
    if (filter === "uncompleted") return !todo.done;
    return true;
  });

  const total = todos.length;
  const done = todos.filter((t) => t.done).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-zinc-400 font-medium text-sm">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center p-8 md:p-16 font-sans">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
            Daily Routine
          </h1>
          <p className="text-zinc-500 text-sm font-medium">
            {total === 0
              ? "What's on your mind today?"
              : `${done} of ${total} completed`}
          </p>
        </div>

        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-zinc-200/60 mb-8 focus-within:border-zinc-300 focus-within:ring-4 focus-within:ring-zinc-100 transition-all">
          <TodoInput
            text={text}
            setText={setText}
            onAdd={addTodo}
            disabled={submitting}
          />
        </div>

        <div className="flex justify-center mb-6">
          <Filter filter={filter} onChange={setFilter} />
        </div>

        <ul className="flex flex-col gap-3">
          {filteredTodos.length === 0 ? (
            <li className="text-center text-zinc-400 text-sm py-8">
              {total === 0
                ? "No tasks yet."
                : "No tasks found."}
            </li>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
