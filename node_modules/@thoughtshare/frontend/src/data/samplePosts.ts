import { Thought } from '../types';

export const samplePosts: Thought[] = [
  {
    id: '1',
    content: 'Just discovered an amazing productivity technique! The Pomodoro method really works for coding sessions.',
    author: 'ProductivityPro',
    timestamp: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
    likes: 45
  },
  {
    id: '2',
    content: 'Built my first full-stack application today! React frontend with Node.js backend. Feeling accomplished!',
    author: 'FullStackDev',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    likes: 32
  },
  {
    id: '3',
    content: 'Git merge conflicts are the worst! But finally figured out how to resolve them properly.',
    author: 'GitLearner',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    likes: 28
  },
  {
    id: '4',
    content: 'CSS Grid vs Flexbox - still learning when to use which. Both are powerful tools!',
    author: 'CSSExplorer',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    likes: 19
  },
  {
    id: '5',
    content: 'Debugging JavaScript can be frustrating, but console.log is my best friend right now!',
    author: 'DebugMaster',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    likes: 24
  },
  {
    id: '6',
    content: 'API integration is tricky but rewarding. Successfully connected my app to a weather API!',
    author: 'APINewbie',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    likes: 31
  }
];

export const sampleComments = {
  '1': [
    { id: 'c1', author: 'TechGuru', content: 'Great tip! I use this technique too.' },
    { id: 'c2', author: 'CodeMaster', content: 'Thanks for sharing!' }
  ],
  '2': [
    { id: 'c3', author: 'DevLearner', content: 'Congratulations! What tech stack did you use?' }
  ]
};

export const sampleRatings = {
  '1': 4.2, '2': 3.8, '3': 4.5, '4': 3.2, '5': 4.0, '6': 3.9
};
