import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const { data } = await supabase.from('Personal').select('*').limit(1).single();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { data } = await supabase
    .from('Personal')
    .upsert({ id: 1, ...body, updatedAt: new Date().toISOString() }, { onConflict: 'id' })
    .select().single();
  revalidatePath('/');
  return NextResponse.json(data);
}
