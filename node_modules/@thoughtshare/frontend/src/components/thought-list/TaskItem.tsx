import React from 'react';

interface Props {
  task: string;
  index: number;
  onRemove: (index: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, index, onRemove }) => {
  return (
    <div className="task-item">
      <span>{task}</span>
      <button 
        onClick={() => onRemove(index)} 
        className="remove-task-button"
      >
        Remove
      </button>
    </div>
  );
};

export default TaskItem;