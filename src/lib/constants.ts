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
