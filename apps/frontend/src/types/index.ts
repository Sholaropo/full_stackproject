export interface Thought {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  likes: number; 
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string; // user's email address
  joinDate: Date; // when they joined the app
  thoughtCount: number; // how many thoughts they posted
  followerCount: number; // how many people follow them
  followingCount: number; // how many people they follow
  bio?: string; // optional bio text
  isVerified?: boolean; // optional checkmark status
}