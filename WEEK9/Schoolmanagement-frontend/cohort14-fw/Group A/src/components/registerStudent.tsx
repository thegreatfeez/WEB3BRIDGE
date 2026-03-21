export interface IStudentRegistry {
  firstName: string;
  lastName: string;
  id: string;
  gender: string;
  suspended: boolean;
  paymentStatus: boolean;
  timeStamp: number;
  level:number;
  fees:number;
  address:string;
}

interface IStudentRegistryComp extends IStudentRegistry {
  setStudents : React.Dispatch<React.SetStateAction<IStudentRegistry[] | null>>;
  students : IStudentRegistry[] | null;
  handleUpdateStudent : () => void;
}
<style>
    
</style>
export const Student: React.FC<IStudentRegistryComp> = ({
  firstName,
  lastName,
  id,
  gender,
  setStudents,
  students,
  handleUpdateStudent
}) => {
  const handleDelete = (id: string) => {
    if (!students) {
      return;
    }
    const filteredStudents = students.filter((student) => {
      return student.id !== id;
    });
    setStudents(filteredStudents);
  };
  return (
    <li key={id}>
      <h3>{firstName} {lastName}</h3>
      <p>{gender}</p>
      <button type="button" onClick={() => handleDelete(id)}>
        delete
      </button>
      <button type="button" onClick={handleUpdateStudent}>update</button>
      <input type="checkbox" />
    </li>
  );
};
