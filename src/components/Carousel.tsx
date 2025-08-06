"use client";
import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';

interface CarouselProps {
  children: React.ReactNode;
  title: string;
}

export default function Carousel({ children, title }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      
      {/* Left Arrow */}
      <Button
        isIconOnly
        variant="flat"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => scroll('left')}
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </Button>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* Right Arrow */}
      <Button
        isIconOnly
        variant="flat"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => scroll('right')}
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
}
