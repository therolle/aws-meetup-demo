import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "../amplify/data/resource";

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
    <main className="mx-auto max-w-xl px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          My Todos
        </h1>
        <button
          onClick={signOut}
          className="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300"
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
        <p className="text-center text-gray-500 mt-8">
          No todos yet. Create one to get started!
        </p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="text-gray-800">{todo.content}</span>
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
  );
}

export default App;
