import { Card, CardBody, Image, Chip } from '@heroui/react';
import Link from 'next/link';

interface Top10AnimeProps {
  animes: Array<{
    id: string;
    name: string;
    poster: string;
    rank: number;
    rating?: string;
    episodes?: { sub: number; dub: number };
  }>;
}

export default function Top10Anime({ animes }: Top10AnimeProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Top 10 Anime</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animes.map((anime) => (
          <Link key={anime.id} href={`/anime/${anime.id}`}>
            <Card className="group cursor-pointer bg-netflix-surface hover:bg-netflix-surface-2 transition-all duration-300 border-none">
              <CardBody className="p-4 flex-row items-center gap-4">
                {/* Rank Number */}
                <div className="text-6xl font-bold text-netflix-blue opacity-80 min-w-[4rem] text-center">
                  {anime.rank}
                </div>
                
                {/* Poster */}
                <div className="w-16 h-20 relative flex-shrink-0">
                  <Image
                    src={anime.poster}
                    alt={anime.name}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-netflix-blue transition-colors">
                    {anime.name}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-sm text-netflix-blue-light">
                    {anime.rating && (
                      <div className="flex items-center gap-1">
                        <span>★ {anime.rating}</span>
                      </div>
                    )}
                    {anime.episodes && (
                      <span>{anime.episodes.sub} eps</span>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
