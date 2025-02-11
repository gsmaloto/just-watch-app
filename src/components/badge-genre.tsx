import { Badge } from "./ui/badge";

type BadgeGenreProps = {
  genreId: number;
  genreName: string;
};

// Define colors for each genre
const badgeStyles: Record<number, string> = {
  28: "border-red-500 bg-red-500/20", // Action
  12: "border-yellow-500 bg-yellow-500/20", // Adventure
  16: "border-blue-400 bg-blue-400/20", // Animation
  35: "border-green-500 bg-green-500/20", // Comedy
  80: "border-gray-700 bg-gray-700/20", // Crime
  99: "border-teal-500 bg-teal-500/20", // Documentary
  18: "border-purple-500 bg-purple-500/20", // Drama
  10751: "border-indigo-500 bg-indigo-500/20", // Family
  14: "border-pink-500 bg-pink-500/20", // Fantasy
  36: "border-amber-600 bg-amber-600/20", // History
  27: "border-red-700 bg-red-700/20", // Horror
  10402: "border-fuchsia-500 bg-fuchsia-500/20", // Music
  9648: "border-gray-500 bg-gray-500/20", // Mystery
  10749: "border-rose-500 bg-rose-500/20", // Romance
  878: "border-cyan-500 bg-cyan-500/20", // Science Fiction
  10770: "border-violet-500 bg-violet-500/20", // TV Movie
  53: "border-orange-500 bg-orange-500/20", // Thriller
  10752: "border-yellow-800 bg-yellow-800/20", // War
  37: "border-brown-500 bg-brown-500/20", // Western
};

export default function BadgeGenre({ genreId, genreName }: BadgeGenreProps) {
  const badgeStyle = badgeStyles[genreId] || "border-gray-500 bg-gray-500/20"; // Default color

  return (
    <Badge
      key={genreId}
      variant="outline"
      className={`text-white/80 ${badgeStyle}`}
    >
      {genreName}
    </Badge>
  );
}
