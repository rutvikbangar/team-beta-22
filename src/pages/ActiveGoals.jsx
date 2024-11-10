import React, { useEffect, useState } from 'react';

export const ActiveGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch goals from backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/users/goals',{
            headers:{'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`}
        });
        const data = await response.json();
        setGoals(data);
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
      const response = await fetch(`http://localhost:4000/api/v1/users/goals/${goalId}/tasks/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Authorization' : `Bearer ${localStorage.getItem('accessToken')}` },
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

  if (loading) return <p>Loading goals...</p>;

  return (
    <div>
      <h2>Active Goals</h2>
      {goals.map(goal => (
        <div key={goal._id}>
          <h3>{goal.title}</h3>
          <ul>
            {goal.tasks.map(task => (
              <li key={task._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskCompletion(goal._id, task._id, !task.completed)}
                  />
                  {task.description}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};


