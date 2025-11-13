// test data for users
import type { User } from '../types';

// sample users for testing
export const sampleUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    displayName: 'John Doe',
    email: 'john@email.com',
    joinDate: new Date('2024-01-15'),
    thoughtCount: 10,
    followerCount: 50,
    followingCount: 30,
    bio: 'love coding',
    isVerified: false
  },
  {
    id: '2',
    username: 'jane_smith',
    displayName: 'Jane Smith',
    email: 'jane@email.com',
    joinDate: new Date('2024-02-01'),
    thoughtCount: 25,
    followerCount: 100,
    followingCount: 45,
    bio: 'developer',
    isVerified: true
  },
  {
    id: '3',
    username: 'mike_wilson',
    displayName: 'Mike Wilson',
    email: 'mike@email.com',
    joinDate: new Date('2024-01-20'),
    thoughtCount: 5,
    followerCount: 20,
    followingCount: 15,
    bio: 'student',
    isVerified: false
  },
  {
    id: '4',
    username: 'sarah_jones',
    displayName: 'Sarah Jones',
    email: 'sarah@email.com',
    joinDate: new Date('2024-03-01'),
    thoughtCount: 15,
    followerCount: 75,
    followingCount: 40,
    bio: 'designer',
    isVerified: false
  },
  {
    id: '5',
    username: 'alex_brown',
    displayName: 'Alex Brown',
    email: 'alex@email.com',
    joinDate: new Date('2024-02-15'),
    thoughtCount: 30,
    followerCount: 150,
    followingCount: 60,
    bio: 'tech blogger',
    isVerified: true
  },
  {
    id: '6',
    username: 'lisa_davis',
    displayName: 'Lisa Davis',
    email: 'lisa@email.com',
    joinDate: new Date('2024-01-10'),
    thoughtCount: 8,
    followerCount: 35,
    followingCount: 25,
    bio: 'artist',
    isVerified: false
  },
  {
    id: '7',
    username: 'tom_garcia',
    displayName: 'Tom Garcia',
    email: 'tom@email.com',
    joinDate: new Date('2024-03-10'),
    thoughtCount: 12,
    followerCount: 60,
    followingCount: 35,
    bio: 'photographer',
    isVerified: false
  },
  {
    id: '8',
    username: 'emma_taylor',
    displayName: 'Emma Taylor',
    email: 'emma@email.com',
    joinDate: new Date('2024-02-20'),
    thoughtCount: 20,
    followerCount: 90,
    followingCount: 50,
    bio: 'writer',
    isVerified: true
  },
  {
    id: '9',
    username: 'david_lee',
    displayName: 'David Lee',
    email: 'david@email.com',
    joinDate: new Date('2024-01-05'),
    thoughtCount: 40,
    followerCount: 200,
    followingCount: 80,
    bio: 'entrepreneur',
    isVerified: true
  },
  {
    id: '10',
    username: 'maria_rodriguez',
    displayName: 'Maria Rodriguez',
    email: 'maria@email.com',
    joinDate: new Date('2024-02-28'),
    thoughtCount: 18,
    followerCount: 85,
    followingCount: 45,
    bio: 'teacher',
    isVerified: false
  },
  {
    id: '11',
    username: 'kevin_park',
    displayName: 'Kevin Park',
    email: 'kevin@email.com',
    joinDate: new Date('2024-03-05'),
    thoughtCount: 7,
    followerCount: 25,
    followingCount: 20,
    bio: 'gamer',
    isVerified: false
  },
  {
    id: '12',
    username: 'rachel_green',
    displayName: 'Rachel Green',
    email: 'rachel@email.com',
    joinDate: new Date('2024-01-25'),
    thoughtCount: 35,
    followerCount: 120,
    followingCount: 55,
    bio: 'fitness coach',
    isVerified: true
  }
];
