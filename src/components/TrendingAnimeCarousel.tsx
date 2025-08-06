import Carousel from './Carousel';
import AnimeCard from './AnimeCard';

interface TrendingAnimeCarouselProps {
  animes: Array<{
    id: string;
    name: string;
    poster: string;
    episodes?: { sub: number; dub: number };
    type?: string;
    rating?: string;
  }>;
}

export default function TrendingAnimeCarousel({ animes }: TrendingAnimeCarouselProps) {
  return (
    <section className="mb-12">
      <Carousel title="Trending Now">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} size="md" />
        ))}
      </Carousel>
    </section>
  );
}
