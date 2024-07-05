export interface Category {
  id: number;
  name: string;
  color?: string;
  userId: number;
}

export interface CreateCategoryDTO {
  name: string;
  color?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  color?: string;
}
