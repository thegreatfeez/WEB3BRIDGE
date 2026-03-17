import { useState } from "react";
import { Todo, type  ITodo } from "./components/todo";


function App() {
    const [todos, setTodos] = useState<ITodo[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const desc = formData.get("desc") as string;
        const newTodo: ITodo = {
            id: crypto.randomUUID(),
            tilte: title,
            desc: desc,
            isCompleted: false,
            isUpdated: false
        }
        setTodos(prev => prev ? [...prev, newTodo] : [newTodo]);
    }

    return(
        <> 
        <h1 className="text-2xl font-bold mb-4">Todo</h1>
        <form action='' onSubmit={handleSubmit} className="mb-4"> 
        <input name="title" type="text" placeholder="Tilte" className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"/>
        <textarea name="desc" placeholder="Description" className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"></textarea>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Add Todo</button>
        </form>
        <ul className="list-disc pl-5">
          {todos.map((todo)=>
            <Todo
            key={todo.id}
            {...todo}
            />
          )}
        </ul>
        </>

    )
}

export default App;
