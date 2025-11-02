import { QUERY_KEY } from "@/lib/query-key";
import { createRoutePath, generateUniqueKey } from "@/lib/utils";
import { storeOrGetFromRedis } from "@/redis";
import { AnimeEpisodes, AnimeInfo, HomePage } from "@/types/anime";
import { NextRequest, NextResponse } from "next/server";
import {
  fetchAnimeEpisodesById,
  fetchAnimeInfoByAnimeId,
  fetchAnimeScheduleByDate,
  getAnimeHomePage,
} from "../controller/anime";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ route: string[] }> },
) {
  const { route } = await context.params;
  const searchParams = req.nextUrl.searchParams;

  const pathname = createRoutePath(route);

  switch (pathname) {
    // fetch anime homepage...
    case "/home": {
      const data = await storeOrGetFromRedis<HomePage>(
        QUERY_KEY.ANIME_HOME_PAGE,
        getAnimeHomePage,
      );
      return NextResponse.json(data, { status: 200 });
    }

    // fetch anime info...
    case "/anime": {
      const animeId = searchParams.get("id");

      if (!animeId) {
        return NextResponse.json({ message: "Invalid Id!" }, { status: 500 });
      }

      const animeInfo = await storeOrGetFromRedis<AnimeInfo>(
        generateUniqueKey(QUERY_KEY.ANIME_INFO, animeId),
        async () => await fetchAnimeInfoByAnimeId(animeId),
        2.628e6, // 1month
      );
      return NextResponse.json(animeInfo, { status: 200 });
    }

    case "/episodes": {
      const animeId = searchParams.get("id");

      if (!animeId) {
        return NextResponse.json({ message: "Invalid Id!" }, { status: 500 });
      }

      const animeEpisodes = await storeOrGetFromRedis<AnimeEpisodes>(
        generateUniqueKey(QUERY_KEY.ANIME_EPISODES_BY_ID, animeId),
        async () => fetchAnimeEpisodesById(animeId),
        7200, // 2hours
      );

      return NextResponse.json(animeEpisodes, { status: 200 });
    }

    case "/anime/schedule": {
      const date = searchParams.get("date");

      if (!date) {
        return NextResponse.json(
          { message: "Date is required!" },
          { status: 500 },
        );
      }

      const scheduledAnime = await storeOrGetFromRedis(
        generateUniqueKey(QUERY_KEY.UPCOMING_SCHEDULE, date),
        async () => await fetchAnimeScheduleByDate(date),
        86400, // 1d
      );

      return NextResponse.json(scheduledAnime, { status: 200 });
    }
  }
}
