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

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [https://github.com/Sholaropo/full_stackproject.git]
cd thoughtshare

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
 main
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Technologies Used

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** CSS3 with custom styles
- **Development:** TypeScript for type safety

## Project Structure

```
src/
├── components/
│   ├── thought-list/          # Olusola's Component
│   │   ├── ThoughtList.tsx
│   │   └── ThoughtList.css
│   ├── footer/                # Olusola's Component
│   │   ├── Footer.tsx
│   │   └── Footer.css
│   ├── thoughts-feed/         # Vandana's Component
│   │   ├── ThoughtsFeed.tsx
│   │   └── ThoughtsFeed.css
│   └── post-thoughts/         # Amandeep's Component
│       ├── PostThoughts.tsx
│       └── PostThoughts.css
├── types/                     # Shared TypeScript definitions
│   └── index.ts
├── App.tsx                    # Main app integration (Amandeep)
├── App.css                    # Main app styling (Collaborative)
├── index.css                  # Global styles (Collaborative)
└── main.tsx                   # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Create a pull request to `develop`
4. Get approval from at least one team member before merging
