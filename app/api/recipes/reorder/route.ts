import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const items: { id: number; order: number }[] = await req.json();

  await prisma.$transaction(
    items.map(({ id, order }) =>
      prisma.recipe.update({ where: { id }, data: { order } })
    )
  );

  return NextResponse.json({ ok: true });
}
