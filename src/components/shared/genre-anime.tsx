import { SharedAnimeType } from "@/types/anime";
import React from "react";
import HoveredContent from "./hovered-content";
import { CustomImage } from "../ui/custom-image";
import Link from "next/link";
import { BadgeEpisode } from "../ui/episode-badge";
import { ChevronRight } from "lucide-react";

export default function GenreAnime({
  animes,
  title,
}: {
  animes: SharedAnimeType[];
  title: string;
}) {
  const encodedTitle = title
    .replace(" ", "-")
    .replace("-anime", "")
    .toLowerCase();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium text-primary">{title}</h2>
      {animes.map((anime) => (
        <React.Fragment key={anime.id}>
          <div className="flex w-full gap-3">
            <HoveredContent animeId={anime.id}>
              <div className="relative h-[4.8rem] w-14 shrink-0">
                <CustomImage
                  src={anime.poster}
                  alt={anime.name}
                  priority
                  fill
                  className="overflow-hidden object-cover rounded-md"
                />
              </div>
            </HoveredContent>

            <div className="flex flex-col justify-center space-y-1.5">
              <Link
                href={`/${anime.id}`}
                className="line-clamp-1 text-sm font-medium text-primary-foreground hover:text-rose-300"
              >
                {anime.name}
              </Link>
              <BadgeEpisode episodes={anime.episodes} type={anime.type} />
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />
        </React.Fragment>
      ))}

      <Link
        href={`/category/${encodedTitle}`}
        className="flex w-fit items-center gap-1 text-sm text-white duration-300 hover:text-rose-300"
      >
        View More <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
