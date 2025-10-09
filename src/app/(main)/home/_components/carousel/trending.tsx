"use client";

import HoveredContent from "@/components/shared/hovered-content";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CustomImage } from "@/components/ui/custom-image";
import { TrendingAnime } from "@/types/anime";
import Link from "next/link";

export default function TrendingCarousel({
  animes,
}: {
  animes: TrendingAnime[];
}) {
  return (
    <div className="relative w-full">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {animes.map(({ id, name, poster, rank }) => (
            <CarouselItem key={id} className="pl-4 basis-auto">
              <div className="relative flex items-end gap-1">
                {/* Vertical Text and Rank Number */}
                <div className="hidden md:flex md:flex-col md:items-center md:justify-end md:h-full md:pb-2">
                  <Link
                    href={`/${id}`}
                    className="h-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-gray-300 hover:text-purple-300 transition-colors mb-3"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                    }}
                  >
                    {name}
                  </Link>
                  <span className="text-2xl font-bold text-purple-400">
                    {Number(rank) < 10 ? `0${Number(rank)}` : Number(rank)}
                  </span>
                </div>

                {/* Mobile Rank Badge */}
                <div className="md:hidden absolute left-0 top-0 z-20 flex h-8 w-8 items-center justify-center bg-purple-500 text-sm font-bold text-white">
                  {Number(rank) < 10 ? `0${Number(rank)}` : Number(rank)}
                </div>

                {/* Poster Image with Hover Card */}
                <HoveredContent animeId={id} to={`/${id}`}>
                  <div className="relative aspect-[2/3] w-[180px] overflow-hidden cursor-pointer">
                    <CustomImage
                      src={poster}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </HoveredContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="-left-4 bg-gray-800/80 border-gray-700 hover:bg-gray-700 text-white" />
        <CarouselNext className="-right-4 bg-gray-800/80 border-gray-700 hover:bg-gray-700 text-white" />
      </Carousel>
    </div>
  );
}
