import { NextResponse } from 'next/server';
import { fetchActivities } from '@/data/news';

export async function GET() {
  try {
    const data = await fetchActivities();
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { data: [], message: 'Cannot load activities' },
      { status: 502 },
    );
  }
}
