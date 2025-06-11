const TodoItem = ({ todo, onDelete, onEdit, onToggle }) => {
  return (
    <div className="bg-white shadow-md rounded px-6 py-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.title}
          </h3>
          <p className={`mt-1 ${todo.completed ? 'text-gray-500' : 'text-gray-600'}`}>
            {todo.description}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggle(todo._id, !todo.completed)}
            className={`px-3 py-1 rounded ${
              todo.completed
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white`}
          >
            {todo.completed ? 'Completed' : 'Mark Complete'}
          </button>
          <button
            onClick={() => onEdit(todo)}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem; 