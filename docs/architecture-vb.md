# User Management Architecture - Assignment 3

**Student:** Vandana Bhangu  
**Course:** Full Stack Development  
**Assignment:** Module 3 - Layered Architecture  
**Date:** October 2025

---

## My Implementation Approach

For this assignment, I built a user management system using layered architecture. Here's how I organized my code:

### Layer Structure
1. **Repository** - Data storage and retrieval
2. **Service** - Business rules and validation  
3. **Custom Hook** - React state management
4. **Component** - User interface

---

## Custom Hook Implementation

### What I Built
Created `useUserData` hook to manage user data in React components.

### My Design Decisions
- Put user state in a hook so multiple components can share it
- Hook handles the React state, components just use the data
- Makes it easy to update user info across the app
- I copied this pattern from some online tutorial

### Functions I Added
- `useUserData()` - Main hook that returns user data
- `getUserByUsernameHook()` - Find specific user
- `getUserCount()` - Count total users

### How It's Used
ThoughtsFeed component uses this hook to get user information and display user counts.

---

## Service Layer Implementation

### What I Built
Created `UserService` class to handle user business logic.

### My Design Decisions
- Separated validation rules from components
- Put all user-related business logic in one place
- Service validates data before saving
- I had to google how to make static methods

### Functions I Added
- `validateUser()` - Check username and email format 
- `createUser()` - Add new user with validation
- `getUserByUsername()` - Find user by name
- `searchUsers()` - Search through users
- `getTotalUserCount()` - Count all users
- `getAverageFollowerCount()` - Calculate average followers 

### How It's Used
ThoughtsFeed calls service methods to get user data with proper validation.

---

## Repository Implementation

### What I Built
Created `UserRepository` to handle all data operations.

### My Design Decisions
- Components don't know where data comes from
- Can easily switch from test data to real database later
- Repository handles all CRUD operations
- I used an array instead of a real database because I don't know how to set that up.

### Functions I Added
- `createUser()` - Add new user
- `getAllUsers()` - Get all users
- `getUserById()` - Find user by ID
- `getUserByUsername()` - Find user by username
- `updateUser()` - Edit user info
- `deleteUser()` - Remove user
- `searchUsers()` - Search users

### How It's Used
Service layer calls repository methods to get data from test data file.

---

## Data Flow in My Code

```
ThoughtsFeed Component
    ↓ calls
useUserData Hook  
    ↓ calls
UserService
    ↓ calls  
UserRepository
    ↓ reads
userTestData.ts (12 sample users)
```

---

## Test Data Setup

I created `userTestData.ts` with 12 sample users including:
- Different follower counts 
- Some verified users 
- Realistic usernames and emails
- Various join dates
---

## What I Learned From This Assignment

Building this layered architecture taught me several important things:

### Benefits I Discovered
- **Clear separation** - Each file has one specific purpose
- **Easy maintenance** - When something breaks, I know exactly where to look
- **Code reuse** - The same hook and service can be used by multiple components
- **Team collaboration** - Different team members can work on different layers without conflicts

### Challenges I Faced
- **Initial complexity** - Setting up all the layers seemed overwhelming at first
- **Understanding flow** - Figuring out how data moves between layers took some time
- **Testing approach** - Had to learn how to test each layer separately
- **TypeScript errors** - I kept getting type errors and had to ask for help
- **Import/export** - I kept forgetting to export functions and then wondering why they didn't work

### Future Improvements
- **Error handling** - Could add better error messages for users
- **Loading states** - Add loading indicators when fetching data
- **Real database** - Replace test data with actual database calls 
- **More validation** - Add more business rules as the app grows
- **Better testing** - I should probably write actual tests instead of just checking manually

This assignment helped me understand why professional developers use layered architecture - it makes code much more organized and maintainable!