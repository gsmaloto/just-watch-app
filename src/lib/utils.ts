import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MovieDb } from "moviedb-promise";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const movieDb = new MovieDb(process.env.TMDB_API_KEY ?? "");
