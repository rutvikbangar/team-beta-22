import React, { useState } from 'react';
import styled from 'styled-components';

const GoalsPage = () => {
  const [goal, setGoal] = useState(null);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const handleTitleChange = (e) => setNewGoalTitle(e.target.value);
  const handleTaskChange = (e) => setNewTask(e.target.value);

  const addTask = () => {
    if (newTask) {
      setTasks([
        ...tasks,
        { description: newTask, completed: false },
      ]);
      setNewTask('');
    }
  };

  const createGoal = async () => {
    const goalData = {
      title: newGoalTitle,
      description: tasks.map((task) => task.description),
    };

    try {
      const response = await fetch('http://localhost:4000/api/v1/users/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) throw new Error('Failed to create goal');
      
      const data = await response.json();
      setGoal(data.data);

      const updatedTasks = data.data.tasks.map((task) => ({
        ...task,
        taskCoin: task.coin, 
      }));

      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleTaskCompletion = async (taskIndex) => {
    const updatedTasks = [...goal.tasks];
    updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;

    const newCompletedCount = updatedTasks.filter((task) => task.completed).length;
    setCompletedTaskCount(newCompletedCount);

    if (newCompletedCount % 2 === 0) {
      setShowVideo(true);
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/users/goals/${goal._id}/tasks/${updatedTasks[taskIndex]._id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: updatedTasks[taskIndex].completed }),
        }
      );
      if (!response.ok) throw new Error('Failed to update task status');
      
      setGoal((prevGoal) => ({
        ...prevGoal,
        tasks: updatedTasks,
        status: updatedTasks.filter((task) => task.completed).length / updatedTasks.length,
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseVideo = () => setShowVideo(false);

  const statusPercentage = goal ? Math.round((completedTaskCount / tasks.length) * 100) : 0;

  return (
    <GoalsContainer>
      <GoalForm>
        <Input
          type="text"
          placeholder="Enter Goal Title"
          value={newGoalTitle}
          onChange={handleTitleChange}
        />
        <Input
          type="text"
          placeholder="Enter Task Description"
          value={newTask}
          onChange={handleTaskChange}
        />
        <Button onClick={addTask}>Add Task</Button>
        <Button onClick={createGoal}>Create Goal</Button>
      </GoalForm>

      {goal && (
        <GoalCard>
          <GoalTitle>{goal.title}</GoalTitle>
          <GoalStatus>Status: {statusPercentage}%</GoalStatus>

          <ProgressBarContainer>
            <ProgressBar width={statusPercentage} />
          </ProgressBarContainer>

          <GoalDeadline>Deadline: {new Date(goal.deadline).toLocaleString()}</GoalDeadline>

          <TaskList>
            {goal.tasks.map((task, index) => (
              <TaskCard key={task._id} $completed={task.completed}>
                <TaskCardContent>
                  <TaskDescription>{task.description}</TaskDescription>
                  <TaskInfo>
                    <TaskCoin>{task.taskCoin} coins</TaskCoin>
                    <CompletionCheckbox>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(index)}
                        disabled={task.completed}
                      />
                    </CompletionCheckbox>
                  </TaskInfo>
                </TaskCardContent>
              </TaskCard>
            ))}
          </TaskList>
        </GoalCard>
      )}

      {showVideo && (
        <VideoModal>
          <VideoContainer>
            <VideoPlayer
              width="600"
              height="400"
              controls
              src="https://www.w3schools.com/html/mov_bbb.mp4"
            />
            <CloseButton onClick={handleCloseVideo}>Close Video</CloseButton>
          </VideoContainer>
        </VideoModal>
      )}
    </GoalsContainer>
  );
};

export default GoalsPage;

// Styled Components
const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  background-color: 'white';
  width: 100%;
  max-width: 1200px;
`;

const GoalForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const GoalCard = styled.div`
  background-color: #ffffff;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`;

const GoalTitle = styled.h3`
  color: #007bff;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const GoalStatus = styled.div`
  font-size: 1em;
  color: #343a40;
  margin-top: 8px;
`;

const GoalDeadline = styled.div`
  font-size: 1em;
  color: #6c757d;
  margin-top: 8px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 20px;
  height: 20px;
  margin-top: 10px;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${({ width }) => width}%;
  background-color: #28a745;
  border-radius: 20px;
  transition: width 0.3s ease;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
`;

const TaskCard = styled.div`
  background-color: ${({ $completed }) => ($completed ? '#d4edda' : '#ffffff')};
  border: 1px solid #ccc;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
`;

const TaskCardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const TaskDescription = styled.div`
  font-size: 1.1em;
  color: #343a40;
`;

const TaskInfo = styled.div`
  margin-top: 10px;
  font-size: 1em;
  color: #6c757d;
`;

const TaskCoin = styled.span`
  font-size: 1.1em;
  color: #28a745;
  font-weight: bold;
`;

const CompletionCheckbox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VideoContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

const VideoPlayer = styled.video`
  border-radius: 10px;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #ff4d4d;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #e60000;
  }
`;
