import { testThoughts } from "../data/testThoughts";
import type { Thought } from "../types";

export function getThoughts(): Thought[] {
  return testThoughts;
}

export function getThoughtById(id: string): Thought {
  const thought = testThoughts.find((t) => t.id === id);

  if (!thought) {
    throw new Error(`Failed to fetch thought with id ${id}`);
  }

  return thought;
}

export async function createThought(content: string, author: string): Promise<Thought> {
  const newThought: Thought = {
    id: (testThoughts.length + 1).toString(),
    content,
    author,
    timestamp: new Date(),
    likes: 0,
  };

  testThoughts.push(newThought);
  return newThought;
}

export async function updateThoughtLikes(id: string, increment: number = 1): Promise<Thought> {
  const thought = testThoughts.find((t) => t.id === id);

  if (!thought) {
    throw new Error(`Failed to update likes for thought with id ${id}`);
  }

  thought.likes += increment;
  return thought;
}

export async function deleteThought(id: string): Promise<boolean> {
  const index = testThoughts.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new Error(`Failed to delete thought with id ${id}`);
  }

  testThoughts.splice(index, 1);
  return true;
}

export const thoughtRepository = {
  getAll: getThoughts,
  getById: getThoughtById,
  add: createThought,
  incrementLikes: updateThoughtLikes,
  delete: deleteThought,
};