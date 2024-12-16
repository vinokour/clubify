"use client";

import { FC, ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative mb-6">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search clubs..."
        onChange={handleChange}
        className="pl-8"
      />
    </div>
  );
};

export default SearchBar;
