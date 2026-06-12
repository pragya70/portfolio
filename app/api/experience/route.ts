import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const { data } = await supabase.from('Experience').select('*').order('order');
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { count } = await supabase.from('Experience').select('*', { count: 'exact', head: true });
  const { data } = await supabase.from('Experience').insert({ ...body, order: count ?? 0 }).select().single();
  revalidatePath('/');
  return NextResponse.json(data, { status: 201 });
}
