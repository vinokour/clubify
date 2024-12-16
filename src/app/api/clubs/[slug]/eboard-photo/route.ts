import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const memberName = formData.get('memberName') as string;
    
    const supabase = createRouteHandlerClient({ cookies });
    
    const fileName = `${params.slug}-${memberName.toLowerCase().replace(/\s+/g, '-')}`;
    const fileExt = file.name.split('.').pop();
    const filePath = `eboard-photos/${fileName}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('club-images')
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) throw uploadError;

    return NextResponse.json({ filePath });
  } catch (error) {
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
} 