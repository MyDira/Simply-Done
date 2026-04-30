import type { Recipe } from '@/lib/types';

type DbRecipe = {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  description: string | null;
  story: string | null;
  notes: string | null;
  photo: string | null;
  order: number;
  createdAt: Date;
  tags: { name: string }[];
  ingredients: { text: string; order: number; isSeparator: boolean }[];
  steps: { text: string; order: number }[];
};

export function serializeRecipe(r: DbRecipe): Recipe {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    difficulty: r.difficulty as Recipe['difficulty'],
    prepTime: r.prepTime,
    cookTime: r.cookTime,
    servings: r.servings,
    description: r.description ?? undefined,
    story: r.story ?? undefined,
    notes: r.notes ?? undefined,
    photo: r.photo ?? undefined,
    order: r.order,
    createdAt: r.createdAt.toISOString().slice(0, 10),
    tags: r.tags.map(t => t.name),
    ingredients: r.ingredients
      .sort((a, b) => a.order - b.order)
      .map(i => (i.isSeparator ? '—' : i.text)),
    steps: r.steps
      .sort((a, b) => a.order - b.order)
      .map(s => s.text),
  };
}

export const recipeInclude = {
  tags: { select: { name: true } },
  ingredients: { select: { text: true, order: true, isSeparator: true } },
  steps: { select: { text: true, order: true } },
} as const;
