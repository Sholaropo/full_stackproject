import React, { useState } from 'react';
import type { Thought } from '../../types';
import { partnerPosts } from '../../data/mockData';
import ThoughtCard from './ThoughtCard';
import TaskItem from './TaskItem';
import './ThoughtList.css';

interface Props {
  thoughts: Thought[];
}

const ThoughtList: React.FC<Props> = ({ thoughts: sharedThoughts }) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleLike = (id: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const allThoughts = [...partnerPosts, ...sharedThoughts];

  return (
    <section className="thought-list">
      <h2>Latest Thoughts</h2>

      <div className="task-manager">
        <h3>My Task Manager</h3>
        <div className="task-input-container">
          <input 
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a new task..."
            className="task-input"
          />
          <button 
            onClick={handleAddTask} 
            className="add-task-button"
          >
            Add Task
          </button>
        </div>
        
        <div className="task-list">
          <h4>Tasks ({tasks.length})</h4>
          {tasks.length === 0 ? (
            <p>No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                index={index}
                onRemove={handleRemoveTask}
              />
            ))
          )}
        </div>
      </div>

      <div className="thoughts-container">
        {allThoughts.map((thought) => (
          <ThoughtCard
            key={thought.id + thought.author}
            thought={thought}
            isLiked={likedPosts.has(thought.id + thought.author)}
            onLike={handleLike}
          />
        ))}
      </div>
    </section>
  );
};

export default ThoughtList;