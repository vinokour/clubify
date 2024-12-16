import { createClient } from './server';

export async function uploadEboardImage(clubSlug: string, memberName: string, file: File) {
  const supabase = createClient();
  
  const fileName = `${clubSlug}-${memberName.toLowerCase().replace(/\s+/g, '-')}`;
  const fileExt = file.name.split('.').pop();
  const filePath = `eboard-photos/${fileName}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('club-images')
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) throw error;
  return filePath;
}

export function getEboardImageUrl(imagePath: string) {
  const supabase = createClient();
  
  const { data } = supabase.storage
    .from('club-images')
    .getPublicUrl(imagePath);

  return data.publicUrl;
} 