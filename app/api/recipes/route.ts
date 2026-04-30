import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { serializeRecipe, recipeInclude } from '@/lib/serialize';

export async function GET() {
  const recipes = await prisma.recipe.findMany({
    include: recipeInclude,
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(recipes.map(serializeRecipe));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tags = [], ingredients = [], steps = [], ...data } = body;

  const maxOrder = await prisma.recipe.aggregate({ _max: { order: true } });
  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const recipe = await prisma.recipe.create({
    data: {
      ...data,
      order: nextOrder,
      tags: { create: tags.map((name: string) => ({ name })) },
      ingredients: {
        create: ingredients.map((text: string, idx: number) => ({
          text: text === '—' ? '—' : text,
          isSeparator: text === '—',
          order: idx,
        })),
      },
      steps: {
        create: steps.map((text: string, idx: number) => ({ text, order: idx })),
      },
    },
    include: recipeInclude,
  });

  return NextResponse.json(serializeRecipe(recipe), { status: 201 });
}
