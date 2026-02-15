import React, { useState, FormEvent } from 'react';
import { Priority } from '../types';

interface TodoFormProps {
  onAdd: (text: string, priority: Priority, dueDate: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority, dueDate);
      setText('');
      setPriority('medium');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="todo-input"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">優先度:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="priority-select"
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">期限:</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="date-input"
          />
        </div>

        <button type="submit" className="add-button">
          追加
        </button>
      </div>
    </form>
  );
};
