export interface ITodo {
  title: string;
  id: string;
  desc: string;
  isCompleted: boolean;
  isUpdated: boolean;
}

interface ITodoComp extends ITodo {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[] | null>>;
  handleUpdateTodo: () => void;
  handleDeleteTodo: () => void;
  handleCompleteTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Todo: React.FC<ITodoComp> = ({
  title,
  id,
  desc,
  isCompleted,
  handleUpdateTodo,
  handleDeleteTodo,
  handleCompleteTodo
}) => {
  return (
    <li
      key={id}
      className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className={`text-base font-semibold ${
              isCompleted ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-1 text-sm ${
              isCompleted ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {desc}
          </p>
        </div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCompleteTodo}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          Done
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleUpdateTodo}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleDeleteTodo}
          className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-slate-800"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
