"use client";

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Club } from '../types/Club';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ClubCardProps {
  club: Club;
}

const ClubCard: FC<ClubCardProps> = ({ club }) => {
  const originalImageUrl = club.image_url.replace('?preset=small-sq', '');
  const slug = club.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <Link href={`/clubs/${slug}`} className="block">
      <Card className="group overflow-hidden transition-all hover:shadow-lg rounded-xl">
        <div className="relative w-full h-48 overflow-hidden bg-secondary/30 rounded-t-xl">
          <Image 
            src={originalImageUrl} 
            alt={club.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            quality={100}
            unoptimized
          />
        </div>
        <CardHeader className="space-y-2 rounded-b-xl">
          <CardTitle className="text-lg font-semibold line-clamp-1 transition-colors group-hover:text-primary">
            {club.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {club.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ClubCard;
