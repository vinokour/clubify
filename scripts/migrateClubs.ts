require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const clubs = require('../src/data/clubs.json');

interface Club {
  name: string;
  description: string;
  image_url: string;
  category?: string;
  member_size?: string;
  commitment?: string;
  type?: string;
  website_url?: string;
  meeting_times?: string;
  location?: string;
  contact_email?: string;
  eboard?: {
    name: string;
    role: string;
    image_path?: string;
  }[];
}

const typedClubs = clubs as Club[];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateClubs() {
  for (const club of typedClubs) {
    const slug = club.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const { data, error } = await supabase
      .from('clubs')
      .insert([
        {
          name: club.name,
          slug: slug,
          description: club.description,
          image_url: club.image_url,
          category: club.category || null,
          member_size: club.member_size || null,
          commitment: club.commitment || null,
          type: club.type || null,
          website_url: club.website_url || null,
          meeting_times: club.meeting_times || null,
          location: club.location || null,
          contact_email: club.contact_email || null,
          eboard: club.eboard ? JSON.stringify(club.eboard) : null,
        }
      ])
      .select();

    if (error) {
      console.error(`Error inserting ${club.name}:`, error);
    } else {
      console.log(`Successfully inserted ${club.name}`);
    }
  }
}

migrateClubs()
  .then(() => console.log('Migration complete'))
  .catch(console.error); 