import React, { useEffect, useState } from 'react';

export const ActiveGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch goals from backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/users/goals', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        });
        const data = await response.json();
        setGoals(data.data); // Assuming 'data.data' contains the array of goals
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const handleTaskCompletion = async (goalId, taskId, completed) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/users/goals/${goalId}/${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ completed }),
      });
      if (response.ok) {
        // Update the task status in the UI
        setGoals(prevGoals =>
          prevGoals.map(goal =>
            goal._id === goalId
              ? {
                  ...goal,
                  tasks: goal.tasks.map(task =>
                    task._id === taskId ? { ...task, completed } : task
                  ),
                }
              : goal
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading goals...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Active Goals</h2>
      <div className="grid gap-6 w-full max-w-5xl">
        {goals.map(goal => (
          <div key={goal._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-500">{goal.title}</h3>
            <p className="text-gray-600 mb-2">Status: {Math.round(goal.status * 100)}%</p>
            <ul className="list-disc pl-6 mb-4">
              {goal.tasks.map(task => (
                <li key={task._id} className={`text-lg ${task.completed ? 'text-green-500' : 'text-gray-700'}`}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskCompletion(goal._id, task._id, !task.completed)}
                      className="form-checkbox h-5 w-5 text-blue-500 rounded"
                    />
                    <span>{task.description} {task.completed && <span className="ml-2">(Completed)</span>}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
