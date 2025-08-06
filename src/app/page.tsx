"use client";
import { useEffect, useState } from 'react';
import { getHomePage } from '@/lib/api/aniwatch';
import SpotlightAnimeCarousel from '@/components/SpotlightAnimeCarousel';
import TrendingAnimeCarousel from '@/components/TrendingAnimeCarousel';
import Top10Anime from '@/components/Top10Anime';
import LatestEpisodesCarousel from '@/components/LatestEpisodesCarousel';
import { Spinner } from '@heroui/react';

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHomePage();
        const isSuccess = (response.success === true) || (response.status && response.status === 200);

        if (isSuccess) {
          setData(response.data);
        } else {
          setError('Failed to load data');
        }
      } catch (err) {
        setError('Failed to fetch homepage data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-bg flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-netflix-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-netflix-blue-light">{error}</p>
        </div>
      </div>
    );
  }

  /** 
   * HANDLE MAPPING SEMUA SPOTLIGHT ANIME UNTUK CAROUSEL (GENRES & RATING BISA NULL)
   * Jika genre tidak ada di API, isi dengan empty array.
   * Isi rating jika tidak null, atau fallback string kosong.
   */
  const spotlightList = (data?.spotlightAnimes || []).map((anime: any) => ({
    id: anime.id,
    name: anime.name,
    poster: anime.poster,
    description: anime.description || "",
    genres: Array.isArray(anime.genres)
      ? anime.genres
      : ["Action", "Adventure", "Drama"], // fallback genre
    rating: anime?.rating || anime?.rank?.toString() || "",
    year:
      typeof anime?.otherInfo === "object"
        ? (anime.otherInfo.find((v: string) => /^\d{4}/.test(v)) || "")
        : "",
    episodes: anime.episodes,
  }));

  return (
    <div className="min-h-screen bg-netflix-bg">
      {/* Spotlight Anime Carousel */}
      {spotlightList?.length > 0 && (
        <SpotlightAnimeCarousel spotlightList={spotlightList} />
      )}

      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Trending Anime */}
        {data?.trendingAnimes?.length > 0 && (
          <TrendingAnimeCarousel animes={data.trendingAnimes} />
        )}

        {/* Top 10 */}
        {data?.top10Animes?.today?.length > 0 && (
          <Top10Anime animes={data.top10Animes.today} />
        )}

        {/* Latest Episodes */}
        {data?.latestEpisodeAnimes?.length > 0 && (
          <LatestEpisodesCarousel
            episodes={data.latestEpisodeAnimes.map((anime: any) => ({
              id: `${anime.id}-latest`,
              animeId: anime.id,
              animeName: anime.name,
              episodeNumber: anime.episodes?.sub || 1,
              title: `Episode ${anime.episodes?.sub || 1}`,
              poster: anime.poster,
              duration: anime.duration || "24m",
              airingTime: "Recently",
            }))}
          />
        )}
      </div>
    </div>
  );
}
