import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { COLORS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueKey(key: string, id: string): string {
  return `${key}:${id.toUpperCase()}`;
}

export function createRoutePath(routeSegments: string[]): string {
  return `/${routeSegments.join("/")}`;
}

export function generateRandomColor(idx: number) {
  return COLORS[idx % COLORS.length];
}
