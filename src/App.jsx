import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e) => {
    const id = e.target.name;
    let t = todos.find(i => {
      return i.id === id
    });
    setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (e) => {
    const id = e.target.name;
    const confirmation = window.confirm("Are you sure you want to delete this task?");
    if (confirmation) {
      const newTodos = todos.filter(item => {
        return item.id !== id
      });
      setTodos(newTodos);
      saveToLS(newTodos);
    }
  };

  const deleteAll = (e) => {
    const confirmation = window.confirm("Are you sure you want to delete all tasks?");
    if (confirmation) {
      const newTodos = []
      setTodos(newTodos);
      saveToLS(newTodos);
    }
  }

  const handleAdd = () => {
    if (todo.length >= 3) {
      const newTodo = { id: uuidv4(), todo, isCompleted: false };
      setTodos([...todos, newTodo]);
      setTodo("");
      saveToLS([...todos, newTodo]);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => {
      return item.id === id
    });
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[89vh] 2xl:w-[40%]">
        <h1 className='font-bold text-2xl text-blue-400 text-center'>iTask - Your All in One Task Manager !!</h1>
        <div className="my-5 flex flex-col gap-5">
          <h2 className='text-lg font-bold my-1'>Add a Task</h2>
          <div className='flex gap-2 mb-3'>
          <input onChange={handleChange} onKeyDown={e => { e.key === "Enter" && handleAdd() }} value={todo} type="text" className='w-full rounded-lg p-1.5 border border-black' />
          <button disabled={todo.length < 3} onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 hover:transition-all px-5 py-1.5 text-sm font-bold text-white rounded-full disabled:cursor-not-allowed disabled:bg-violet-600'>Save</button>
          </div>
        </div>
        {
          todos.length > 0 &&
          <>
            <div className='mt-1 flex justify-between'>
              <div className='flex gap-5'>
                <input onClick={toggleFinished} type="checkbox" checked={showFinished} className='mb-1' /> 
                <div>Show Finished</div>
              </div>
              <button onClick={deleteAll} className='bg-violet-800 hover:bg-violet-950 hover:transition-all p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete All</button>

            </div>
            <hr className='my-3 border w-3/4 mx-auto border-blue-200' />
          </>
        }
        <h2 className='text-lg font-bold'>Your Tasks</h2>
        <div className="todos my-3">
          {todos.length === 0 && <div className='text-lg text-red-600 font-semibold mx-5'>No Tasks, Add a task and Get Started !!</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
              <div className="flex gap-5">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button name={item.id} onClick={handleEdit} className='bg-violet-800 hover:bg-violet-950 hover:transition-all p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
                <button name={item.id} onClick={handleDelete} className='bg-violet-800 hover:bg-violet-950 hover:transition-all p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App;
