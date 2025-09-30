import { BASE_URL } from "@/lib/constants";
import {
  AnimeEpisodes,
  AnimeEpisodeServers,
  AnimeInfo,
  AnimeStreamingLinks,
  ApiResponse,
  HomePage,
  ScheduledAnimes,
  SharedAnimeType,
  Top10Animes,
  TopAiringAnime,
  TopUpcomingAnime,
} from "@/types/anime";

export const getAnimeHomePage = async (): Promise<HomePage> => {
  const response = await fetch(BASE_URL() + "/home");

  // Handle error HTTP dasar
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const res = (await response.json()) as ApiResponse<HomePage>;

  // Cek status: 200 = sukses
  if (res.status !== 200) {
    throw new Error(res.message || "Unknown API error");
  }

  // Sanitize data
  return JSON.parse(JSON.stringify(res.data));
};

// Fungsi episodes
export const fetchAnimeEpisodesById = async (
  animeId: string,
): Promise<AnimeEpisodes> => {
  const response = await fetch(`${BASE_URL()}/anime/${animeId}/episodes`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const res = await response.json(); // format: { status, data }

  if (res.status !== 200) {
    throw new Error(res.message || "Failed to fetch episodes");
  }

  return JSON.parse(JSON.stringify(res.data));
};

// Fungsi info (kalau dipake)
export const fetchAnimeInfoByAnimeId = async (
  animeId: string,
): Promise<AnimeInfo> => {
  const response = await fetch(`${BASE_URL()}/anime/${animeId}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const res = await response.json();

  if (res.status !== 200) {
    throw new Error(res.message || "Failed to fetch anime info");
  }

  return JSON.parse(JSON.stringify(res.data));
};
