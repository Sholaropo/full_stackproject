import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import ThoughtCard from './ThoughtCard';
import TaskItem from './TaskItem';
import { useThoughts } from '../../hooks/useThoughtsList';
import * as thoughtService from '../../services/thoughtService';
import './ThoughtList.css';

const ThoughtList: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'timestamp' | 'popularity'>('timestamp');

  const { thoughts: repositoryThoughts, loading, error, likeThought } = useThoughts();

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleLike = async (id: string) => {
    try {
      await likeThought(id);
      
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        return newSet;
      });
    } catch (error) {
      console.error('Failed to like thought:', error);
    }
  };

  const allThoughts = repositoryThoughts;
  const searchedThoughts = thoughtService.searchThoughts(allThoughts, searchTerm);
  const sortedThoughts =
    sortBy === 'popularity'
      ? thoughtService.sortByPopularity(searchedThoughts)
      : thoughtService.sortByTimestamp(searchedThoughts);

  if (loading) {
    return (
      <section className="thought-list">
        <p>Loading thoughts...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="thought-list">
        <p>Error: {error}</p>
      </section>
    );
  }

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
            <div key={thought.id}>
              <SignedIn>
                <ThoughtCard
                  thought={thought}
                  isLiked={likedPosts.has(thought.id)}
                  onLike={() => handleLike(thought.id)}
                />
              </SignedIn>
              <SignedOut>
                <ThoughtCard
                  thought={thought}
                  isLiked={false}
                  onLike={() => {}}
                />
                <div className="auth-prompt">
                  <SignInButton mode="modal">
                    <button className="sign-in-to-like-button">
                      Sign in to like this thought
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ThoughtList;