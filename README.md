thoughtlist
# ThoughtShare

A platform that allows users to share their thoughts like Twitter (X).

## Project Team

**Team Name:** [The Page Turners]

**Team Members:**
- [Member 1 OLuosola Ropo]
- [Member 2 Amandeep Kaur]
- [Member 3 Vandana Bhangu]

## Project General Description

ThoughtShare is a social platform designed to help users express and share their thoughts with a community.

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
│   └── thought-list/
│       ├── ThoughtList.tsx
│       └── ThoughtList.css
├── types/
│   └── index.ts
├── App.tsx
├── App.css
└── main.tsx
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
