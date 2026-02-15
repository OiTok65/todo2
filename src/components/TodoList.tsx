import React from 'react';
import { Todo, Priority } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: Priority, dueDate: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return <div className="empty-state">タスクがありません</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
