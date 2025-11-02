import {
  AnimeEpisodes,
  AnimeEpisodeServers,
  AnimeInfo,
  AnimeStreamingLinks,
  HomePage,
  ScheduledAnimes,
  SharedAnimeType,
  Top10Animes,
  TopUpcomingAnime,
} from "@/types/anime";

async function fetchUrl<T>(url: string): Promise<T> {
  const res = (await fetch(url).then((res) => res.json())) as T;
  return res;
}

export async function getAnimeInfoById(id: string) {
  const data = await fetchUrl<AnimeInfo>(`/api/v2/anime?id=${id}`);
  return data;
}

export async function getAnimeHome() {
  const data = await fetchUrl<HomePage>("/api/v2/home");
  return data;
}

export async function getAnimeEpisodesById(id: string) {
  const data = await fetchUrl<AnimeEpisodes>(`/api/v2/episodes?id=${id}`);
  return data;
}

export async function getAnimeScheduleByDate(date: string) {
  const animes = await fetchUrl<ScheduledAnimes>(
    `/api/v2/anime/schedule?date=${date}`,
  );

  return animes;
}
