import { thoughtRepository } from "../repositories/PostThoughtRepository";
import type { Thought } from "../types";

/**
 * Thought Service
 *
 * Purpose:
 * - Acts as an intermediary layer between components/hooks and the repository.
 * - Encapsulates business/data logic related to thoughts.
 * - Keeps repository interactions separate from component logic.
 */

export async function fetchThoughts(): Promise<Thought[]> {
  return thoughtRepository.getAll();
}

export async function createThought(content: string, author: string): Promise<Thought> {
  return thoughtRepository.add(content, author);
}

export async function likeThought(id: string): Promise<Thought> {
  return thoughtRepository.incrementLikes(id);
}

export async function deleteThought(id: string): Promise<void> {
  await thoughtRepository.delete(id);
}
