export interface Todo {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  categoryId?: number;
}

export interface CreateTodoDTO {
  title: string;
  description?: string;
  categoryId?: number;
}

export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  categoryId?: number;
}
