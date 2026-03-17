export interface ITodo {
    tilte: string;
    id: string
    desc: string;
    isCompleted: boolean;
    isUpdated: boolean;
}

export const Todo:React.FC<ITodo> = ({tilte,id, desc, isCompleted, isUpdated}) => {
    return(
        <li key={id} className="mb-2">
            <h3 className="text-lg font-semibold">{tilte}</h3>
            <p>{desc}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-2">Update</button>
        <input type="checkbox" className="ml-2"/>
      </li>
    )
}