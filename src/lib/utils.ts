import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueKey(key: string, id: string): string {
  return `${key}:${id.toUpperCase()}`;
}

export function createRoutePath(routeSegments: string[]): string {
  return `/${routeSegments.join("/")}`;
}
