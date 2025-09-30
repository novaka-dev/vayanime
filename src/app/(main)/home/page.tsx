"use client";

import HomeSkeleton from "@/components/skeleton/home-skeleton";
import { getAnimeHome } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import AnimeSpotlightCarousel from "./_components/carousel/spotlight";

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
    latestEpisodeAnimes,
  } = animes;

  return (
    <div className="h-auto w-full">
      <div>
        <AnimeSpotlightCarousel spotlightAnimes={spotlightAnimes} />
      </div>
    </div>
  );
}
