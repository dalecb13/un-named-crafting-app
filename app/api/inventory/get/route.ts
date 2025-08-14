import { NextResponse } from 'next/server';
import { withCors } from "@/utils/cors";
import { supabase } from '@/utils/supabase';

export const GET = withCors(async function GET() {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.warn('Error', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
});