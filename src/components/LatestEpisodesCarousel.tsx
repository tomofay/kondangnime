import Carousel from './Carousel';
import EpisodeCard from './EpisodeCard';

interface LatestEpisodesCarouselProps {
  episodes: Array<{
    id: string;
    animeId: string;
    animeName: string;
    episodeNumber: number;
    title: string;
    poster: string;
    duration?: string;
    airingTime?: string;
  }>;
}

export default function LatestEpisodesCarousel({ episodes }: LatestEpisodesCarouselProps) {
  return (
    <section className="mb-12">
      <Carousel title="Latest Episodes">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </Carousel>
    </section>
  );
}
