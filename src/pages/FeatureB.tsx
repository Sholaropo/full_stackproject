import * as React from 'react';
import { useSharedState } from '../SharedStateContext';

const FeatureB: React.FC = () => {
  const { sharedCounter, setSharedCounter } = useSharedState();

  const increment = () => {
    setSharedCounter((prev: number) => prev + 1);
  };

  const decrement = () => {
    setSharedCounter((prev: number) => prev - 1);
  };

  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Feature B - Shared Counter'),
    React.createElement('p', null, `Counter: ${sharedCounter}`),
    React.createElement('button', { onClick: increment }, '+'),
    React.createElement('button', { onClick: decrement }, '-')
  );
};

export default FeatureB;