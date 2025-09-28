import * as React from 'react';

interface SharedState {
  user: string | null;
  theme: 'light' | 'dark';
  sharedCounter: number;
}

interface SharedStateContextValue {
  state: SharedState;
  updateState: (newState: Partial<SharedState>) => void;
  sharedCounter: number;
  setSharedCounter: (counter: number | ((prev: number) => number)) => void;
}

const SharedStateContext = React.createContext<SharedStateContextValue | undefined>(undefined);

interface SharedStateProviderProps {
  children: React.ReactNode;
}

export function SharedStateProvider({ children }: SharedStateProviderProps) {
  const [state, setState] = React.useState<SharedState>({
    user: null,
    theme: 'light',
    sharedCounter: 0
  });

  const updateState = React.useCallback((newState: Partial<SharedState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  }, []);

  const setSharedCounter = React.useCallback((counter: number | ((prev: number) => number)) => {
    if (typeof counter === 'function') {
      setState(prevState => ({ ...prevState, sharedCounter: counter(prevState.sharedCounter) }));
    } else {
      setState(prevState => ({ ...prevState, sharedCounter: counter }));
    }
  }, []);

  const value = React.useMemo((): SharedStateContextValue => ({
    state,
    updateState,
    sharedCounter: state.sharedCounter,
    setSharedCounter
  }), [state, updateState, setSharedCounter]);

  return React.createElement(
    SharedStateContext.Provider,
    { value },
    children
  );
}

export function useSharedState() {
  const context = React.useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
}