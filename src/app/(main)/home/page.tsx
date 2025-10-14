"use client";

import HomeSkeleton from "@/components/skeleton/home-skeleton";
import { getAnimeHome } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import AnimeSpotlightCarousel from "./_components/carousel/spotlight";
import HomeLayout from "@/components/shared/layouts/home-layout";
import TrendingCarousel from "./_components/carousel/trending";
import GenreAnime from "@/components/shared/genre-anime";

export default function Home() {
  const { data: animes, isLoading } = useQuery({
    queryKey: ["ANIME_HOME_PAGE"],
    queryFn: getAnimeHome,
    refetchOnMount: false,
  });

  if (isLoading || !animes) return <HomeSkeleton />;

  const {
    spotlightAnimes,
    trendingAnimes,
    latestCompletedAnimes,
    mostPopularAnimes,
    mostFavoriteAnimes,
    topAiringAnimes,
  } = animes;

  return (
    <div className="h-auto w-full">
      <div className="">
        <AnimeSpotlightCarousel spotlightAnimes={spotlightAnimes} />
      </div>

      <div className="relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 top-0 h-25 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-0" />
        <div className="wrapper-container px-12 md:mx-12 py-20 ">
          <HomeLayout heading="Trending">
            <TrendingCarousel animes={trendingAnimes} />
          </HomeLayout>
        </div>
      </div>

      {/* Latest watching */}

      <div className="wrapper-container px-12 md:px-24 py-12">
        {/* Most favorite */}
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          <GenreAnime title="Most Favorite" animes={mostFavoriteAnimes} />
          <GenreAnime title="Top Airing" animes={topAiringAnimes.slice(0, 5)} />
          <GenreAnime title="Most Popular" animes={mostPopularAnimes} />
          <GenreAnime title="Completed Animes" animes={latestCompletedAnimes} />
        </div>
      </div>
    </div>
  );
}
