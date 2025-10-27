# Architectural Layout Document - Amandeep Kaur (AK)

This document explains the architecture of the **Thoughts feature** implemented in the project, covering the custom hook, service layer, and repository layer.

## 1. Custom Hook: `useThoughts`

### What does this hook do?
`useThoughts` is a custom React hook that manages the state of thoughts in components.  
It provides functions to:
- Fetch all thoughts
- Add a new thought
- Like a thought
- Delete a thought  

It also handles error state for failed operations.

### Why this logic is included & separation of concerns
- Centralizes state management for thoughts in one place.
- Keeps components clean by separating **UI logic** from **data logic**.
- Interacts only with the service layer, not directly with the repository.

### Where it is used
- Used in components like `PostThoughts.tsx` to display, add, like, and remove thoughts.


## 2. Service: `PostThoughtService`

### What does this service do?
`PostThoughtService` acts as an **intermediary layer** between components/hooks and the repository.  
It provides functions to:
- Fetch all thoughts
- Add a new thought
- Increment likes for a thought
- Delete a thought

### Why this logic is included & separation of concerns
- Handles all the data-related work for thoughts.
- Components and hooks don’t need to know how data is stored or managed.
- Makes sure all operations on thoughts go through one place.

### Where it is used
- Called by `useThoughts` to perform CRUD operations on thoughts.
- Components only call the hook, which in turn calls these service functions.


## 3. Repository: `PostThoughtRepository`

### What does this repository do?
`PostThoughtRepository` provides direct access to the **test data** (`testThoughts`) and implements CRUD operations:
- Get all thoughts
- Get a thought by ID
- Create a new thought
- Update likes
- Delete a thought

### Why this logic is included & separation of concerns
- Puts all data handling in one place.
- Hides where the data comes from (for now, just test data) from the rest of the app
- Makes it easier to replace test data with a real backend in the future.

### Where it is used
- Used by `PostThoughtService` to fetch and modify thoughts.
- Components/hooks never call the repository directly.


## Summary

The **Thoughts feature architecture** separates concerns into three layers:
1. **Repository**: Handles data access and persistence.
2. **Service**: Encapsulates business logic and interacts with the repository.
3. **Custom Hook**: Manages state and provides a clean interface for components.  

This structure improves **maintainability, testability, and reusability**.
