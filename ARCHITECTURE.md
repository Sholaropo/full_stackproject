# ThoughtShare - Architectural Layout Document

## Overview
This document describes the layered architecture implementation for the ThoughtShare application, focusing on the User management system implemented for Assignment 3.

## Architecture Layers

### 1. Repository Layer (Data Access)
**File:** `src/repositories/userRepository.ts`

**Purpose:** Handles all data access operations for User resources.

**Key Functions:**
- `createUser()` - Creates a new user
- `getAllUsers()` - Retrieves all users
- `getUserById()` - Gets user by ID
- `getUserByUsername()` - Gets user by username
- `updateUser()` - Updates existing user
- `deleteUser()` - Deletes a user
- `searchUsers()` - Searches users by query
- `sortUsers()` - Sorts users by criteria
- `filterUsersByFollowerCount()` - Filters users by follower count

**Data Source:** Uses test data from `src/data/userTestData.ts`

### 2. Service Layer (Business Logic)
**File:** `src/services/userService.ts`

**Purpose:** Contains business rules, validation, and orchestrates repository calls.

**Key Functions:**
- `validateUser()` - Validates user data
- `createUser()` - Creates user with validation
- `getAllUsers()` - Gets all users
- `getUserByUsername()` - Gets user by username
- `updateUser()` - Updates user with validation
- `deleteUser()` - Deletes user
- `searchUsers()` - Searches with business rules
- `getTotalUserCount()` - Gets user count
- `getVerifiedUsers()` - Gets verified users
- `getAverageFollowerCount()` - Calculates average followers

### 3. Custom Hook Layer (State Management)
**File:** `src/hooks/useUserData.ts`

**Purpose:** Manages user-related state and provides reusable logic to components.

**Key Functions:**
- `useUserData()` - Custom hook that returns:
  - `users` - Array of all users
  - `getUserByUsernameHook()` - Function to get user by username
  - `getUserCount()` - Function to get total user count

### 4. Component Layer (Presentation)
**File:** `src/components/thoughts-feed/ThoughtsFeed.tsx`

**Purpose:** Handles UI rendering and user interactions.

**Architecture Integration:**
- Uses `useUserData()` hook for user data management
- Calls `UserService.getUserByUsername()` for business logic
- Repository methods are called through the service layer

## Data Flow

```
Component (ThoughtsFeed)
    ↓
Custom Hook (useUserData)
    ↓
Service Layer (UserService)
    ↓
Repository Layer (UserRepository)
    ↓
Test Data (userTestData.ts)
```

## File Structure

```
src/
├── components/
│   └── thoughts-feed/
│       └── ThoughtsFeed.tsx          # Main component using architecture
├── hooks/
│   └── useUserData.ts                # Custom hook for user data
├── services/
│   └── userService.ts                # Business logic layer
├── repositories/
│   └── userRepository.ts             # Data access layer
├── data/
│   └── userTestData.ts               # Test data (12 sample users)
└── types/
    └── index.ts                      # TypeScript interfaces
```

## Type Definitions

### User Interface
```typescript
interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  joinDate: Date;
  thoughtCount: number;
  followerCount: number;
  followingCount: number;
  bio?: string;
  isVerified?: boolean;
}
```

## Implementation Details

### Repository Pattern
- All external data access goes through repository methods
- Repository uses in-memory array for test data
- Methods return copies of data to prevent direct modification

### Service Pattern
- Business logic and validation centralized
- Service methods call repository methods
- Error handling and data transformation

### Custom Hook Pattern
- Reusable state management logic
- Abstracts component from direct service calls
- Provides consistent interface for components

### Component Integration
- Components use hooks for state management
- Business logic accessed through service layer
- No direct repository calls from components

## Test Data

**File:** `src/data/userTestData.ts`
- Contains 12 sample User objects
- Includes realistic user data with various follower counts
- Some users marked as verified
- Helper functions for data manipulation

## Benefits of This Architecture

1. **Separation of Concerns:** Each layer has a specific responsibility
2. **Reusability:** Hooks and services can be used by multiple components
3. **Testability:** Each layer can be tested independently
4. **Maintainability:** Changes in one layer don't affect others
5. **Scalability:** Easy to replace test data with real database calls

## Future Enhancements

- Replace test data with actual database calls
- Add error handling and loading states
- Implement caching in repository layer
- Add more business rules in service layer
- Create additional custom hooks for different data types

## Assignment Requirements Met

✅ **I.1:** Repository with CRUD methods for User resource
✅ **I.2:** Test data with 12+ User objects
✅ **I.3:** Component using Hook → Service → Repository
✅ **I.4:** This architectural documentation

---

*This document demonstrates the implementation of layered architecture in the ThoughtShare application for Assignment 3.*
