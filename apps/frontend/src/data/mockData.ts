import type { Thought } from '../types';

export const partnerPosts: Thought[] = [
  {
    id: '1',
    content: 'Just had the most amazing coffee this morning! ☕ Nothing beats a good start to the day.',
    author: 'CoffeeLover23',
    timestamp: new Date('2025-09-05T08:30:00'),
    likes: 12
  },
  {
    id: '2',
    content: 'Working on a new React project today. TypeScript is making everything so much cleaner! 💻',
    author: 'DevMind',
    timestamp: new Date('2025-09-05T10:15:00'),
    likes: 8
  },
  {
    id: '3',
    content: 'Beautiful sunset today. Sometimes we need to stop and appreciate the simple things in life. 🌅',
    author: 'NatureLover',
    timestamp: new Date('2025-09-05T19:45:00'),
    likes: 25
  },
  {
    id: '4',
    content: 'Learning something new every day is the key to personal growth. What did you learn today?',
    author: 'WisdomSeeker',
    timestamp: new Date('2025-09-05T14:20:00'),
    likes: 15
  },
  {
    id: '5',
    content: 'Friday feeling! Looking forward to the weekend. Time to recharge and spend time with family.',
    author: 'WeekendWarrior',
    timestamp: new Date('2025-09-05T16:00:00'),
    likes: 18
  }
];

export const communityPosts: Thought[] = [
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