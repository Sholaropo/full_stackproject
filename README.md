# ThoughtShare

A platform that allows users to share their thoughts like Twitter (X).

## Project Team

**Team Name:** The Page Turners

**Team Members:**
- Olusola Ropo
- Amandeep Kaur  
- Vandana Bhangu

## Team Member Contributions

### Olusola Ropo
- **T.1 Git Repository Setup (P0)**: Set up the project Git repository with proper branch protection rules
  - Configured repository with main and develop branch protection
  - Implemented branch rules preventing direct pushes to main and develop branches
  - Set up pull request requirements with team member approval workflow
  - Added all team members and instructor as collaborators
- **Component Development**: Created core UI components
  - **ThoughtList Component**: Built the main thoughts display component with sample data
  - **Footer Component**: Developed the application footer with team information and social links

### Amandeep Kaur
- **T.4 App Integration (P2)**: Implemented the main application component integration
  - Created and configured the main App.tsx component
  - Integrated all required components (ThoughtList, Footer, Thoughts Feed)
  - Implemented application title display in header
  - Added group member names display in footer
  - Ensured HTML follows accessibility principles with no Axe DevTools warnings
- **Component Development**: Created user interaction components
  - **Post Thoughts Component**: Built the functionality for users to create and submit new thoughts

### Vandana Bhangu
- **T.3 Project README (P1)**: Created and maintained project documentation
  - Developed comprehensive README.md with proper markdown structure
  - Documented team information and project description
  - Defined high-level user stories for project functionality
  - Maintained project documentation and setup instructions
- **Component Development**: Created content display components
  - **Thoughts Feed Component**: Built the main feed functionality for displaying and managing thoughts

### Collaborative Work
- **T.5 App Stylesheet (P2)**: All team members contributed to styling
  - Developed cohesive color palette and design system
  - Implemented responsive design across all components
  - Created modern, accessible UI components
  - Ensured consistent styling and user experience

## Project General Description

ThoughtShare is a social platform designed to help users express and share their thoughts with a community. The application provides a Twitter-like experience where users can post, view, and interact with thoughts from other community members.

### High-Level User Stories

1. **As a user, I want to be able to view a feed of thoughts from other users, so that I can discover interesting content and perspectives from the community.**

2. **As a user, I want to be able to post my own thoughts with text content, so that I can share my ideas and experiences with others.**

3. **As a user, I want to be able to like thoughts from other users, so that I can show appreciation for content that resonates with me.**

Local Setup (T.5 Requirement)
1. Create a PostgreSQL Database

Create an empty PostgreSQL database locally.
Example connection string:
postgres://username:password@localhost:5432/thoughtshare

2. Create a Clerk Account + Project

Go to Clerk.com → create an account
Make a new project
Go to Dashboard → Developers → API Keys
Copy:

Publishable Key
Secret Key

3. Environment Variables
Frontend → apps/frontend/.env
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
VITE_BACKEND_URL=http://localhost:3000/api/v1

Backend → apps/backend/.env
NODE_ENV=development
PORT=3000

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/thoughtshare

# Clerk
CLERK_SECRET_KEY=<your-clerk-secret-key>
CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>

4. Install Dependencies

Run this in the project root:

npm install

5. Start the Backend
cd apps/backend
npx prisma migrate dev
npm run dev

Backend will run at:

http://localhost:3000

6. Start the Frontend
cd apps/frontend
npm run dev

Frontend will run at:

http://localhost:5173

Technologies Used

React + TypeScript
Vite
Clerk Authentication
Node.js + Express
PostgreSQL + Prisma ORM

Project Structure
apps/
  frontend/
    src/components/
    src/types/
    src/services/
  backend/
    src/api/
    prisma/