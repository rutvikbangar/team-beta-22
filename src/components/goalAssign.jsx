import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const wellnessExercises = [
  {
    title: "😀 Lets take break and have a Breathing Exercises",
    videoLink: "https://www.youtube.com/embed/wPoj5log_7M",
  },
  {
    title: "😀 Lets take break and have a Progressive Muscle Relaxation",
    videoLink: "https://www.youtube.com/embed/8T7AwQRP72w",
  },
  {
    title: "😀 Lets take break and have a Laughter Therapy",
    videoLink: "https://www.youtube.com/embed/CSCOad2sh5w",
  },
  {
    title: "😀 Lets take break and have a Peaceful Sound",
    videoLink: "https://www.youtube.com/embed/cI4ryatVkKw",
  }
];

const originalImageUrl = "https://i.pinimg.com/originals/c8/8a/c7/c88ac78ed012b6b98b634297c58c8c8f.gif";
const temporaryGifUrl = "https://gifdb.com/images/high/animated-cat-gif-file-2384kb-yl5va57ikcmp8wm7.gif"; 
const secondGifUrl = "https://media.tenor.com/SwQT4BBJS0oAAAAj/peach-and-goma-peach-goma.gif";

const flipAndScale = keyframes`
  0% {
    transform: rotateY(0) scale(1);
  }
  50% {
    transform: rotateY(-180deg) scale(1.5);
  }
  100% {
    transform: rotateY(-360deg) scale(1);
  }
`;

const GoalsPage = () => {
  const [goal, setGoal] = useState(null);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [animateImage, setAnimateImage] = useState(false);
  const [showTemporaryGif, setShowTemporaryGif] = useState(false);
  const [showFinalGif, setShowFinalGif] = useState(false);

  const handleCheckboxClick = () => {
    setAnimateImage(true);
    setShowTemporaryGif(true);
    setTimeout(() => {
      setShowTemporaryGif(false);
      setAnimateImage(false);
    }, 3000);
  };

  const handleTitleChange = (e) => setNewGoalTitle(e.target.value);
  const handleTaskChange = (e) => setNewTask(e.target.value);

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { description: newTask, completed: false }]);
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
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
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
      const randomExercise = wellnessExercises[Math.floor(Math.random() * wellnessExercises.length)];
      setVideoTitle(randomExercise.title);
      setVideoLink(randomExercise.videoLink);
      setShowVideo(true);
    }
    if (newCompletedCount === goal.tasks.length) {
      setShowFinalGif(true);
      setTimeout(() => setShowFinalGif(false), 10000);
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/users/goals/${goal._id}/${updatedTasks[taskIndex]._id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' , 'Authorization' : `Bearer ${localStorage.getItem('accessToken')}` },
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
    <GoalsAndImageContainer>
      <DropdownContainer>
        <Link to="/goalshistory">
          <DropdownButton>Goal History</DropdownButton>
        </Link>
        <Link to="/activegoals">
          <DropdownButton>Active Goals</DropdownButton>
        </Link>
      </DropdownContainer>

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
                          onChange={() => (toggleTaskCompletion(index), handleCheckboxClick())}
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
              <VideoTitle>{videoTitle}</VideoTitle>
              <VideoPlayer
                width="600"
                height="400"
                controls
                src={videoLink}
              />
              <CloseButton onClick={handleCloseVideo}>Close Video</CloseButton>
            </VideoContainer>
          </VideoModal>
        )}
      </GoalsContainer>

      <ImageBox animate={animateImage}>
        <img src={showFinalGif ? secondGifUrl : showTemporaryGif ? temporaryGifUrl : originalImageUrl} alt="Animated Image" />
      </ImageBox>
    </GoalsAndImageContainer>
  );
};

export default GoalsPage;

// Styled Components
// Styled Components
const GoalsAndImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  gap: 20px;
  background-color: white;
  width: 100%;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  gap: 20px;
  padding: 10px;
  border-radius:10%;
  background-color:#FCFAEE;
  width: 20%;
`;

const DropdownButton = styled.button`
  padding: 10px;
  background-color:#FCFAEE;
  color: #007bff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #006BFF;
    color: white;
  }
`;


const GoalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
  background-color: white;
  width: 70%;
  max-width: 980px;
`;

const ImageBox = styled.div`
  width: 300px;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  justify-content: space-between;
  align-items: center;
  font-size: 1em;
`;

const TaskCardContent = styled.div`
  flex-grow: 1;
`;

const TaskDescription = styled.div`
  color: #495057;
  font-size: 1.1em;
`;

const TaskInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskCoin = styled.div`
  color: #007bff;
  font-size: 1.2em;
`;

const CompletionCheckbox = styled.div`
  input {
    margin-left: 10px;
  }
`;

const VideoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VideoContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const VideoTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 15px;
`;

const VideoPlayer = styled.iframe`
  max-width: 100%;
  max-height: 500px;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  font-size: 1em;

  &:hover {
    background-color: #c82333;
  }
`;