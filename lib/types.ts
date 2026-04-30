export interface Recipe {
  id: number;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: number;
  cookTime: number;
  servings: number;
  description?: string;
  story?: string;
  notes?: string;
  photo?: string;
  order: number;
  createdAt: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
}

export interface RecipeFormData {
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: number | string;
  cookTime: number | string;
  servings: number | string;
  description: string;
  story: string;
  notes: string;
  photo: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
}

export interface Dedication {
  id: number;
  title: string;
  content: string;
}

export const CATEGORIES = ['Meat', 'Dairy', 'Fish', 'Pasta', 'Salad', 'Side', 'Soup', 'Dessert'] as const;
export type Category = typeof CATEGORIES[number];
