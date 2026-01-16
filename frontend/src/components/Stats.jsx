import React from 'react';

const Stats = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  
  const isOverdue = (deadline) => {
    if (!deadline) return false;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    return deadlineDate < today;
  };
  
  const overdue = todos.filter(t => !t.completed && isOverdue(t.deadline)).length;

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-blue-600">{total}</p>
          <p className="text-sm text-gray-600">Total</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">{completed}</p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-600">{overdue}</p>
          <p className="text-sm text-gray-600">Overdue</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
