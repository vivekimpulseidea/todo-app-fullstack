import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdate, onDelete, isLoading }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading todos...</p>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-400 text-center py-8">
          No todos yet. Add one above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Tasks ({activeTodos.length} remaining)
      </h2>
      
      <div className="space-y-3">
        {/* Active todos first */}
        {activeTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
        
        {/* Completed todos */}
        {completedTodos.length > 0 && (
          <>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                Completed ({completedTodos.length})
              </h3>
            </div>
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;
