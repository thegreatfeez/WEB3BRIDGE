import { Todo, type ITodo } from "./components/todo";
import useTodos from "./hooks/useTodos";

function App() {
  const {
    title,
    desc,
    setTitle,
    setDesc,
    todos,
    setTodos,
    isUpdating,
    createTodo,
    updateTodo,
    deleteTodo,
    completeTodo
  } = useTodos();

  const handleTodoCreation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo()
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Personal Workspace
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Focused Task Manager
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
              Capture what matters, keep the noise down, and ship your day with
              intention.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Total Todos
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {todos ? todos.length : 0}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              {isUpdating ? "Update todo" : "Create a new todo"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Keep titles short, and use descriptions to add extra clarity.
            </p>

            <form onSubmit={handleTodoCreation} className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Title
                <input
                  type="text"
                  placeholder="Outline the task"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  value={title}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Description
                <input
                  type="text"
                  placeholder="Add helpful context"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDesc(e.target.value)
                  }
                  value={desc}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:bg-white"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                {isUpdating ? "Save changes" : "Create todo"}
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Current todos
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {todos && todos.length > 0 ? "Active list" : "No tasks yet"}
              </span>
            </div>

            <ul className="mt-6 space-y-4">
              {todos &&
                todos.map((todo) => (
                  <Todo
                    key={todo.id}
                    {...todo}
                    setTodos={setTodos}
                    handleUpdateTodo={() => updateTodo(todo.id)}
                    handleDeleteTodo={() => deleteTodo(todo.id)}
                    handleCompleteTodo={(e: React.ChangeEvent<HTMLInputElement>) =>
                      completeTodo(todo.id, e)
                    }
                  />
                ))}
              {(!todos || todos.length === 0) && (
                <li className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                  Your task board is empty. Add a new todo to get started.
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
