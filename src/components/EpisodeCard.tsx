import { Card, CardBody, Image, Chip } from '@heroui/react';
import { PlayIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface EpisodeCardProps {
  episode: {
    id: string;
    animeId: string;
    animeName: string;
    episodeNumber: number;
    title: string;
    poster: string;
    duration?: string;
    airingTime?: string;
  };
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Link href={`/anime/${episode.animeId}/episode/${episode.id}`}>
      <Card className="w-80 h-44 group cursor-pointer bg-netflix-surface hover:scale-105 transition-all duration-300 border-none flex-shrink-0">
        <CardBody className="p-0 relative overflow-hidden flex-row">
          {/* Thumbnail */}
          <div className="w-32 h-full relative">
            <Image
              src={episode.poster}
              alt={episode.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
              <PlayIcon className="w-8 h-8 text-netflix-blue opacity-80 group-hover:opacity-100" />
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <Chip size="sm" className="bg-netflix-blue text-white mb-2">
                EP {episode.episodeNumber}
              </Chip>
              <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {episode.animeName}
              </h4>
              <p className="text-netflix-blue-light text-xs line-clamp-2">
                {episode.title}
              </p>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-netflix-blue-light mt-2">
              {episode.duration && (
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" />
                  <span>{episode.duration}</span>
                </div>
              )}
              {episode.airingTime && (
                <span>{episode.airingTime}</span>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
