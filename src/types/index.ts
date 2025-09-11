
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
}