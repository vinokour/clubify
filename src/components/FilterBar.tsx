"use client";

import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  onFilterChange: (type: string, value: string) => void;
}

const FilterBar: FC<FilterBarProps> = ({ onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select onValueChange={(value) => onFilterChange('category', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="academic">Academic</SelectItem>
          <SelectItem value="cultural">Cultural</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          <SelectItem value="arts">Arts</SelectItem>
          <SelectItem value="service">Service</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('memberSize', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Member Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sizes</SelectItem>
          <SelectItem value="small">Small (1-10)</SelectItem>
          <SelectItem value="medium">Medium (11-50)</SelectItem>
          <SelectItem value="large">Large (51+)</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('commitment', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Commitment Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="low">Low (1-2 hrs/week)</SelectItem>
          <SelectItem value="medium">Medium (3-5 hrs/week)</SelectItem>
          <SelectItem value="high">High (6+ hrs/week)</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => onFilterChange('type', value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Organization Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="social">Social</SelectItem>
          <SelectItem value="service">Service</SelectItem>
          <SelectItem value="greek">Greek Life</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar; 