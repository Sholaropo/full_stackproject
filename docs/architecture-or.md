# Architecture Documentation

**Name:** Olusola Ropo  
**Date:** October 2025  
**Project:** ThoughtShare

---

## Architecture Overview

I organized my code into three layers:
- **Components** - UI and user interactions
- **Service** - Business logic and rules
- **Repository** - Data access and storage

---

## thoughtService.ts

### What does it do?
Handles business logic for thoughts - validation, formatting, sorting, and searching.

### Why organize it this way?
I separated business rules from UI components so:
- Validation rules (max 500 chars) are in one place
- Date formatting is reusable across components
- Logic changes don't break the UI

### Key functions:
- **validateThought()** - Checks content isn't empty and under 500 characters
- **formatTimestamp()** - Changes dates from "2025-10-22" to "5m ago"
- **sortByPopularity()** - Orders by most likes
- **sortByTimestamp()** - Orders by newest first
- **searchThoughts()** - Filters by search term

### Where used:
- ThoughtList: search, sort, fetch
- ThoughtCard: format timestamps  
- PostThoughts: validate and create

---

## thoughtRepository.ts

### What does it do?
Manages data access with CRUD operations (Create, Read, Update, Delete).

### Why organize it this way?
Components don't need to know where data comes from. I can switch from test data to a real API without changing other code.

### Key functions:
- **createThought()** - Add new thought
- **getAllThoughts()** - Get all thoughts
- **getThoughtById()** - Get one thought
- **updateThought()** - Modify thought
- **deleteThought()** - Remove thought

### Where used:
Service calls repository:
```
ThoughtList -> thoughtService.fetchAllThoughts() -> thoughtRepository.getAllThoughts() -> mockData.ts
```

---

## Test Data

Using **mockData.ts** with 11 thoughts (5 partner posts + 6 community posts).

---

## Benefits

- **Easy debugging** - Know which layer has the problem
- **Easy updates** - Change one layer without breaking others
- **Reusable code** - Same functions work in multiple components
- **Team friendly** - Work on different layers without conflicts