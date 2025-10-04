export const BASE_URL = () => {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.NEXT_PUBLIC_ANIME_BASE_URL) {
      throw new Error("Please add anime base URL to .env file");
    }

    return process.env.NEXT_PUBLIC_ANIME_BASE_URL as string;
  } else {
    return "http://localhost:4000/api/v2/hianime";
  }
};

export const URI =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://vayanime.vercel.app";

export const LANDING_NAV_ITEMS = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Movies",

    href: "/movies",
  },
  {
    label: "Most Popular",

    href: "/category/most-popular",
  },
  {
    label: "Top Airing",

    href: "/category/top-airing",
  },
];
// Genre list
export const GENRES: string[] = [
  "action",
  "adventure",
  "cars",
  "comedy",
  "dementia",
  "demons",
  "drama",
  "ecchi",
  "fantasy",
  "game",
  "harem",
  "historical",
  "horror",
  "isekai",
  "josei",
  "kids",
  "magic",
  "martial-arts",
  "mecha",
  "military",
  "music",
  "mystery",
  "parody",
  "police",
  "psycological",
  "romance",
  "samurai",
  "school",
  "sci-fi",
  "seinen",
  "shoujo",
  "shoujo-ai",
  "shounen",
  "shounen-ai",
  "slice-of-life",
  "space",
  "sports",
  "super-power",
  "supernatural",
  "thriller",
  "vampire",
] as const;

// Types list
export const TYPES = [
  { title: "Dubbed Anime", href: "/category/dubbed-anime" },
  { title: "TV Series", href: "/category/tv" },
  { title: "Movies", href: "/category/movie" },
  { title: "OVAs", href: "/category/ova" },
  { title: "ONAs", href: "/category/ona" },
  { title: "Specials", href: "/category/special" },
] as const;
