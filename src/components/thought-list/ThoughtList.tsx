import React, { useState, useEffect } from 'react';
import type { Thought } from '../../types';
import ThoughtCard from './ThoughtCard';
import TaskItem from './TaskItem';
import * as thoughtService from '../../services/thoughtService';
import './ThoughtList.css';

interface Props {
  thoughts: Thought[];
}

const ThoughtList: React.FC<Props> = ({ thoughts: sharedThoughts }) => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'timestamp' | 'popularity'>('timestamp');
  
  const [repositoryThoughts, setRepositoryThoughts] = useState<Thought[]>([]);

  useEffect(() => {
    const fetchedThoughts = thoughtService.fetchAllThoughts();
    setRepositoryThoughts(fetchedThoughts);
  }, []);

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

  const allThoughts = [...repositoryThoughts, ...sharedThoughts];

  const searchedThoughts = thoughtService.searchThoughts(allThoughts, searchTerm);
  
  const sortedThoughts = sortBy === 'popularity'
    ? thoughtService.sortByPopularity(searchedThoughts)
    : thoughtService.sortByTimestamp(searchedThoughts);

  return (
    <section className="thought-list">
      <h2>Latest Thoughts</h2>

      <div className="search-sort-controls">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by content or author..."
          className="search-input"
        />
        
        <div className="sort-buttons">
          <button 
            onClick={() => setSortBy('timestamp')}
            className={sortBy === 'timestamp' ? 'active' : ''}
          >
            Latest
          </button>
          <button 
            onClick={() => setSortBy('popularity')}
            className={sortBy === 'popularity' ? 'active' : ''}
          >
             Most Liked
          </button>
        </div>
      </div>

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
        {sortedThoughts.length === 0 ? (
          <p className="no-results">
            No thoughts found matching "{searchTerm}"
          </p>
        ) : (
          sortedThoughts.map((thought) => (
            <ThoughtCard
              key={thought.id + thought.author}
              thought={thought}
              isLiked={likedPosts.has(thought.id + thought.author)}
              onLike={handleLike}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default ThoughtList;