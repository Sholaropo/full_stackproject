import { UserService } from '../services/userService';

export async function getUserInfo(username: string) {
  return await UserService.getUserByUsername(username);
}

export function formatTime(timestamp: Date) {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

export function calculateReadingTime(content: string) {
  const words = content.split(' ').length;
  return Math.ceil(words / 200) || 1;
}
