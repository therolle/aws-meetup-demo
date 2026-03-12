import { useState, useEffect, useRef } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";

type Todo = Schema["Todo"]["type"];

export function TasksPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const clientRef = useRef(generateClient<Schema>());

  useEffect(() => {
    const sub = clientRef.current.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos(items),
    });
    return () => sub.unsubscribe();
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content:");
    if (content) {
      clientRef.current.models.Todo.create({ content });
    }
  }

  function deleteTodo(id: string) {
    clientRef.current.models.Todo.delete({ id });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text-primary">My Todos</h1>
      </div>

      <button
        onClick={createTodo}
        className="mb-6 w-full rounded-lg bg-primary px-4 py-2.5 text-white font-medium hover:bg-primary-dark transition-colors"
      >
        + New Todo
      </button>

      {todos.length === 0 ? (
        <p className="text-center text-text-secondary mt-8">
          No todos yet. Create one to get started!
        </p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-lg border border-border bg-bg-secondary px-4 py-3 shadow-sm"
            >
              <span className="text-text-primary">{todo.content}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="ml-4 text-sm text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
