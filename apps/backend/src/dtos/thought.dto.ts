export interface CreateThoughtDto {
  author: string;
  content: string;
}

export interface UpdateThoughtDto {
  content?: string;
  likes?: number;
}