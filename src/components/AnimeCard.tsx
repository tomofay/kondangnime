import { Card, CardBody, Image, Chip } from '@heroui/react';
import { PlayIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface AnimeCardProps {
  anime: {
    id: string;
    name: string;
    poster: string;
    episodes?: { sub: number; dub: number };
    type?: string;
    rating?: string;
  };
  size?: 'sm' | 'md' | 'lg';
}

export default function AnimeCard({ anime, size = 'md' }: AnimeCardProps) {
  const sizeClasses = {
    sm: 'w-40 h-56',
    md: 'w-48 h-64', 
    lg: 'w-56 h-72'
  };

  return (
    <Link href={`/anime/${anime.id}`}>
      <Card className={`${sizeClasses[size]} group cursor-pointer bg-netflix-surface hover:scale-105 transition-all duration-300 border-none flex-shrink-0`}>
        <CardBody className="p-0 relative overflow-hidden">
          <Image
            src={anime.poster}
            alt={anime.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <PlayIcon className="w-12 h-12 text-netflix-blue" />
          </div>
          
          {/* Type Badge */}
          {anime.type && (
            <Chip 
              size="sm" 
              className="absolute top-2 left-2 bg-netflix-blue text-white text-xs"
            >
              {anime.type}
            </Chip>
          )}
          
          {/* Rating */}
          {anime.rating && (
            <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-netflix-blue-light">
              ★ {anime.rating}
            </div>
          )}
          
          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3">
            <h3 className="text-white font-semibold text-sm line-clamp-2">{anime.name}</h3>
            {anime.episodes && (
              <p className="text-netflix-blue-light text-xs mt-1">
                Sub: {anime.episodes.sub} | Dub: {anime.episodes.dub}
              </p>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
