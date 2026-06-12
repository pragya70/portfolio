import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const unreadOnly = searchParams.get('unread') === 'true';
  let query = supabase.from('ContactMessage').select('*').order('createdAt', { ascending: false });
  if (unreadOnly) query = query.eq('read', false);
  const { data } = await query;
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;
  if (!name || !email || !message) return NextResponse.json({ error: 'All fields required' }, { status: 400 });
  const { data } = await supabase.from('ContactMessage').insert({ name, email, message }).select().single();
  return NextResponse.json(data, { status: 201 });
}
