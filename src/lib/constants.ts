import {
  CompassIcon,
  FeatherIcon,
  HouseIcon,
  icons,
  SearchIcon,
} from "lucide-react";

export const LANDING_NAV_ITEMS = [
  {
    label: "Home",
    icon: HouseIcon,
    href: "/home",
  },
  {
    label: "Movies",
    icon: CompassIcon,
    href: "/movies",
  },
  {
    label: "Most Popular",
    icon: FeatherIcon,
    href: "/category/most-popular",
  },
  {
    label: "Top Airing",
    icon: SearchIcon,
    href: "/category/top-airing",
  },
];
