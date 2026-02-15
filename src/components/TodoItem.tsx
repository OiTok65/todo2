import React, { useState } from 'react';
import { Todo, Priority } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: Priority, dueDate: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim(), editPriority, editDueDate);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate);
    setIsEditing(false);
  };

  const getPriorityLabel = (priority: Priority) => {
    const labels = { high: '高', medium: '中', low: '低' };
    return labels[priority];
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP');
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="edit-input"
          autoFocus
        />
        <select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value as Priority)}
          className="edit-priority"
        >
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
          className="edit-date"
        />
        <div className="edit-actions">
          <button onClick={handleSave} className="save-button">保存</button>
          <button onClick={handleCancel} className="cancel-button">キャンセル</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority} ${isOverdue() ? 'overdue' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      <div className="todo-content">
        <span className="todo-text">{todo.text}</span>
        <div className="todo-meta">
          <span className={`priority-badge priority-${todo.priority}`}>
            {getPriorityLabel(todo.priority)}
          </span>
          {todo.dueDate && (
            <span className={`due-date ${isOverdue() ? 'overdue' : ''}`}>
              期限: {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="edit-button">編集</button>
        <button onClick={() => onDelete(todo.id)} className="delete-button">削除</button>
      </div>
    </div>
  );
};
