import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { serializeRecipe, recipeInclude } from '@/lib/serialize';

export const dynamic = 'force-dynamic';

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const id = Number(params.id);
  const recipe = await prisma.recipe.findUnique({ where: { id }, include: recipeInclude });
  if (!recipe) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(serializeRecipe(recipe));
}

export async function PUT(req: NextRequest, { params }: Params) {
  const id = Number(params.id);
  const body = await req.json();
  const { tags = [], ingredients = [], steps = [], id: _id, createdAt: _c, order: _o, ...data } = body;

  await prisma.$transaction([
    prisma.recipeTag.deleteMany({ where: { recipeId: id } }),
    prisma.ingredient.deleteMany({ where: { recipeId: id } }),
    prisma.step.deleteMany({ where: { recipeId: id } }),
  ]);

  const recipe = await prisma.recipe.update({
    where: { id },
    data: {
      ...data,
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

  return NextResponse.json(serializeRecipe(recipe));
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const id = Number(params.id);
  await prisma.recipe.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
