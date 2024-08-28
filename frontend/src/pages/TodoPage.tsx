import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo } from '../stores/todo';

const TodoPage = () => {
  const [todo, setTodo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const todos = useSelector((state: any) => state.todo.todos);
  const [currentPage, setCurrentPage] = useState(todos.length > 0 ? 1 : 0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todos.length === 0) {
      setCurrentPage(0);
    } else {
      setCurrentPage(1);
    }
  }, [todos]);

  const handleAddTodo = () => {
    if (todo.trim() === '') return;
    dispatch(addTodo({
      id: Date.now(),
      title: todo,
      completed: false,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString()
    }));
    setTodo('');
    setIsModalOpen(false);
  }

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  }

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
  }

  const truncateTitle = (title: string) => {
    return title.length > 40 ? title.substring(0, 40) + '...' : title;
  }

  // Pagination logic
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / itemsPerPage);

  return (
    <div className='flex flex-col justify-center items-center pt-32 gap-4'>
      <h1 className="text-4xl pb-4 font-bold mb-4">Your tasks</h1>

      {todos.length > 0 && (
        <>
          <div className='w-3/4'>
            <table className='min-w-full bg-white table-fixed'>
              <thead>
                <tr>
                  <th className='py-2 w-2/5'>Task</th>
                  <th className='py-2 w-1/5'>Start Date</th>
                  <th className='py-2 w-1/5'>End Date</th>
                  <th className='py-2 w-1/10'>Status</th>
                  <th className='py-2 w-1/10'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTodos && currentTodos.length > 0 ? (
                  currentTodos.map((todo: any) => (
                    <tr key={todo.id} className='text-center'>
                      <td className='border px-4 py-2 w-1/4 truncate'>{truncateTitle(todo.title)}</td>
                      <td className='border px-4 py-2 w-1/5'>{formatDate(todo.startDate)}</td>
                      <td className='border px-4 py-2 w-1/5'>{formatDate(todo.endDate)}</td>
                      <td className='border px-4 py-2 w-1/10'>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggleTodo(todo.id)}
                        />
                      </td>
                      <td className='border px-4 py-2 w-1/10'>
                        <button
                          className='text-red-500'
                          onClick={() => handleRemoveTodo(todo.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className='text-center py-4'>No todos available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || todos.length === 0}
              className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              {`<<`}
            </button>
            <span className="px-4 py-2 mx-1">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || todos.length === 0}
              className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
            >
              {`>>`}
            </button>
          </div>
        </>
      )}

      {/* No tasks message */}
      {todos.length === 0 && (
        <div className='text-center mb-4'>
          <p>You have no tasks available.</p>
        </div>
      )}
    
      {/* Open Modal Button */}
      <button
        className="bg-cream hover:bg-darkGreen hover:text-cream text-darkGray font-bold py-2 px-4 w-3/4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => setIsModalOpen(true)}
      >
        Add Task
      </button>

      {/* Todo Modal */}
      {isModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-4 w-1/3'>
            <h2 className='text-2xl font-bold'>Add a new task</h2>
            <input
              type='text'
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className='w-full border border-gray-300 p-2 mt-2'
            />
            <button
              className='bg-blue-500 text-white px-4 py-2 mt-4'
              onClick={handleAddTodo}
            >
              Add Task
            </button>
            <button
              className='bg-red-500 text-white px-4 py-2 mt-4'
              onClick={() => setIsModalOpen(false)}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoPage;