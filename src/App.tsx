import { useMemo, useState } from 'react';
import { Todo, FilterType, Priority } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterButtons } from './components/FilterButtons';
import './App.css';

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string, priority: Priority, dueDate: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string, priority: Priority, dueDate: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text, priority, dueDate } : todo
      )
    );
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  }), [todos]);

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>TODO アプリ</h1>
          <p className="subtitle">タスクを管理しましょう</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <FilterButtons
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {counts.all > 0 && (
          <div className="stats">
            {counts.active} 件のタスクが未完了
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
