import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Header from '@/components/Header';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Users } from 'lucide-react';

export default async function ClubsPage() {
  const supabase = createClient();
  const { data: clubs } = await supabase
    .from('clubs')
    .select('*')
    .order('name');

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 to-white">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 py-10">
        {/* Search and Filters Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Search clubs..."
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Club Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs?.map((club) => (
            <Link 
              key={club.id} 
              href={`/clubs/${club.slug}`}
              className="block group h-full"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 relative flex-shrink-0 bg-gray-50 rounded-lg">
                    <Image
                      src={club.image_url}
                      alt={`${club.name} logo`}
                      fill
                      className="object-contain p-2"
                      quality={100}
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-yellow-600 transition-colors">
                      {club.name}
                    </h2>
                    {club.category && (
                      <span className="inline-block px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm mt-2">
                        {club.category}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 flex-1">
                  {club.description}
                </p>
                {club.member_size && (
                  <div className="mt-4 flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {club.member_size} members
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
} 