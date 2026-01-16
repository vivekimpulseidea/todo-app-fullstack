import React, { useState } from 'react';
import { Trash2, Check } from 'lucide-react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || '');
  const [isLoading, setIsLoading] = useState(false);

  const isOverdue = (deadline) => {
    if (!deadline) return false;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    return deadlineDate < today;
  };

  const isToday = (deadline) => {
    if (!deadline) return false;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate.toDateString() === today.toDateString();
  };

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await onUpdate(todo.id, { completed: !todo.completed });
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;
    
    setIsLoading(true);
    try {
      await onUpdate(todo.id, {
        text: editText.trim(),
        deadline: editDeadline || null,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setEditDeadline(todo.deadline || '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsLoading(true);
      try {
        await onDelete(todo.id);
      } catch (error) {
        console.error('Error deleting todo:', error);
        setIsLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        todo.completed 
          ? 'bg-gray-50 border-gray-200' 
          : isOverdue(todo.deadline)
          ? 'bg-red-50 border-red-200'
          : isToday(todo.deadline)
          ? 'bg-yellow-50 border-yellow-200'
          : 'bg-white border-gray-200'
      }`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSaveEdit}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-green-400"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors disabled:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleComplete}
            disabled={isLoading}
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 hover:border-green-500'
            } disabled:opacity-50`}
          >
            {todo.completed && <Check size={16} className="text-white" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <p className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {todo.text}
            </p>
            {todo.deadline && (
              <p className={`text-sm mt-1 ${
                todo.completed
                  ? 'text-gray-400'
                  : isOverdue(todo.deadline)
                  ? 'text-red-600 font-semibold'
                  : isToday(todo.deadline)
                  ? 'text-yellow-700 font-semibold'
                  : 'text-gray-500'
              }`}>
                Due: {formatDate(todo.deadline)}
                {isOverdue(todo.deadline) && !todo.completed && ' - Overdue!'}
                {isToday(todo.deadline) && !todo.completed && ' - Due today!'}
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
