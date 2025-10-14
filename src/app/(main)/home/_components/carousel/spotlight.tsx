"use client";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BadgeEpisode } from "@/components/ui/episode-badge";
import { getAnimeEpisodesById } from "@/services/api";
import { SpotlightAnimes } from "@/types/anime";
import { useQueries } from "@tanstack/react-query";
import AutoPlay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Calendar, Clock, Info, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

const AnimeSpotlightCarousel = ({
  spotlightAnimes,
}: {
  spotlightAnimes: SpotlightAnimes[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const results = useQueries({
    queries: spotlightAnimes.map((anime) => ({
      queryKey: ["ANIME_EPISODES_BY_ID", anime.id],
      queryFn: () => getAnimeEpisodesById(anime.id),
    })),
  });

  return (
    <div className="group relative h-screen w-full overflow-hidden bg-black">
      <Carousel
        opts={{
          loop: true,
          duration: 30,
        }}
        plugins={[
          Fade(),
          AutoPlay({
            delay: 7000,
            stopOnInteraction: false,
          }),
        ]}
        className="h-full w-full"
        setApi={(api) => {
          if (!api) return;
          api.on("select", () => {
            setCurrentIndex(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent className="h-full ">
          {spotlightAnimes.map((anime, idx) => (
            <CarouselItem key={anime.id} className="relative h-full pl-0">
              {/* Background Image */}
              {/* Background Image */}
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={anime.poster}
                  alt={anime.name}
                  fill
                  priority
                  className="h-full w-full object-cover object-top [mask-image:linear-gradient(90deg,transparent,white,transparent)]"
                />
                {/* Unified vertical gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                {/* Subtle horizontal gradient for cinematic feel */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 flex h-full w-full items-end px-6 pt-32 pb-32 md:px-16 md:pt-56 md:pb-40 lg:px-24">
                <div className="w-full max-w-3xl px-10">
                  {/* Top Badge Section */}
                  <div className="mb-4 flex items-center gap-3">
                    <Badge className="bg-rose-600 px-3 py-1.5 text-sm font-bold uppercase tracking-wide hover:bg-red-600 text-white">
                      #{anime.rank} Spotlight
                    </Badge>
                    <BadgeEpisode episodes={anime.episodes} size="sm" />
                  </div>

                  {/* Title */}
                  <h1 className="mb-4 line-clamp-3 text-3xl font-bold leading-tight text-white md:mb-6 md:text-4xl lg:text-6xl">
                    {anime.name}
                  </h1>

                  {/* Meta Info */}
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                    <span className="inline-flex items-center gap-2 font-semibold text-green-400">
                      <PlayCircle className="h-4 w-4" />
                      {anime.otherInfo[0]}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-gray-500" />

                    <span className="inline-flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {anime.otherInfo[1]}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-gray-500" />

                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {anime.otherInfo[2]}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-gray-500" />

                    <Badge className=" bg-rose-400 text-xs font-semibold">
                      {anime.otherInfo[3]}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="mb-6 line-clamp-3  text-base leading-relaxed text-gray-200 lg:text-lg">
                    {anime.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href={`/watch/${results[idx].data?.episodes[0].episodeId}`}
                      className="group inline-flex items-center gap-2 rounded-md bg-white px-8 py-3 text-base font-bold text-black transition-all hover:bg-gray-200"
                    >
                      <FaPlayCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                      <span>Watch Now</span>
                    </Link>

                    <Link
                      href={`/${anime.id}`}
                      className="group inline-flex items-center gap-2 rounded-md bg-gray-600/40 px-8 py-3 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-gray-600/60"
                    >
                      <Info className="h-5 w-5 transition-transform group-hover:scale-110" />
                      <span>More Info</span>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons - Always Visible */}
        <CarouselPrevious className="absolute left-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full border-2 border-white/30 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-white/50 hover:bg-black/80 md:left-8" />

        <CarouselNext className="absolute right-6 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full border-2 border-white/30 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-white/50 hover:bg-black/80 md:right-8" />
        {/* Progress Indicators */}
        <div className="absolute bottom-20 left-1/2 z-0 flex -translate-x-1/2 gap-2">
          {spotlightAnimes.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-10 bg-primary"
                  : "w-6 bg-gray-600/60 hover:bg-gray-500/80"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default memo(AnimeSpotlightCarousel);
