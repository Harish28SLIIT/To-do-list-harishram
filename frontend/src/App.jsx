import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import './App.css';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTodo) {
        await axios.put(`${API_URL}/${editingTodo._id}`, formData);
        setEditingTodo(null);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchTodos();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleToggle = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/${id}`, { completed });
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Todo Application
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Stay organized and boost your productivity
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {editingTodo ? 'Edit Todo' : 'Add New Todo'}
          </h2>
          <TodoForm onSubmit={handleSubmit} initialData={editingTodo || {}} />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                <p className="text-xl text-gray-600">No todos yet. Add one above!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onToggle={handleToggle}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
