/* TodoItem.js */
import React from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleTodo}
      />
      <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
      <button onClick={deleteTodo} className="delete-btn">Delete</button>
    </div>
  );
};

export default TodoItem;
