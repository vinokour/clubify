"use client";

import { FC, useState, useEffect } from 'react';
import ClubCard from './ClubCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import { Club } from '../types/Club';

const ClubFeed: FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    memberSize: 'all',
    commitment: 'all',
    type: 'all'
  });

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const response = await import('@/data/clubs.json');
        setClubs(response.default as Club[]);
        setFilteredClubs(response.default as Club[]);
      } catch (error) {
        console.error('Error loading clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadClubs();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    applyFilters({ ...filters, search: searchTerm });
  };

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    applyFilters({ ...filters, [type]: value });
  };

  const applyFilters = (currentFilters: typeof filters) => {
    let filtered = clubs;

    // Apply search filter
    if (currentFilters.search) {
      filtered = filtered.filter(club => 
        club.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
        club.description.toLowerCase().includes(currentFilters.search.toLowerCase())
      );
    }

    // Apply category filter
    if (currentFilters.category !== 'all') {
      filtered = filtered.filter(club => club.category === currentFilters.category);
    }

    // Apply member size filter
    if (currentFilters.memberSize !== 'all') {
      filtered = filtered.filter(club => club.member_size === currentFilters.memberSize);
    }

    // Apply commitment filter
    if (currentFilters.commitment !== 'all') {
      filtered = filtered.filter(club => club.commitment === currentFilters.commitment);
    }

    // Apply type filter
    if (currentFilters.type !== 'all') {
      filtered = filtered.filter(club => club.type === currentFilters.type);
    }

    setFilteredClubs(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-primary">Loading clubs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SearchBar onSearch={handleSearch} />
        <FilterBar onFilterChange={handleFilterChange} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club, index) => (
          <ClubCard key={index} club={club} />
        ))}
      </div>
      
      {filteredClubs.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No clubs found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ClubFeed;
