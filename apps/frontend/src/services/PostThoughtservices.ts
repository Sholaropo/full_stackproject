import type { Thought } from "../types";

const API_BASE = "http://localhost:3000/api/v1/thoughts";

export async function fetchThoughts(token: string): Promise<Thought[]> {
  const res = await fetch(API_BASE, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch thoughts");
  return res.json();
}

export async function createThought(content: string, token: string, author: string): Promise<Thought> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, author }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create thought: ${res.status} - ${text}`);
  }
  return res.json();
}

export async function likeThought(id: string, token: string): Promise<Thought> {
  const res = await fetch(`${API_BASE}/${id}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to like thought");
  return res.json();
}

export async function deleteThought(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete thought");
}
