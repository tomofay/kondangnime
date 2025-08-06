"use client";
import { useState, useEffect, useRef } from "react";
import { Button, Chip } from "@heroui/react";
import {
  PlayIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/solid";
import Link from "next/link";
import clsx from "clsx";

// Adaptasi dari data API
interface Anime {
  rank: number;
  id: string;
  name: string;
  description: string;
  poster: string;
  episodes?: { sub?: number; dub?: number };
  type?: string;
  otherInfo?: string[];
  genres?: string[];
  rating?: string;
}

interface SpotlightAnimeCarouselProps {
  spotlightList: Anime[];
  intervalMs?: number;
}

function parseBadges(anime: Anime) {
  // Ex: ["PO-13", "2025", "ONA", "5 Episodes", "RELEASING"], type, episodes dll.
  const badges = [];
  if (anime.rank) {
    badges.push(
      <Chip key="rank" size="sm" className="bg-netflix-blue text-white font-bold">TOP {anime.rank}</Chip>
    );
    badges.push(
      <span key="trending" className="text-xs uppercase tracking-wider text-netflix-blue-light font-semibold ml-2">TRENDING NOW</span>
    );
  }
  if (anime.rating) {
    badges.push(
      <Chip key="rating" size="sm" variant="bordered" color="success">⭐ {anime.rating}</Chip>
    );
  }
  if (anime.otherInfo && anime.otherInfo.length) {
    anime.otherInfo.forEach((info) => {
      if (/^\d{4}$/.test(info))
        badges.push(<Chip key={info} size="sm" className="bg-gray-700 text-gray-100">{info}</Chip>);
      else if (/episodes?/i.test(info))
        badges.push(<Chip key={info} size="sm" className="bg-netflix-blue-light text-black">{info}</Chip>);
      else if (['RELEASING', 'ONGOING'].includes(info.toUpperCase()))
        badges.push(<Chip key={info} size="sm" className="bg-green-600 text-white">{info}</Chip>);
      else if (/po-\d+/i.test(info) || /^pg-?\d+/i.test(info))
        badges.push(<Chip key={info} size="sm" className="bg-orange-600 text-white">{info}</Chip>);
      else if (/HD|4K/i.test(info))
        badges.push(<Chip key={info} size="sm" className="bg-netflix-blue text-white">{info}</Chip>);
      else if (/ONA|TV|MOVIE|OVA|WEB/i.test(info))
        badges.push(<Chip key={info} size="sm" className="bg-gray-700 text-white">{info}</Chip>);
      else if (/m$/.test(info))
        badges.push(<Chip key={info} size="sm" className="bg-gray-800 text-gray-100">{info}</Chip>);
      else
        badges.push(<Chip key={info} size="sm" className="bg-gray-600 text-white">{info}</Chip>);
    });
  }
  if (anime.episodes?.sub)
    badges.push(
      <Chip key="episodes" size="sm" className="bg-netflix-blue-light text-black">{anime.episodes.sub} Episodes</Chip>
    );
  return badges;
}

export default function SpotlightAnimeCarousel({
  spotlightList,
  intervalMs = 7000
}: SpotlightAnimeCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { setFade(false); const timer = setTimeout(() => setFade(true), 120); return () => clearTimeout(timer); }, [current]);
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCurrent((prev) => (prev + 1) % spotlightList.length), intervalMs);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }
  }, [current, spotlightList.length, intervalMs]);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + spotlightList.length) % spotlightList.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % spotlightList.length);

  if (!spotlightList.length) return null;
  const anime = spotlightList[current];

  return (
    <div className="relative h-[64vh] min-h-[380px] w-full overflow-hidden select-none transition-all duration-700 flex items-end">
      {/* Background Image */}
      <div
        key={anime.poster}
        className={clsx("absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 will-change-opacity",
          fade ? "opacity-100" : "opacity-80")}
        style={{ backgroundImage: `url(${anime.poster})` }}
      />
      {/* Black/blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#151821cc] via-[#0a133544] to-transparent pointer-events-none" />

      {/* Prev/Next Controls */}
      <Button
        isIconOnly
        variant="flat"
        radius="full"
        className="absolute top-1/2 left-8 z-40 -translate-y-1/2 bg-black/60 hover:bg-black/80 shadow-lg"
        onClick={handlePrev}
        aria-label="Previous"
        type="button"
        size="lg"
      >
        <ChevronLeftIcon className="h-7 w-7 text-white" />
      </Button>
      <Button
        isIconOnly
        variant="flat"
        radius="full"
        className="absolute top-1/2 right-8 z-40 -translate-y-1/2 bg-black/60 hover:bg-black/80 shadow-lg"
        onClick={handleNext}
        aria-label="Next"
        type="button"
        size="lg"
      >
        <ChevronRightIcon className="h-7 w-7 text-white" />
      </Button>

      {/* Main Content */}
      <section className={clsx("relative z-20 w-full pb-14 pl-12 max-w-5xl",
        fade ? "opacity-100 scale-100 translate-y-0" : "opacity-75 scale-95 translate-y-1",
        "transition-all duration-700"
      )}>
        <div className="flex flex-col gap-2 sm:gap-4 mb-3 sm:mb-5">
          <div className="flex flex-wrap items-center gap-2">
            {parseBadges(anime)}
          </div>
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow mt-2 mb-2 font-['Inter']">
            {anime.name}
          </h1>
          {/* Short Description */}
          <p className="text-netflix-blue-light/90 text-sm sm:text-lg mt-2 line-clamp-3 max-w-2xl drop-shadow hidden sm:block">
            {anime.description}
          </p>
        </div>
        <div className="flex gap-3 mt-3">
          <Button
            as={Link}
            href={`/anime/${anime.id}/episode/1`}
            size="lg"
            className="bg-netflix-blue hover:bg-netflix-accent text-white font-bold px-7 shadow"
            startContent={<PlayIcon className="w-5 h-5" />}
          >
            Play
          </Button>
          <Button
            as={Link}
            href={`/anime/${anime.id}`}
            size="lg"
            variant="flat"
            className="bg-white/20 border border-netflix-blue-light text-netflix-blue-light hover:bg-netflix-blue-light hover:text-netflix-bg px-7 font-bold"
            startContent={<InformationCircleIcon className="w-5 h-5" />}
          >
            Info
          </Button>
        </div>

      </section>
      {/* Pagination (dot bar) */}
      <div className="absolute bottom-8 left-10 flex gap-3 z-30">
        {spotlightList.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={clsx(
              "h-2 w-8 rounded-full transition-all duration-300",
              idx === current
                ? "bg-netflix-blue scale-110 shadow"
                : "bg-gray-400/50"
            )}
            aria-label={`Go to anime #${idx + 1}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
