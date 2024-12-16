import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Header from '@/components/Header';
import { Users, LogIn } from 'lucide-react';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 to-white">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h1 className="text-5xl font-bold text-yellow-500 mb-6">
            Discover Your Community
          </h1>
          <p className="text-xl text-gray-600">
            Join over 1,000+ student organizations at the University of Michigan and
            find your perfect fit
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-24">
          {/* Browse Clubs Card */}
          <div className="bg-white p-10 rounded-xl shadow-sm">
            <Users className="w-8 h-8 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Browse Clubs</h2>
            <p className="text-gray-600 mb-8">
              Explore student organizations and find your community at Michigan.
            </p>
            <Link 
              href="/clubs"
              className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg"
            >
              Explore Directory →
            </Link>
          </div>

          {/* Club Login Card */}
          <div className="bg-white p-10 rounded-xl shadow-sm">
            <LogIn className="w-8 h-8 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Club Login</h2>
            <p className="text-gray-600 mb-8">
              Already registered? Sign in to manage your organization's profile.
            </p>
            <Link 
              href="/login"
              className="inline-block bg-white text-yellow-500 px-6 py-3 rounded-lg border border-yellow-500"
            >
              Sign In →
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">1,000+</div>
            <div className="text-gray-600">Student Organizations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">50,000+</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">200+</div>
            <div className="text-gray-600">Events Monthly</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">15+</div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>
      </main>
    </div>
  );
}