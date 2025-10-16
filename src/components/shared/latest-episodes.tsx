import { QUERY_KEY } from "@/lib/query-key";
import { getAnimeEpisodesById } from "@/services/api";
import { LatestEpisodeAnimes } from "@/types/anime";
import { useQueries } from "@tanstack/react-query";
import HoveredContent from "./hovered-content";
import Image from "next/image";
import Link from "next/link";
import { BadgeEpisode } from "../ui/episode-badge";

export default function LatestEpisodes({
  animes,
}: {
  animes: LatestEpisodeAnimes[];
}) {
  const results = useQueries({
    queries: animes.map((anime) => ({
      queryKey: [QUERY_KEY.LATEST_ANIME_EPISODES, anime.id],
      queryFn: () => getAnimeEpisodesById(anime.id),
    })),
  });

  const getLatestEpisodes = (idx: number) => {
    const episodes = results[idx].data?.episodes;
    if (!episodes?.length) return null;

    const episodeLength = episodes?.length - 1;
    return episodes[episodeLength];
  };

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 ">
      {animes.map(({ name, poster, episodes, id, type }, idx) => (
        <div key={id} className="flex flex-col gap-2">
          <HoveredContent
            animeId={id}
            to={`/watch/${getLatestEpisodes(idx)?.episodeId}`}
          >
            <Link
              href={`/watch/${getLatestEpisodes(idx)?.episodeId}`}
              className="relative aspect-[8/10] h-72 w-full overflow-hidden sm:aspect-[12/16]"
            >
              <Image
                src={poster}
                alt={`${name} poster`}
                fill
                priority
                className="h-full w-full object-cover [mask-image:linear-gradient(180deg,#fff,#fff,#fff,transparent)]"
              />
              <div className="absolute bottom-2 right-2">
                <BadgeEpisode episodes={episodes} />
              </div>
            </Link>
          </HoveredContent>
          <Link
            href={`/watch/${getLatestEpisodes(idx)?.episodeId}`}
            className="line-clamp-1 w-full text-sm hover:text-rose-400"
          >
            {name}
          </Link>
          <span className="text-xs text-gray-400">{type}</span>
        </div>
      ))}
    </div>
  );
}
