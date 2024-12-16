import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Mail, Globe, MapPin, Clock, Users, Calendar, Heart, Share2, Bell } from 'lucide-react';
import { getEboardImageUrl } from '@/utils/supabase/storage';
import Header from '@/components/Header';

async function getClub(slug: string) {
  const supabase = createClient();
  const { data: club } = await supabase
    .from('clubs')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (!club) notFound();
  return club;
}

export default async function ClubPage({ params }: { params: { slug: string } }) {
  const club = await getClub(params.slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 to-white">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center">
              <img
                src={club.image_url}
                alt={club.name}
                className="w-auto h-auto"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-3">{club.name}</h1>
                  <p className="text-gray-600 mb-4 max-w-2xl">{club.description}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-full" title="Follow Club">
                    <Bell className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-full" title="Save Club">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-full" title="Share">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {club.category && (
                  <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">
                    {club.category}
                  </span>
                )}
                {club.type && (
                  <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm">
                    {club.type}
                  </span>
                )}
                {club.member_size && (
                  <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm">
                    {club.member_size} members
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 mb-6">
                {club.description}
              </p>
              
              {/* Commitment Level */}
              {club.commitment && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Commitment Level</h3>
                  <p className="text-gray-600">{club.commitment}</p>
                </div>
              )}

              {/* Application Process */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">How to Join</h3>
                <p className="text-gray-600">
                  Contact us via email or attend our next general meeting to learn more about joining our organization.
                </p>
              </div>
            </div>

            {/* E-Board Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-semibold">Executive Board</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {club.eboard ? (
                  club.eboard.map((member: { name: string; role: string; image_path?: string }, index: number) => (
                    <div 
                      key={index}
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50"
                    >
                      <div className="w-20 h-20 relative mb-3">
                        <Image
                          src={member.image_path ? getEboardImageUrl(member.image_path) : '/default-avatar.png'}
                          alt={member.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-center">{member.name}</h3>
                      <p className="text-sm text-gray-600 text-center">{member.role}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-gray-600 text-sm">
                    No executive board members listed
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                {club.meeting_times && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Meeting Times</h3>
                      <p className="text-gray-600">{club.meeting_times}</p>
                    </div>
                  </div>
                )}
                
                {club.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-gray-600">{club.location}</p>
                    </div>
                  </div>
                )}

                {club.contact_email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a 
                        href={`mailto:${club.contact_email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {club.contact_email}
                      </a>
                    </div>
                  </div>
                )}

                {club.website_url && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-yellow-500 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Website</h3>
                      <a 
                        href={club.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Social Media</h2>
              <div className="text-gray-600 text-sm">No social media links available</div>
            </div>

            {/* Upcoming Events - Moved under Social Media */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
              </div>
              <div className="text-gray-600 text-sm">No upcoming events scheduled</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 