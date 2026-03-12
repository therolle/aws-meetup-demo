import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "../amplify/data/resource";
import { ThemeToggle } from "./components/ThemeToggle";

const client = generateClient<Schema>();

type Todo = Schema["Todo"]["type"];

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { signOut } = useAuthenticator();

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => setTodos(items),
    });
    return () => sub.unsubscribe();
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content:");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-bg-secondary">
        <div className="mx-auto max-w-xl px-4 py-4 flex items-center justify-end">
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-text-primary">My Todos</h1>
          <button
            onClick={signOut}
            className="rounded-md bg-bg-primary px-3 py-1.5 text-sm font-medium text-text-secondary hover:bg-border transition-colors"
          >
            Sign out
          </button>
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
      </main>
    </>
  );
}

export default App;
