/* App.js */
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on page load
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (text) => {
    const newTodo = { text, completed: false };
    setTodos([...todos, newTodo]);
  };

  // Toggle completion of a single todo
  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Delete a single todo
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Check All - Marks all items as completed or uncompleted
  const toggleAllTodos = (event) => {
    const completed = event.target.checked;
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed,
    }));
    setTodos(updatedTodos);
  };

  // Delete All - Clears all tasks
  const deleteAllTodos = () => {
    setTodos([]);
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />

      {/* Check All and Delete All Buttons */}
      {todos.length > 0 && (
        <div className="controls">
          <label>
            <input
              type="checkbox"
              onChange={toggleAllTodos}
              checked={todos.length > 0 && todos.every((todo) => todo.completed)}
            />
            Check All
          </label>
          <button className="delete-all-btn" onClick={deleteAllTodos}>
            Delete All
          </button>
        </div>
      )}

      {/* Todo List */}
      <div className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            toggleTodo={() => toggleTodo(index)}
            deleteTodo={() => deleteTodo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
