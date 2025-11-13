import React, { useState } from 'react';

const SharedCounter: React.FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  const handleReset = () => {
    setCounter(0);
    setMessage('');
  };

  return (
    <section className="shared-counter">
      <h2>Shared Counter</h2>
      
      <div className="counter-display">
        <p className="counter-value">Counter: {counter}</p>
      </div>

      <div className="counter-controls">
        <button onClick={handleIncrement} className="btn-increment">
          Increment
        </button>
        <button onClick={handleDecrement} className="btn-decrement">
          Decrement
        </button>
        <button onClick={handleReset} className="btn-reset">
          Reset
        </button>
      </div>

      <div className="message-section">
        <label htmlFor="message-input">Shared Message:</label>
        <input
          id="message-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a shared message..."
          className="message-input"
        />
        <p className="message-display">
          <strong>Current Message:</strong> {message || 'No message yet'}
        </p>
      </div>
    </section>
  );
};

export default SharedCounter;