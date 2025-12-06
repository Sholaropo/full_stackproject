import type { Thought } from "../types";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
export async function fetchThoughts(token?: string): Promise<Thought[]> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
 
  const res = await fetch(`${API_BASE}/api/v1/thoughts`, {
    headers,
  });
  if (!res.ok) throw new Error("Failed to fetch thoughts");
  return res.json();
}
export async function createThought(content: string, author: string, token?: string): Promise<Thought> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
 
  const res = await fetch(`${API_BASE}/api/v1/thoughts`, {
    method: "POST",
    headers,
    body: JSON.stringify({ content, author }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create thought: ${res.status} - ${text}`);
  }
  return res.json();
}
export async function likeThought(id: string, token?: string): Promise<Thought> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
 
  const res = await fetch(`${API_BASE}/api/v1/thoughts/${id}/like`, {
    method: "POST",
    headers,
  });
  if (!res.ok) throw new Error("Failed to like thought");
  return res.json();
}
export async function deleteThought(id: string, token?: string): Promise<void> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
 
  const res = await fetch(`${API_BASE}/api/v1/thoughts/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete thought");
}