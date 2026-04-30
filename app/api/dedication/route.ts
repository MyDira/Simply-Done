import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const dedication = await prisma.dedication.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, title: 'A Note from the Chef', content: '' },
  });
  return NextResponse.json(dedication);
}

export async function PUT(req: NextRequest) {
  const { title, content } = await req.json();
  const dedication = await prisma.dedication.upsert({
    where: { id: 1 },
    update: { title, content },
    create: { id: 1, title, content },
  });
  return NextResponse.json(dedication);
}
