import { NextResponse } from 'next/server';
import { fetchActivityById } from '@/data/news';

type ActivityRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: ActivityRouteProps) {
  const { id } = await params;
  const data = await fetchActivityById(id);

  if (!data) {
    return NextResponse.json(
      { data: null, message: 'Activity not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({ data });
}
