import React, { useEffect, useState } from 'react';

const GoalHistoryPage = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/users/goals/history', {
            method:"get",
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        });
        
        
        
        const data = await response.json();
        setGoals(data.data)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Goal History</h1>
      <div className="grid gap-6 w-full max-w-5xl">
        {goals.map((goal) => (
          <div
            key={goal._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-blue-500">{goal.title}</h2>
            <p className="text-gray-600 mb-2">Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-4">Status: {Math.round(goal.status * 100)}%</p>
            <ul className="list-disc pl-6">
              {goal.tasks.map((task) => (
                <li key={task._id} className={`text-lg ${task.completed ? 'text-green-500' : 'text-gray-700'}`}>
                  {task.description} {task.completed && <span className="ml-2">(Completed)</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalHistoryPage;
