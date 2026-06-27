import { useState, useEffect } from "react";
import type { Todo, FilterType } from "./components/types/todo";
import { TodoItem } from "./components/TodoItem";
import { TodoInput } from "./components/TodoInput";
import { Filter } from "./components/Filter";
import { tasks } from "./api/tasks";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando tarefas...</div>;
  }

  async function addTodo() {
    if (text.trim() === "") return;
  
    try {
      const newTodo = await tasks.create(text);
      setTodos([...todos, newTodo]);
      setText("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  }

  async function toggleTodo(id: number) {
    try {
      const todoAtual = todos.find(t => t.id === id);
      if (!todoAtual) return;
  
      const updatedTodo = await tasks.update(id, !todoAtual.done);
      
      setTodos(todos.map(t => 
        t.id === id ? updatedTodo : t
      ));
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  }

  async function deleteTodo(id: number) {
    try {
      await tasks.delete(id);
      setTodos(todos.filter(t => t.id !== id));
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
